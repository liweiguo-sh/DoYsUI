var clockElement=null;
var refreshList=[],refreshTimerList=[];
var boardModelOnly=null;
//面板模型
var boardModel=function(prop) {
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
	return this;
};


//固定属性
boardModel.prototype={
	id:null,
	haveInit:false,
	haveInitTimer:false,
	showHead:false,
	XY:"Y",
	theme:"blue",
	title:null,
	withClock:true,		//标题栏带时钟
	withAction:true,  //面板带按钮
	list:null,
	rootBox:null,
	dashboardBox:null,
	sectionBox:null,
	colYNum:null,
	colXNumArr:null,
	colYNumArr:null
};

//加载布局，横向
boardModel.prototype.loadLayoutX=function(){
	if(!this.rootBox || this.rootBox.length <1){
		zuiExt.msg({ msg: "加载布局失败，缺少参数【rootBox:null】", type: "danger"});  
		return;
	} 
	if(!this.list || this.list.length <1){
		zuiExt.msg({ msg: "加载布局失败，缺少参数【list】", type: "danger"});  
		return;
	} 

	
	var ob,type,title,html=[],minHeight,colNum,panelBody;
	this.id="dashboard"+"_"+$(".dashboard").length;
	this.rootBox.html("");
	//标题
	if(this.title){
		html.push(' <div class="row "> ');
		html.push(' 	<div class="col-md-12 dashboard-col dashboard-title"> '+this.title);
		html.push(' 		<div class="dashboard-clock"></div> ');
		html.push(' 		</div> ');
		html.push(' 	</div> ');
		html.push(' </div> ');
		this.rootBox.append(html.join(""));
	}
	html=[];
	
	this.rootBox.css({"padding-left":"41px","padding-right":"41px"});
	//追加面板容器html
	html.push(' <div id="'+this.id+'" class="dashboard" style=" "> ');
	html.push(' 	<section class="row"> ');
	html.push(' 	</section> ');
	html.push(' </div> ');
	this.rootBox.append(html.join(""));
	this.dashboardBox=$("#"+this.id);
	this.sectionBox=$("#"+this.id+" section");
	var heightP,heightPX,heightAll=window.innerHeight-80;
	if(heightAll <800) heightAll=1000;
	
	heightAll=900;
	for(var i=0;i<this.list.length;i++){
		html=[];
		ob=this.list[i];
		type=ob.type;
		title=ob.title;
		minHeight=ob.minHeight;
		colNum=ob.colNum;
		heightP=ob.heightP;
		if(!heightP) heightP=0.3;
		heightPX=heightAll*heightP;
		
		if(!colNum) colNum="4";
		id=this.id+"_"+i;
		var panelbodyid=id+"_pb";
		this.list[i].pbId=panelbodyid;
		
		//追加面板html
		html.push(' <div class="col-md-'+colNum+'" id="'+id+'" type="'+type+'"  style="    padding-top: 30px;"> ');
		html.push(' 	<div class="panel panel-loading"> ');
		html.push(' 		<div class="panel-heading"> ');
		html.push(' 			<div class="title">'+title+'</div> ');
		html.push(' 			<div class="panel-actions"> ');
		html.push(' 				<button type="button" class="btn refresh-panel" data-toggle="tooltip" title="" data-original-title="重新从远程获取内容"><i class="icon-refresh"></i></button> ');
		html.push(' 				<button type="button" class="btn remove-panel" data-toggle="tooltip" title="移除面板"><i class="icon-remove"></i></button> ');
		html.push(' 			</div> ');
		html.push(' 		</div> ');
		html.push(' 		<div class="panel-body" style="min-height:'+heightPX+'px;text-align: center;"  id="'+panelbodyid+'">  ');
		html.push(' 			<p>加载中，请稍候...</p> ');
		html.push(' 		</div> ');
		html.push(' 	</div> ');
		html.push(' </div> ');
		this.sectionBox.append(html.join(""));
		
		panelBody=$("#"+id+" .panel-body");
		if(type == "form"){//表单
			var elementlist=ob.elementlist;
			if(elementlist && elementlist.length >0){
				var element,label,value;
				for(var j=0;j<elementlist.length;j++){
					element=elementlist[j];
					html=[];
					html.push('<div class="col-md-3">')
					html.push('		<div class="form-group"> ')
					html.push('			<label>'+element.label+'</label> ')
					html.push('			<p class="form-control-static">'+element.value+'</p> ')
					html.push('		</div>')
					html.push('</div>');
					panelBody.append(html.join(""));
				}
			}
		}else if(type == "table"){//表格
		}else if(type == "echart"){//图表
		}
	}
	
	// 定义选项对象
	var options = {
	    draggable: true
	};
	
	//示例化容器
	this.dashboardBox.dashboard(options);
};

