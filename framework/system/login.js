/**
 * DoYs.login.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-04-11
 * Copyright 2020, doys-next.com
 */
function login(para) {
    const promise = new Promise(function (resolve, reject) {
        let paraLogin = {
            userkey: para.userkey.toLowerCase(),
            password: para.password,
            verifyCode: para.verifyCode,
            loginTime: (new Date()).getTime().toString()
        }
        paraLogin.password = $.md5($.md5(para.userkey + "^" + para.password + "^doys-next.com") + "^" + paraLogin.loginTime.substring(2));
        ajax.send("/user/login", paraLogin).then(response => {
            if (response.ok) {
                if (para.urlMain) {
                    let arrPara = new Array();

                    setLocalItem("login.remenber", app.remenber ? "1" : "0");
                    if (app.remenber) {
                        setLocalItem("login.userkey", paraLogin.userkey);
                        setLocalItem("login.password", para.password);
                    }
                    else {
                        setLocalItem("login.userkey", "");
                        setLocalItem("login.password", "");
                    }

                    for (let key in response) {
                        if (key.equals(g.c.ok)) {
                        }
                        else if (key.equals("userkey") || key.equals("token")) {
                            arrPara.push(key + "=" + response[key]);
                        }
                        else {
                            arrPara.push(key + "=" + encodeURIComponent(response[key]));
                        }
                    }

                    let defaultSystemKey = getUrlItem("systemKey");
                    if (defaultSystemKey) {
                        arrPara.push("systemKey=" + defaultSystemKey);
                    }
                    arrPara.push("urlLogin=" + encodeURIComponent(window.document.location.href));
                    arrPara.push("rnd=" + window.crypto.getRandomValues(new Uint32Array(10))[0]);

                    window.location.href = para.urlMain + "?" + arrPara.join("&");
                    return;
                }
                resolve(response);
            }
            else {
                reject(new Error(response.error));
            }
        }).catch(e => {
            reject(e);
        })
    })
    return promise
}