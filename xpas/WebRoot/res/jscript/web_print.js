/**
 * web打印
 */
var WebPrint = {};

(function () {
    /**编码
   * */
    WebPrint.encode = function (str) {
        return encodeURI(str);
    }
    /**解码
     * */
    WebPrint.decode = function (str) {
        return decodeURI(str, "UTF-8");
    }
    /**打印送货单
     * vf
     * grid
     * */
    WebPrint.goPrintSHD = function (vf, dtlGrid) {
        WebPrint.vf = vf;

        //默认使用条形码
        var toUrl = g.appPath + "project/xpas/html/util/print-shd.html?v=20191023";
        try {
            var companyIdMi = topWin.companyIdMi;
            if (companyIdMi == 1613) { //蚌埠3院
                toUrl = g.appPath + "project/g_mscm/html/asn/print-shd-bengbu.html";
            }
        } catch (e) {
            console.log(e);
        }

        //有些医院内外网隔离，则使用二维码作为接收货
        if (vf.printqrCode) { //打印二维码
            if (vf.printqrCode == "1") { //主子表信息在一个二维码内
                toUrl = g.appPath + "project/xpas/html/util/print-shd-qrCode.html";
            } else if (vf.printqrCode == "2") { //主子表信息分离,明細二維碼在最後
                toUrl = g.appPath + "project/xpas/html/util/print-shd-qrCode2.html";
            } else if (vf.printqrCode == "3") { //主子表信息分离,明細二維碼追加到列表
                toUrl = g.appPath + "project/xpas/html/util/print-shd-qrCode3.html";
            } else if (vf.printqrCode == "4") { //主子表信息分离,明細二維碼合成一個
                toUrl = g.appPath + "project/xpas/html/util/print-shd-qrCode4.html";
            }
        }
        WebPrint.dtlGrid = dtlGrid;
        var prop = {
            menu: "打印送货单",
            text: "打印送货单",
            parent: win,
            noTitle: true,
            url: toUrl,
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winSHD.window.init(WebPrint.vf, WebPrint.dtlGrid);
            }]
        };
        var para = { vf: vf, dtlGrid: dtlGrid };
        prop.windowState = "maximized";
        //prop.noTitle = true;
        WebPrint.winSHD = topWin.openView(prop, para);
    };


    /**打印条码
     * vf
     * grid
     * */
    WebPrint.goPrintBarCode = function (vf, dtlGrid, dtl2) {
        WebPrint.vf = vf;
        WebPrint.dtlGrid = dtlGrid;
        WebPrint.dtl2 = dtl2;
        var prop = {
            menu: "打印送货单",
            text: "打印送货单",
            parent: win,
            url: g.appPath + "project/xpas/html/util/print-2code.html",
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winBarCode.window.init(WebPrint.vf, WebPrint.dtlGrid, WebPrint.dtl2);
            }]
        };
        var para = { vf: vf, dtlGrid: dtlGrid };
        //prop.windowState = "maximized";
        //prop.noTitle = true;
        WebPrint.winBarCode = topWin.openView(prop, para);
    };

    /* 判断字符串是否为null和空,为空或null时，返回false
     */
    WebPrint.strNotNull = function (result) {
        var flag = false;
        if (result != 'undefined' && result != undefined && result != 'null' &&
            result != null) {
            if (typeof (result) == 'string') {
                result = result.replace(/\s/g, '');
                if (result != '')
                    flag = true;
            } else {
                flag = true;
            }
        }
        return flag;
    };

    /* 获取对象属性，各种空时返回""
     */
    WebPrint.getObjStr = function (obj, strNew) {
        if (null == obj || undefined == obj || "undefined" == obj || "null" == obj || "NULL" == obj || "" == $.trim(obj)) {
            obj = "";
            if (WebPrint.strNotNull(strNew)) obj = strNew;
        }
        return obj;
    };

    /**四舍五入，保留2位小数
     * 	num 数字字符串或者数字			
     * */
    WebPrint.toFixed = function (num, fixedNum) {
        if (!fixedNum) fixedNum = 2;
        return (WebPrint.getObjStr(num, 0) - 0).toFixed(fixedNum);
    };

    /**格式化日期
     * 	dateStr		日期字符串
     * 	format  	格式化参数  yyyy-mm-dd
     * */
    WebPrint.dateFormat = function (dateStr, type) {
        if (!WebPrint.strNotNull(dateStr)) return "";
        var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
        var mm = date.getMonth() + 1;
        //月
        var dd = date.getDate();
        //日
        var yy = date.getFullYear();
        //年
        if (type == "d") {
            return dd;
        } else if (type == "md") {
            return mm + "-" + dd;
        } else if (type == "ymd") {
            return yy + "-" + mm + "-" + dd;
        }
    };



    /**打印单据模板
	 * vf	表单对象
	 * grid
	 var param={
			title:"打印标题",
			
			//表单信息
			form:{
				ths:[
					{text:"出库日期",value:"2019-03-26"},
					{text:"出库人",value:"dev"},
					{text:"字段1",value:"1"},
					{text:"字段2",value:"2"},
					{text:"字段3",value:"3"},
				]
			},
			
			grid:{
				//明细网格的表头，从左到右
				ths:["耗材名称","规格"],
				
				//明细网格数据，从左到右，没有的填空或者0
				data:[
					["手术刀","1*15"],
					["手术刀","1*15"],
					["手术刀","1*15"],
					["手术刀","1*15"]
				]
			}
		};
	  WebPrint.goPrintFormModel(param);
	};
	
	
 var data = distAdd.gwWoDtl.dtbViewData;
  var param = {
    title: "科室请领出库单",
    titleCss: "color:red;",  //标题样式
    printNow:false, //直接打印
    colNumThs:4, //表头每行多少列，默认为4
    colNumTfooters:4, //表尾每行多少列，默认为4
    pageRowNum:25, //每页数量
	pageFixed:"pf2",//固定位置
    afterInit:function(grid,printTitle,printHead,printFooter){ //初始化完成后调用
    	if(grid){
    		grid.find(".datarow").each(function(){
    			var row=$(this);
    			var td2=row.children("td:eq(1)");
    			if(td2.text() == "合计"){
    				td2.css({"text-align":"center","font-size":"13px","font-weight":"bold"});
    			}
    			
    		})
    	}
    },
    sumTableFun:function(jqPageTable){//打印汇总函数，即每个分页最后一行汇总行的处理方法，可以不传，可以参考 balance_matr.html 用法
    	var trRet=["<tr>"];
    	
    	//合计标题列和空列
    	trRet.push("<td>合计</td>");
    	trRet.push("<td></td>");
    	trRet.push("<td></td>");
    	trRet.push("<td></td>");
    	trRet.push("<td></td>");
    	trRet.push("<td></td>");
    	
    	
    	//合计列
    	var sumqtyin=0;
    	jqPageTable.find(".datarow").each(function(){
    		var tr=$(this);
    		var thqtyin=parseFloat(tr.children("td:eq(5)").text());
    		if(!isNaN(thqtyin)) sumqtyin+=thqtyin;
    	});
    	trRet.push("<td>"+sumqtyin.toFixed(2)+"</td>");
    	
    	trRet.push("</tr>");
    	return trRet.join("");
    },
    form: {
      ths: [
        {text:"领用科室",value: distAdd.storageTo.value,cssLable:"color:blue;",cssText:"color:green;"},
        {text:"出库日期",value: new Date()},
        {text:"单号",value: distAdd.tapplyDistKey.value}
      ],
      tfooters: [//底部信息区，不需要的话不传
        {text:"创建人",value: frm._ccreator.value, colspan: 7,cssLable:"color:blue;",cssText:"color:green;" },
        {text:"审核人",value:""},
        {text:"接受人",value:""},
        {text:"备注",value:""}
      ]
    },
    grid: {
      ths: ["序号", "物资名称", "规格", "数量", "单位", "单价", "金额", "科室库存"],
      thwidths: ["1px|1%|auto"],//列宽度，跟ths一一对应，未指定则auto
      thstyles: [null, null, "color:blue", null, null, null, null, null],   	//表头列样式，跟ths一一对应，未指定则无
     tdstyles: [null, null,  "color:blue", null, null, null, null, null],		//表单元格样式，跟ths一一对应，未指定则无
      data: (function(){
        var arr=[],row;
        if(data && data.rowCount>0){
          for(var i in data.rows){
            row=data.rows[i];
            var price_sp=parseFloat(row["price_sp"].value);
            if(isNaN(price_sp)) price_sp=0;

            arr.push([(parseInt(i)+1), row["material_name"].value, row["material_spec"].value, row["qty"].value,
            row["matr_unit"].value, row["price_sp"].value, row["qty"].value.toInt() * price_sp, ""]);
          }
        }
        return arr;
      })()
    }
  };

  WebPrint.goPrintFormModel(param);
	 * */
    WebPrint.goPrintFormModel = function (param) {
        if (!param || !(param.grid) || !(param.grid.data) || param.grid.data.length < 1) {
            alert("没有可打印的数据!");
            return;
        }
        var prop = {
            windowState: "maximized",
            noTitle: true,
            modal: false,
            //parent: win,
            text: param.title || "数据报表",
            url: g.appPath + "project/xpas/html/util/print-form-model.html?v=20191128",
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winSHD.window.init(param);
            }]
        };
        var para = {};
        WebPrint.winSHD = topWin.openView(prop, para);
    };


    /**打印条码
	 * 
	 		var param={snFieldName:"sn_no"};
        	
        	param.list=[
        		{
        			text:"材料编号",
        			name:"material_code",
        			lableCol:3,
        			valueCol:9
        		},
        		{
        			text:"材料名称",
        			name:"material_name",
        			lableCol:3,
        			valueCol:9
        		},
        		{
        			text:"规格型号",
        			name:"material_spec",
        			lableCol:3,
        			valueCol:9
        		},
        		{
        			text:"生产批次",
        			name:"lot",
        			lableCol:3,
        			valueCol:9
        		},
        		{
        			text:"生产日期",
        			name:"manufacture_date",
        			lableCol:3,
        			valueCol:3,
        			isYMD:true
        		},
        		{
        			text:"失效日期",
        			name:"expired_date",
        			lableCol:3,
        			valueCol:3,
        			isYMD:true
        		},
        		{
        			text:"厂商",
        			name:"manufacturer_name",
        			lableCol:3,
        			valueCol:9
        		}
        	];
            WebPrint.goPrintBarCodeModel(detailGrid.dtbViewData.rows,param);
	 * rows
	 * param
	 * */
    WebPrint.goPrintBarCodeModel = function (rows, param) {
        //必要检验
        if (!param) param = {};

        if (!param.snFieldName) {
            alert("缺少参数【snFieldName】");
            return;
        }

        if (!rows || rows.length < 1) {
            alert("没有可打印的条码信息");
            return;
        }

        var have = false,
            snval;

        for (var i = 0; i < rows.length; i++) {
            snval = rows[i][param.snFieldName] ? rows[i][param.snFieldName].value : "";
            if (snval.length > 1) {
                have = true;
                break;
            }
        }

        if (!have) {
            alert("没有可打印的条码信息");
            return;
        }

        WebPrint.rows = rows;
        WebPrint.param = param;
        var prop = {
            menu: "打印",
            text: "打印",
            parent: win,
            url: g.appPath + "project/xpas/html/util/print-barcode-model.html",
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winBarCode.window.init(WebPrint.rows, WebPrint.param);
            }]
        };
        var para = {};
        WebPrint.winBarCode = topWin.openView(prop, para);
    };

    // RFID 加工定数包时，打印定数包的基础信息
    WebPrint.goPrintBarCodeModelByRFID = function (rows, param) {
        //必要检验
        if (!param) param = {};

        if (!param.snFieldName) {
            alert("缺少参数【snFieldName】");
            return;
        }

        if (!rows || rows.length < 1) {
            alert("没有可打印的条码信息");
            return;
        }

        // var have=false,snval;

        // for(var i=0;i<rows.length;i++){
        // 	snval=rows[i][param.snFieldName]?rows[i][param.snFieldName].value:"";
        // 	if(snval.length >1){
        // 		have=true;
        // 		break;
        // 	}
        // }

        // if(!have){
        // 	alert("没有可打印的条码信息");
        // 	return;
        // }

        WebPrint.rows = rows;
        WebPrint.param = param;
        var prop = {
            menu: "打印",
            text: "打印",
            parent: win,
            url: g.appPath + "project/xpas/html/util/print-barcode-model.html",
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winBarCode.window.init(WebPrint.rows, WebPrint.param);
            }]
        };
        var para = {};
        WebPrint.winBarCode = topWin.openView(prop, para);
    };

    /**其他参数 参考 goPrintFormModel
     var param={};
	 param.data=gwWiDtl.dtbViewData.rows;
	 param.dataSql="select ";
	 param.printsettype="printset_hpw";
	 WebPrint.goPrintFormModelBySet(param);
     * */
    WebPrint.goPrintFormModelBySet = function (param) {
    	var arrBySql=false;
        if (!param.printsettype || param.printsettype.length < 1) {
            alert("goPrintFormModelBySet，缺少参数【printsettype】)");
            return;
        }
        
        //查询配置模板
        var paramSet;
        var selectAjaxSql = "select * from T_PRINTSET where type='" + param.printsettype + "'";
        if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: selectAjaxSql }, true)) {
            if (g.a.OK) {
                var jsonarrstr = g.a.cReturn.jsonarr, arr = [];
                if (jsonarrstr) arr = eval(jsonarrstr);
                if (arr && arr.length > 0 && arr[0].param) {
                    paramSet = eval(WebPrint.decode(arr[0].param))[0];
                }
            }
        }
        if (!paramSet) {
            alert("goPrintFormModelBySet，未找到有效打印模版信息,printsettype="+param.printsettype);
            return;
        }
        
        if(paramSet.grid && paramSet.grid.dataSql){
        	param.dataSql=paramSet.grid.dataSql;
        }
        
        
        //查询数据
        if(param.dataSql){
        	var arr=null;
            if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: param.dataSql }, true)) {
                if (g.a.OK) {
                     var jsonarrstr = g.a.cReturn.jsonarr, arr = [];
       				if (jsonarrstr) arr = eval(jsonarrstr);
                }
            }
            if(!arr || arr.length <1){
                alert("goPrintFormModelBySet，没有可打印的数据,dataSql查询结果为空");
            	return;
            }
            
            if(!arr || arr.length <1){
                alert("goPrintFormModelBySet，没有可打印的数据,dataSql查询结果为空");
            	return;
            }
            arrBySql=true;
            param.data=arr;
        }



        //查询全局配置，可以为空
        var paramSetGlobal;
        var selectAjaxSql = "select * from T_PRINTSET where type='printset_global'";
        if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: selectAjaxSql }, true)) {
            if (g.a.OK) {
                var jsonarrstr = g.a.cReturn.jsonarr, arr = [];
                if (jsonarrstr) arr = eval(jsonarrstr);
                if (arr && arr.length > 0 && arr[0].param) {
                    paramSetGlobal = eval(WebPrint.decode(arr[0].param))[0];
                }
            }
        }
        if (paramSetGlobal) {
            if (paramSetGlobal.afterInitGlobal) paramSet.afterInitGlobal = paramSetGlobal.afterInitGlobal;
            if (paramSetGlobal.sumTableFunGlobal) paramSet.sumTableFunGlobal = paramSetGlobal.sumTableFunGlobal;
        }
        paramSet.arrBySql=arrBySql;
        //根据配置模板解析数据
        var dataPrint = [], rowData, row,rowCol, rowColVal,fieldName;
        
        if(paramSet.arrBySql){
            for (var i in param.data) {
                row = param.data[i];
                rowData = [];
                for (var j in paramSet.grid.thsfield) {
                    fieldName = paramSet.grid.thsfield[j];
                    
                    
                    if(arrBySql){
                    	rowCol=row[fieldName];
                        if(typeof(rowCol) == "object"){
                        	rowColVal=rowCol.value?rowCol.value:"无";
                        }else{
                        	rowColVal=rowCol;
                        }
                    	
                    }else{
                    	rowColVal=row[fieldName] ? row[fieldName].value : "无";
                    	
                    }
                    
                    if (fieldName == "index") {
                        rowData[0] = (parseInt(i) + 1);
                    } else {
                        rowData[j] = rowColVal;

                    }

                }
                dataPrint.push(rowData);
            }
        }else{
        	for (var i in param.data) {
        		row = param.data[i];
        		rowData = [];
        		for (var j in paramSet.grid.thsfield) {
        			fieldName = paramSet.grid.thsfield[j];
        			if (fieldName == "index") {
        				rowData[0] = (parseInt(i) + 1);
        			} else {
        				if(row[fieldName]){
        					rowData[j] = row[fieldName] ? row[fieldName].value : "无";
        				}else{
        					rowData[j] = row[j];
        				}
        				
        			}
        			
        		}
        		dataPrint.push(rowData);
        	}
        }
        
        if (!dataPrint || dataPrint.length <1) {
            alert("goPrintFormModelBySet，没有可打印的数据");
            return;
        }
        
        
        paramSet.grid.data = dataPrint;


        //使用百分比时，列宽由表格宽度和列宽度设定。
        paramSet.gridCss = "table-layout: fixed;";

        var prop = {
            parent: win,
            url: g.appPath + "project/xpas/html/util/print-form-model.html?v=20191128",
            afterLoadEvents: [function () { //窗口加载完成后执行
                WebPrint.winSHD.window.init(paramSet);
            }]
        };
        var para = {};
        prop.windowState = "maximized";
        //prop.noTitle = true;
        WebPrint.winSHD = topWin.openView(prop, para);
    };
    
    /**查询校验打印模版项是否存在
     * @param printsettype 打印模版项标识
     * @return true 存在 并且 配置正常
     * @use 	WebPrint.checkPrintset("printset_tdeptbill");
    * */
   WebPrint.checkPrintset = function (printsettype) {

       //查询配置模板
       var ret=false;
       var selectAjaxSql = "select * from T_PRINTSET where type='" + printsettype + "'";
       if (g.a.send("processType=com.xznext.report.EchartModelView&actionType=getSelectAjax", { viewKey: "wi_by_asn", selectAjaxSql: selectAjaxSql }, true)) {
           if (g.a.OK) {
               var jsonarrstr = g.a.cReturn.jsonarr, arr = [];
               if (jsonarrstr) {
            	   ret=true;
               }
           }
       }
       return ret
    }

})();