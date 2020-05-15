/*
* xwf.ajax JavaScript Library v1.0
* Author: Volant Lee
* Create Date: 2012-06-27
* Copyright 2012-2018, xpas-next.com
* Description: AJAX
* Modify Date: 2018-04-12
* Support JSON
*/
window.xwf_ajax = function () {
};
window.xwf_ajax.prototype = {
    appMode: false,                 // -- false：默认值，浏览器模式；true：APP(外壳)模式 --
    xmlHttp: this.xmlHttp,
    contentType: "application/x-www-form-urlencoded",
    url: "",
    postData: "",
    responseText: this.responseText,
    cReturn: this.cReturn,
    OK: false,
    ErrMessage: ""
};
// -- 同步请求 ----------------------------------------------------------------
window.xwf_ajax.prototype.send = function (url, dataPOST, autoShowErr) {
    return this.httpSend(url, dataPOST, "application/x-www-form-urlencoded", autoShowErr);
};
window.xwf_ajax.prototype.sendJson = function (url, dataPOST, autoShowErr) {
    return this.httpSend(url, dataPOST, "application/json", autoShowErr);
};
window.xwf_ajax.prototype.httpSend = function (url, dataPOST, contentType, autoShowErr) {
    ///<summary>ajax同步get/post方式</summary>
    ///<param name="url">web service url</param>
    ///<param name="dataPOST">post方式, 支持json格式</param>
    ///<param name="contentType">提交格式</param>

    // -- 1、提交Ajax请求 ---------------------------------
    try {
        this.contentType = contentType;

        this.checkAjaxAppMode();
        this.parseUrl(url);
        this.parseData(dataPOST);
        if (this.appMode) {
            this.responseText = App.ajaxSend(this.url, this.postData);
        }
        else {
            var d1 = new Date();
            this.xmlHttp = this.getXMLHttpRequest();
            if (this.postData) {
                this.xmlHttp.open("POST", this.url, false);
                this.xmlHttp.setRequestHeader("Content-Type", this.contentType);
                this.xmlHttp.send(this.postData);
            }
            else {
                this.xmlHttp.open("GET", this.url, false);
                this.xmlHttp.setRequestHeader("Content-Type", this.contentType);
                this.xmlHttp.send();
            }
            this.writeLog(d1);
        }
    }
    catch (e) {
        showErr("ajax.send 遇到未知错误:\n" + e.toString());
        return false;
    }

    // -- 2、检查是否正常返回 -----------------------------
    if (this.appMode) {
    }
    else {
        if (this.xmlHttp.status != 200) {
            if (this.xmlHttp.status == 400) {
                showErr("ajax返回 400 错误，可能是请求 url 中含有中文， 请检查。\n\n" + this.url);
            }
            else {
                showErr(this.xmlHttp.statusText + "  -  " + this.xmlHttp.status + "\n\n" + this.xmlHttp.responseText);
            }
            return false;
        }
        this.responseText = this.xmlHttp.responseText;
    }

    // -- 3、取得返回结果并预处理 -------------------------
    this.cReturn = this.parseResponseText(this.responseText);
    this.OK = this.cReturn.OK;
    if (!this.OK) {
        if (this.cReturn.notLogin) {
            if (top.topWin) {
                top.window.document.location = topWin.loginUrl + "?urlMain=" + top.window.document.location;
                return false;
            }
            else {
                alert("登录失败或超时，请重新登录系统。");
            }
        }
        else {
            this.ErrMessage = this.cReturn.ErrMessage;
            if (autoShowErr) {
                showErr(this.ErrMessage);
            }
        }
    }
    return true;
}

