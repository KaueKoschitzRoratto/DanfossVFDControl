// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.746.3/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var DanfossDriveControl;
        (function (DanfossDriveControl) {
            function WriteParameters() {
                
                var gridData = TcHmi.Symbol.readEx("%i%GridData%/i%");
                let count = gridData.length;
               
                
                let symbolBuilder = ""
                let symbols = [];
                let values = [];
                for (var index = 0; index < count; index++) {
                    if (gridData[index].writeData != gridData[index].writeData) {
                        if (gridData[index].access.equals("ro")) {
                            symbols.push(symbolBuilder.concat("PLC1.GVL_HMI.arrParamData[", index, "]::nWrVal"));
                            values.push(gridData[index].writeData);
                        }
                    }
                }
                TcHmi.Server.writeSymbolEx(symbols, values, { timeout: 2000 },function(data) {
                    if (data.error === TcHmi.Errors.NONE) {
                                console.log("Wrote to the Parameters!")
                                TcHmi.Server.writeSymbolEx('PLC1.GVL_HMI.bWrParams', true, { timeout: 2000 }, function (data) {
                                    if (data.error === TcHmi.Errors.NONE) {
                                        
                                        //gridData[index].readData = value;
                                        //gridData[index].writeData = value;
                                        //TcHmi.Symbol.writeEx("%i%GridData%/i%", gridData, null);

                                    }

                                });// tell the PLC to begin writing the parameter

                            
                      

                    }//if there is an error
                    else { console.log(data.error); }
                });//write to index of the array ofParameter Data
            }
            DanfossDriveControl.WriteParameters = WriteParameters;
        })(DanfossDriveControl = Functions.DanfossDriveControl || (Functions.DanfossDriveControl = {}));
        Functions.registerFunctionEx('WriteParameters', 'TcHmi.Functions.DanfossDriveControl', DanfossDriveControl.WriteParameters);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);