//年月日
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "H+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}  ;

//加载布局，纵向
boardModel.prototype.loadLayoutY=function(){
	if(!this.rootBox || this.rootBox.length <1){
		zuiExt.msg({ msg: "加载布局失败，缺少参数【rootBox】", type: "danger"});  
		return;
	} 
	if(!this.list || this.list.length <1){
		zuiExt.msg({ msg: "加载布局失败，缺少参数【list】", type: "danger"});  
		return;
	} 
	var ob,type,title,html=[],heightP,heightPX,colNum,panelBody,colX;
	this.id="dashboard"+"_"+$(".dashboard").length;
	this.rootBox.html("");
	
	//标题
	if(this.title){
		html.push(' <div class="row "> ');
		html.push(' 	<div class="col-md-12 dashboard-col dashboard-title"> '+this.title);
		html.push(' 		<div class="dashboard-clock"></div> ');
		html.push(' 		</div> ');
		html.push(' 	</div> ');
		html.push(' </div> ');
		this.rootBox.append(html.join(""));
	}
	
	//追加面板容器html
	html=[];
	html.push(' <div id="'+this.id+'" class="dashboard-user dashboard"> ');
	html.push(' </div> ');
	this.rootBox.append(html.join(""));
	this.dashboardBox=$("#"+this.id);
	
	var colYNumSum=0,heightAll=window.innerHeight-80;
	if(heightAll <800) heightAll=1000;
	
	heightAll=900;
	
	for(var k=0;k<this.colXNumArr.length;k++){
		html=[];
		colX=this.colXNumArr[k];
		html.push(' <section class="section row dashboard-col col-md-'+colX+'"> ');
		for(var i=colYNumSum;i<this.list.length && i < (this.colYNumArr[k]+colYNumSum);i++){
			ob=this.list[i];
			type=ob.type;
			title=ob.title;
			heightP=ob.heightP;
			colNum=ob.colNum;
			if(!heightP) heightP=0.3;
			heightPX=heightAll*heightP;
			if(!colNum) colNum="4";
			id=this.id+"_"+k+i;
			
			var panelbodyid=id+"_pb";
			this.list[i].pbId=panelbodyid;
			
			//追加面板html
			html.push(' <div class="col-md-12" id="'+id+'" type="'+type+'" > ');
			html.push(' 	<div class="panel panel-loading" data-height='+heightPX+'>  ');
			
			if(this.showHead){
				html.push(' 		<div class="panel-heading"> ');
				html.push(' 			<div class="title">'+title+'</div> ');
				html.push(' 			<div class="panel-actions"> ');
				html.push(' 				<button type="button" class="btn refresh-panel" data-toggle="tooltip" title="" data-original-title="重新从远程获取内容"><i class="icon-refresh"></i></button> ');
				html.push(' 				<button type="button" class="btn remove-panel" data-toggle="tooltip" title="移除面板"><i class="icon-remove"></i></button> ');
				html.push(' 				<div class="dropdown" data-toggle="tooltip" title="刷新周期"> ');
				html.push(' 					<button class="btn" data-toggle="dropdown" type="button"><i class="icon icon-ellipsis-v"></i></button> ');
				html.push(' 					<ul class="dropdown-menu pull-right"> ');
				html.push(' 						<li><a href="###">10分钟刷新一次</li> ');
				html.push(' 						<li><a href="###">一天刷新一次</li> ');
				html.push(' 					</ul> ');
				html.push(' 				</div> ');
				html.push(' 			</div> ');
				html.push(' 		</div> ');
			}
			
			html.push(' 		<div class="panel-body" style="text-align: center;" id="'+panelbodyid+'">  ');
			
			if(type == "form"){//表单
				var elementlist=ob.elementlist;
				if(elementlist && elementlist.length >0){
					var element,label,value,colNumEle,valueStyle,labelStyle,colBoxStyle;
					for(var j=0;j<elementlist.length;j++){
						element=elementlist[j];
						colNumEle=element.colNum;
						valueStyle=element.valueStyle;
						labelStyle=element.labelStyle;
						colBoxStyle=element.colBoxStyle;
						if(!colNumEle)  colNumEle=2;
						if(!labelStyle)  labelStyle="";
						if(!colBoxStyle)  colBoxStyle="";
						
						html.push('<div class="col-md-'+colNumEle+' dashboard-col" >')
						html.push('		<div class="form-group" style="'+colBoxStyle+'"> ')
						html.push('			<p style="'+valueStyle+'" name="'+element.name+'" class="form-control-static">'+element.value+'</p> ')
						html.push('			<label style="'+labelStyle+'">'+element.label+'</label> ')
						html.push('		</div>')
						html.push('</div>');
					}
				}
			}else if(type == "table"){//表格
			}else if(type == "echart"){//图表
			}
			
			html.push(' 		</div> ');
			html.push(' 	</div> ');
			html.push(' </div> ');
			
		}
		
		html.push(' </section> ');
		this.dashboardBox.append(html.join(""));
		colYNumSum+=this.colYNumArr[k];
	}
	
	// 定义选项对象
	var options = {
	    draggable: true
	};
	
	//示例化容器
	this.dashboardBox.dashboard(options);
};