// -- 异步请求 ----------------------------------------------------------------
window.xwf_ajax.prototype.sendAsync = function (url, dataPOST, callback, autoShowErr) {
    ///<summary>ajax异步get/post方式</summary>
    ///<param name="url">webservice or servlet url, 支持json格式</param>
    ///<param name="dataPOST">post method, 支持json格式</param>

    try {
        this.contentType = "application/x-www-form-urlencoded";

        this.xmlHttp = this.getXMLHttpRequest();
        this.parseUrl(url);
        this.parseData(dataPOST);
        if (this.postData) {
            this.xmlHttp.open("POST", this.url, true);
            this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.xmlHttp.onreadystatechange = this.asyncCallback(this.xmlHttp, callback, autoShowErr);
            this.xmlHttp.send(this.postData);
        }
        else {
            this.xmlHttp.open("GET", this.url, true);
            this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            this.xmlHttp.onreadystatechange = this.asyncCallback(this.xmlHttp, callback, autoShowErr);
            this.onreadystatechange = this.asyncCallback;
            this.xmlHttp.send();
        }
    }
    catch (e) {
        showErr("ajax.send 遇到未知错误:\n" + e.toString());
        return false;
    }
    return true;
};
window.xwf_ajax.prototype.asyncCallback = function (xmlHttp, callback, autoShowErr) {
    return function () {
        if (xmlHttp.readyState == 4) {
            var cReturn = window.xwf_ajax.prototype.parseResponseText(xmlHttp.responseText, autoShowErr);
            if (cReturn.OK == false && autoShowErr == true) {
                showErr(cReturn.ErrMessage);
            }
            if (callback) {
                callback(cReturn);
            }
        }
    }
};

// -- 请求参数预处理 -------------------------------------------------------------
window.xwf_ajax.prototype.checkAjaxAppMode = function () {
    ///<summary>判断ajax是否通过App外壳与服务端通讯</summary> 
    if (window.topWin) window.offline = window.topWin.offline;
    if (window.offline) {
        // -- 页面或顶级页面明确指定脱机模式(脱机模式必需引用xmf.app.js) --
        if (!window.App) {
            throw ("脱机模式页面必需引用xmf.app.js，请检查。");
        }
        if (App.os.equals("")) {
            App.os = topWin.os;
        }
        if (App.os.equals("")) {
            throw ("App内部通讯无响应，请稍后再试。");
        }
        if (!App.os.equals("windows")) {
            this.appMode = true;
        }
        else {
            // -- 非App(windows + ie调试模式)环境模式 --
        }
    }
    else {
        // -- 非脱机模式(即使app模式，也是app外壳，内嵌浏览器联机模式) --
    }
};
window.xwf_ajax.prototype.getXMLHttpRequest = function () {
    var xmlHttp1;
    if (g.b.ie) {
        xmlHttp1 = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp1 = new XMLHttpRequest();
        xmlHttp1.overrideMimeType('text/xml');
    }
    return xmlHttp1;
};

window.xwf_ajax.prototype.parseUrl = function (url) {
    this.cReturn = {};
    this.OK = false;
    this.ErrMessage = "";

    url = url.trim();
    if (url.indexOf("http://") < 0) {     // -- 相对路径 --
        url = g.filterUrl + "?" + url;
    }
    url += "&debug=" + (g.debug ? "1" : "0") + "&rnd=" + Math.random();
    this.url = url;
};
window.xwf_ajax.prototype.parseData = function (dataPOST) {
    if (!dataPOST) {
        this.postData = null;
    }
    else if ((typeof (dataPOST)).equals("string")) {
        this.postData = dataPOST;
    }
    else {
        if (this.contentType.equals("application/json")) {
            this.postData = JSON.stringify(dataPOST);
        }
        else {
            try {
                var arrData = new Array();
                for (var key in dataPOST) {
                    arrData.push(key + "=" + encodeURIComponent(dataPOST[key]));
                }
                this.postData = arrData.join("&");
            }
            catch (e) {
                showErr("不支持的Data对象, 参数dataPOST格式有误.");
            }
        }
    }
};

