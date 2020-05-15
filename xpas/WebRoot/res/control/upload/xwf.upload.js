/*
 * xwf.tab JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2013-02-25
 * Modify Date: 2013-02-25
 * Copyright 2013, http://www.xznext.com/
 * Description: 上传控件 
 */
var css_xwf_upload = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_upload = function(prop, _para) {
    ///<summary>上传控件</summary>
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // 上传附件成功之后，新增一个添加附件的选择区域
    prop.files.forEach(function(value, index) {
        if (value.fileName != '') {
            _para.fileCount += 1;
        }
    });
    this.para = _para;
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.doc = this.doc;
    this.init();
};
window.xwf_upload.prototype = {
    prefix: "xwf_upload_", // -- 控件统一前缀名称，用于控件id --
    cssPrefix: "xwf_upload_", // -- 控件css前缀命名 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document,
    divContainer: null, // -- 上传控件容器 --
    signTool: null, // -- 签名控件 --
    files: new Array(), // -- 所有上传文件项数组 --
    validCount: 0, // -- 有效文件数 --
    images: new Array(), // -- 图片框集合 --
    para: {}, // -- 上传限定参数 --
    docId: 0, // -- 文档ID --
    docName: "", // -- 文档名称 --
    notes: "", // -- 上传说明 --
    expiredDate: "", // -- 有效期 --
    signer: "", // -- 签名者 --
    imgPath: "", // -- 图片路径 --
    beforeUpload: null, // -- 上传前的回调函数（返回FALSE，取消上传动作) --
    changeUpload: null, // -- 上传变更后回调函数 --

    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，上传控件类。";
        return strSummary;
    }
};
// -- 初始化类 ----------------------------------------------------------------
window.xwf_upload.prototype.init = function() {
    var paraDefault = {
        fileCount: 1,
        extLimit: "*.*", // ".jpg,.jpeg,.png,.pdf"
        maxSize: 2048, // KB
        pWidth: 200, // 预览框的宽度
        pHeight: 150, // 预览框的高度
        gapWidth: 20, // 空隙宽度
        needExpiredDate: false, // 需要有效期
        needSignature: false // 需要签名
    };
    this.para = g.x.extendJSON(paraDefault, this.para);
    var showOptionsDefault = {
        showTitle: true,
        showNotes: true,
        showRemove: true,
        showReUpload: true,
        showSign: true,
        allowView: true,
        allowDownload: true
    };
    this.showOptions = g.x.extendJSON(showOptionsDefault, this.showOptions);
    this.cWidth = this.divContainer.clientWidth;
    // ==非只读模式下，文件列表补到最大文件数量==
    if (!this.para.readonly) {
        for (var i = this.files.length; i < this.para.fileCount; i++) {
            this.files.push({ fileUrl: "", localPath: "", signature: "", fileName: "" });
        }
    }

    this.refreshUpload();
};
// -- 创建界面 ----------------------------------------------------------------
window.xwf_upload.prototype.refreshUpload = function() {
    var _this = this;
    var html = new Array();
    var cols = this.para.readonly ? this.files.length : this.para.fileCount;
    var srcUrl = "";
    // ==清空==
    this.divContainer.innerHTML = "";
    this.images = [];
    // ==标题==
    if (this.showOptions.showTitle) {
        var divTitle = document.createElement("DIV");
        divTitle.innerHTML = "<i class='fa fa-file-image-o'></i>&nbsp;&nbsp;" + this.docName;
        divTitle.className = this.cssPrefix + "title";
        this.divContainer.appendChild(divTitle);
    }
    //==添加上传说明==
    if (this.showOptions.showNotes) {
        var pNotes = document.createElement("p");
        pNotes.className = this.cssPrefix + "notes";
        if (this.notes.equals("")) {
            this.notes = "说明：文件类型限定为" + this.para.extLimit + ";单个文件大小不能超过" + this.para.maxSize + "KB。";
        }
        pNotes.innerHTML = this.notes;
        this.divContainer.appendChild(pNotes);
    }
    // ==添加预览图==
    var isFirstTD = true; //行内第一个单元格
    var restWidth = this.cWidth;
    var table = document.createElement("TABLE");
    this.divContainer.appendChild(table);
    var tr = document.createElement("TR");
    table.appendChild(tr);
    for (var i = 0; i < cols; i++) {
        var fileName = this.files[i].fileName;
        if (isFirstTD) {
            isFirstTD = false;
            restWidth = restWidth - this.para.pWidth - 3;
        } else {
            var gapTD = document.createElement("TD");
            tr.appendChild(gapTD);
            gapTD.style.width = this.para.gapWidth + "px";
            restWidth = restWidth - this.para.pWidth - this.para.gapWidth - 3;
        }
        var td = document.createElement("TD");
        td.className = this.cssPrefix + "td_image";
        tr.appendChild(td);
        var divImageFrame = document.createElement("DIV");
        // 附件不为空时，增加实体边框，否则为虚线边框
        if (this.files[i].fileName != '') {
            divImageFrame.className = this.cssPrefix + "div_image_frame active";
        } else {
            divImageFrame.className = this.cssPrefix + "div_image_frame";
        }
        td.appendChild(divImageFrame);
        var divImage = document.createElement("DIV");
        divImageFrame.appendChild(divImage);
        divImage.className = this.cssPrefix + "div_image";
        divImage.style.width = this.para.pWidth + "px";
        divImage.style.height = this.para.pHeight + "px";
        divImage.style.lineHeight = this.para.pHeight + "px";
        divImage.setAttribute('data-index', i);
        this.images.push(divImage);

        var domAdd = null;
        if (this.files[i].fileUrl.length > 0) {
            if (this.isImage(fileName)) {
                divImage.style.backgroundImage = "url(" + this.files[i].fileUrl + ")";
                if (this.showOptions.allowView) {
                    divImage.onclick = function() {
                        var carouselList = [];
                        var carouselHtml = '<div id="myNiceCarousel" class="carousel slide" data-ride="carousel" data-interval="false">' +
                            '<ol class="carousel-indicators">';
                        var index = this.getAttribute('data-index');
                        var fileName = _this.files[index].fileName;
                        var liHtml = '',
                            itemHtml = '';
                        for (var k = 0; k < _this.files.length; k++) {
                            if (_this.isImage(_this.files[k].fileName) && _this.files[k].fileName != '') {
                                carouselList.push(_this.files[k]);
                            }
                        }
                        for (var x = 0; x < carouselList.length; x++) {
                            if (fileName === carouselList[x].fileName) {
                                liHtml = liHtml + '<li data-target="#myNiceCarousel" data-slide-to="' + x + '" class="active" onclick="resetCarousel();"></li>';
                                itemHtml = itemHtml + '<div class="item active"><img alt="slide" src="' + carouselList[x].fileUrl + '"></div>';
                            } else {
                                liHtml = liHtml + '<li data-target="#myNiceCarousel" data-slide-to="' + x + '" onclick="resetCarousel();"></li>';
                                itemHtml = itemHtml + '<div class="item"><img alt="slide" src="' + carouselList[x].fileUrl + '"></div>';
                            }

                        }
                        carouselHtml += liHtml;
                        carouselHtml += '</ol>';
                        carouselHtml += '<div class="carousel-inner">';
                        carouselHtml += itemHtml;
                        carouselHtml += '</div>';
                        carouselHtml += '<a class="left carousel-control" href="#myNiceCarousel" data-slide="prev" onclick="resetCarousel();"><span class="icon icon-chevron-left"></span></a>';
                        carouselHtml += '<a class="right carousel-control" href="#myNiceCarousel" data-slide="next" onclick="resetCarousel();"><span class="icon icon-chevron-right"></span></a>';
                        carouselHtml += '<div class="carousel-menu-box">';
                        carouselHtml += '<i class="icon icon-long-arrow-left" title="右移" onclick="removeRightCarousel();"></i>';
                        carouselHtml += '<i class="icon icon-long-arrow-up" title="下移" onclick="removeDownCarousel();"></i>';
                        carouselHtml += '<i class="icon icon-long-arrow-right" title="左移" onclick="removeLeftCarousel();"></i>';
                        carouselHtml += '<i class="icon icon-long-arrow-down" title="上移" onclick="removeUpCarousel();"></i>';
                        carouselHtml += '<i class="icon icon-repeat" title="旋转" onclick="rotateCarousel();"></i>';
                        carouselHtml += '<i class="icon icon-times" title="关闭预览" onclick="closeCarousel();"></i>';
                        carouselHtml += '</div>';
                        carouselHtml += '</div>';
                        topWin.doc.body.children[2].innerHTML = carouselHtml;
                        topWin.doc.body.children[2].style.display = 'block';
                    };
                    // divImage.onclick = this._fullView(this, i);
                }
            } else {
                divImage.style.backgroundImage = "url(" + this.imgPath + "empty-file.png)";
                divImage.innerHTML = this.getExtByFilename(fileName);
                if (this.isPdf(fileName)) {
                    if (this.showOptions.allowView) {
                        divImage.onclick = this._fullView(this, i);
                    }
                } else {
                    if (this.showOptions.allowDownload) {
                        divImage.onclick = this._download(this, i);
                    }
                }
            }
        } else {
            divImage.style.backgroundImage = "url(" + this.imgPath + "add-image.png)";
            divImage.style.backgroundSize = "20%";
            domAdd = divImage;
        }

        var divControl = document.createElement("DIV");
        td.appendChild(divControl);
        divControl.style.height = "30px";
        if (this.files[i].fileUrl.length > 0) {
            var btn = document.createElement("a");
            btn.className = this.cssPrefix + "btn_link";
            if (!this.para.readonly && this.showOptions.showReUpload) {
                btn.innerHTML = "<i class='fa fa-repeat'></i> 重传";
                domAdd = btn;
                divControl.appendChild(btn);
            }

            if (!this.para.readonly && this.showOptions.showRemove) {
                btn = document.createElement("a");
                btn.className = this.cssPrefix + "btn_link " + this.cssPrefix + "ctl_gap";
                btn.innerHTML = "<i class='fa fa-trash-o'></i> 移除";
                btn.onclick = this._removeFile(this, i);
                divControl.appendChild(btn);
            }
            if (this.showOptions.showSign && !this.files[i].signature.equals("")) {
                btn = document.createElement("a");
                btn.className = this.cssPrefix + "btn_link " + this.cssPrefix + "float_right";
                btn.innerHTML = "<i class='fa fa-certificate'></i> 查看签名";
                btn.onclick = this._viewSignature(this, i);
                divControl.appendChild(btn);
            }
        }

        if (!this.para.readonly && domAdd != null) {
            var coreProp = {
                divContainer: divImageFrame,
                domAdd: domAdd,
                action: this.para.action,
                autoUpload: true,
                maxSizeK: this.para.maxSize,

                onSelect: null,
                beforeUpload: this._beforeUpload,
                callback: this._upload_callback,
                stateCode: i,
                ctl: this
            };
            new window.xwf_upload_core(coreProp);
        }

        if (i < cols - 1 && restWidth < this.para.pWidth + this.para.gapWidth + 3) {
            tr = document.createElement("TR");
            table.appendChild(tr);
            restWidth = this.cWidth;
            isFirstTD = true;
        }
    }

    //==添加效期输入==
    if (this.para.needExpiredDate) {
        var divExpired = document.createElement("DIV");
        divExpired.innerHTML = '有效期至：<input type="text" style="height:30px;width:150px;" id="' + this.prefix + '_expDate" class="Wdate" onclick="WdatePicker()" value="' + this.expiredDate + '" />';
        divExpired.className = this.cssPrefix + "expired";
        this.divContainer.appendChild(divExpired);
        gId(this.prefix + "_expDate").onchange = this._expiredDateChanged(this);
        gId(this.prefix + "_expDate").disabled = this.para.readonly;
    }
    this._setValidCount();
};
window.xwf_upload.prototype._fullView = function(_this, index) {
    return function() {
        var prop = {
            text: "附件浏览",
            url: _this.files[index].fileUrl,
            windowState: "maximized",
            noTitle: true
        };
        var para = {};
        topWin.openWindow(prop, para);

    }
};
window.xwf_upload.prototype._download = function(_this, index) {
    return function() {
        //如果中间IFRAME不存在，则添加
        if (!document.getElementById("_SAVEASIMAGE_TEMP_FRAME")) {
            jQuery('<iframe style="display:none;" id="_SAVEASIMAGE_TEMP_FRAME" name="_SAVEASIMAGE_TEMP_FRAME" onload="_doSaveAsImage();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
        }
        document.all._SAVEASIMAGE_TEMP_FRAME.src = _this.files[index].fileUrl;
    }
};

function _doSaveAsImage() {
    if (document.all._SAVEASIMAGE_TEMP_FRAME.src != "about:blank") {
        document.frames._SAVEASIMAGE_TEMP_FRAME.document.execCommand("SaveAs");
    }
}
window.xwf_upload.prototype._removeFile = function(_this, index) {
    return function() {
        _this.files[index] = { fileUrl: "", localPath: "", signature: "", fileName: "" };
        _this.refreshUpload();
        if (_this.changeUpload) {
            return _this.changeUpload(_this);
        }
    }
};
window.xwf_upload.prototype._viewSignature = function(_this, index) {
    return function() {
        var signature = "";
        if (_this.showFileSignature) {
            signature = _this.showFileSignature(_this, index);
        }
        //alert(signature);
    }
};
window.xwf_upload.prototype._expiredDateChanged = function(_this) {
    return function() {
        _this.expiredDate = this.value;
        if (_this.changeUpload) {
            return _this.changeUpload(_this);
        }
    }
};
window.xwf_upload.prototype._beforeUpload = function(para) {
    var uploadOriPara = para.invokePara.ctl.para;
    var ctl = para.invokePara.ctl;
    // ==判断文件扩展名是否符合要求==
    if (!uploadOriPara.extLimit.equals("*.*") && uploadOriPara.extLimit.toLowerCase().indexOf("." + para.extname.toLowerCase()) < 0) {
        showErr("选择的文件类型不符合要求，请重新选择！");
        return false;
    }

    if (uploadOriPara.needSignature && uploadOriPara.signTool) {
        var bSelectCertResult = false;
        try {
            //如果已经选择过证书了，同一个文档不再选择
            if (ctl.certSeleted) {
                bSelectCertResult = true;
            } else {
                bSelectCertResult = uploadOriPara.signTool.SelectCertificate("", "", "");
                var ar = uploadOriPara.signTool.GetSignCertInfo("SubjectCN").split("@");
                var _signer = ar[0];
                if (ar.length > 1) {
                    _signer = ar[1];
                }
                if (ctl.signer.length > 0 && !ctl.signer.equals(_signer)) {
                    showErr("文档签名已经存在，不能设置新的签名企业！");
                    return false;
                }
                ctl.signer = _signer;
            }
        } catch (e) {
            bSelectCertResult = false;
        }
        if (!bSelectCertResult) {
            showErr("获取签名证书失败！");
            return false;
        } else {
            ctl.certSeleted = true;
        }
        var signature = "";
        try {
            signature = uploadOriPara.signTool.SignFilePKCS7Detached(para.fullname, "SHA-1");
        } catch (e) {

        }
        if (signature.length > 0) {
            ctl.files[para.invokePara.stateCode].signature = signature;
        } else {
            showErr("生成签名失败！");
            return false;
        }
    }
    if (ctl.beforeUpload) {
        return ctl.beforeUpload({ para: para });
    }
    ctl.images[para.invokePara.stateCode].innerHTML = "<i class='fa fa-spinner fa-pulse' style='font-size:2em;color:darkGray;'></i>";
    //gId(ctl.prefix + "divImage_" + para.invokePara.stateCode).innerHTML = "<div class='" + ctl.cssPrefix + "blank_image' style='width:" + ctl.para.pWidth + "px;height:" + ctl.para.pHeight + "px;line-height:" + ctl.para.pHeight + "px'><i class='fa fa-spinner fa-pulse' style='font-size:2em;'></i>";
    return true;
};
window.xwf_upload.prototype._upload_callback = function(para) {
    para.invokePara.ctl.files[para.invokePara.stateCode].fileUrl = para.fileUrl;
    para.invokePara.ctl.files[para.invokePara.stateCode].fileName = para.fileName;
    para.invokePara.ctl.refreshUpload();
    if (para.invokePara.ctl.changeUpload) {
        return para.invokePara.ctl.changeUpload(para.invokePara.ctl);
    }
};
window.xwf_upload.prototype.getExtByFilename = function(fileName) {
    var arr = fileName.split(".");
    if (arr.length > 1) {
        return arr[arr.length - 1];
    } else {
        return "";
    }
}
window.xwf_upload.prototype.isImage = function(fileName) {
    var imageExts = "jpg|jpeg|gif|png";
    var fileExt = this.getExtByFilename(fileName).toLowerCase();
    return imageExts.indexOf(fileExt) > -1;
}
window.xwf_upload.prototype.isPdf = function(fileName) {
    var pdfExts = "pdf";
    var fileExt = this.getExtByFilename(fileName);
    return pdfExts.indexOf(fileExt, 0) > -1;
}
window.xwf_upload.prototype._setValidCount = function() {
    var fc = 0;
    for (var i = 0; i < this.files.length; i++) {
        if (this.files[i].fileUrl.length > 0) {
            fc++;
        }
    }
    this.validCount = fc;
}