//加载各类定时器，只加载一次
boardModel.prototype.initTimer=function(){
	if(this.haveInitTimer) return;
	//时钟
	if(this.withClock){
		clockElement=this.rootBox.find(".dashboard-clock");
		setInterval(function(){
            var date = new Date().Format("yyyy-MM-dd HH:mm:ss");
           clockElement.text(date);  //设置每秒刷新一次，显示在页面上  
        },1000) ;
	}
	
	//自动换页
	setInterval(function(){
		//自动换页
		var ob,pager,toPage,insOb;
		for(var i=0;i<refreshList.length;i++){
			ob=refreshList[i];
			if(ob.type == "table"){ //表格
				insOb=$('#'+ob.eleId).data('zui.datagrid');
				pager=insOb.pager;
				if(pager.totalPage <2) continue;
				if(pager.page==pager.totalPage){ //最后一页
					toPage=1;
				}else{
					toPage=pager.page+1;
				}
				insOb.setPager(toPage).render();
			}else if(ob.type == "echart"){ //图表
				insOb= echarts.getInstanceByDom(document.getElementById(ob.eleId));
				
				try{
					var option=insOb.getOption();
					// 每次向后滚动一个，最后一个从头开始。
					if(option.dataZoom[0].endValue == option.series.length - 1){
						option.dataZoom[0].endValue = 4;
						option.dataZoom[0].startValue = 0;
					}else{
						option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
						option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
					}
					insOb.setOption(option);
					
				}catch(e){
				}
			}
		}
	},3000) ;
	
	//以时钟为分组存放数据
	var dataRefreshCycle=0,obInListIndex=0; //刷新周期，毫秒
	for(var i=0;i<refreshList.length;i++){
		ob=refreshList[i];
		if(!ob.dataRefreshCycle || ob.dataRefreshCycle <= 0) continue;
		if(!ob.dataRefreshCycle || ob.dataRefreshCycle<=0) continue;
		if(refreshTimerList.length == 0){
			refreshTimerList.push(
					{
						time:ob.dataRefreshCycle,
						obList:[ob],
					}
			);
			continue;
		}
		var haveTime=false;
		for(var j=0;j<refreshTimerList.length;j++){
			if(refreshTimerList[j].time == ob.dataRefreshCycle){//同一时钟周期
				if(!refreshTimerList[j].obList){
					refreshTimerList[j].obList=[{
						time:ob.dataRefreshCycle,
						obList:[ob],
					}]
				}else{
					refreshTimerList[j].obList.push(ob);
				}
				haveTime=true;
			}
		}
		
		if(!haveTime) {
			refreshTimerList.push(
					{
						time:ob.dataRefreshCycle,
						obList:[ob],
					}
			);
		}
	}
	
	//不同时钟的定时任务
	for(var i=0;i<refreshTimerList.length;i++){
		ob=refreshTimerList[i];
		setIntervalMy(ob.time)
	}
	
	this.haveInitTimer=true;
}