// -- 返回结果处理 ------------------------------------------------------------------
window.xwf_ajax.prototype.parseResponseText = function (responseText) {
    if (this.contentType.equals("application/json")) {
        return this.parseResponseText_json(responseText);
    }
    else {
        return this.parseResponseText_urlencoded(responseText);
    }
}
window.xwf_ajax.prototype.parseResponseText_json = function (responseText) {
    var cReturn = {};
    var datatype = "";

    var jo = null;
    // ----------------------------------------------------
    try {
        cReturn = eval("cReturn = " + responseText);

        for (var key in cReturn) {
            jo = cReturn[key];
            if (jo["datatype"].equals("bool")) {
                cReturn[key] = jo["value"].equals("true");
            }
            else if (jo["datatype"].equals("int")) {
                cReturn[key] = parseInt(jo["value"]);
            }
            else if (jo["datatype"].equals("datatable")) {
                var dtb = new xwf_datatable();
                var arr = jo["value"].split(g.c.CHAR7);
                dtb.readFromData(arr[0], arr[1]);
                cReturn[key] = dtb;
            }
            else {
                cReturn[key] = jo["value"];
            }
        }
    }
    catch (e) {
        cReturn.OK = false;
        cReturn.ErrMessage = e.toString() + "\n" + responseText;
    }
    return cReturn;
}
window.xwf_ajax.prototype.parseResponseText_urlencoded = function (responseText) {
    var cReturn = {};
    var arrReturn = responseText.split(g.c.CHAR6);
    var arrError = null;
    // ----------------------------------------------------
    cReturn.OK = (arrReturn[0] == g.c.OK);
    for (var i = 1; i < arrReturn.length; i++) {
        var arrValues = arrReturn[i].split(g.c.CHAR7);
        if (arrValues[0] == "text") {
            cReturn[arrValues[1]] = arrValues[2];
        }
        else if (arrValues[0].equals("int")) {
            cReturn[arrValues[1]] = parseInt(arrValues[2]);
        }
        else if (arrValues[0].equals("bool")) {
            cReturn[arrValues[1]] = arrValues[2].equals("true");
        }
        else if (arrValues[0].equals("datatable")) {
            var dtb = new xwf_datatable();
            d1 = new Date();
            dtb.readFromData(arrValues[2], arrValues[3]);
            var n = g.x.timeInterval(d1, new Date())
            if (n > 1) {
                debug("转换 " + arrValues[1] + "耗时: " + n + "。", true);
            }
            d1 = new Date();

            cReturn[arrValues[1]] = dtb;
        }
        else if (arrValues[0] == "error") {
            if (arrError == null) arrError = new Array();

            arrError.push(arrValues[1]);
            if (g.debug && arrValues[2]) {
                arrError.push(arrValues[2]);
            }
        }
        else {
            showErr("ajax error, unknown return data type: " + arrValues[0]);
        }
    }
    if (arrError != null) {
        cReturn.ErrMessage = arrError.join("\n");
    }
    // ----------------------------------------------------
    return cReturn;
};

