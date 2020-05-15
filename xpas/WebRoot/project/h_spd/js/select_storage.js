/*
* 选择库存地通用代码
*/
var jsoStorage = {};
// -- 选择库存地 --------------------------------------------------------------
jsoStorage.selectStorage = function (prop, para) {
    var jsonProp = {
        title: "请选择库存地...",
        width: topWin.cWin.maxWidth * 0.25,
        height: topWin.cWin.maxHeight * 0.7,
        modal: true,
        parent: win,
        url: g.appPath + "project/g_spd/html/storage/select_storage.html"
    }
    var jsonPara = {
        treeKey: "g_select_storage",
        selectMode: "singleSelect"      // -- singleSelect：默认单选；multiSelect：不限制 --
    };

    jsonProp = g.x.extendJSON(jsonProp, prop);
    jsonPara = g.x.extendJSON(jsonPara, para);

    topWin.openWindow(jsonProp, jsonPara);
};

jsoStorage.getStationStorage = function () {
    var jsonStationStorage = {
        stationStorageId: top.topWin.stationStorageId,
        stationStorageName: top.topWin.stationStorageName,
        stationStorageNodeKey: top.topWin.stationStorageNodeKey,
        stationStorageIsPhysical: top.topWin.stationStorageIsPhysical
    }
    if (!jsonStationStorage.stationStorageId) {
        jsonStationStorage.stationStorageId = getLocalItem("stationStorageId").toInt();
        jsonStationStorage.stationStorageName = getLocalItem("stationStorageName");
        jsonStationStorage.stationStorageNodeKey = getLocalItem("stationStorageNodeKey");
        jsonStationStorage.stationStorageIsPhysical = getLocalItem("stationStorageIsPhysical").toInt();
    }

    if (!jsonStationStorage.stationStorageId) {
        jsonStationStorage.stationStorageId = 0;
        jsonStationStorage.stationStorageName = "";

        showWarn("未配置当前站点所在库存地，请先配置。");
    }
    return jsonStationStorage;
};