/**Lodop 工具类
 * 官网  http://www.c-lodop.com
 * 
 	用法
	var LodopModel;  
	function lodopPrint(isView){
		var strBodyStyle="<style>"+document.getElementById("stylePrint").innerHTML+"</style>";
		var printTableLen=$(".print-table[id!='print-table']").length;
		if(printTableLen == 0){
			LodopModel.addPrintHtml(strBodyStyle+$("#print-table").prop("outerHTML"));
		}else{
			$(".print-table[id!='print-table']").each(function(index){
				var table=$(this);
				LodopModel.addPrintHtml(strBodyStyle+table.prop("outerHTML"));
				if(printTableLen != (index+1)) LodopModel.newPage();
			});
		}
		
		if(isView){
			LodopModel.printView();
		}else{
			LodopModel.print();
		}
	}
	
	function bodyLoad(){
		var param={
			printerName:getLocalItem("SPD2_RptPrinter"),
			printerOrient:getLocalItem("RptPrinterOrient"),
			printerPage:getLocalItem("SPD2_RptPrinterPage"),
			checkUsable:true,
			printInfoBoxId:"printInfoBoxId"
		};
		LodopModel=new window.LodopModel(param);  
	}
 */
var CreatedOKLodop7766 = null, CLodopIsLocal;
var lodopG=null; //全局对象
window.LodopModel= function (prop) {
    for (var key in prop) {
        this[key] = prop[key];
    }
    this.prefix += this.instanceIndex.index++ + "_";
    this.init();
    return this;
}


//属性
window.LodopModel.prototype = {
		prefix: "LodopModel",    // -- 类实例下标 --
		instanceIndex: { index: 0 },    // -- 类实例下标 --
		printInfoBoxId:null,  // 需要将打印机信息显示到哪个元素上面
		printType:"from",  //from 各种单据， label 标签 
		printerName:null,  //打印机名称
		printerIndex:null,  //打印机索引
		printerPage:null,  //纸张  A4 A5,如果指定了则优先使用
		printerPageWidth:0,  //设定自定义纸张宽度，整数或字符型，整数时缺省长度单位为0.1mm, 譬如该参数值为45，则表示4.5毫米。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)，如“10mm”表示10毫米。数值等于0时本参数无效。
		printerPageHeight:0,  //固定纸张时设定纸张高；高度自适应时设定纸张底边的空白高。整数或字符型，整数时缺省长度单位为0.1毫米。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)，如“10mm”表示10毫米。数值等于0时本参数无效。
		printerOrient:1,  //纸张方向 1- 纵(正)向打印，固定纸张,2-横向打印，固定纸张,3-纵(正)向打印，宽度固定,高度自适应
		downloadUrl:"../res_file/CLodop_Setup_for_Win32NT.exe",
		usable:false, //打印客户端是否可用
		checkUsable:false, //true:校验客户端是否可用，不可用的话，提示用户下载
		lodop:null  //打印机对象
}

//选择打印机
window.LodopModel.prototype.init=function(){
	//====页面引用CLodop云打印必须的JS文件,用双端口(8000和18000）避免其中某个被占用：====
	
	this.lodop=getLodop();  
	if(!this.lodop){
		if(this.checkUsable && confirm("未发现可用的打印服务,是否立即下载打印程序？\r\n确认，下载打印客户端，然后您自行安装，安装完成后刷新下当前页面即可\r\n取消，您可以继续使用浏览器打印")){
			this.download();
		}
		return;
	}
	this.usable=true;
	this.lodop.SET_PRINT_MODE("CATCH_PRINT_STATUS",true);
	
	//设置纸张
	this.lodop.SET_PRINT_PAGESIZE(this.printerOrient, this.printerPageWidth, 0,this.printerPageHeight,this.printerPage);
	
	//初始化运行环境，清理异常打印遗留的系统资源，设定打印任务名,IE 下面报错
	this.lodop.PRINT_INIT();
	
	if(this.printInfoBoxId && $("#"+this.printInfoBoxId).length>0){
		var printerOrient="方向未指定",printerName="未指定",printerPage="未指定";
		if(this.printerName )  printerName=this.printerName;
		if(this.printerPage )  printerPage=this.printerPage;
		if(this.printerOrient == 1) printerOrient="纵(正)向打印，固定纸张";
		if(this.printerOrient == 2) printerOrient="横向打印，固定纸张";
		if(this.printerOrient == 3) printerOrient="纵(正)向打印，宽度固定,高度自适应";
		
		var infoHtml=[];
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 15px;font-weight: bold;" >打印机:</span> ');
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 5px;"   >'+printerName+'</span> ');
		
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 15px;font-weight: bold;" >纸张:</span> ');
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 5px;"   >'+printerPage+'</span> ');
		
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 15px;font-weight: bold;" >方向:</span> ');
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 5px;"   >'+printerOrient+'</span> ');
		
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 15px;font-weight: bold;" >宽高:</span> ');
		infoHtml.push(' <span style="    margin-left: 11px;font-size: 5px;"   >'+this.printerPageWidth+"x"+this.printerPageHeight+'</span> ');
		$("#"+this.printInfoBoxId).html(infoHtml.join(""));
	}
	
}