function setIntervalMy(time){
	setInterval(function(){
		for(var j=0;j<refreshTimerList.length;j++){
			if(refreshTimerList[j].time == time){
				for(var k=0;k<refreshTimerList[j].obList.length;k++){
					boardModelOnly.loadData(refreshTimerList[j].obList[k].obInListIndex);
				}
			}
		}
    },time) ;
	
}

//加载布局
boardModel.prototype.load=function(){
	if(!this.haveInit){
		if(this.XY == "Y"){
			this.loadLayoutY();
		}else if(this.XY == "X"){
			this.loadLayoutX();
		}
		this.haveInit=true;
	}
	this.loadData();
	this.initTimer();
};

//加载表格数据
boardModel.prototype.loadDataForTable=function(ob,panelBody,unqid,obInListIndex){
	var param={viewKey:"wi_by_asn",dataSql:ob.dataSql},dataArr=[],pagerParam={};
	panelBody.html('<div id="'+unqid+'"  class="datagrid"  style=""><div class="datagrid-container"></div></div>');
	
	if (g.a.sendJson("processType=com.xznext.report.BoardModelView&actionType=loadDataForTableAndForm", param, false)) {
		var ret = g.a.cReturn;
        if (g.a.OK) {
        	var result=eval(ret.result)[0];
        	if(result.result != "success") {
        		panelBody.html("表格数据加载失败,原因："+result.message);
        		return false;
        	}
        	dataArr=result.data;
        }else{
        	panelBody.html("表格数据加载失败,原因："+ret.ErrMessage);
        	return false;
        }
    }
	
	pagerParam.page=1;
	pagerParam.recTotal=dataArr.length;
	pagerParam.recPerPage=ob.recPerPage;
	pagerParam.totalPage=Math.ceil(dataArr.length/ob.recPerPage);
	$('#'+unqid).datagrid({
		height:panelBody.height(),
	    dataSource: {
	        cols:ob.tableCols,
	        array:dataArr
	    },
	    states: {
	    	pager:pagerParam
	    	
	    }
	});
	
	if(pagerParam.recTotal <1){
		$('#'+unqid).data('zui.datagrid').showMessage("没有相关数据","primary");
		
	}
	
	refreshList.push({type:"table",eleId: unqid,dataRefreshCycle:ob.dataRefreshCycle,obInListIndex:obInListIndex});
}

