/**echart 工具类
 * 使用闭包
 */

window.echartModel = function (prop) {
    if (prop == null) return;
    for (var key in prop) {
        this[key] = prop[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    
    if(!optionTmp[this.chartType]){
    	zuiExt.msg({ msg: "图表类型【"+this.chartType+"】暂未实现", type: "danger"});  
    	return null;
    }
    this.option=optionTmp[this.chartType];
    this.option.title.text=this.chartTitle?this.chartTitle:"";
    return this;
}

window.echartModel.prototype = {
		prefix:"echart",
		isInit:false,  //是否已经初始化,true:是
		chartTheme:"",  //主题  
		chartType:"",　//图表类型
		defaultChartType:null,　//默认图表类型 line或者 bar
		chartSwitchs:"",　//切换类型，默认无，可选 bar,pie,line
		chartTitle:"",　//显示名称
		chartNoTool:false,　//不要操作栏
		chartNoBG:false,　//不要背景
		chartNoTitle:false,　//不要标题
		chartAxisLabel:null,　//不要标题
		chartNoLegend:false,　//不要图例
		chartNoOther:false,　//不要其他列
		chartOnlyOneSeries:false,　//只有一个系列
		chartNoYsplitLine:false,　//不要其他列
		chartNoDataZoom:false,　//不要区域缩放
		maxX:5,　//x轴超出多少列，显示为其他
		yTitle:"",　//y轴单位显示名称
		echart:null,
		echartId:null,
		formId:null,	//对应查询表单ｉｄ
		formFields:null,//表单字段列表
		option:null,
		filterSql:null,  //sql 过滤套件，需要在ｓｑｌ数据源中提供好％filterSql％　占位符
		instanceIndex: { index: 0 },    // -- 类实例下标 --
}

var optionTmp = {
}


//柱状图
optionTmp.bar={
	title: {
		left:'center',
		subtext:'',
		subtextStyle:{
	　　　　 	fontSize:18
	    }
	},
	 tooltip: {
	     trigger: "axis",
	     axisPointer: {
	         type: "shadow",
	         label: {
	             show: false
	         }
	     },
	 },
	 toolbox: {
	//       borderColor:['#1e90ff','#22bb22','#4b0082',],
	       show: true,
	       orient: 'horizontal',
	       itemSize: '20',
	       itemGrap: '15',
	       feature: {
	           magicType: {
	               show: true,
	               type: ['line', 'bar'],
	               currentType:"line"
	           },
	           restore: {
	               show: true,
	           },
	           saveAsImage: {
	               show: true,
	           }
	       }
	},
	 legend: {
	        data:null,
	        top: "33px",
	    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '14%',
      top:'16%',
      containLabel: true
    },
    "dataZoom": [{
      "show": true,
      "height": 12,
      "xAxisIndex": [
        0
      ],
      bottom:'8%',
      "start": 10,
      "end": 90,
      handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      handleSize: '110%',
      handleStyle:{
        color:"#d3dee5",

      },
      textStyle:{
        color:"#fff"},
      borderColor:"#90979c"
    }, {
      "type": "inside",
      "show": true,
      "height": 15,
      "start": 1,
      "end": 35
    }]
  };

//柱状图
optionTmp.barOne={
		title: {
			left:'center',
			subtext:'',
			subtextStyle:{
		　　　　 	fontSize:18
		    }
		},
		 xAxis: {
		        type: 'category'
	    },
	    yAxis: {
	        type: 'value'
	    },
	    series:null
};

//柱状图
optionTmp.lineOne={
		title: {
			left:'center',
			subtext:'',
			subtextStyle:{
				fontSize:18
			}
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			type: 'value'
		},
		series:null
};


//折线图
optionTmp.line={
	title: {
		left:'center',
		subtext:'',
		subtextStyle:{
	　　　　 	fontSize:18
	    }
	},
	 tooltip: {
	     trigger: "axis",
	     axisPointer: {
	         type: "shadow",
	         label: {
	             show: false
	         }
	     },
	 },
	 toolbox: {
	//       borderColor:['#1e90ff','#22bb22','#4b0082',],
	       show: true,
	       orient: 'horizontal',
	       itemSize: '20',
	       itemGrap: '15',
	       feature: {
	           magicType: {
	               show: true,
	               type: ['line', 'bar'],
	               currentType:"line"
	           },
	           restore: {
	               show: true,
	           },
	           saveAsImage: {
	               show: true,
	           }
	       }
	},
	 legend: {
	        data:null,
	        top: "33px",
	    },
  grid: {
    left: '2%',
    right: '4%',
    bottom: '14%',
    top:'16%',
    containLabel: true
  },
  "dataZoom": [{
    "show": true,
    "height": 12,
    "xAxisIndex": [
      0
    ],
    bottom:'8%',
    "start": 10,
    "end": 90,
    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '110%',
    handleStyle:{
      color:"#d3dee5",

    },
    textStyle:{
      color:"#fff"},
    borderColor:"#90979c"
  }, {
    "type": "inside",
    "show": true,
    "height": 15,
    "start": 1,
    "end": 35
  }]
};


//饼状图图
optionTmp.pie=option = {
	title : {
        text: '',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: null
    },
    series : null
};


//根据formId　控件列表设置查询条件
window.echartModel.prototype.setFilter =function(expIds) {
	var filterSqlArr=[];
	// filterName="t1.cdate" filterType=">="
	if(this.formId && $("#"+this.formId).length >0){
		$("#"+this.formId+" [filter=1]").each(function(){
			var inp =$(this);
			var inpVal =$.trim(inp.val());
			var filterName =inp.attr("filterName");
			var filterOp =inp.attr("filterOp");
			var id =inp.attr("id");
			if(expIds && id.indexOf(expIds) >=0) return true;
			if(!inpVal || inpVal =="" || !filterName || !filterOp) return true;
			filterSqlArr.push(filterName+" "+filterOp+" "+"'"+inpVal+"'");
		});
	}
	this.filterSql=null;
	if(filterSqlArr.length >0){
		this.filterSql="and ("+filterSqlArr.join(" and ")+" )";
	}else{
		this.filterSql="and 1=1 ";
	}
	console.log("filterSqlArr")
	console.log(filterSqlArr)
	console.log(this.filterSql)
}

//初始化操作，只进行一次
window.echartModel.prototype.init =function() {
	if(this.isInit) return;
	this.isInit=true;
	//追加表单，如果存在的话
	if(!this.formId || $("#"+this.formId).length <1) return;
	//追加图表切换，如果有的话
	if(this.chartSwitchs && false){
		var switchHtml=[' <div class="form-group with-padding"><select onchange   class="chosen-select-switch chosen-select form-control"  style="width:100px;">  '];
		if(this.chartSwitchs.indexOf("bar") >= 0) { //柱状图
			switchHtml.push('<option value="bar"  >柱状图</option> ');
		}
		if(this.chartSwitchs.indexOf("pie") >= 0) { //饼图
			switchHtml.push('<option value="pie"  >饼图</option> ');
		}
		if(this.chartSwitchs.indexOf("line") >= 0) { //折线图图
			switchHtml.push('<option value="line"  >折线图</option> ');
		}
		switchHtml.push(' </select> </div>');
		if(switchHtml.length >2){
			$("#"+this.formId).prepend(switchHtml.join(""));
			//下拉框
			$('select.chosen-select-switch').chosen({
				disable_search: true
			});
			
		}
		
	}
	
	if( !this.formFields ||this.formFields.length <1) return;
	var ob,filterText,formHtml=[],attr="",optionDatas=[],optionData,selected,id="",idPre="filterId";
	for(var i=0;i<this.formFields.length;i++){
		formHtml.push('<div class="form-group with-padding">');
		ob=this.formFields[i];
		filterText=ob.filterText;
		id=idPre+i;
		this.formFields[i].id=id;
		attr=' id="'+id+'" data-placeholder="'+filterText+'" filter=1  filterName="'+ob.filterName+'" dateFormat="'+ob.dateFormat+'"  filterOp="'+ob.filterOp+'" filterType="'+ob.filterType+'"   placeholder="'+filterText+'" '
		
		if(ob.filterType == "select"){//静态下拉框
			formHtml.push('<label  class=" with-padding" >'+filterText+'</label>');
			formHtml.push(' <select '+attr+' class="chosen-select-filter chosen-select form-control"  style="width:150px;">  ');
			optionDatas=ob.optionDatas;
			if(optionDatas && optionDatas.length>0){
				for(var j=0;j<optionDatas.length;j++){
					optionData=optionDatas[j];
					selected="";
					if(optionData.selected) selected="selected";
					formHtml.push('<option value="'+optionData.value+'" selected="'+selected+'">'+optionData.text+'</option> ');
				}
				
			}
			formHtml.push(' </select> ');
		}else if(ob.filterType == "selectAjax"){//动态下拉框
			this.setFilter();
			var filterSql=this.filterSql;
			if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: ob.selectAjaxSql,filterSql:filterSql }, true)) {
	            if (g.a.OK) {
	                var jsonarrstr = g.a.cReturn.jsonarr,arr=[];
	                if(jsonarrstr) arr=eval(jsonarrstr);
	                if (arr && arr.length > 0){
	                	var arrOb;
	                	formHtml.push('<label  class=" with-padding" >'+filterText+'</label>');
	                	formHtml.push(' <select '+attr+' class="chosen-select-filter chosen-select form-control"  style="width:150px;">  ');
	                	optionDatas=ob.optionDatas;
	                	if(optionDatas && optionDatas.length>0){
	                		for(var j=0;j<optionDatas.length;j++){
	                			optionData=optionDatas[j];
	                			selected="";
	                			if(optionData.selected) selected="selected";
	                			formHtml.push('<option value="'+optionData.value+'" selected="'+selected+'">'+optionData.text+'</option> ');
	                		}
	                		
	                	}
	                	for(var j=0;j<arr.length;j++){
	    					optionData=arr[j];
	    					if(!optionData.key || !optionData.value) continue;
	    					selected="";
	    					formHtml.push('<option value="'+optionData.key+'" >'+optionData.value+'</option> ');
	    				}
	                	formHtml.push(' </select> ');
	                }
	            }
	        }
		}else{//input
			var defaultValue=ob.defaultValue?ob.defaultValue:"";
			attr+=' value="'+defaultValue+'"';
			formHtml.push('<label  class=" with-padding" >'+filterText+'</label>');
			formHtml.push('<input   type="text" class="form-control" '+attr+' />');
		} 
		
		formHtml.push('</div>');
	}
	$("#"+this.formId).prepend(formHtml.join(""));
	
	//选年份
	 $("#"+this.formId+" [dateFormat='yyyy']").datetimepicker({
		 format: 'yyyy',
		 weekStart: 1,
         autoclose: true,
         startView: 4,
         minView: 4,
         forceParse: false,
         language: 'zh-CN'
     });
	 
	 //选年月
	 $("#"+this.formId+" [dateFormat='yyyy-mm']").datetimepicker({
		 format: 'yyyy-mm',
		 weekStart: 1,
         autoclose: true,
         startView: 3,
         minView: 3,
         forceParse: false,
         language: 'zh-CN'
	 });
	 
	 //选年月日
	 $("#"+this.formId+" [dateFormat='yyyy-mm-dd']").datetimepicker({
		 format: 'yyyy-mm-dd',
		 weekStart: 1,
         autoclose: true,
         startView: 2,
         minView: 2,
         forceParse: false,
         language: 'zh-CN'
	 });

	 //选年月日 时分秒
	 $("#"+this.formId+" [dateFormat='nomarl']").datetimepicker({
		 weekStart: 1,
         autoclose: true,
         startView: 2,
         minView: 2,
         forceParse: false,
         language: 'zh-CN'
	 });
	
	//下拉框
     $('select.chosen-select-filter').chosen({
     });
}

