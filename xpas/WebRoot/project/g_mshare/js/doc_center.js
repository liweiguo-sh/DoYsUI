var docService = {};
var ActiveSignature = false;
docService.init = function () {
    if (!ActiveSignature) {
        docService.signTool = null;
        return;
    }
    if (!docService.signTool) {
        docService.initSignTool();
    }
}

docService.createUploadArea = function (_para) {
    docService.init();
    var paraDefault = {
        docId: 0,
        docIdModel: 0,
        certCategoryId: 0,
        docName: "文件上传",
        notes: "",
        extLimit: "*.*",
        maxSize: 2048,
        fileCount: 1,
        pWidth: 200,
        pHeight: 150,
        gapWidth: 20,
        expiredDate: "",
        files: [],
        signer: "",
        needExpiredDate: false,
        needSignature: true,
        readonly: false,
        imgPath: g.controlPath + "upload/" + top.cssStyle + "/",
        showTitle: true,
        showNotes: true,
        showRemove: true,
        showSign: true,
        showReUpload: true,
        allowView: true,
        allowDownload: true
    };

    var filePara = {};
    if (_para.certCategoryId > 0) {//传入大于0的数值，就到数据库里读出来
        if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=getFilePara", { certCategoryId: _para.certCategoryId })) {
            if (g.a.OK) {
                var dtbFilePara = g.a.cReturn.dtbFilePara;
                if (dtbFilePara.rowCount > 0) {
                    var dr = dtbFilePara.rows[0];
                    filePara.docName = dr["cert_category_name"].value;
                    filePara.extLimit = dr["ext_limit"].value;
                    filePara.maxSize = dr["file_max_size"].value;
                    filePara.fileCount = dr["file_max_count"].value;
                    filePara.needExpiredDate = dr["has_exp_date"].value;
                    filePara.needSignature = dr["need_sign"].value;
                    filePara.docIdModel = dr["doc_id_model"].value;
                }
            }
        }
    }
    var mergePara = g.x.extendJSON(paraDefault, filePara); //读取资质配置信息覆盖缺省值

    var docPara = {};
    if (_para.docId > 0) {
        if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=getDocById", { docId: _para.docId })) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                if (cReturn.dtbDoc.rowCount > 0) {
                    var dr = cReturn.dtbDoc.rows[0];
                    docPara.certCategoryId = dr["cert_id"].value;
                    docPara.expiredDate = dr["exp_date"].value;
                    docPara.signer = dr["signer"].value;
                    docPara.docName = dr["doc_name"].value;
                    docPara.vpath = dr["vpath"].value;
                    docPara.file_count = dr["file_count"].value;
                }
                var files = new Array();
                for (var i = 0; i < cReturn.dtbDocList.rowCount; i++) {
                    var file = {};
                    file.fileName = cReturn.dtbDocList.rows[i]["file_name"].value;
                    file.localUrl = "";
                    file.signature = cReturn.dtbDocList.rows[i]["signature"].value;
                    file.fileUrl = docPara.vpath + file.fileName;
                    files.push(file);
                }
                docPara.files = files;
            }
        }
    }
    mergePara = g.x.extendJSON(mergePara, docPara); //读取的文档信息生效
    mergePara = g.x.extendJSON(mergePara, _para);   //直接传入的参数优先级最高

    //分解并创建控件
    var showOptions = {
        showTitle: mergePara.showTitle,
        showNotes: mergePara.showNotes,
        showSign: mergePara.showSign,
        showRemove: mergePara.showRemove,
        showReUpload: mergePara.showReUpload,
        allowView: mergePara.allowView,
        allowDownload: mergePara.allowDownload
    };
    var ctlPara = {
        action: g.httpServer + g.appPath + "filter.do?processType=g_mshare.file_center.UploadFile",
        certCategoryId: mergePara.certCategoryId,
        docIdModel: mergePara.docIdModel,
        fileCount: mergePara.fileCount,
        extLimit: mergePara.extLimit,
        pWidth: mergePara.pWidth,
        pHeight: mergePara.pHeight,
        gapWidth: mergePara.gapWidth,
        signTool: docService.signTool,
        readonly: mergePara.readonly,
        maxSize: mergePara.maxSize,
        needExpiredDate: mergePara.needExpiredDate,
        needSignature: mergePara.needSignature
    };
    var ctlProp = {
        divContainer: mergePara.divContainer,
        imgPath: g.controlPath + "upload/" + top.cssStyle,
        docId: mergePara.docId,
        docName: mergePara.docName,
        notes: mergePara.notes,
        signer: mergePara.signer,
        expiredDate: mergePara.expiredDate,
        files: mergePara.files,
        changeUpload: docService.changeUpload,
        afterDocSave: mergePara.afterDocSave,
        showFileSignature: docService.showFileSignature,
        imgPath: mergePara.imgPath,
        showOptions: showOptions
    };

    return new window.xwf_upload(ctlProp, ctlPara);
}
docService.createUploadExampleArea = function (_para) {
    docService.init();
    var paraDefault = {
        docId: 0,
        certCategoryId: 0,
        notes: "(样例)",
        fileCount: 1,
        pWidth: 200,
        pHeight: 150,
        gapWidth: 20,
        expiredDate: "",
        files: [],
        signer: "",
        needExpiredDate: false,
        needSignature: false,
        readonly: true,
        imgPath: g.controlPath + "upload/" + top.cssStyle + "/",
        showTitle: false,
        showNotes: true,
        showRemove: false,
        showSign: false,
        showReUpload: false,
        allowView: false,
        allowDownload: true
    };

    var docPara = {};
    if (_para.docId > 0) {
        if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=getDocById", { docId: _para.docId })) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                if (cReturn.dtbDoc.rowCount > 0) {
                    var dr = cReturn.dtbDoc.rows[0];
                    docPara.certCategoryId = dr["cert_id"].value;
                    docPara.expiredDate = dr["exp_date"].value;
                    docPara.signer = dr["signer"].value;
                    docPara.docName = dr["doc_name"].value;
                    docPara.vpath = dr["vpath"].value;
                    docPara.file_count = dr["file_count"].value;
                }
                var files = new Array();
                for (var i = 0; i < cReturn.dtbDocList.rowCount; i++) {
                    var file = {};
                    file.fileName = cReturn.dtbDocList.rows[i]["file_name"].value;
                    file.localUrl = "";
                    file.signature = cReturn.dtbDocList.rows[i]["signature"].value;
                    file.fileUrl = docPara.vpath + file.fileName;
                    files.push(file);
                }
                docPara.files = files;
            }
        }
    }
    var mergePara = {};
    mergePara = g.x.extendJSON(paraDefault, docPara); //读取的文档信息生效
    mergePara = g.x.extendJSON(mergePara, _para);   //直接传入的参数优先级最高

    //分解并创建控件
    var showOptions = {
        showTitle: mergePara.showTitle,
        showNotes: mergePara.showNotes,
        showSign: mergePara.showSign,
        showRemove: mergePara.showRemove,
        showReUpload: mergePara.showReUpload,
        allowView: mergePara.allowView,
        allowDownload: mergePara.allowDownload
    };
    var ctlPara = {
        action: "",
        certCategoryId: mergePara.certCategoryId,
        fileCount: mergePara.fileCount,
        extLimit: mergePara.extLimit,
        pWidth: mergePara.pWidth,
        pHeight: mergePara.pHeight,
        gapWidth: mergePara.gapWidth,
        signTool: null,
        readonly: mergePara.readonly,
        needExpiredDate: mergePara.needExpiredDate,
        needSignature: mergePara.needSignature
    };
    var ctlProp = {
        divContainer: mergePara.divContainer,
        docId: mergePara.docId,
        docName: "",
        notes: mergePara.notes,
        signer: "",
        expiredDate: "",
        files: mergePara.files,
        changeUpload: null,
        afterDocSave: null,
        showFileSignature: false,
        imgPath: mergePara.imgPath,
        showOptions: showOptions
    };

    return new window.xwf_upload(ctlProp, ctlPara);
}
docService.changeUpload = function (ctl) {
    var para = {
        docId: ctl.docId,
        certCategoryId: ctl.para.certCategoryId,
        docName: ctl.docName,
        expiredDate: ctl.expiredDate,
        signer: ctl.signer,
        filesString: docService.getFilesString(ctl.files)
    }
    docService.saveDoc(para, ctl);
}