// -- 下载js文件、下载web页面 -----------------------------------------------------
window.xwf_ajax.prototype.attachJavaScriptFile = function (jsFileUrl) {
    ///<summary>ajax同步方式下载服务器javaScript文件，并同步动态加载JavaScript文件</summary>
    ///<param name="jsFileUrl">javaScript文件Url</param>
    // -- 1、提交请求，下载js文件 -------------------------
    try {
        this.xmlHttp = this.getXMLHttpRequest();
        this.xmlHttp.open("GET", jsFileUrl, false);
        this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xmlHttp.send();
    }
    catch (e) {
        showErr("ajax.attachJavaScriptFile 遇到未知错误. \n" + e.toString());
        return false;
    }
    // -- 2、检查是否正常返回 -----------------------------    
    if (this.xmlHttp.status != 200) {
        if (this.xmlHttp.status == 404) {
            if (jsFileUrl.indexOf("/js/view.") < 0 && jsFileUrl.indexOf("/js/extra_view.js") < 0 && jsFileUrl.indexOf("/js/chart") < 0) {
                showErr("404, JavaScript资源文件:\n\n" + jsFileUrl + "\n\n不存在, 请检查.");
            }
        }
        else {
            showErr(this.xmlHttp.statusText + "  -  " + this.xmlHttp.status + "\n\n" + this.xmlHttp.responseText);
        }
        return false;
    }
    this.responseText = this.xmlHttp.responseText;
    // -- 3、动态加载javaScript文件 -----------------------
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.text = this.responseText;
    oScript.defer = true;

    oHead.appendChild(oScript);
    // -- 4、End ------------------------------------------
    return true;
};
window.xwf_ajax.prototype.getWebPageContent = function (urlWebPage) {
    ///<summary>ajax同步方式下载Web页面文件，返回文件内容</summary>
    ///<param name="urlWebPage">web页面Url</param>
    // -- 1、提交请求，下载web文件 ------------------------
    try {
        this.xmlHttp = this.getXMLHttpRequest();
        this.xmlHttp.open("GET", urlWebPage, false);
        this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.xmlHttp.send();
    }
    catch (e) {
        showErr("ajax.getWebPageContent 遇到未知错误. \n" + e.toString());
        return "";
    }
    // -- 2、检查是否正常返回 -----------------------------    
    if (this.xmlHttp.status != 200) {
        if (this.xmlHttp.status == 404) {
            showErr("404, web页面文件:\n\n" + urlWebPage + "\n\n不存在, 请检查.");
        }
        else {
            showErr(this.xmlHttp.statusText + "  -  " + this.xmlHttp.status + "\n\n" + this.xmlHttp.responseText);
        }
        return "";
    }
    this.responseText = this.xmlHttp.responseText;
    // -- 3、End ------------------------------------------
    return this.responseText;
};
// -- 调试日志 ------------------------------------------------------------------
window.xwf_ajax.prototype.writeLog = function (d1) {
    if (!window.topWin || !topWin.cStatusBar) return;
    if (!g.debug && !g.local && !topWin.isDeveloper) return;

    var nIdx = 0;
    var totalTime = 0;
    var strTemp = this.url.substring(0, 200);
    var d2 = new Date();
    var log = {
        processType: "",
        actionType: "",
        interval: 0,
        time: d2,
        timeString: d2.toString("mm:ss")
    };
    var arrOut = new Array();
    // ----------------------------------------------------
    log.interval = g.x.timeInterval(d1, d2);

    nIdx = strTemp.indexOf("processType");
    strTemp = strTemp.substring(nIdx + 12);
    nIdx = strTemp.indexOf("&");
    log.processType = strTemp.substring(0, nIdx);

    nIdx = strTemp.indexOf("actionType");
    strTemp = strTemp.substring(nIdx + 11);
    nIdx = strTemp.indexOf("&");
    log.actionType = strTemp.substring(0, nIdx);

    if (!this.arrLog) {
        this.arrLog = new Array();
    }
    this.arrLog.push(log);
    // ----------------------------------------------------
    for (var i = this.arrLog.length - 1; i >= 0; i--) {
        if (g.x.timeInterval(this.arrLog[i].time, d2) > 5) break;

        arrOut.push(this.arrLog[i].actionType + ": " + this.arrLog[i].interval);
        totalTime += this.arrLog[i].interval;
    }
    topWin.cStatusBar.showMessage("耗时：" + totalTime.toFixed(3) + ", &nbsp;&nbsp;" + arrOut.join(";&nbsp;&nbsp;"), false);
};

/**导出CSV文件
 * grid		需要导出的gridview对象
 * 用法：	g.a.exportCsvByGrid(gridView);
 * */
window.xwf_ajax.prototype.exportCsvByGrid = function (grid) {
	if(!grid) alert("viewKey和grid必须存在");
	 var strHeader = "";
     for (var i = 0; i < grid.arrColumns.length; i++) {
         if (grid.arrColumns[i].type.equals("data")) {
             strHeader += (grid.arrColumns[i].text + ",");
         }
     }

     if (g.a.send("processType=com.xznext.xpas.Common&actionType=exportData_CSV", { viewKey: grid.viewKey, sqlUVData: grid.sqlUVData, strHeader: strHeader }, true)) {
         var c = g.a.cReturn;
         if (g.a.OK) {
             var c = g.a.cReturn;
             var urlFileOb =c.urlFileOb;
             topWin.downloadFileByUrl(urlFileOb);
         }
         else {
             return false;
         }
     }
     else {
         return false;
     }
};

/**根据viewKey获取rs
 * @param viewKey
 * @param sqlFilter 过滤条件，以 and开头,没有，请传递null
 * 用法：	getRsByViewKey("rpt_stock_sum_dtl");
 * return datatable
 */
window.xwf_ajax.prototype.getRsByViewKey = function (viewKey,sqlFilter) {
	if(!viewKey) alert("缺少参数viewKey");
     var rs=null;
     if(!sqlFilter) sqlFilter="";
     var jsonPostData = {
		recordBegin: 0,      // -- 记录起始下标 --
	    recordEnd: 9999,          // -- 记录结束下标 --}
        viewKey: viewKey,
        viewFilter: sqlFilter            // -- 程序员筛选条件 --
    }
     if (g.a.send("processType=com.xznext.View&actionType=getView", jsonPostData, true)) {
         var c = g.a.cReturn;
         if (g.a.OK) {
        	 rs=c.dtbViewData;
         }
         else {
             return false;
         }
     }
     return rs;
};

