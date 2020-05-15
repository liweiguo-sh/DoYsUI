var barcodeResult = {
    gtin: "",
    expiredDate: "",
    manufactureDate: "",
    lot: "",
    rfid:"",
    sn:"",
    ra:"",
    lotSN:"",
    asn:"",
    osn:"",//耗材外包装序列号（091）
    b30:"",//耗材外包装30标记（意义未知）
    b21:"",//耗材外包装21标记（意义未知）
}
function enterPress(e) {
    var keyNum = 0;
    if (window.event) {// IE
        keyNum = e.keyCode
    }
    else if (e.which) { // Netscape/Firefox/Opera
        keyNum = e.which
    }
    if (keyNum == 13) {//Enter
        e.preventDefault();
        enterCallback(e.currentTarget);
    }else if(keyNum == 12){//入库单号
     e.preventDefault();
        enterCallback(e.currentTarget);
    }
}
function resetScanResult() {
    barcodeResult.gtin = "";
    barcodeResult.expiredDate = "";
    barcodeResult.manufactureDate = "";
    barcodeResult.lot = "";
    barcodeResult.rfid = "";
    barcodeResult.sn = "";
    barcodeResult.ra = "";
    barcodeResult.lotSN = "";
     barcodeResult.osn="";
    //12.19add  通知单扫描（ASN开头）
    barcodeResult.asn = "";
     barcodeResult.b30 = "";
     barcodeResult.b21 = "";
    
}
function barcodeParseInput(src) {
    var arrInput = src.split("\n");
  
    for (var i = 0; i < arrInput.length; i++) {
        var input = arrInput[i];
        var codeType = barcodeType(input);
        if (codeType.equals("HIBC")) {
            result = parseHIBC(input);
        }
        else if (codeType.equals("RFID")) {
            barcodeResult.rfid = input;
        }
        else if (codeType.equals("CODE128")) {
            var arrInput1 = input.split("(");
            for (var j = 0; j < arrInput1.length; j++) {
                result = parseGTIN(barcodeToGTIN(arrInput1[j]));
            }
        }
        else if (codeType.equals("GTIN")) {
            result = parseGTIN(input);
        }
        else if (codeType.equals("NS")) {
            barcodeResult.gtin = input;
        }
        else if (codeType.equals("GTRK")) {
            barcodeResult.gtin = input;
        }
        else if (codeType.equals("SN")) {
            barcodeResult.sn = input;
        }else if (codeType.equals("RA")) {
            barcodeResult.ra = input;
        }
        //12.19add  通知单扫描（ASN开头）
        else if (codeType.equals("ASN")) {
            barcodeResult.asn = input;
        }
        //外包装唯一序列号（091）
        else if (codeType.equals("OSN")) {
            barcodeResult.osn = input;
        }
         else if (codeType.equals("B30")) {
            barcodeResult.b30 = input;
        }else if (codeType.equals("B21")) {
            barcodeResult.b21 = input;
        }
        else {

        }
    }
    
}
function barcodeType(input) {
	
    var prefix = input.substring(0, 1);
    var prefix2 = input.substring(0, 2);
    var prefix4 = input.substring(0, 4);
    var prefix3 = input.substring(0, 3);
     
     
    if (prefix.equals("+")) {
        return "HIBC";
    }
    else if (prefix.equals("(")) {
        return "CODE128"
    }
   else if (((prefix3.equals("012")||prefix2.equals("FA")) && (input.length == 24||input.length == 23) )||(prefix2.equals("F4")&&input.length==11)){
        return "RFID";
    }
    //12.19add  通知单扫描（ASN开头）
    else if (input.indexOf("ASN") >= 0 || prefix2.equals("AN")) {
        return "ASN";
    }

    else if (prefix2.equals("69") && input.length == 13) {
        return "NS";//国标
    }
    else if (prefix4.equals("GTRK")) {
        return "GTRK"; //跟台入库包码
    }
    else if (prefix2.equals("SN")) {
        return "SN"; //
    } else if (prefix2.equals("RA") || prefix2.equals("CA")) {
        return "RA"; //
    }else if (prefix3.equals("091") ) {
        return "OSN"; //
    }else if (prefix2.equals("30") ) {
        return "B30"; //
    }else if (prefix2.equals("21") ) {
        return "B21"; //
    }
    else {
        return "GTIN";
    }
}