// Create ActiveX object according to the platform
docService.initSignTool = function () {
    try {
        var eDiv = document.createElement("div");
        if (navigator.appName.indexOf("Internet") >= 0 || navigator.appVersion.indexOf("Trident") >= 0) {
            if (window.navigator.cpuClass == "x86") {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Ultimate.x86.cab\" classid=\"clsid:4C588282-7792-4E16-93CB-9744402E4E98\" ></object>";
            }
            else {
                eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.Ultimate.x64.cab\" classid=\"clsid:B2F2D4D4-D808-43B3-B355-B671C0DE15D4\" ></object>";
            }
        }
        else {
            eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.Ultimate.x86\" style=\"height: 0px; width: 0px\">";
        }
        document.body.appendChild(eDiv);
    }
    catch (e) {
        alert(e);
        return false;
    }
    docService.signTool = document.getElementById("CryptoAgent");
    return true;
}

//====
docService.saveDoc = function (savePara, ctl) {
    //savePara = {docId,docName,certId,expiredDate,signer, files};
    if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=saveDoc", savePara)) {
        if (g.a.OK) {
            var docId = g.a.cReturn.docId;
            ctl.docId = docId;
            if (ctl.afterDocSave) {
                ctl.afterDocSave(ctl);
            }
        }
    }
}

