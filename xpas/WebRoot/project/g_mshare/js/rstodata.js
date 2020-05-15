<!--data 转换成json-->
 function todatatable(rs) {
   var rows = [];
	    var row1 = {};
	    for (var i = 0; i < rs.rowCount; i++) {
	        var rowstr = '{';
	        for (var j = 0; j < rs.columnCount; j++) {
	            if (j == 0) {
	                var vale = i + 1;
	                rowstr = rowstr + '"no":' + '"' + vale + '",';
	            }
	            else {
	                rowstr = rowstr + '"' + rs.columns[j].name + '" :"' + rs.rows[i][rs.columns[j].name].value + '",';
	            }
	        }
            if(rowstr.length>4){
             rowstr= rowstr.substring(0, rowstr.length-1);
            }
            row1=JSON.parse(rowstr+"}");
	        rows.push(row1);
	    }
	    return rows;
}
<!--datatable 转换成企业ID 集合-->
function getids1(rs){
   var ids="";
   for(var i=0;i<rs.rowCount;i++){
   ids+=rs.rows[i]['company_id_from'].value;
   }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}

<!--datatable 转换成资质ID 集合-->
function getids2(rs){
   var ids="";
   for(var i=0;i<rs.rowCount;i++){
   ids+=rs.rows[i]['cert_id'].value+"-"+rs.rows[i]['my_cert_id'].value+ ",";
   }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}
<!--json 转换成企业ID 集合-->
function getidsbyrows1(rs){
    var ids = "";
    if (rs.length > 0) {
        for (var i = 0; i < rs.length; i++) {
            ids += rs[i].company_id_from+",";
        }
    }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}
<!--json 转换成耗材ID 集合-->

function getmatridsbyrows1(rs){
   var ids="";
    for(var i=0;i<rs.length;i++){
        ids += rs[i].my_matr_id + ",";
   }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}
<!--json 转换成通用ID 集合-->

function getcatelogidsbyrows(rs){
   var ids="";
    for(var i=0;i<rs.length;i++){
        ids += rs[i].cert_category_id + ",";
   }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}

<!--json 转换成资质ID 集合-->
function getidsbyrows2(rs){
   var ids="";
   for(var i=0;i<rs.length;i++){
   ids+=rs[i].cert_id+"-"+rs[i].my_cert_id+ ",";
   }
   if(ids.length>0){
   ids=ids.substring(0, ids.length - 1);
   }
   return ids;
}



  function refreshno(rows) {
        for (var i = 0; i < rows.length; i++) {
            rows[i].no = i + 1;
            rows[i].operate = "<i class='fa fa-close'  style='color:#E74C3C;cursor:pointer' ><span   onclick='delcom(" + i + ")'>删除</span></i> ";
        }
        return rows;
    }
      function refreshnomatr(rows) {
        for (var i = 0; i < rows.length; i++) {
            rows[i].no = i + 1;
            rows[i].operate = "<i class='fa fa-close'  style='color:#E74C3C;cursor:pointer' ><span   onclick='delmatr(" + i + ")'>删除</span></i> ";
        }
        return rows;
    }
    
    
    <!--上传企业图标---->
  function btnUpload_click() {
		var prop = {
		  parent: win
		};
		var para = {
			target : "g_mshare.file_center.UploadFileCommon",
			uploadType : "logo",
			fileName : "",
			callback : callback1,
            parent:win
		};
		topWin.uploadFile(prop, para);
		return false;
	}

	function callback1(paraString) {
		var ps =paraString;
		if (g.a.send("processType=g_mshare.base.certCompany&actionType=uplogo", {   "viewKey": "receive","fileUrl":ps.fileUrl}, true)) {
             if (g.a.OK) {
             $("#logo").attr('src',ps.fileUrl);
             }
             else {
                return false;
            }
        }
		
		
	}
	<!--维护资质方法---->
	function btnCreateNewCert_click(rs,company_id) {
		var docPara = {
			companyId:company_id,
			certCategoryId:rs.cert_category_id,
			certVersion:parseInt(rs.cert_version)+1,
			certName:rs.cert_name,
			myCertId:rs.my_cert_id
		};
		var para = {
			viewKey: "base_cert",
            primaryKey: "cert_id," + rs.cert_id,
			isAddnew: false,
			docPara:docPara,
			afterClose:afterCertClose1
		};
		var prop = {
			text: "资质信息",
			parent: win,
			url: g.appPath + "project/g_mshare/html/base/cert.html"
		};
		topWin.openWindow(prop, para);
	}
     function btnEditCert_click(rs) {
		
		var para = {
			viewKey: "base_cert",
			isAddnew: false,
			docPara: null,
			primaryKey: "cert_id," + rs.cert_id,
			afterClose: afterCertClose2,
			readonly:false
		};
		var prop = {
			text: "资质信息",
			parent: win,
			url: g.appPath + "project/g_mshare/html/base/cert.html"
		};
		topWin.openWindow(prop, para);
	} 
	
	function btnEditCert_click_read(rs) {
		
		var para = {
			viewKey: "base_cert",
			isAddnew: false,
			docPara: null,
			primaryKey: "cert_id," + rs.cert_id,
			afterClose: afterCertClose3,
			readonly:true
		};
		var prop = {
			text: "资质信息",
			parent: win,
			url: g.appPath + "project/g_mshare/html/base/cert.html"
		};
		topWin.openWindow(prop, para);
	}
	
function afterCertClose1(invokePara, certId){
	
               callback();
             
         
        
	}

    	
function afterCertClose2(invokePara, certId){
	
               callback();
         
        
	}

        	
function afterCertClose3(invokePara, certId){
	
               callback();
         
        
	}
	<!--获取表格中指定行数据--->
	function getRow(rs,no){
	        var row;
            for(var i=0;i<rs.length;i++){
              if(rs[i].no.equals(no+1)){
                row=rs[i];
              return row;
              }
            }
	return row;
	}