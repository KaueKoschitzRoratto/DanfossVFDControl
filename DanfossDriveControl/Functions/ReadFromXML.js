// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.746.3/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var DanfossDriveControl;
        (function (DanfossDriveControl) {
            function readFromXML(par1) {
                let control = TcHmi.Controls.get("ucParAccess1");
                control.setSStatus("Getting Drive Parameters...");
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {

                    if (this.readyState == 4 && this.status == 200) {
                        empDetails(this,par1);
                    }
                };
                xmlhttp.open("GET", "LCPMenuTree.xml", false);
                xmlhttp.send();
            }
            
            function empDetails(xml, par1) {
                var i;
                var xmlDoc = xml.responseXML;
                
                var table = [];
                var j;

                var x = xmlDoc.getElementsByTagName("Item");
               
                var params;
                var index;
                var defaultValue;
                var access;
                for (i = 0; i < x.length; i++) {
                    if (x[i].getElementsByTagName("Index")[0].hasChildNodes()) {
                        index = x[i].getElementsByTagName("Index")[0].childNodes[0].nodeValue;
                        //console.log("Index: " + index);
                        if (index == par1) {
                            params = x[i].getElementsByTagName("SubItems")[0].getElementsByTagName("Object");
                            //console.log(params);
                            
                            for (j = 0; j < params.length; j++) {
                                if (params[j].getElementsByTagName("Index")[0].hasChildNodes()) {
                                    let row = { index: 0, name: "", readData: 0, writeData: 0, defaultValue: '-', access: '-' };
                                    let string = "";
                                    row.index = Number(params[j].getElementsByTagName("Index")[0].childNodes[0].nodeValue);
                                    
                                    row.name = params[j].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                                    if (params[j].getElementsByTagName("Info")[0] !== undefined) {
                                        defaultValue = parseInt(params[j].getElementsByTagName("Info")[0].getElementsByTagName("DefaultData")[0].childNodes[0].nodeValue,16);
                                        
                                        if (defaultValue !== undefined) {
                                            row.defaultValue = defaultValue;
                                        }
                                    }
                                    if (params[j].getElementsByTagName("Flags")[0] !== undefined) {
                                        access = params[j].getElementsByTagName("Flags")[0].getElementsByTagName("Access")[0].childNodes[0].nodeValue;
                                        if (access !== undefined) {
                                            row.access = access;
                                        }
                                    }
                                    //console.log(row);
                                    table.push(row);
                                }
                            }
                            //console.log(table);
                            TcHmi.Symbol.writeEx("%i%GridData%/i%", table);
                            return;

                        }//if the current item's index matches the the item index we are looking for
                    }// if the item element has children
                }//for each item element
            }
            DanfossDriveControl.readFromXML = readFromXML;
        })(DanfossDriveControl = Functions.DanfossDriveControl || (Functions.DanfossDriveControl = {}));
        Functions.registerFunctionEx('readFromXML', 'TcHmi.Functions.DanfossDriveControl', DanfossDriveControl.readFromXML);
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);