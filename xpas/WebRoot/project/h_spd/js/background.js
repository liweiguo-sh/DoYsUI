var topWin = top.topWin;
//如果当前用户只有一个库存地权限，则默认选择该库存地
function initStationIfOnlyOne(){
	var ret=false;
	
	var selectFilter="storage_is_physical =1 and storage_device_type_id IN (0,1)" ;
	
	
	//山东肿瘤，服务中心账户默认选中设备科
	if(topWin.officeId == 3 && topWin.serverName == "SDZL"){
		selectFilter+=" and storage_id=343";
		
	}
	
	try{
		 if (g.a.send("processType=g_spd.storage.Common&actionType=getStorageNodes", { rootStorageId: -1, selectFilter: selectFilter }, true)) {
				if (g.a.OK) {
					var cReturn = g.a.cReturn;
					var dtb = cReturn.dtbStorage;
					if(dtb && dtb.rowCount >0){
						if(dtb.rowCount == 1){
							var drRow = dtb.rows[0];
							var storageId = drRow["storage_id"].value;
							var storageName = drRow["storage_name"].value;
							if(storageId.toInt() >1){
								var nodeKey = drRow["node_key"].value;
								topWin.stationStorageId = storageId;
								topWin.stationStorageName = storageName;
								topWin.stationStorageNodeKey = nodeKey;
								setLocalItem("stationStorageId", storageId);
								setLocalItem("stationStorageName", storageName);
								setLocalItem("stationStorageNodeKey", nodeKey);
								ret=true;
								zuiExt.msg({msg:"已为您设置好工位:"+storageName,type:"success",time:"5000"})
							}else if(storageId.toInt() ==1){
								zuiExt.msg({msg:"您有多个可用工位，请自行设置",type:"warning",time:"5000"})
							}else{
								zuiExt.msg({msg:"您没有可用工位，可能导致某些功能无法使用，请联系运营人员为您分配",type:"warning",time:"5000"})
							}
						}else{
							zuiExt.msg({msg:"您有多个可用工位，请自行设置",type:"warning",time:"5000"})
						}
					}else{
						zuiExt.msg({msg:"您没有可用工位，可能导致某些功能无法使用，请联系运营人员为您分配",type:"warning",time:"5000"})
					}
				}
			}
	}catch(e){
		console.log("initStationIfOnlyOne",e)
	}
	
	
	return ret;
}
function initStation() {
    var stationStorageId = getLocalItem("stationStorageId").toInt();
    var stationStorageIsPhysical = 0;
    var stationStorageName = "";
    var stationStorageNodeKey = "";
    var stationDeptId = 0;
    var stationDeptName = "";

    // ----------------------------------------------------
    if (stationStorageId == 0 ){
    	if(!initStationIfOnlyOne()) return;
    	stationStorageId = getLocalItem("stationStorageId").toInt();
        stationStorageName = getLocalItem("stationStorageName");
        stationStorageNodeKey = getLocalItem("stationStorageNodeKey");
        stationStorageIsPhysical = getLocalItem("stationStorageIsPhysical").toInt();
    };
    if (g.a.send("processType=g_spd.station.PcStation&actionType=setStorageId", { storageId: stationStorageId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;

            stationStorageId = cReturn.storageId;
            if (stationStorageId > 0) {
                stationStorageName = cReturn.storageName;
                stationStorageNodeKey = cReturn.storageNodeKey;
                stationStorageIsPhysical = cReturn.storageIsPhysical;
                stationDeptId = cReturn.storageDeptId;
                stationDeptName = cReturn.storageDeptName;
            }
            else {
                setLocalItem("stationStorageId", 0);
                setLocalItem("stationStorageName", "");
                setLocalItem("stationStorageIsPhysical", 0);
                setLocalItem("stationDeptId", 0);
                setLocalItem("stationDeptName", "");
                debug("您的工位设置已失效，请重新设置");
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

    // ----------------------------------------------------
    setLocalItem("stationStorageName", stationStorageName);
    setLocalItem("stationStorageNodeKey", stationStorageNodeKey);
    setLocalItem("stationStorageIsPhysical", stationStorageIsPhysical);
    setLocalItem("stationDeptId", stationDeptId);
    setLocalItem("stationDeptName", stationDeptName);

    topWin.stationStorageId = stationStorageId;
    topWin.stationStorageName = stationStorageName;
    topWin.stationStorageNodeKey = stationStorageNodeKey;
    topWin.stationStorageIsPhysical = stationStorageIsPhysical;
    topWin.stationDeptId = stationDeptId;
    topWin.stationDeptName = stationDeptName;

    topWin.cStatusBar.setValue("station", topWin.stationStorageName);

    // ----------------------------------------------------
    if (stationStorageId > 0) {
        if (stationDeptId <= 0) {
            showWarn("请为当前工位的库存地（" + stationStorageName + "）配置所属科室.");
        }
    }
}