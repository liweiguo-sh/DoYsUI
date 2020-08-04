/**
 * DoYs.user.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-08-03
 * Copyright 2020, doys-next.com
 */

(function () {
    window.UtilUser = {
        MD5_SPLIT: "^",
        MD5_KEY: "doys-next.com"
    }
})()

UtilUser.passwordMD5 = function (userPk, password) {
    return $.md5(userPk + UtilUser.MD5_SPLIT + password + UtilUser.MD5_SPLIT + UtilUser.MD5_KEY);
};
UtilUser.passwordLoginMD5 = function (passwordMD5, loginTime) {
    return $.md5(passwordMD5 + UtilUser.MD5_SPLIT + loginTime.substring(2));
};