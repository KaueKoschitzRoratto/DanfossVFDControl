// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../Packages/Beckhoff.TwinCAT.HMI.Framework.12.746.3/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var DanfossDriveControl;
        (function (DanfossDriveControl) {
            function getParams(par1) {
                var bWrDone = false;
                var bRdDone = false;
                var control = TcHmi.Controls.get('ucParAccess1');
                control.setSStatus("Sending Read Request to PLC...");
                var GridData = TcHmi.Symbol.readEx('%i%GridData%/i%');
                
                var getParamsPromise = new Promise(function (resolved, rejected) {
                    var indexes = [];
                    for (var i = 0; i < 100; i++) {
                        if (i < GridData.length) {
                            indexes.push(GridData[i].index);
                        } else {
                            indexes.push(0);
                        }
                    } 
                    
                    //Write to symbol to execute method                  
                    TcHmi.Server.writeSymbolEx("PLC1.GVL_HMI.nParamCount", GridData.length, { timeout: 2000 }, null);
                   

                    
                    //console.log(indexes);
                    TcHmi.Symbol.writeEx("%s%PLC1.GVL_HMI.arrParamNo%/s%", indexes, function (data) {

                        if (data.error === TcHmi.Errors.NONE) {
                            resolved();
                        } else {
                            rejected(data.error);
                        }

                        var symbolBuilder = "";
                            
                    });
                    

                });

               

                

                getParamsPromise.then (function (value) {
                    TcHmi.Server.writeSymbolEx("PLC1.GVL_HMI.bRdParams", true, { timeout: 2000 }, null);
                    control.setSStatus("Waiting for PLC to read Parameter Values from drive...");
                }, function (error) { console.log(error); });


            }
                
                              
              

                    
            //Read new table
            
            DanfossDriveControl.getParams = getParams;
        })(DanfossDriveControl = Functions.DanfossDriveControl || (Functions.DanfossDriveControl = {}));
        Functions.registerFunctionEx('getParams', 'TcHmi.Functions.DanfossDriveControl', DanfossDriveControl.getParams);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