//选择打印机
window.LodopModel.prototype.choosePrinter=function(){
	var ret=this.lodop.SELECT_PRINTER();
}

//选择打印机
window.LodopModel.prototype.download=function(){
	alert("下载打印客户端，然后您自行安装，安装完成后刷新下当前页面即可");
	window.location =window.location.protocol + "//" + window.location.host+"/xpas/res/res_file/"+this.downloadUrl;
}

/**添加打印内容 html
 * top		打印项在纸张内的上边距，也就是在每张纸的上下起点位置，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸)、%(百分比)，如“10mm”表示10毫米
 * left		打印项在纸张内的左边距，也就是在每张纸的左右起点位置，整数或字符型，整数时缺省长度单位为px。字符型时可包含单位名：in(英寸)、cm(厘米) 、mm(毫米) 、pt(磅)、px(1/96英寸) 、%(百分比)，如“10mm”表示10毫米
 * html		超文本代码内容，字符型，未限制长度。可以是一个完整的页面超文本代码，或者是一个代码段落，也可以是URL:web地址形式的URL地址
 * */
window.LodopModel.prototype.addPrintHtml=function(html,top,left){
	if(!top) top=5;
	if(!left) left=5;
	this.lodop.ADD_PRINT_HTM(top,left,"100%","100%",html);
}

/**强制分页。执行该函数之后所增加的内容会在前面内容的首页之后新建一页输出，前面无内容时，仍然从第一页开始。 
 * */
window.LodopModel.prototype.newPage=function(){
	this.lodop.NewPage();
}

/**设置打印机
 * 打印机名称或序号，字符或数字型。数字表示打印机的序号，从0开始，最大序号是GET_PRINTER_COUNT()减1。-1特指操作系统内设定的默认打印机。
	字符代表打印机的名称，与操作系统内的打印机名称一致。
	注：用本函数指定打印机后，在预览界面不允许重新选择打印机，而用另外一个函数SET_PRINTER_INDEXA指定后则允许重新选择

 * */
window.LodopModel.prototype.setPrinter=function(){
	var ret=this.lodop.SET_PRINTER_INDEXA(this.printerName);
	if(!ret && this.checkUsable) alert("目标打印机【"+this.printerName+"】设置失败，可能该打印机不可用或者名字有误");
	return ret;
}


/**强制分页。执行该函数之后所增加的内容会在前面内容的首页之后新建一页输出，前面无内容时，仍然从第一页开始。 
 * */
window.LodopModel.prototype.newPage=function(){
	this.lodop.NewPage();
}


/**
 * */
window.LodopModel.prototype.fillPrintersToSelect=function(selectId,selectValue){
	var Printers=this.lodop?this.lodop.Printers:null;
	
	//$("#"+selectId).append(' <option  formName="A4" index=0  value="另存为 PDF">另存为 PDF  <option> ');
	if(Printers){
		var list=Printers.list;
		var defaultIndex=Printers["default"];
		var ob,sel="",attr="";
		$("#"+selectId).attr("data-placeholder","未指定"); 
		for(var i=0;i<list.length;i++){
			ob=list[i];
			if(!ob.name || $.trim(ob.name).length<1) continue;
			sel="";
			attr=" formName='"+ob.FormName+"' index="+i+"";
			if(selectValue){
				if(selectValue == ob.name) sel=" selected='selected' ";
			}else{
			}
			$("#"+selectId).append(' <option '+attr+' '+sel+' value="'+ob.name+'">'+ob.name+'  <option> ');
		}
	}else{
		$("#"+selectId).attr("data-placeholder","打印客户端尚未安装 "); 
	}
	
}


/**纸张大小
 * */
window.LodopModel.prototype.fillPagesToSelect=function(selectId,selectValue,chosenOption){
	var pages=this.lodop?this.lodop.GET_PAGESIZES_LIST(this.printerIndex,","):null;
	
	 $("#"+selectId).children("option").remove();
	if(pages){
		var ob,sel="",attr="";
		$("#"+selectId).attr("data-placeholder","未指定"); 
		
		var pagesList=pages.split(",");
		for(var i=0;i<pagesList.length;i++){
			ob=pagesList[i];
			if(!ob || $.trim(ob).length<1) continue;
			sel="";
			if(selectValue){
				if(selectValue == ob) sel=" selected='selected' ";
			}else{
			}
			$("#"+selectId).append(' <option '+attr+' '+sel+' value="'+ob+'">'+ob+'  <option> ');
		}
	}else{
		$("#"+selectId).attr("data-placeholder","打印客户端尚未安装 "); 
	}
	
	try{
		 $("#"+selectId).chosen(chosenOption);
		$("#"+selectId).trigger("chosen:updated");
	}catch(e){
		
	}
}

