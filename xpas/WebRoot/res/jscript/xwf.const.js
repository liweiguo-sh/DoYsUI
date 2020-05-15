/*
 * xwf JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2012-06-27
 * Modify Date: 2019-08-13
 * Copyright 2017, xpas-next.com
 */

// -- 全局常量变量及常量对象集合 ----------------------------------------------
var urlPara = getUrlPara();
var g = {
    httpServer: window.location.protocol + "//" + window.location.host,
    appPath: "/xpas/", // -- WEB应用虚拟目录 --
    systemPath: "", // -- 子系统目录 -- 
    local: false, // -- 本地模式 --
    debug: true, // -- 调试模式 --
    develop: false, // -- 开发者用户组模式 --
    remark: ""
};

initConst();

function initConst() {
    var href = window.location.href;
    var nIdx = href.indexOf("/", g.httpServer.length + 1);
    // ----------------------------------------------------
    if (g.httpServer.indexOf("http") == 0) {
        g.appPath = href.substring(g.httpServer.length, nIdx + 1);
    }
    if (window.location.host.indexOf("localhost") >= 0 || window.location.protocol.indexOf("file:") == 0) {
        g.local = true;
        g.httpServer = "http://localhost:7000"; // -- WEB应用服务器(仅本机通过VS+IIS调试时用) -- 
    }
    // ----------------------------------------------------
    g.filterUrl = (g.local ? g.httpServer : "") + g.appPath + "filter.do";
    g.filterJson = (g.local ? g.httpServer : "") + g.appPath + "wis.do";
    g.controlPath = g.appPath + "res/control/" // -- 框架控件根目录 --
    g.cssPath = g.appPath + "res/css/" // -- 样式根目录 --
    g.pluginPath = g.appPath + "res_plugin/" // -- 插件控件根目录 --
    g.runPath = g.httpServer + g.appPath + "res_run/" // -- 运行时目录(临时目录) --
    g.xpasRunPath = g.runPath + "xpas/" // -- 运行时目录(框架用) --    
        // ----------------------------------------------------
    g.c = { CHAR1: "\1", CHAR2: "\2", CHAR3: "\3", CHAR4: "\4", CHAR5: "\5", CHAR6: "\6", CHAR7: "\7", OK: "OK", ERR: "ERR" };
    g.a = new window.xwf_ajax();
    g.x = new window.xwf();
    g.b = g.x.b;
}

// -- 全局常用特殊函数 --------------------------------------------------------
function gId(elementId) {
    return window.document.getElementById(elementId);
}

function getParentWindow(objDoc) {
    return objDoc.defaultView || objDoc.parentWindow || window;
}

function getOffsetTop(objDOM) {
    var nTop = objDOM.offsetTop;
    var offsetParent = objDOM.offsetParent;
    while (offsetParent) {
        nTop += (offsetParent.offsetTop + offsetParent.clientTop);
        if (offsetParent.style.position.equals("relative")) break;
        offsetParent = offsetParent.offsetParent;
    }
    return nTop;
}

function getOffsetLeft(objDOM) {
    var nLeft = objDOM.offsetLeft;
    var offsetParent = objDOM.offsetParent;
    while (offsetParent) {
        nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft);
        if (offsetParent.style.position.equals("relative")) break;
        offsetParent = offsetParent.offsetParent;
    }
    return nLeft;
}

function getTopOffsetTop(objDOM) {
    var nTop = objDOM.offsetTop;
    var offsetParent = objDOM.offsetParent;
    while (true) {
        if (offsetParent == null) break;
        if (offsetParent.tagName == "BODY") {
            var parentWindow = getParentWindow(offsetParent.ownerDocument);
            if (parentWindow.frameElement == null) break; // -- 顶级窗口(非DIV+IFRAME模拟)--
            nTop -= offsetParent.ownerDocument.documentElement.scrollTop; // -- 窗口滚动条当前滚动高度 --
            offsetParent = parentWindow.frameElement; // -- 窗口的IFRAME容器 --
            nTop += (offsetParent.offsetTop + offsetParent.clientTop) + parseInt(g.x.getCurrentStyle(offsetParent, "paddingTop").replace("px"));
        } else if (offsetParent.tagName == "HTML") {
            //alert("???");
        } else {
            nTop += (offsetParent.offsetTop + offsetParent.clientTop);
        }
        offsetParent = offsetParent.offsetParent;
    }
    return nTop;
}