//加载动态数据源数据
window.echartModel.prototype.loadElementsByAjax =function() { 
	if( !this.formFields ||this.formFields.length <1) return;
	var ob,eleOb,optionDatas=[],optionData,selected;
	for(var i=0;i<this.formFields.length;i++){
		ob=this.formFields[i];
		if(ob.filterType == "selectAjax"){//动态下拉框
			this.setFilter(ob.id);
			var filterSql=this.filterSql;
			if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: ob.selectAjaxSql,filterSql:filterSql }, true)) {
	            if (g.a.OK) {
	                var jsonarrstr = g.a.cReturn.jsonarr,arr=[];
	                if(jsonarrstr) arr=eval(jsonarrstr);
	                var selectHtml=[],eleOb=$("#"+ob.id);
	                if (arr && arr.length > 0){
	                	var arrOb;
	                	optionDatas=ob.optionDatas;
	                	if(optionDatas && optionDatas.length>0){
	                		for(var j=0;j<optionDatas.length;j++){
	                			optionData=optionDatas[j];
	                			selected="";
	                			if(optionData.selected) selected="selected";
	                			selectHtml.push('<option value="'+optionData.value+'" >'+optionData.text+'</option> ');
	                		}
	                		
	                	}
	                	for(var j=0;j<arr.length;j++){
	    					optionData=arr[j];
	    					if(!optionData.key || !optionData.value) continue;
	    					selectHtml.push('<option value="'+optionData.key+'" >'+optionData.value+'</option> ');
	    				}
	                }
	                
	                //旧的选中项
	                var selOption=eleOb.children("option:selected"),selVal;
	                if(selOption.length >0) selVal=selOption.val();
	                
	                eleOb.children("option").remove();
	                eleOb.append(selectHtml.join(""));
	                
	                //重新选中之前的选中项，如果之前的选中项重新加载后存在的话
	                if(selVal && eleOb.children("option[value='"+selVal+"']").length>0 ){
	                	eleOb.children("option").removeAttr("selected");
	                	eleOb.children("option[value='"+selVal+"']").attr("selected","selected");
	                }
	                
	                
	                eleOb.trigger("chosen:updated");
	            }
	        }
		}
	}
}

