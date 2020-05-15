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

// -- 视图加载之前、视图加载之后 ----------------------------------------------
function beforeViewLoad(prop) {
    if (g.a.send("processType=h_spd.base_data.manufacturer.VIEW_manufacturer&actionType=checkManufacturer", { viewKey: "sp_manual" }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var needRefreshData = cReturn.needRefreshData;
            if (needRefreshData) {
                setTimeout("gridView.refresh();", 500);
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};