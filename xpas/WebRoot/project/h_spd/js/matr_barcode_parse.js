/**
* Material Barcode Parse
* Author: Volant Lee
* Create Date: 2019-11-22
* Copyright 2019-2019, xpas-next.com
* Description: 物料条码解析
*/

var mbp = {};

mbp.getBarcodeType = function (code) {
    var codeType = "";
    // ----------------------------------------------------
    if (code.length < 5) {
        codeType = "invalid";
    }
    else if ((code.substring(0, 2).equals("AN") && code.length == 11) || code.substring(0, 4).equals("ASN_")) {
        codeType = "ASN";
    }
    else if ((code.substring(0, 2).equals("00") && code.length == 20)
        || (code.substring(0, 2).equals("01") && code.length == 16)
        || (code.substring(0, 2).equals("69") && code.length == 13)) {
        codeType = "GTIN";
        /**
         * 69开头的13位条码视为GTIN
        */
    }
    else if (code.substring(0, 2).equals("10")) {
        codeType = "LOT";
    }
    else if (code.substring(0, 2).equals("11") && code.length == 8) {
        codeType = "MFG_DATE";
    }
    else if (code.substring(0, 2).equals("17") && code.length == 8) {
        codeType = "EXP_DATE";
    }
    else if (code.substring(0, 2).equals("91")) {
        codeType = "ignore";
    }
    else if (code.substring(0, 2).equals("91")) {
        codeType = "ignore";
    }
    else if (code.substring(0, 2).equals("F4") && code.length >= 11) {
        codeType = "RFID";
    }
    else {
        codeType = "unknown";
    }
    // ----------------------------------------------------
    if (codeType.equals("invalid")) {
        throw "条码格式无效";
    }
    return codeType;
};
// ----------------------------------------------------------------------------
mbp.getGtin = function (code) {
    var gtin = code.substring(2);
    return gtin;
};

// -- lot/mfg_date/exp_date/rfid ----------------------------------------------
mbp.getLot = function (code) {
    var lot = code.substring(2);
    return lot;
};

mbp.getMfgDate = function (code) {
    var mfgDate = mbp.parseDate(code);
    return mfgDate;
};
mbp.getExpDate = function (code) {
    var expDate = mbp.parseDate(code);
    return expDate;
};

mbp.parseDate = function (code) {
    var YYYYMMDD = "", YY = "", MM = "", DD = "";

    if (code.length == 8) {
        code = code.substring(2);
    }
    if (code.length != 6) {
        throw "效期格式错误";
    }

    YY = code.substring(0, 2);
    MM = code.substring(2, 4);
    DD = code.substring(4, 6);
    YYYYMMDD = "20" + YY + "-" + MM + "-" + DD;

    return YYYYMMDD;
};

mbp.getRfid = function (code) {
    var rfid = code;
    return rfid;
};