//加载数据
window.echartModel.prototype.loadData =function() {
	try{
		//this.echart.showLoading();
		
	}catch(e){};
	this.init();
	this.setFilter();
	
	var param={};
	param.maxX=this.maxX;
	param.chartType=this.chartType;
	param.viewKey= "wi_by_asn";
	param.chartReportKey=this.chartReportKey;
	param.chartNoOther=this.chartNoOther;
	param.filterSql=this.filterSql;
	if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getDataByReport", param, false)) {
		var ret = g.a.cReturn;
		
		console.log(ret)
        if (g.a.OK) {
        	if("bar" == this.chartType){//柱状图
        		this.option.xAxis= {
        				boundaryGap: true,//默认true，这时刻度只是作为分隔线，标签和数据点都会在两个刻度之间。
        	            type: 'category',
        	            minInterval: 1,//自动计算的坐标轴最小间隔大小。
        		      data: eval(ret.xAxisArr), //X轴数据
        		      axisLabel: {
        		          interval: 0,// 0 强制显示所有，1为隔一个标签显示一个标签，2为隔两个
        		          textStyle: {
        		              fontSize: 15,//字体大小
        		          }
        		        },
        		    };
                	this.option.legend.data= eval(ret.seriesNameArr);
                	
                	this.option.yAxis= {
        		      type: 'value',
        		      name: this.yTitle,
        		      max:ret.yAxisMax,
        		      axisLine: {
        		        show: true
        		      },
        		      splitLine: {
        		        show: true
        		      },
        		      axisLabel: {}
        		    };
                	
                	this.option.series=eval(ret.seriesArr);
        	}else if("barOne" == this.chartType){//柱状图
        			this.option.xAxis= {
        				boundaryGap: true,//默认true，这时刻度只是作为分隔线，标签和数据点都会在两个刻度之间。
        	            type: 'category',
        		      data: eval(ret.seriesNameArr) //X轴数据
        		    };
                	
                	this.option.yAxis= {
        		      type: 'value',
        		      name: this.yTitle,
        		      max:ret.yAxisMax,
        		      
        		    };
                	
                	this.option.series= [{
                        data: eval(ret.seriesArrData),
                        type: 'bar',
                        smooth: true,
                        barWidth: '22',
                        itemStyle: {
                            normal: {
                                barBorderRadius: 30,
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#00feff'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#027eff'
                                        },
                                        {
                                            offset: 1,
                                            color: '#0286ff'
                                        }
                                    ]
                                )
                            }
                        },
                    }]
        	}else if("line" == this.chartType){//折线图
        		this.option.xAxis= {
        				boundaryGap: true,//默认true，这时刻度只是作为分隔线，标签和数据点都会在两个刻度之间。
        	            type: 'category',
        	            minInterval: 1,//自动计算的坐标轴最小间隔大小。
        		      data: eval(ret.xAxisArr), //X轴数据
        		      axisLabel: {
        		          interval: 0,// 0 强制显示所有，1为隔一个标签显示一个标签，2为隔两个
        		          textStyle: {
        		              fontSize: 15,//字体大小
        		          }
        		        },
        		    };
                	this.option.legend.data= eval(ret.seriesNameArr);
                	
                	this.option.yAxis= {
        		      type: 'value',
        		      name: this.yTitle,
        		      max:ret.yAxisMax,
        		      axisLine: {
        		        show: true
        		      },
        		      splitLine: {
        		        show: true
        		      },
        		      axisLabel: {}
        		    };
                	
                	this.option.series=eval(ret.seriesArr);
        	}else if("lineOne" == this.chartType){//柱状图
        		this.option.xAxis= {
        				boundaryGap: true,//默认true，这时刻度只是作为分隔线，标签和数据点都会在两个刻度之间。
        	            type: 'category',
        		      data: eval(ret.seriesNameArr) //X轴数据
        		    };
                	
                	this.option.yAxis= {
        		      type: 'value',
        		      name: this.yTitle,
        		      max:ret.yAxisMax
        		    };
                	
                	this.option.series= [{
                        data: eval(ret.seriesArrData),
                        type: 'line',
                        smooth: true,
                        barWidth: '11'
                    }]
        	}else if("pie" == this.chartType){//饼状图
        		this.option.legend.data=eval(ret.seriesNameArr);
        		this.option.series=eval(ret.seriesArr);
        	}else{
        		zuiExt.msg({ msg: "图表数据加载失败,原因：未实现的类型", type: "danger"});  
        		return false;
        	}
        	
        	
        	var myChart = echarts.init(document.getElementById(this.echartId),this.chartTheme);
        	myChart.clear();
        	
        	
        	if(this.chartNoTool){//不要操作栏
        		if(this.option.toolbox && this.option.toolbox.feature) this.option.toolbox.feature={};
        		
        	}
        	if(this.chartNoLegend){//不要图例
        		this.option.legend={};
        	}
        	if(this.chartNoTitle){//不要标题
        		this.option.title={};
        	}
        	if(this.chartNoDataZoom){//不要区域缩放
        		if(this.option.dataZoom && this.option.dataZoom[0]) this.option.dataZoom[0].show=false;
        	}
        	if(this.chartNoBG){//不要背景
        		this.option.backgroundColor="";
        	}
        	
        	if(this.chartAxisLabel && this.option.xAxis){//x轴
        		this.option.xAxis.axisLabel=this.chartAxisLabel;
        	}
        	
        	
        	//不要y轴网格线
        	if(true && this.option.yAxis && this.option.yAxis.splitLine){
        		this.option.yAxis.splitLine={ show: false};
        	}
        	if(true && this.option.xAxis && this.option.xAxis.splitLine){
        		this.option.xAxis.splitLine={ show: false};
        	}
        	
        	
        	try{
        		myChart.setOption(this.option);
        		this.echart=myChart;
        	}catch(e){
        		console.log(e)
        	};
            
        }else{
        	zuiExt.msg({ msg: "图表数据加载失败,原因："+ret.ErrMessage, type: "danger"});  
        	
        	return false;
        }
    }
	this.loadElementsByAjax();
	return true;
}
 
 
 