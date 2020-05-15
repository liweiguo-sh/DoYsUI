/*
* xwf.upload_core JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2017-10-09
* Modify Date: 2019-04-22
* Copyright 2017, xpas-next.com
* Description: 文件上传组件（纯js，无界面）
*/
var css_xwf_upload_core = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_upload_core = function (jsonPara) {
    ///<summary>upload控件内核，纯js实现，无界面部分</summary>
    if (jsonPara == null) return;
    for (var key in jsonPara) {
        this[key] = jsonPara[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";

    // -- 初始化 ------------------------------------------
    this.invokePara = jsonPara;
    this.initPara();
    this.initControl();
};
window.xwf_upload_core.prototype = {
    prefix: "xwf_upload_core_",         // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_upload_core_",      // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 },        // -- 类实例下标 --
    doc: document,                      // -- 类宿主窗口 --

    h5Mode: null,                       // -- H5模式 --
    invokePara: null,                   // -- 类初始化传入的json对象 --

    divContainer: null,                 // -- 上传控件容器(非必需) --
    frmUpload: null,                    // -- 上传控件表单(非必需，建议为空) --
    fileUpload: null,                   // -- 上传控件File对象(非必需，建议为空) --
    ifrTarget: null,                    // -- 上传控件File对象target属性对象(非必需，建议为空) --
    domAdd: null,                       // -- 上传按钮对象(必需，也可以是非BUTTON的其它类型) --

    action: "",                         // -- 上传控件表单action属性值 --
    filename: "",                       // -- 指定后台保存的文件名(不包括扩展名，扩展名以实际上传文件的扩展名为准) --
    fileType: null,                     // -- 允许上传的文件类型(默认值在initPara函数中初始化) --
    autoUpload: true,                   // -- 选择文件后自动上传 --
    maxSizeK: 0,                        // -- 文件大小限制(K) --
    maxSizeName: "",                    // -- 文件大小描述(示例：2M) --

    onSelect: null,                     // -- 选择文件事件回调函数 --
    beforeUpload: null,                 // -- 上传前回调函数 --
    callback: null,                     // -- 回调函数 --

    // ----------------------------------------------------    
    summary: function () {
        var strSummary = "xwf 控件类库，文件上传控件类。";
        return strSummary;
    }
};
// -- 初始化 ------------------------------------------------------------------
window.xwf_upload_core.prototype.initPara = function () {
    if (this.h5Mode == null) {
        this.h5Mode = true;
        if (g.b.ie && g.b.ie <= 10) {
            this.h5Mode = false;
        }
    }
    // ----------------------------------------------------
    if (!this.doc.xwf_upload_core) {
        this.doc.xwf_upload_core = {};
    }
    this.doc.xwf_upload_core[this.prefix + "instance"] = this;

    // ----------------------------------------------------
    this.maxSizeName = this.maxSizeK + "K";
    if (this.maxSizeK >= 1024) {
        this.maxSizeName = parseInt(this.maxSizeK / 1024) + "M";
    }
    this.maxSizeK = 1024 * this.maxSizeK;

    if (this.fileType == null) {
        // -- *代表任何类型，0代表允许无扩展名，示例：fileTpye = "...,jpg,0,png,gif,..." --
        this.fileType = "*";
    }
    this.fileType = this.fileType.replaceAll(" ", "").replaceAll(";", ",").toLowerCase();
    this.fileType = "," + this.fileType + ",";
};
window.xwf_upload_core.prototype.initControl = function () {
    var _this = this;
    // ----------------------------------------------------
    if (this.divContainer == null) {
        this.divContainer = this.doc.createElement("DIV");
        this.doc.body.appendChild(this.divContainer);
    }

    if (this.frmUpload == null) {
        this.divFrm = this.doc.createElement("DIV");
        this.divContainer.appendChild(this.divFrm);
        this.divFrm.innerHTML = "<form id='" + this.prefix + "frm' name='" + this.prefix + "frm' method='post' action='' enctype='multipart/form-data' target=''></form>";
        this.frmUpload = gId(this.prefix + "frm");
    }
    this.frmUpload.className = this.cssPrefix + "form";
    this.frmUpload.style.display = "none";

    if (this.fileUpload == null) {
        this.frmUpload.innerHTML = "<div id='" + this.prefix + "divFile' style='width:20px;height:10px;overflow:hidden;text-align:right;filter:alpha(opacity=0);opacity:0;'>"
                                 + "<input type='file' id='" + this.prefix + "file' name='" + this.prefix + "file' style='font-size:5em;cursor:pointer;filter:alpha(opacity=0);opacity:0;' /></div>";
        this.divFile = gId(this.prefix + "divFile");
        this.fileUpload = gId(this.prefix + "file");
    }
    this.fileUpload.className = this.cssPrefix + "file";
    this.fileUpload.onchange = this.onChange;
    this.fileUpload._this = _this;

    if (this.ifrTarget == null) {
        this.divTarget = this.doc.createElement("DIV");
        this.divContainer.appendChild(this.divTarget);
        this.divTarget.innerHTML = "<iframe id='" + this.prefix + "divTarget' name='" + this.prefix + "divTarget' src='about:blank'></iframe>";
        this.ifrTarget = gId(this.prefix + "divTarget");
    }
    this.ifrTarget.style.display = "none";

    // ----------------------------------------------------
    this.domAdd._this = _this;
    this.domAdd.onclick = this.onDomAdd_Click;
    if (!this.h5Mode) {
        this.domAdd.onmouseover = this.onDomAdd_Mouseover;
    }
};

// -- domAdd对象事件 ----------------------------------------------------------
window.xwf_upload_core.prototype.onDomAdd_Click = function (evt) {
    var _this = null;
    var domAdd = g.x.getEventTarget(evt);
    // ----------------------------------------------------
    while (!domAdd._this) {
        domAdd = domAdd.parentElement;
    }
    _this = domAdd._this;

    _this.select();
};
window.xwf_upload_core.prototype.onDomAdd_Mouseover = function (evt) {
    var _this = null;
    var domAdd = g.x.getEventTarget(evt);
    // ----------------------------------------------------
    while (!domAdd._this) {
        domAdd = domAdd.parentElement;
    }
    if (domAdd.alreadyMouseover) return;
    _this = domAdd._this;

    _this.frmUpload.style.display = "";
    _this.frmUpload.style.position = "absolute";
    _this.frmUpload.className = this.cssPrefix + "form";

    _this.fileUpload.style.width = (domAdd.offsetWidth / 1) + "px";
    _this.fileUpload.style.height = (domAdd.offsetHeight / 1) + "px";
    //alert("fileUpload width = " + _this.fileUpload.style.width);

    _this.divFile.style.width = (domAdd.offsetWidth / 1) + "px";
    _this.divFile.style.height = (domAdd.offsetHeight / 1) + "px";
    //alert("divFile width = " + _this.divFile.style.width);

    _this.frmUpload.style.top = (getOffsetTop(domAdd) + 0) + "px";
    _this.frmUpload.style.left = getOffsetLeft(domAdd) + "px";
    _this.frmUpload.style.width = (domAdd.offsetWidth / 1) + "px";
    _this.frmUpload.style.height = (domAdd.offsetHeight / 1) + "px";
    // alert("form width = " + _this.frmUpload.style.width + ", top = " + _this.frmUpload.style.top);

    domAdd.alreadyMouseover = true;
};

// -- public method -----------------------------------------------------------
window.xwf_upload_core.prototype.select = function () {
    if (this.h5Mode) {
        this.fileUpload.click();
    }
    else {
        alert("不支持IE10及以下版本浏览器。");
        return;
    }
};
window.xwf_upload_core.prototype.onChange = function () {
    var _this = this._this;
    if (_this.onSelect) {
        _this.onSelect();
    }
    if (_this.autoUpload) {
        _this.upload();
    }
};
window.xwf_upload_core.prototype.upload = function () {
    var originalName = "", extname = "", fullname = "";
    var fileSize = 0;
    var arrTemp = null;
    // -- 常规检查 ----------------------------------------
    if (this.fileUpload.value.equals("")) {
        if (this.resetProcess) {
            this.resetProcess = false;
            return;
        }
        showWarn("请先选择要上传的文件。");
        return;
    }
    if (this.fileUpload.files) {
        if (this.fileUpload.files.length > 0) {
            filesize = this.fileUpload.files[0].size;
        }
        else {
            alert("未知错误，请检查。")
        }
    }
    else {
        if (g.b.ie && g.b.ie <= 9) {
            // -- IE9及以下版本无法判断待上传文件大小 --
            try {
                var fileobject = new ActiveXObject("Scripting.FileSystemObject");
                var file = fileobject.GetFile(this.fileUpload.value);
                filesize = file.Size;
            }
            catch (e) {
                //alert("调试：activeX错误：" + e.toString());
            }
        }
        else {
            alert("调试：未实现的分支，无法判断文件大小，请检查。")
        }
    }

    // -- 解析原始文件名、扩展名等 ------------------------
    fullname = this.fileUpload.value;

    arrTemp = fullname.split("\\");
    originalName = arrTemp[arrTemp.length - 1];
    arrTemp = originalName.split(".");
    if (arrTemp.length > 1) {
        extname = arrTemp[arrTemp.length - 1].toLowerCase();
    }

    // -- 文件类型及大小检查 ------------------------------
    if (!this.fileType.equals(",*,")) {
        if (this.fileType.indexOf("," + (!extname.equals("") ? extname : "0") + ",") < 0) {
            showWarn("文件类型不正确，请检查。");
            return;
        }
    }
    if (this.maxSizeK > 0 && filesize > 0) {
        if (filesize > this.maxSizeK) {
            showWarn("文件大小超出最大允许范围" + this.maxSizeName + "，请检查。");
            return;
        }
    }

    // -- 上传前事件回调 -------------------------------------
    if (this.beforeUpload) {
        var jsonTemp = {
            fullname: fullname,
            originalName: originalName,
            extname: extname,
            filesize: filesize
        };
        jsonTemp.invokePara = this.invokePara;
        if (!this.beforeUpload(jsonTemp)) {
            this.resetProcess = true;
            this.fileUpload.value = "";
            return;
        }
    }

    // -- 上传 ---------------------------------------------
    var uploadAction = this.action;
    for (var key in this.invokePara) {
        if (key.equals("action") || key.equals("callback") || key.equals("autoUpload")) {
            continue;
        }
        if (typeof (this.invokePara[key]) == "object" || typeof (this.invokePara[key]) == "function") continue;
        uploadAction += "&" + key + "=" + encodeURIComponent(this.invokePara[key]);
    }
    uploadAction += "&originalName=" + encodeURIComponent(originalName);
    uploadAction += "&filename=" + encodeURIComponent(this.filename);
    uploadAction += "&extname=" + encodeURIComponent(extname);

    uploadAction += "&callback=xwf_upload_core_callback&instanceId=" + this.prefix + "instance&ie=" + (g.b.ie ? g.b.ie : "");
    this.frmUpload.action = uploadAction;
    this.frmUpload.target = this.ifrTarget.name;
    this.frmUpload.method = "POST";

    this.frmUpload.submit();
};

// -- 回调处理 ------------------------------------------------------------------
function xwf_upload_core_callback(paraString) {
    var _this = null;
    var instanceId = "";

    var arrPara = null;
    var jsonPara = {};

    // -- 解析参数，恢复现场 ----------------------------------
    arrPara = paraString.split(g.c.CHAR1);
    for (var i = 0; i < arrPara.length; i++) {
        var arrKeyValue = arrPara[i].split(g.c.CHAR2);
        jsonPara[arrKeyValue[0]] = arrKeyValue[1];
    }
    instanceId = jsonPara["instanceId"];

    _this = document.xwf_upload_core[instanceId];
    jsonPara.invokePara = _this.invokePara;
    
    // -- 执行回调 ------------------------------------------
    if (_this.callback) {
        _this.callback(jsonPara);
    }
    // -- 重置现场 ------------------------------------------
    _this.resetProcess = true;
    _this.fileUpload.value = "";
};