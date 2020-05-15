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
function beforeViewLoad(prop) {
    window.dateNow = (new Date()).toString();
    prop.gridView.rowFill = rowFill;
};

function rowFill(para) {
    var cssName = "cellColor_Dead";
    var dataRow = para.drRow;
    var certExp = dataRow["cert_exp"].value;
    // ----------------------------------------------------
    if (certExp <= dateNow) {
        dataRow["cert_exp"].className = cssName;
    }
}