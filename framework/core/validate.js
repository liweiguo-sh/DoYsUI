/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-09-05
 * Modify Date: 2021-09-05
 * Copyright 2021, doys-next.com
 * validate data
 */

(function () {
    window.validate = {};
})()

// -- base validate -----------------------------------------------------------
validate.dbFieldName = function (value) {
    if (!value) return "不允许为空。";

    let first = value.substring(0, 1);
    if (!validate.english(first) && !validate.chinese(first)) {
        // -- 不是英文字母开头，也不是中文开头 --
        return "必须以英文字母或中文开头。";
    }

    let arr = value.split("");
    for (let i = 1; i < arr.length; i++) {
        let str = arr[i];
        if (!validate.fieldChar(str) && !validate.chinese(str)) {
            // -- 不是标准字段字符，也不是中文字符 --
            return "必须是英文字母、数字、下划线或中文组成。";
        }
    }
    return true;
};

// -- base validate -----------------------------------------------------------
validate.english = function (value) {
    // -- 判断是否是英文字母(包括大写和小写)(不包括标点符号) --
    let regex = /^[A-Za-z]+$/;
    return regex.test(value);
}
validate.chinese = function (value) {
    // -- 判断是否是汉字(包括繁体字)，中文标点符号不属于汉字 --
    let regex = /\p{Unified_Ideograph}/u;
    return regex.test(value);
}

validate.fieldChar = function (value) {
    // -- 判断是否字段字符组成的字符串，包括英文字母、数字、下划线 --
    let regex = /^[0-9a-zA-Z_]{1,}$/;
    return regex.test(value);
}