/**打印预览
 * */
window.LodopModel.prototype.printView=function(){
	//内嵌浏览器
	//this.lodop.SET_SHOW_MODE("PREVIEW_IN_BROWSE",true);
	
	//设置预览窗口大小为760*540px，显示按钮，选机打印，适高，重设窗口标题。
	this.lodop.SET_PREVIEW_WINDOW(2,2,1,1000,800,"打印预览");
	
	if(!this.setPrinter()) return;
	var ret=this.lodop.PREVIEW();
	
	//打印后关闭
	//this.lodop.DO_ACTION("PREVIEW_CLOSE",true);
}

/**打印,需要选择打印机
 * */
window.LodopModel.prototype.printChoosePrinter=function(){
	this.lodop.PRINTA();
}

/**打印,不需要选择打印机
 * */
window.LodopModel.prototype.print=function(){
	//设置打印机 
	if(!this.setPrinter()) return;
	var ret=this.lodop.PRINT();
	if(!ret) alert("打印失败，状态:"+ret);
}

if (needCLodop()) {
  var src1 = "http://localhost:8000/CLodopfuncs.js?priority=1";
  var src2 = "http://localhost:18000/CLodopfuncs.js?priority=0";

  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
  var oscript = document.createElement("script");
  oscript.src = src1;
  head.insertBefore(oscript, head.firstChild);
  oscript = document.createElement("script");
  oscript.src = src2;
  head.insertBefore(oscript, head.firstChild);
  CLodopIsLocal = !!((src1 + src2).match(/\/\/localho|\/\/127.0.0./i));
}


//====判断是否需要 Web打印服务CLodop:===
//===(不支持插件的浏览器版本需要用它)===
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i))
            return true;
        if (ua.match(/iPhone|iPod|iPad/i))
            return true;
        if (ua.match(/Android/i))
            return true;
        if (ua.match(/Edge\D?\d+/i))
            return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64))
            return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64))
                return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32)
                return true;
        } else if ((!verTrident) && (!verIE)) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41)
                    return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}
 



//====获取LODOP对象的主过程：====
function getLodop(oOBJECT, oEMBED) {
    var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
    var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
    var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
    var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
    var strCLodopInstall_1 = "<br><font color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>下载执行安装</a>";
    var strCLodopInstall_2 = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    var strCLodopInstall_3 = "，成功后请刷新本页面。</font>";
    var strCLodopUpdate = "<br><font color='#FF00FF'>Web打印服务CLodop需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>";
    
    
    strHtmInstall="";
    strHtmUpdate="";
    strHtm64_Install="";
    strHtm64_Update="";
    strHtmChrome="";
    strCLodopInstall_1="";
    strCLodopInstall_2="";
    strCLodopInstall_3="";
    strCLodopUpdate="";
    
    var LODOP;
    try {
        var ua = navigator.userAgent;
        var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
        if (needCLodop()) {
            try {
                LODOP = getCLodop();
            } catch (err) {}
            if (!LODOP && document.readyState !== "complete") {
                alert("网页还没下载完毕，请稍等一下再操作.");
                return;
            }
            if (!LODOP) {
                document.body.innerHTML = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3 + document.body.innerHTML;                
                return;
            } else {
                if (CLODOP.CVERSION < "3.0.8.3") {
                    document.body.innerHTML = strCLodopUpdate + document.body.innerHTML;
                }
                if (oEMBED && oEMBED.parentNode)
                    oEMBED.parentNode.removeChild(oEMBED);
                if (oOBJECT && oOBJECT.parentNode)
                    oOBJECT.parentNode.removeChild(oOBJECT);
            }
        } else {
            var is64IE = isIE && !!(ua.match(/x64/i));
            //=====如果页面有Lodop就直接使用，没有则新建:==========
            if (oOBJECT || oEMBED) {
                if (isIE)
                    LODOP = oOBJECT;
                else
                    LODOP = oEMBED;
            } else if (!CreatedOKLodop7766) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isIE)
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodop7766 = LODOP;
            } else
                LODOP = CreatedOKLodop7766;
            //=====Lodop插件未安装时提示下载地址:==========
            if ((!LODOP) || (!LODOP.VERSION)) {
                if (ua.indexOf('Chrome') >= 0)
                    document.body.innerHTML = strHtmChrome + document.body.innerHTML;
                if (ua.indexOf('Firefox') >= 0)
                    document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
                //document.body.innerHTML = (is64IE ? strHtm64_Install : strHtmInstall) + document.body.innerHTML;
                return LODOP;
            }
        }
        if (LODOP.VERSION < "6.2.2.6") {
           // if (!needCLodop()) document.body.innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate) + document.body.innerHTML;
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==



        //=======================================================
        return LODOP;
    } catch (err) {
        alert("getLodop出错:" + err);
    }
}