function getTopOffsetLeft(objDOM) {
    var nLeft = objDOM.offsetLeft;
    var offsetParent = objDOM.offsetParent;
    while (true) {
        if (offsetParent == null) break;
        if (offsetParent.tagName == "BODY") {
            var parentWindow = getParentWindow(offsetParent.ownerDocument);
            if (parentWindow.frameElement == undefined) break; // -- 顶级窗口(非DIV+IFRAME模拟)--
            nLeft -= offsetParent.ownerDocument.documentElement.scrollLeft; // -- 窗口滚动条当前滚动高度 --
            offsetParent = parentWindow.frameElement; // -- 窗口的IFRAME容器 --
            nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft) + +parseInt(g.x.getCurrentStyle(offsetParent, "paddingLeft").replace("px"));
        } else if (offsetParent.tagName == "HTML") {
            //alert("???");
        } else {
            nLeft += (offsetParent.offsetLeft + offsetParent.clientLeft);
        }
        offsetParent = offsetParent.offsetParent;
    }
    return nLeft;
}

// -- 全局页面通用函数 --------------------------------------------------------
function getUrlPara(url) {
    //<summary>取页面url参数, 返回JSON格式</summary>
    if (url) {
        var nIdx = url.indexOf("?");
        if (nIdx >= 0) {
            url = url.substring(nIdx + 1);
        }
    } else {
        url = window.location.search.substring(1);
    }
    // ----------------------------------------------------
    var arrUrlPara = url.split('&');
    var jsonUrlPara = {};
    for (var i = 0; i < arrUrlPara.length; i++) {
        var arrPara = arrUrlPara[i].split("=");
        if (arrPara.length == 2) {
            jsonUrlPara[decodeURIComponent(arrPara[0].trim())] = decodeURIComponent(arrPara[1].trim());
        }
    }
    return jsonUrlPara;
}

function setLocalItem(itemKey, itemValue) {
    if (top.topWin && top.topWin.userKey) {
        itemKey = top.topWin.userKey + "___" + itemKey;
    }

    if (window.localStorage) {
        window.localStorage.setItem(itemKey, itemValue);
    } else {
        setCookie(itemKey, itemValue);
    }
}

function getLocalItem(itemKey) {
    if (top.topWin && top.topWin.userKey) {
        itemKey = top.topWin.userKey + "___" + itemKey;
    }

    var itemValue = "";
    if (window.localStorage) {
        itemValue = window.localStorage.getItem(itemKey);
    } else {
        itemValue = getCookie(itemKey);
    }
    if (itemValue == null) itemValue = "";
    return itemValue;
}

function setCookie(itemKey, itemValue) {
    var blFind = false;
    var n1 = 0,
        n2 = 0;

    var xpasCookie = "xpasCookie";
    var cookies = document.cookie;
    var arrCookie = null;
    var arrCookies = new Array();

    var expiredDate = new Date();
    // ----------------------------------------------------
    if (cookies.length > 0) {
        n1 = cookies.indexOf(xpasCookie + "=");
        if (n1 >= 0) {
            cookies = cookies.substring(n1 + xpasCookie.length + 1);
        }
        n2 = cookies.indexOf(";");
        if (n2 > 0) {
            cookies = cookies.substring(0, n2);
        }
        cookies = unescape(cookies);
    }
    if (cookies.length > 0) {
        arrCookies = cookies.split(g.c.CHAR1);
        for (var i = 0; i < arrCookies.length; i++) {
            arrCookie = arrCookies[i].split(g.c.CHAR2);
            if (arrCookie[0].equals(itemKey)) {
                arrCookies[i] = itemKey + g.c.CHAR2 + itemValue;
                blFind = true;
                break;
            }
        }
    }
    if (!blFind) {
        arrCookies.push(itemKey + g.c.CHAR2 + itemValue);
    }

    expiredDate.setDate(expiredDate.getDate() + 3650);
    document.cookie = xpasCookie + "=" + escape(arrCookies.join(g.c.CHAR1)) + ";expires=" + expiredDate.toGMTString() + ";path=/";
}

function getCookie(itemKey) {
    var blFind = false;
    var n1 = 0,
        n2 = 0;

    var itemValue = "";
    var xpasCookie = "xpasCookie";
    var cookies = document.cookie;
    var arrCookie = null;
    var arrCookies = new Array();
    // ----------------------------------------------------
    if (cookies.length > 0) {
        n1 = cookies.indexOf(xpasCookie + "=");
        if (n1 >= 0) {
            cookies = cookies.substring(n1 + xpasCookie.length + 1);
        }
        n2 = cookies.indexOf(";");
        if (n2 > 0) {
            cookies = cookies.substring(0, n2);
        }
        cookies = unescape(cookies);
    }
    arrCookies = cookies.split(g.c.CHAR1);
    for (var i = 0; i < arrCookies.length; i++) {
        arrCookie = arrCookies[i].split(g.c.CHAR2);
        if (arrCookie[0].equals(itemKey)) {
            itemValue = arrCookie[1];
            break;
        }
    }

    return itemValue;
}