//加载表单数据
boardModel.prototype.loadDataForForm=function(ob,panelBody,unqid,obInListIndex){
	var param={viewKey:"wi_by_asn",dataSql:ob.dataSql},dataArr=[],pagerParam={};
	
	if (g.a.sendJson("processType=com.xznext.report.BoardModelView&actionType=loadDataForTableAndForm", param, false)) {
		var ret = g.a.cReturn;
        if (g.a.OK) {
        	var result=eval(ret.result)[0];
        	if(result.result != "success") {
        		panelBody.html("表单数据加载失败,原因："+result.message);
        		return false;
        	}
        	dataArr=result.data;
        }else{
        	panelBody.html("表单数据加载失败,原因："+ret.ErrMessage);
        	return false;
        }
    }
	
	if(dataArr && dataArr.length >0){
		var dataob,eleob;
		for(var i=0;i<dataArr.length;i++){
			dataob=dataArr[i];
			eleob=$("[name='"+dataob.name+"']");
			if(eleob.length <1) continue;
			eleob.html(dataob.value);
		}
		
	}
	
	refreshList.push({type:"form",eleId: unqid,dataRefreshCycle:ob.dataRefreshCycle,obInListIndex:obInListIndex});
}

//加载图表数据
boardModel.prototype.loadDataForEchart=function(ob,panelBody,unqid,obInListIndex){
	panelBody.html('<div id="'+unqid+'"  style="height: '+panelBody.height()+'px;"></div>');
	
	var param={};
	param.echartId=unqid;
    param.chartReportKey=ob.chartReportKey;
    param.chartTitle=ob.title;
    param.maxX=ob.maxX;
    param.chartType=ob.chartType;
    param.chartNoTool=ob.chartNoTool;
    param.chartNoLegend=ob.chartNoLegend;
    param.chartNoOther=ob.chartNoOther;
    param.chartNoTitle=ob.chartNoTitle;
    param.chartTheme=ob.chartTheme;
    param.yTitle=ob.chartYTitle;
    param.chartNoBG=ob.chartNoBG;
    param.chartNoYsplitLine=ob.chartNoYsplitLine;
    param.chartAxisLabel=ob.chartAxisLabel;
    param.chartNoDataZoom=ob.chartNoDataZoom;
    param.chartOnlyOneSeries=ob.chartOnlyOneSeries;
    //初始化图表
    var echartModel=new window.echartModel(param);
    echartModel.loadData();
    
    refreshList.push({type:"echart",eleId: unqid,insOb:echartModel.echart,dataRefreshCycle:ob.dataRefreshCycle,obInListIndex:obInListIndex});
}
//加载数据
boardModel.prototype.loadData=function(onInlistIndex){
	var ob,panelBody,html=[],unqid,chartReportKey,chartType,maxX,panelBodyH,chartNoTool,chartNoTitle,chartNoLegend;
	for(var i=0;i<this.list.length;i++){
		if(onInlistIndex && onInlistIndex!=i) continue;
		ob=this.list[i];
		html=[];
		panelBody=$("#"+ob.pbId);
		unqid=ob.pbId+"_child";
		var pannelOb=panelBody.closest(".panel");
		pannelOb.addClass("panel-loading");
		
		if(ob.type == "form"){//表单
			panelBody.removeClass("animated").removeClass("flipInX");
			panelBody.fadeOut();
			panelBody.addClass("animated").addClass("flipInX");
			panelBody.fadeIn();
			
			//只加载，一次，之后只显示页面动画
			if(onInlistIndex && onInlistIndex==i && ob.dataRefreshOne ) continue;
			this.loadDataForForm(ob,panelBody,unqid,i);
		}else if(ob.type == "table"){//表格
			this.loadDataForTable(ob,panelBody,unqid,i);
		}else if(ob.type == "echart"){//图表
			
			//只加载，一次，之后只显示页面动画
			if(onInlistIndex && onInlistIndex==i && ob.dataRefreshOne ){
				var compareChart = echarts.getInstanceByDom(document.getElementById(unqid));
				compareChart.resize();
				continue;
			} 
			this.loadDataForEchart(ob,panelBody,unqid,i);
			
		}
		pannelOb.removeClass("panel-loading");
	}
};

function openwin(url) {
	window.open(url,'window','width='+(window.screen.availWidth-10)+',height='+(window.screen.availHeight-30)+'location =no,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
  }

//-- 全局页面通用函数 --------------------------------------------------------
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