function barcodeToGTIN(input) {
    var gtin = "";
    var arrInput = input.split(")");
    if (arrInput.length == 2) {
        gtin = arrInput[0] + arrInput[1]
    }
    return gtin;
}

function parseHIBC(input) {
	// ------------------------------------------------
    var gtin = "";
    var expiredDate = "";
    var lot = "";

    var prefix = input.substring(1, 2);
    //alert(/^[\x00-\xff]/.test(prefix));
    if (/^[A-Za-z]+$/.test(prefix)) {//第二位是字母 -HIBC主码
        gtin = input.substring(1);
        if (barcodeResult.hasOwnProperty("gtin")) barcodeResult["gtin"] = gtin;
        return true;
    }
    else if (prefix.equals("$") || (!isNaN(prefix))) {//第二位是$或者数字 -HIBC辅码
        var len = input.length;
        if (!isNaN(prefix)) {//第一种 YYJJJ +05271LC
            var yy = input.substring(1, 3)
            var jjj = input.substring(3,6)
            expiredDate = JJJtoDate(yy, jjj);
            lot = input.substring(6, len - 2);
        }
        else {
            var prefix4 = input.substring(0, 4);
            if (prefix4.equals("+$$+")) {//第五种 +$$+
                var strnum = input.substring(4, 5);
                if (strnum.equals("2")) {//MMDDYY
                	expiredDate = "20" + input.substring(9, 11) + "-" + input.substring(5, 7) + "-" + +input.substring(7, 9);
                	lot = input.substring(11, len - 2);
                } else if (strnum.equals("3")) {//YYMMDD
                	expiredDate = "20" + input.substring(5, 7) + "-" + input.substring(7, 9) + "-" + +input.substring(9, 11);
                	lot = input.substring(11, len - 2);
                } else if (strnum.equals("4")) {//YYMMDDHH
                	expiredDate = "20" + input.substring(5, 7) + "-" + input.substring(7, 9) + "-" + +input.substring(9, 11);
                	lot = input.substring(13, len - 2);
                } else if (strnum.equals("5")) {//YYJJJ
                    var yy = input.substring(5, 7)
                    var jjj = input.substring(7, 10)
                    expiredDate = JJJtoDate(yy, jjj);
                    lot = input.substring(10, len - 2);
                } else if (strnum.equals("6")) {//YYJJJHH
                    var yy = input.substring(5, 7)
                    var jjj = input.substring(7, 10)
                    expiredDate = JJJtoDate(yy, jjj);
                    lot = input.substring(12, len - 2);
                } else if (strnum.equals("7")) {//
                	expiredDate = "";
                	lot = input.substring(5, len - 2);
                } else {//MMYY
                	expiredDate = "20" + input.substring(6, 8) + "-" + input.substring(4, 6) + "-" + "01";
                	lot = input.substring(8, len - 2);
                }
            }
            else {
                var prefix3 = input.substring(0, 3);
                if (prefix3.equals("+$+")) {//第四种 +$+
                    //null 只有序列号,没得分析
                	lot = input.substring(4, len - 2);
                }
                else if (prefix3.equals("+$$")) {//第三种 +$$
                    var strnum = input.substring(3, 4);
                    if (strnum.equals("2")) {//MMDDYY
                        expiredDate = "20" + input.substring(8, 10) + "-" + input.substring(4, 6) + "-" + +input.substring(6, 8);
                        lot = input.substring(10, len - 2);
                    } else if (strnum.equals("3")) {//YYMMDD
                        expiredDate = "20" + input.substring(4, 6) + "-" + input.substring(6, 8) + "-" + +input.substring(8, 10);
                        lot = input.substring(10, len - 2);
                    } else if (strnum.equals("4")) {//YYMMDDHH
                        expiredDate = "20" + input.substring(4, 6) + "-" + input.substring(6, 8) + "-" + +input.substring(8, 10);
                        lot = input.substring(12, len - 2);
                    } else if (strnum.equals("5")) {//YYJJJ
                        var yy = input.substring(4, 6)
                        var jjj = input.substring(6, 9)
                        expiredDate = JJJtoDate(yy, jjj);
                        lot = input.substring(9, len - 2);
                    } else if (strnum.equals("6")) {//YYJJJHH
                        var yy = input.substring(4, 6)
                        var jjj = input.substring(6, 9)
                        expiredDate = JJJtoDate(yy, jjj);
                        lot = input.substring(11, len - 2);
                    } else if (strnum.equals("7")) {//
                        expiredDate = "";
                        lot = input.substring(4, len - 2);
                    } else {//MMYY                          
                        expiredDate = "20" + input.substring(5, 7) + "-" + input.substring(3, 5) + "-" + "01";
                        lot = input.substring(7, len - 2);
                    }
                }
                else {
                    var prefix2 = input.substring(0, 2);
                    if (prefix2.equals("+$")) {//第二种 +$
                        expiredDate = "";
                        lot = input.substring(2, len-2);
                    } else {
//                        showWarn("无法识别的HIBC码，请检查。");
                        return false;
                    }
                }
            } 
        }
        if (barcodeResult.hasOwnProperty("gtin")) barcodeResult["gtin"] = gtin;
        if (barcodeResult.hasOwnProperty("manufactureDate")) barcodeResult["manufactureDate"] = "";
        if (barcodeResult.hasOwnProperty("expiredDate") && !expiredDate.equals("")) barcodeResult["expiredDate"] = expiredDate;
        if (barcodeResult.hasOwnProperty("lot") && !lot.equals("")) barcodeResult["lot"] = lot;
        return true;
    } else {
//        showWarn("无法识别的HIBC码，请检查。");
        return false;
    }
}