// -- 消息对话框 --------------------------------------------------------------
function showMsg(strMessage) {
    alert(strMessage);
}

function showOK() {
    alert("系统消息：\n\n" + "当前操作成功完成。");
}

function showWarn(strMessage) {
    alert("警告：\n\n" + strMessage);
}

function showErr(strMessage) {
    alert(strMessage);
}

function showConfirm(strMessage) {
    return confirm(strMessage);
}

function showWait() {
    if (!top.divWait) {
        top.divWait = top.document.createElement("DIV");
        top.document.body.appendChild(top.divWait);
        top.divWait.className = "divWait";
        top.divWait.style.top = "0px";
        top.divWait.style.left = "0px";
        top.divWait.style.width = top.document.body.offsetWidth + "px";
        top.divWait.style.height = top.document.body.offsetHeight + "px";
        //top.divWait.style.backgroundImage = "url('res/images/frame/loading.gif')"; 
    }
    top.divWait.style.display = "";
}

function hideWait() {
    top.divWait.style.display = "none";
}

//显示图片
function showImage(imgPath) {
    if (!top.divImageBox) {
    	 top.divImageBox = top.document.createElement("DIV");
         top.document.body.appendChild(top.divImageBox);
         top.divImageBox.style.top = "0px";
         top.divImageBox.style.left = "0px";
         top.divImageBox.style.width = top.document.body.offsetWidth + "px";
         top.divImageBox.style.height = top.document.body.offsetHeight + "px";
         top.divImageBox.style.background= "#f5f5f5";
         top.divImageBox.style.position = "absolute";
         top.divImageBox.style.zIndex = 999999;
         top.divImageBox.style.textAlign = "right";
         
         
         top.divImageClose = top.document.createElement("button");
         top.divImageBox.appendChild(top.divImageClose);
         top.divImageClose.innerHTML="X";
         top.divImageClose.style.fontSize="44px";
         top.divImageClose.style.margin="5px";
         top.divImageClose.style.cursor="pointer";
         top.divImageClose.setAttribute("onclick","hideImage()");
         top.divImageClose.setAttribute("title","点击关闭预览窗口");
         
        top.divImage = top.document.createElement("img");
        top.divImageBox.appendChild(top.divImage);
        top.divImage.style.top = "10%";
        top.divImage.src = imgPath;
        top.divImage.style.left = "10%";
        top.divImage.style.width =  "80%";
        top.divImage.style.height = "80%";
        top.divImage.style.position = "absolute";
        
    }else{
    	 top.divImage.src = imgPath;
    	
    }
    top.divImageBox.style.display = "";
}


//显示图片
function hideImage() {
	top.divImageBox.style.display = "none";
}



function showDebug(strMessage) {
    if (debug) {
        alert(strMessage);
    }
}

// -- 拷贝对象 ----------------------------------------------------------------
function clone(o) {
    if (!o) {
        return o;
    } else {
        var c;
        if (Object.prototype.toString.apply(o) === '[object Array]') {
            c = [];
            for (var i = 0; i < o.length; i++) {
                c.push(clone(o[i]));
            }
            // 采用这种判断，而非typeof(o) === 'object'，这里只处理Object，  
            //而不处理其他包括Array、String、Date、Function等，但由new创建的Function对象的也是Object
        } else if (Object.prototype.toString.call(o) === '[object Object]') {
            c = {};
            for (var p in o) {
                c[p] = clone(o[p]);
            }
        } else {
            return o;
        }
        return c;
    }
}

// -- 开发调试函数 ------------------------------------------------------------
function debug(strMessage, more) {
    ///<summary>调试信息输出。参数more默认值为false，清空之前的调试信息</summary>
    ///<param name="strMessage">调试信息</param>
    ///<param name="more">true：追加输出，false：清空之前的调试信息，单独输出</param>

    if (!g.debug && !g.local && !topWin.isDeveloper) return;
    var divDebug = top.window.document.getElementById("divDebug");
    if (divDebug == null) {
        divDebug = top.document.createElement("DIV");
        top.document.body.appendChild(divDebug);
        divDebug.id = "divDebug";
        divDebug.style.position = "absolute";
        divDebug.style.width = "400px";

        // divDebug.style.top = (0) + "px";
        divDebug.style.bottom = "0px";
        divDebug.style.backgroundColor = "White";

        divDebug.style.zIndex = 99999;
        divDebug.style.overflow = "auto";
        divDebug.style.padding = "1px";
        divDebug.style.border = "dotted 1px blue";

        if (!g.b.ie && !g.local) {
            divDebug.style.width = top.document.documentElement.offsetWidth + "px";
            // divDebug.style.top = (400) + "px";
        }
        divDebug.style.left = (top.document.documentElement.offsetWidth - divDebug.offsetWidth) + "px";
    }
    divDebug.style.display = "";
    divDebug.onclick = function() {
        divDebug.innerHTML = "";
        divDebug.style.display = "none";
    };
    //-----------------------------------------------------
    if (more) {
        divDebug.innerHTML += "<br />" + (new Date()).toString("hh:mm:ss.ms") + " - " + strMessage;
    } else {
        divDebug.innerHTML = (new Date()).toString("hh:mm:ss.ms") + " - " + strMessage;
    }
}


