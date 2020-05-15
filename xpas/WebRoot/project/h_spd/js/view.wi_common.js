var btnExtra = {
    btnKey: "",             // -- 按钮Key --
    dtbViewData: null,      // -- 数据记录集 --
    drViewData: null,       // -- 当前行记录 --
    recordRow: 0,           // -- 当前行在记录集中的下标(下标从0开始) --
    gridRow: 0,             // -- 当前行在网格中的行号(下标从0开始) --
    gridCol: 0,             // -- 当前列在网格中的下标 --
    iIndex: 0,              // -- 旧兼容代码, 同 recordRow --    
    iRow: 0                 // -- 旧兼容代码, 同 gridRow --
};
// ----------------------------------------------------------------------------
function viewExtraButtonClick(jsonProp) {
    btnExtra = g.x.extendJSON(btnExtra, jsonProp);
    if(btnExtra.btnKey.equals("ys_wi")){
    	g.a.execTask("g_spd.interface_third.his.hnys.task.SynWiTask");
    	location.reload();
    }else{
    	
    }
};
function uviewformLoad(){
	console.log(topWin.serverName);
    var serverName = topWin.serverName;
	if(serverName != "SPDHNYS"){
		$(gridView.toolbar.Bars.ys_wi.dom).hide();
	}
}
// -- 视图加载之前、视图加载之后 ----------------------------------------------
function beforeViewLoad(prop) {
};
// -- 行记录删除前、删除后 ----------------------------------------------------
function beforeDelete(prop) {
    return true;
};
function afterDelete(prop) {
};

// -- 导航节点Click事件 -------------------------------------------------------
function afterTreeNodeClick(treeKey, node) {
};