function parseGTIN(input) {
	var gtin = "";
    var expiredDate = "";
    var lot = "";
    var manufactureDate = "";
    
    var prefix = input.substring(0, 2);
    var prefix1 = input.substring(0, 1);
    var prefix4 = input.substring(0, 4);
    if (prefix.equals("10") && input.length > 2) {//批次号
        lot = input.substring(2);
        if(manufactureDate.equals("")){
            var day
        if(input.substring(6, 8).equals("00")){
        day='01';
        } else {
            if (parseInt(input.substring(6, 8)) > 30 && parseInt(input.substring(4, 6))!=2) {
                day = parseInt(input.substring(6, 8)) - (parseInt(input.substring(6, 8)) - 30);
            }
         else if(parseInt(input.substring(4, 6))==2&&parseInt(input.substring(6, 8)) > 30){
            day = parseInt(input.substring(6, 8)) - (parseInt(input.substring(6, 8)) - 28);
         }else{
              day=input.substring(6,8);
              }
        }
       // manufactureDate = "20" + input.substring(2, 4) + "-" + input.substring(4, 6) + "-" + day;
        }
    }
    else if (prefix.equals("21") && input.length > 2) {//批次序列号，作为批次号使用
        barcodeResult.lotSN = input.substring(2);
        if(manufactureDate.equals("")){
            var day
        if(input.substring(6, 8).equals("00")){
        day='01';
        }else{
            if (parseInt(input.substring(6, 8)) > 30 && parseInt(input.substring(4, 6))!=2) {
                day = parseInt(input.substring(6, 8)) - (parseInt(input.substring(6, 8)) - 30);
            }
         else if (parseInt(input.substring(4, 6))==2&&parseInt(input.substring(6, 8)) > 30){
            day = parseInt(input.substring(6, 8)) - (parseInt(input.substring(6, 8)) - 28);
         }else{
              day=input.substring(6,8);
              }
        }
        //manufactureDate = "20" + input.substring(2, 4) + "-" + input.substring(4, 6) + "-" + day;
        }
    }
    else if (prefix.equals("91") && input.length > 2) {//序列号，作为批次号使用
        barcodeResult.lotSN = input.substring(2);
    }
    else if (prefix.equals("11") && input.length == 8) {//生产日期
    var day
        if(input.substring(6, 8).equals("00")){
        day='01';
        }else{
        day=input.substring(6,8);
        }
    	manufactureDate = "20" + input.substring(2, 4) + "-" + input.substring(4, 6) + "-" + day;
    	
    }
    else if (prefix.equals("12") && input.length == 8) {//到期日期   暂用效期
      var day
        if(input.substring(6,8).equals("00")){
        day='01';
        }else{
        day=input.substring(6,8);
        }
    	expiredDate = "20" + input.substring(2, 4) + "-" + input.substring(4, 6) + "-" + day;
    }
    else if (prefix.equals("17") && input.length == 8) {//效期
     var day
        if(input.substring(6, 8).equals("00")){
        day='01';
        }else{
        day=input.substring(6,8);
        }
    	expiredDate = "20" + input.substring(2, 4) + "-" + input.substring(4, 6) + "-" +day;
    }
    else if (prefix.equals("13") || prefix.equals("15") || prefix.equals("20") ||
     prefix.equals("22") || prefix.equals("23") || prefix.equals("24") || prefix.equals("25")) {
        //不用解析的辅码
    }
    else if (prefix.equals("(10)") && input.length > 2) {//批次号
        lot = input.substring(4);
    }
    else if (prefix.equals("(11)") && input.length == 10) {//生产日期
    var day
        if(input.substring(8,10).equals("00")){
        day='01';
        }else{
        day=input.substring(8,10);
        }
    	manufactureDate = "20" + input.substring(4, 6) + "-" + input.substring(6, 8) + "-" + day;
    }
    else if (prefix.equals("(12)") && input.length == 10) {//到期日期   暂用效期
     var day
        if(input.substring(8,10).equals("00")){
        day='01';
        }else{
        day=input.substring(8,10);
        }
        expiredDate = "20" + input.substring(4, 6) + "-" + input.substring(6, 8) + "-" + day;
    }
    else if (prefix.equals("(17)") && input.length == 10) {//效期
    var day
        if(input.substring(8,10).equals("00")){
        day='01';
        }else{
        day=input.substring(8,10);
        }
        expiredDate = "20" + input.substring(4, 6) + "-" + input.substring(6, 8) + "-" + day;
    }
    //2017-03-01新增括号识别
    else {//if ((prefix.equals("01") && input.length == 16) || input.length == 13 || (prefix.equals("00") && input.length == 20)) {//gtin
        //if (input.length == 13) {
        //    gtin = input;
        //}
        //else {
        //    gtin = input.substring(2);
        //}

        if (prefix.equals("01") || prefix.equals("00")){
            gtin = input.substring(2); 
        }
        else {
            gtin = input;
        }
    }
    if (barcodeResult.hasOwnProperty("gtin")) barcodeResult["gtin"] = gtin;
    if (barcodeResult.hasOwnProperty("manufactureDate") && !manufactureDate.equals("")) barcodeResult["manufactureDate"] = manufactureDate;
    if (barcodeResult.hasOwnProperty("expiredDate") && !expiredDate.equals("")) barcodeResult["expiredDate"] = expiredDate;
    if (barcodeResult.hasOwnProperty("lot") && !lot.equals("")) barcodeResult["lot"] = lot;
    return true;
}

function JJJtoDate(yy, jjj) {
    var sd = "20" + yy + "-01-01";
    var date = new Date(sd);
    jjj = jjj - 1;
    var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + jjj);

    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();

    if (month < 10) {
        month =""+ "0" + month;
    }

    var str = year + "-" + month + "-" + day;

    return str;
}