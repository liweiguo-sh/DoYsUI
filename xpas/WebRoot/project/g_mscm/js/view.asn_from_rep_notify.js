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
    if (btnExtra.btnKey.equals("exportAsn")) {
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrSelectedRows.push(btnExtra.dtbViewData.rows[i]["asn_id"].value);
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        var keys = arrSelectedRows.join(",");
        if (g.a.send("processType=g_mscm.asn.ResourcePrint&actionType=downloadData", { asnIds: keys }, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var filename = cReturn.filename;
                var url = g.httpServer + g.appPath + "res_run/mscm/asn/" + filename;

                if (filename) {
                    if (!gridView.toolbar.Bars["dataLink"]) {
                        gridView.toolbar.addBar({ type: "label", key: "dataLink", text: "<a id='" + "aData" + "' href='' target='_blank'> 数据下载 </a>" });
                    }
                    var aData = gId("aData");
                    aData.href = url;
                    showMsg("数据已生成，请右键点击链接，然后另存为...");
                    // -- window.open(url); --
                }
                else {
                    showErr("文件生成失败。");
                }

            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
    }
}; 