/**导出xls 2003文件
 * grid		需要导出的gridview对象
 * 用法：	exportXls2003ByGrid(gridView);
 * */
window.xwf_ajax.prototype.exportXls2003ByGrid = function (grid,filename,headerNum) {
	if(!grid) alert("viewKey和grid必须存在");
	 var strHeader = "";
	 if(!headerNum) headerNum=9999;
	 var hnum=0;
     for (var i = 0; i < grid.arrColumns.length ; i++) {
         if (grid.arrColumns[i].type.equals("data")) {
        	 if(hnum >= headerNum) break;
             strHeader += (grid.arrColumns[i].text + ",");
             hnum++;
         }
     }

     if (g.a.send("processType=com.xznext.xpas.Common&actionType=exportData_xls2003", { viewKey: grid.viewKey, sqlUVData: grid.sqlUVData, strHeader: strHeader,filename:filename,headerNum:headerNum }, true)) {
         var c = g.a.cReturn;
         if (g.a.OK) {
             var c = g.a.cReturn;
             var urlFileOb =c.urlFileOb;
             topWin.downloadFileByUrl(urlFileOb);
         }
         else {
             return false;
         }
     }
     else {
         return false;
     }
};

/**执行计划任务，会有alert信息
 * taskClassFullName		g_spd.task.model.SynCategoryModel
 * 用法：		g.a.execTask("g_spd.task.model.SynCategoryModel");
 * return ture:执行成功
 * */