docService.getDoc = function (docId) {
    var rtn = {};
    if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=getDocById", { docId: docId })) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dr = cReturn.dtbDoc.rows[0];
            rtn.expiredDate = dr["exp_date"].value;
            rtn.docName = dr["doc_name"].value;
            rtn.vpath = dr["vpath"].value;
            rtn.file_count =dr["file_count"].value;
            var files = new Array();
            for (var i = 0; i < cReturn.dtbDocList.rowCount; i++) {
                var file = {};
                file.fileName = cReturn.dtbDocList.rows[i]["file_name"].value;
                file.localUrl = "";
                file.signature = cReturn.dtbDocList.rows[i]["signature"].value;
                file.fileUrl = rtn.vpath + file.fileName;
                files.push(file);
            }
            rtn.files = files;
        }
    }
    return rtn;
}
docService.showFileSignature = function (ctl, index) {
    var fileSignature = ctl.files[index].signature;
    if (fileSignature.equals("loading")) {
        if (g.a.send("processType=g_mshare.file_center.UploadFileAjax&actionType=getFileSignature", { docId: ctl.docId, fileName: ctl.files[index].fileName })) {
            if (g.a.OK) {
                var cReturn = g.a.cReturn;
                fileSignature = cReturn.signature;
            }
        }
    }
    var jsonSignature = {
        signer: ctl.signer,
        signature:fileSignature,
        ctl:ctl
    };
    docService.openSignatureWindow(jsonSignature)
    return fileSignature;
}
docService.openSignatureWindow = function (para) {
    var signatureInfo = {
        signer: "",
        certifiedOrg: "",
        signature: ""
    };
    if (!para.signer.equals("") && !para.signature.equals("")) {
        signatureInfo.certifiedOrg = "中国金融认证中心（CFCA)";
    } 
    signatureInfo.signer = para.signer;
    signatureInfo.signature = para.signature;
    var para = {
        signatureInfo: signatureInfo
    };
    var prop = {
        text: "签名信息",
        parent: win,
        modal:true,
        url: g.appPath + "project/g_mshare/html/file_center/view_signature.html"
    };
    topWin.openWindow(prop, para);

};
docService.createSignatureWindow = function () {
    var html = new Array();
    html.push('<!--签名查询-->');
    html.push('<div class="modal fade" id="_viewSignature" tabindex="-1" role="dialog" aria-hidden="true">');
    html.push('	<div class="modal-dialog" style="width:60%;">');
    html.push('		<div class="modal-content">');
    html.push('			<div class="modal-body">');
    html.push('				<div class="container">');
    html.push('					<div class="row"><!--第1行-->');
    html.push('						<div class="col-xs-9">');
    html.push('							<div class="row"><!--第1.1行-->');
    html.push('								<div class="col-xs-3" style="text-align:right;">签名企业：</div>');
    html.push('								<div class="col-xs-9" id="_viewSignatureCompany"></div>');
    html.push('							</div>');
    html.push('							<div class="row"><!--第1.2行-->');
    html.push('								<div class="col-xs-3" style="text-align:right;">发证机关：</div>');
    html.push('								<div class="col-xs-9" id="_viewSignatureCertifiedOrg"></div>');
    html.push('							</div>');
    html.push('							<div class="row"><!--第1.3行-->');
    html.push('								<div class="col-xs-3" style="text-align:right;">签名内容：</div>');
    html.push('								<div class="col-xs-9"><a onclick="gId(\'_viewSignatureRow\').style.display=\'\';">显示详情</a></div>');
    html.push('							</div>');
    html.push('						</div>');
    html.push('						<div class="col-xs-3">');
    html.push('							<img src="" id="_viewSignatureImage" style="width:100%;height:auto;"/>');
    html.push('						</div>');
    html.push('					</div>');
    html.push('					<div class="row" id="_viewSignatureRow" style="display:none;"><!--第2行-->');
    html.push('						<p id="_viewSignatureContent" style="white-space:normal;word-break:break-all;width:100%;"></p>');
    html.push('					</div>');
    html.push('				</div>');
    html.push('			</div>');
    html.push('			<div class="modal-footer">');
    html.push('				<button type="button" class="btn btn-default" onclick="$(\'#_viewSignature\').modal(\'hide\')">关闭</button>');
    html.push('			</div>');
    html.push('		</div><!-- /.modal-content -->');
    html.push('	</div><!-- /.modal-dialog -->');
    html.push('</div>');
    var div = document.createElement("DIV");
    div.innerHTML = html.join("");
    document.body.appendChild(div);
};
docService.getFilesString = function(files) {
    var filesArr = new Array();
    for (var i = 0; i < files.length; i++) {
        if (!files[i].fileName.equals("")) {
            filesArr.push(files[i].fileName + g.c.CHAR2 + files[i].signature);
        }
    }
    return filesArr.join(g.c.CHAR1);
}
