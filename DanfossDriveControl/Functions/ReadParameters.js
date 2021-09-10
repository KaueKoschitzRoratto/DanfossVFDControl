// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.746.3/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var DanfossDriveControl;
        (function (DanfossDriveControl) {
            function ReadParameters(SymbolName) {
                let control = TcHmi.Controls.get('ucParAccess1');
                control.setSStatus("PLC has finished! Reading values from PLC");
                var GridData;
                GridData = TcHmi.Symbol.readEx('%i%GridData%/i%');
                var values = [{ nRdVal: 0,strRdVal:"",nWrVal:0,strWrVal:"" }];
                var readCount = new Promise((resolve, reject)=> {
                    
                    TcHmi.Server.readSymbol('PLC1.GVL_HMI.nParamCount', function (data) {

                        if (data.error === TcHmi.Errors.NONE) {
                            resolve(data.response.commands[0].readValue);
                        } else {
                            reject(data.error);
                        }
                    });
                });
                function readValues(value) {
                    return new Promise((resolve, reject) => {
                        TcHmi.Server.readSymbolEx(SymbolName, { timeout: 2000 }, function (data) {
                            if (data.error !== TcHmi.Errors.NONE) {
                                reject(data.error.toString());
                            } else {
                                values = data.results[0].value;
                                resolve(value);
                            }
                        });
                    });
                }
                function writeToGrid(value) {
                    return new Promise((resolve, reject) => {
                        control.setSStatus("Copying values to data grid!");
                        for (var j = 0; j < value; j++) {
                            let decVal = new TcHmi.Base64BinaryReader(values[j].nRdVal);
                            GridData[j].readData = decVal.readUInt32();
                            GridData[j].writeData = GridData[j].readData;
                        }
                        
                        TcHmi.Symbol.writeEx('%i%GridData%/i%', GridData, function (data) {
                            if (data.error === TcHmi.Errors.NONE) {
                                control.setSStatus("Done!");
                            } else {
                                console.log(data.error.toString());
                            }
                        });


                    });
                }

                readCount
                    .then(readValues)
                    .then(writeToGrid);//read parameter count
                
            }
            DanfossDriveControl.ReadParameters = ReadParameters;
        })(DanfossDriveControl = Functions.DanfossDriveControl || (Functions.DanfossDriveControl = {}));
        Functions.registerFunctionEx('ReadParameters', 'TcHmi.Functions.DanfossDriveControl', DanfossDriveControl.ReadParameters);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);