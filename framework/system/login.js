/**
 * DoYs.login.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2020-11-22
 * Copyright 2020, doys-next.com
 */
function login(para) {
    const promise = new Promise(function (resolve, reject) {
        let paraLogin = {
            tenantId: para.tenantId,
            userPk: para.userPk.toLowerCase(),
            password: para.password,
            verifyCode: para.verifyCode,
            loginTime: (new Date()).getTime().toString()
        }
        let passwordMD5 = UtilUser.passwordMD5(paraLogin.userPk, paraLogin.password);
        let passwordLoginMD5 = UtilUser.passwordLoginMD5(passwordMD5, paraLogin.loginTime);

        paraLogin.password = passwordLoginMD5;
        ajax.send("/user/login", paraLogin, { tenantId: paraLogin.tenantId }).then(response => {
            if (response.ok) {
                if (para.urlMain) {
                    let arrPara = new Array();

                    setLocalItem("token", response.token);
                    setLocalItem("tenantId", para.tenantId);
                    setLocalItem("login.remenber", app.remenber ? "1" : "0");
                    if (app.remenber) {
                        setLocalItem("login.tenantId", paraLogin.tenantId);
                        setLocalItem("login.userPk", paraLogin.userPk);
                        setLocalItem("login.password", para.password);
                    }
                    else {
                        setLocalItem("login.tenantId", "");
                        setLocalItem("login.userPk", "");
                        setLocalItem("login.password", "");
                    }

                    for (let key in response) {
                        if (key.equals(g.c.ok)) {
                        }
                        else if (key.equals("userPk") || key.equals("token")) {
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