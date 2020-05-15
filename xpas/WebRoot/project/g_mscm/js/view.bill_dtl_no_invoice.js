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
    if (btnExtra.btnKey.equals("createInvoice")) {
        var arrValues = new Array();
        var arrSelectedRows = new Array();
        // ----------------------------------------------------
        for (var i = 0; i < btnExtra.dtbViewData.rowCount; i++) {
            if (btnExtra.dtbViewData.rows[i].checked) {
                arrValues = new Array();
                arrValues.push(btnExtra.dtbViewData.rows[i]["period"].value);
                arrValues.push(btnExtra.dtbViewData.rows[i]["matr_id"].value);
                arrValues.push(btnExtra.dtbViewData.rows[i]["price"].value);
                arrValues.push(btnExtra.dtbViewData.rows[i]["lot"].value);
                arrValues.push(btnExtra.dtbViewData.rows[i]["matr_spec"].value);
                arrValues.push(btnExtra.dtbViewData.rows[i]["matr_name"].value);

                arrSelectedRows.push(arrValues.join(";"));
            }
        }
        if (arrSelectedRows.length == 0) {
            showMsg("请先勾选要操作的记录。");
            return false;
        }
        
        var splitTime=Date.parse(new Date());
        var billDtls = arrSelectedRows.join(splitTime);
        if (g.a.send("processType=g_mscm.invoice.Common&actionType=createInvoiceFromBillDtl", { billDtls: billDtls,splitTIme:splitTime}, true)) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                var invoiceId = cReturn.invoiceId;

                gridView.refresh();

                var prop = {
                    url: g.appPath + "project/g_mscm/html/invoice/invoice.html",
                    parent: win,
                    modal: true
                };
                var para = {
                    viewKey: "invoice",
                    primaryKey: "invoice_id," + invoiceId,
                    flowKey: "std_create_audit",
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
    else {
    }
};