window.xwf_ajax.prototype.execTask = function (taskClassFullName) {
	var exeRet=false;
	if(!taskClassFullName){
		 alert("缺少参数【taskClassFullName】");
		 return exeRet;
		 
	};
	if (g.a.send("processType=com.system.schedule.Schedule&actionType=invokeTask", { viewKey: "fv_schedule", _cSchedule_task: taskClassFullName}, true)) {
		var c = g.a.cReturn;
		if (g.a.OK) {
			var c = g.a.cReturn;
			alert(g.a.cReturn.msg?g.a.cReturn.msg:"后台任务调用执行完成，请查看后台日志是否有错误。");
			exeRet=true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
	
	return exeRet;
};



/**加载公告,根据当前用户所属角色筛选
 * boxId	区域容器id
 * boxinfoTitle	 显示公告数量
 * g.a.initNotice("boxId");
 * */
window.xwf_ajax.prototype.initNotice = function (boxId,boxinfoTitle) {
	var exeRet=false,rs;
	if(!boxId){
		 alert("缺少参数【boxId】");
		 return exeRet;
		 
	};
	var groupKeys=topWin.groupKeys.split(","),viewFilter=[];
	if(groupKeys.length>0){
		for(var i=0;i<groupKeys.length;i++){
			viewFilter.push(" role like '%"+groupKeys[i]+"%'");
		}
	}
	
	 var jsonPostData = {
		recordBegin: 0,      // -- 记录起始下标 --
	    recordEnd: 9999,          // -- 记录结束下标 --}
        viewKey: "v_notice",
        viewFilter: '  notice_type!=1 and ('+viewFilter.join(" or ") +')'           // -- 程序员筛选条件 --
    }
     if (g.a.send("processType=com.xznext.View&actionType=getView", jsonPostData, true)) {
         var c = g.a.cReturn;
         if (g.a.OK) {
        	 rs=c.dtbViewData;
         }
         else {
             return false;
         }
     }
	 
	 var box=$("#"+boxId),boxinfoTitle=$("#boxinfoTitle"),row,html=[];
	 var toUp=0,toNext=0;
	 if(boxinfoTitle.length>0) boxinfoTitle.html("公告栏(总计"+rs.rowCount+")")
	 for(var i=0;i<rs.rowCount;i++){
		 row=rs.rows[i];
		 if(!row.title) continue;
		 
		 style="";
		 toUp=i-1;
		 toNext=i+1;
		html.push('  <article class="article article-condensed " style="padding: 0px;display:none;"> ');
		html.push('  	<header style="text-align: center;"> ');
		html.push('  		 <h3 style="    margin: 0px 0px 6px 0px;">'+row.title.value+'</h3> ');
		html.push('  		 <h4 style="    margin: 0px 0px 6px 0px;font-weight: normal;">'+row.date.value.toDate().toString("yyyy-MM-dd")+'</h3> ');
		html.push('  	</header>');
		html.push('  	<section class="content" style="padding: 0px;margin: 0px;height: 166px; overflow: auto;text-indent: 25px;">'+row.text.value);
		html.push('  	</section>');
		html.push('  	 <footer> ');
		html.push('  	 	<ul class="pager pager-justify" style="margin: 3px 0px 0px 0px;">  ');
		if(i!=0){
			html.push('  	 		<li class="previous"><a href="#" onclick="toNotice(\''+boxId+'\',\''+toUp+'\')"><i class="icon-arrow-left"></i> 上一篇</a></li>  ');
		}
		if(i!=rs.rows.length-1){
			html.push('  	 		 <li class="next"><a href="#" onclick="toNotice(\''+boxId+'\',\''+toNext+'\')">下一篇 <i class="icon-arrow-right"></i></a></li>  ');
		}
		html.push('  	 	</ul>  ');
		html.push('  	 </footer> ');
		html.push('  </article>');
	 }
	 
	 if(html.length <1){
		html.push('  <article class="article article-condensed " style="padding: 0px;display:none;"> ');
		html.push('  	<header style="text-align: center;"> ');
		html.push('  		 <h3 style="    margin: 0px 0px 6px 0px;">暂无系统公告</h3> ');
		html.push('  		 <h4 style="    margin: 0px 0px 6px 0px;font-weight: normal;"></h3> ');
		html.push('  	</header>');
		html.push('  	<section class="content" style="padding: 0px;margin: 0px;height: 166px; overflow: auto;text-indent: 25px;">有新的公告，您下次登录就能看到了');
		html.push('  	</section>');
		html.push('  	 <footer> ');
		html.push('  	 	<ul class="pager pager-justify" style="margin: 3px 0px 0px 0px;">  ');
		html.push('  	 	</ul>  ');
		html.push('  	 </footer> ');
		html.push('  </article>');
		 
	 }
	 
	 box.append(html.join(""));
	 $("#"+boxId+" .article:eq(0)").slideDown();
	return exeRet;
};


//切换通知
function toNotice(boxId,articleIndex){
	$("#"+boxId+" .article").hide();
	$("#"+boxId+" .article:eq("+articleIndex+")").fadeIn();
}




/**右下角公告,根据当前用户所属角色筛选
 * 只提醒一次，语音播报（待实现）
 * 	//关闭窗口间隔  60秒钟
	//加载数据间隔  60秒钟
 * g.a.initPopNotice(true);
 * */
window.xwf_ajax.prototype.initPopNotice = function (isInit) {
	var exeRet=false,rs,viewFilter=[];
	var groupKeys=topWin.groupKeys.split(","),viewFilter=[];
	if(groupKeys.length>0){
		for(var i=0;i<groupKeys.length;i++){
			viewFilter.push(" role like '%"+groupKeys[i]+"%'");
		}
	}
	
	//关闭窗口间隔  60秒钟
	var timeOutClose=60;
	//加载数据间隔  62秒钟
	var timeOutLoad=62;
	 
     var dataArr=[];
     var selectAjaxSql = " select top 1 *,CONVERT(varchar(100), cdate, 120) 'cdate2' from T_NOTICE t1  ";
     selectAjaxSql+=" where notice_type=1 and  not exists (select notice_id from T_NOTICE_HISTORY t2 where use_key='"+topWin.userKey+"' and t2.notice_id=t1.id ) ";
     selectAjaxSql+=" and ("+viewFilter.join(" or ")+") ";
     selectAjaxSql+=" order by cdate desc";
     
     g.a.sendAsync("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: selectAjaxSql }, function(para){
    	 if (para.OK) {
             var jsonarrstr = para.jsonarr,dataArr=[];
             if (jsonarrstr) dataArr = eval(jsonarrstr);
        	 for(var i=0;i<dataArr.length;i++){
        		 row=dataArr[i];
        		  var popHtml=[];
        	      var text=row.text;
        	      var textall=text;
        	      var cdate=row.cdate2;
        	      var creator=row.creator;
        	      var role=row.role;
        	      var id=row.id;
        	      var title=row.title;
        	      //if($("[popnoticeid='"+id+"']").length >0) continue;
        	      if(text && text.length>50) text=text.substring(0,50)+"...";
        	      
        	      
        		   popHtml.push(' <div class="panel panelpop" popnoticeid="'+id+'" style="background: none; width: 250px;    border: 0px;margin: 0px;">');
        		   popHtml.push('	 <div class="panel-heading" style="   font-size: 1.2em;    border-bottom: 1px solid #fff;padding: 3px 0px; " >');
        		   popHtml.push('		 <i class="icon icon-bell"></i> ');
        		   popHtml.push('		  <span class="title">'+title+'</span> ');
        		   popHtml.push('	</div>');
        		   popHtml.push('	 <div class="panel-body" style="padding: 13px 22px;  border-bottom: 1px solid #fff;">');
        		   popHtml.push('		'+text);
        		   popHtml.push('	</div>');
        		   popHtml.push('	 <div class="panel-footer text-center" style="text-align: center;    padding: 5px 0px 0px 0px;    font-size: 0.8em;"  >');
        		   popHtml.push('		'+creator+'<br>');
        		   popHtml.push('		'+cdate);
        		   popHtml.push('	</div>');
        		   popHtml.push('</div>');
        		   zuiExt.msg({
        			   type:"success",
        			   msg:popHtml.join(""),
        			   noticeId:id,
        			   time:timeOutClose*1000,
        			   icon:"",
        			    close: true,
        			    placement: 'bottom-right', // 定义显示位置
        			    onAction: function(name, action, messager) {
        			        if(name === 'close') { //点击关闭，则该通知已被该用户阅读过
        			        	//g.a.sendAsync("processType=g_spd.base.ViewNotice&actionType=addNoticeHistory", { viewKey: "wi_by_asn", userKey: topWin.userKey, noticeId: messager.options.noticeId }, function(){}, false)
        			        }
        			    }
        		   });
        		   
        		   $(".messagers-holder").css({"bottom":"22px","right":"-15px"})
        		   $(".messager-actions").css({"position":"absolute","right":"24px"})
        		   $(".messager-actions button").css({"cursor":"pointer"})
        		   $(".messager-actions button").attr("title","点我关闭窗口噢");
        		   
        		   //只提醒一次 
        		   g.a.sendAsync("processType=g_spd.base.ViewNotice&actionType=addNoticeHistory", { viewKey: "wi_by_asn", userKey: topWin.userKey, noticeId: id }, function(param3){
        		   }, false);
        		   
        		   
        		   //语音提示tomcat服务启动，找不到dll，经过各种尝试，尚未解决， 暂时停止
        		   continue;
        		   
        		   //语音提示
        		   var textall2=title;
        		   var reg = /<[^<>]+>/g;//1、全局匹配g肯定忘记写,2、<>标签中不能包含标签实现过滤HTML标签
        		   textall2 = textall2.replace(reg, '');//替换HTML标签
        		   
        		   g.a.sendAsync("processType=com.system.HelpView&actionType=getSoundByText", { viewKey: "wi_by_asn", text:textall2  }, function(param2){
        			   if (para.OK) {
        				   var filePath=g.httpServer+g.appPath+param2.soundpath;
        				   console.log("filePath")
        				   console.log(filePath)
        				   var audiopop=$("#audiopop");
        				   if(audiopop.length <1){
        					   audiopop=$("#audiopop");
        					   $("body").append('<audio id="audiopop"     controls="controls" autostart="false" loop="false" hidden="true" ></audio>');
        				   }
        				   var audiopopOb = document.getElementById('audiopop');
        				   audiopopOb.src=filePath;
        				   try{
        					   audiopopOb.pause();// 暂停
        				   }catch(e){
        					   
        				   }
        				   try{
        					   audiopopOb.play();
        				   }catch(e){
        					   
        				   }
        				   setTimeout(function(){
	    						   try{
	    							   var audiopopOb = document.getElementById('audiopop');
	                				   audiopopOb.src="";
	                				   audiopopOb.pause();// 暂停
	            				   }catch(e){
	            					   
	            				   }
	    						   
	       				    },parseInt(param2.soundlen)*1000+500)
        				    
        			   }
        		   }, false);
        		   
        		  
        		  
        	 }
         }
    	 
    }, false);
     
     if(isInit){
		 setInterval(function(){
			g.a.initPopNotice(false);
	     },timeOutLoad*1000) ;
	 }
     
     
      
};