/*为grid追加汇总表格(如果存在则覆盖)
 * 如果菜单类型是uview，窗口url需要加参数withSumTable=true
 * gridBoxId 	grid容器id
 * gridView		gridView对象	
 * param		必要参数[{name:"数据字段名称",tdIndex:汇总列索引,isInt:true为整型合计，否则保留2位小数}]
    示例 可以参考 balance_matrtype.html 或者 view.dept_consumable.js
 	var param=[
    	{name:"qty0",tdIndex:2,isInt:true},
    	{name:"amount_sp",tdIndex:5}
    	
    ];
    appendSumTableToGrid("divGrid",gridView, param);
 */
function appendSumTableToGrid(gridBoxId, gridView, param) {
    if (!gridView || !param) return;
    //只添加一次
    if ($("#" + gridBoxId + " .tablesum+").length < 1) {
        //追加元素并修改样式
        var sumTable = [];
        sumTable.push("<table class='tablesum'> <tr ><td style='text-align: right;'>合计</td>");
        sumTable.push($("#" + gridBoxId + " .xwf_grid_tbData:eq(1) tr:eq(0)").html());
        sumTable.push("</tr></table>");
        $("#" + gridBoxId + " .xwf_gridview_divStatusBar").before(sumTable.join(""));
        $("#" + gridBoxId + " .tablesum td:eq(0)").width($("#" + gridBoxId + " .xwf_grid_tbData:eq(0)").width() - 10);
        $("#" + gridBoxId + " .tablesum td").not(":eq(0)").html("").css("font-size", "13px");

    };

    //计算合计
    if (gridView && gridView.dtbViewData.rowCount > 0) {
        var row,sumrow=Number(0.00),sum=0;
        for (var i in gridView.dtbViewData.rows) {
            row = gridView.dtbViewData.rows[i];
            for (var j = 0; j < param.length; j++) {
                if (!param[j].sum) param[j].sum =Number(0.0000);
                param[j].sum=g.x.toFixedN(parseFloat(param[j].sum),4);
                sumrow=Number(row[param[j].name].value);
                sum=Number(param[j].sum);
                param[j].sum =sum+sumrow ;
            }
        }
    } else {
        return;
    }

    //追加到合计表格中
    var sum = 0,
        isInt = false;
    for (var j = 0; j < param.length; j++) {
        sum = 0;
        isInt = false
        if (param[j].isInt) isInt = param[j].isInt;
        sum = param[j].sum;
        sum = sum.toFixed(2);
        $("#" + gridBoxId + " .tablesum td:eq(" + param[j].tdIndex + ")").html(sum);
    }
    console.log(param)
    
};

//------ 明细删除前验证一下 表单状态
function verifyFormStatus(){
	try{
	    var mainVF = win.window.vf;
	    if(mainVF && mainVF.dtbBase && mainVF.dtbBase.rows && mainVF.dtbBase.rows[0] && mainVF.dtbBase.rows[0].astatus){
	        var mainPrimaryKey = mainVF.primaryKey.split(',');
	        mainPrimaryKey = mainPrimaryKey[0]+"="+mainPrimaryKey[1];
	        var dataMainForm = {viewKey:mainVF.viewKey,tableKey:mainVF.gridView.tableKey.split(".")[1], primaryKey:mainPrimaryKey, astatus:mainVF.dtbBase.rows[0].astatus.value};
	        if (g.a.send("processType=com.xznext.ViewAux&actionType=verifyFormStatus", dataMainForm, true)) {
	        	 if (g.a.OK) {
	        		 return true;
	        	 }else{
	        		 win.para.gridView.refresh();
	        		 win.close();
	        		 return false;
	        	 }
	        }else{
	        	return false;
	        }
	    }else{//无需表单验证的情况下默认为 true
	    	return true;
	    }
	}catch(e){
		return true;
	}
}