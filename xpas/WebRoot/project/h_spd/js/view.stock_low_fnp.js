var btnExtra = {
    gridview: null,         // -- 当前视图对象 --
    viewKey: "",            // -- 当前视图ViewKey --    
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0              // -- 当前列在网格中的下标 -- 
};

// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if (btnExtra.btnKey.equals("processSN") || btnExtra.btnKey.equals("processRFID")) {
        var dataRow = btnExtra.drViewData;
        var materialId = dataRow["material_id"].value;

        if (g.a.send("processType=h_spd.base_data.Common&actionType=getPackTempletByMatrId", { materialId: materialId }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var dtbPackTemplet = cReturn.dtbPackTemplet;
                if (dtbPackTemplet.rowCount == 0) {
                    showWarn("不是定数包，不支持转加工业务。");
                    return;
                }

                var packTempletId = dtbPackTemplet.rows[0]["pack_templet_id"].value;
                var packTempletName = dtbPackTemplet.rows[0]["pack_templet_name"].value;
                var processMode = btnExtra.btnKey.equals("processSN") ? "SN" : "RFID";
                var prop = {
                    url: g.appPath + "project/h_spd/html/op/fixed_num_pkg_process.html?processMode=" + processMode,
                    parent: win,
                    modal: true,
                    title: "定数包加工 - " + packTempletName
                };
                var para = {
                    packTempletId: packTempletId
                };
                topWin.openWindow(prop, para);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else if (btnExtra.btnKey.equals("createDist")) {
        var arrSelectedRows = new Array();
        var dataRow = null;
        var matrs = "";
        var storageIdTo = 0;

        if (topWin.serverName == 'SPD_BJTT') {
            // 天坛医院创建定数包配送单，主要用于电子拣货和 HIS 出库
            for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
                dataRow = btnExtra.dtbViewData.rows[i];
                if (dataRow.checked) {
                    arrSelectedRows.push(dataRow["material_id"].value + "," + dataRow["qty_req"].value);
                }
            }
            if (arrSelectedRows.length == 0) {
                showMsg("请先勾选要操作的记录。");
                return false;
            }

            var matrs = arrSelectedRows.join(";");
            if (g.a.send("processType=h_spd.stock.Common&actionType=storageRepListToDeptDist", {
                matrs: matrs
            }, true)) {
                if (g.a.OK) {
                    var cReturn = g.a.cReturn;
                    var flowKeyDist = cReturn.flowKeyforDeptDist;
                    var distId = cReturn.distId;
                    var prop = {
                        url: g.appPath + "project/h_spd/html/op/thd_dist.html",
                        windowState: "maximized",
                        noTitle: true,
                        text: "科室配送" + (g.local ? " - " + distId : ""),
                        title: "根据补货需求自动生成，建议立即处理。关闭后可以在配送业务中找到当前单据",
                        modal: true
                    };
                    var para = {
                        viewKey: "thd_dist",
                        primaryKey: "dist_id," + distId,
                        distType: "DEPT_DIST",
                        flowKey: flowKeyDist,
                        allowModify: true,
                        allowDelete: true
                    };
                    topWin.openWindow(prop, para);
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        else {
            if (!gridView.tree.selectedNode || gridView.tree.selectedNode.level != 2) {
                showWarn("请先选中左侧的库存地导航节点。");
                return false;
            }
            storageIdTo = gridView.tree.selectedNode.value;

            for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
                dataRow = btnExtra.dtbViewData.rows[i];
                if (dataRow.checked) {
                    arrSelectedRows.push(dataRow["material_id"].value + "," + dataRow["qty_req"].value);
                }
            }
            if (arrSelectedRows.length == 0) {
                showMsg("请先勾选要操作的记录。");
                return false;
            }

            var matrs = arrSelectedRows.join(";");
            if (g.a.send("processType=h_spd.stock.Common&actionType=storageRepListToDist", {
                storageIdTo: storageIdTo,
                matrs: matrs
            }, true)) {
                if (g.a.OK) {
                    var cReturn = g.a.cReturn;
                    var flowKeyDist = cReturn.flowKeyDistWs;
                    var distId = cReturn.distId;
                    var prop = {
                        url: g.appPath + "project/h_spd/html/op/thd_dist.html",
                        windowState: "maximized",
                        noTitle: true,
                        text: "科室配送" + (g.local ? " - " + distId : ""),
                        title: "根据补货需求自动生成，建议立即处理。关闭后可以在配送业务中找到当前单据",
                        modal: true
                    };
                    var para = {
                        viewKey: "thd_dist",
                        primaryKey: "dist_id," + distId,
                        distType: "WS",
                        flowKey: flowKeyDist,
                        allowModify: true,
                        allowDelete: true
                    };
                    topWin.openWindow(prop, para);
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
    }
    else if (btnExtra.btnKey.equals("printIO")) {
        var viewFilter = gridView.viewFilter;
        gridView.pageMaxRows = 99999;
        gridView.setViewFilter(viewFilter);
        var param = {
            title: "库存地补货需求",
            colNumThs: 4, //表头每行多少列，默认为4
            colNumTfooters: 2, //表尾每行多少列，默认为4
            pageRowNum: 26, //每页数量
            form: {
                ths: [
                    { text: "日期", value: new Date() }
                ],
                tfooters: [
                    { text: "制单人", value: "" },

                ]
            },
            grid: {
                ths: ["序号", "补货库存地", "品名", "品规", "需求数量"],
                thwidths: ["50px", "200px", "200px", "200px", "66px"],
                data: (function () {
                    var arr = [],
                        rowData;

                    for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
                        dataRow = btnExtra.dtbViewData.rows[i];
                        if (dataRow.checked) {
                            rowData = [];
                            rowData[0] = (parseInt(i) + 1);
                            rowData[1] = dataRow["storage_fullname"].value;
                            rowData[2] = dataRow["material_name"].value;
                            rowData[3] = dataRow["material_spec"].value;
                            rowData[4] = dataRow["qty_req"].value;
                            arr.push(rowData);
                        }
                    }
                    return arr;
                })()
            }
        };
        WebPrint.goPrintFormModel(param);
    }
    else {
    }
};