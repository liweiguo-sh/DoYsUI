/**
 * DoYs.ajax.js
 * Author: David.Li
 * Create Date: 2020-04-10
 * Modify Date: 2021-04-08
 * Copyright 2020-2021, doys-next.com 
 */

var ajax = {};
ajax.send = function (url, data, option = { autoShowErr: true }) {
    const ajaxType = g.cfg.ajaxType;
    const promise = new Promise(function (resolve, reject) {
        // -- axios --
        if (ajaxType.equals("axios")) {
            if (window.win) win.setDisabled(true, "waiting ...");
            if (!url.startsWith("http")) url = g.prefix + url;
            let axiosCfg = {
                method: "GET",
                url: url
            }
            if (data) {
                axiosCfg.method = "POST";
                axiosCfg.data = data;
            }
            axios.defaults.withCredentials = true;            
            axios(axiosCfg).then((response) => {
                if (window.win) win.setDisabled();

                response.data = ajax.parseResponseData(response.data);
                if (!response.data.ok) {
                    if (response.data.error.indexOf("session timeout") >= 0) {
                        topWin.sessionTimeout();
                        return;
                    }
                    else {
                        if (option.autoShowErr) {
                            if (topWin) {
                                topWin.alert(response.data.error, "error");
                                return;
                            }
                        }
                    }
                }
                resolve(response.data);
            }).catch(e => {
                if (window.win) win.setDisabled();
                if (e.response) {
                    if (e.response.status == 404) {
                        topWin.message(e.message + "<br />" + e.config.url, "error");
                    }
                    else if (e.response.status == 403) {
                        topWin.message(e.message, "error");
                    }
                    else {
                        topWin.message(e.message, "error");
                        reject(e);
                    }
                }
                else {
                    if (option.autoShowErr) {
                        app.$message({
                            showClose: true,
                            message: e.message,
                            dangerouslyUseHTMLString: true,
                            type: "error"
                        });
                    }
                    else {
                        reject(e);
                    }
                }
            })
        }
        // -- fetch --
        else if (ajaxType.equals("fetch")) {
            let url = g.prefix + url;
            let data = ajax.getFetchPostPara(data);
            fetch(url, data).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    if (response.status == 405) {
                        throw new Error("Method not allowed");
                    }
                    else {
                        throw new Error("Network response was not ok, response.status = " + response.status);
                    }
                }
            }).then(function (text) {
                resolve(text);
            }).catch(e => {
                reject(e);
            });
        }
        // -- unsupport --
        else {
            reject(new Error("unsupport ajax type " + ajaxType));
        }
    })
    return promise;
}

ajax.getFetchPostPara = function (postData) {
    let json = {
        body: "",                           // must match 'Content-Type' header
        cache: 'no-cache',                  // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',         // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST',                     // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',                       // no-cors, cors, *same-origin
        redirect: 'follow',                 // manual, *follow, error
        referrer: 'no-referrer',            // *client, no-referrer
    }
    if (postData) {
        json.body = JSON.stringify(postData);
    }

    return json
}

ajax.parseResponseData = function (responseData) {
    let keys, type, value;

    for (var key in responseData) {
        keys = key.split(g.c.CHAR1);
        if (keys.length > 1) {
            value = responseData[key];
            delete responseData[key];
            type = keys[1];
            key = keys[0];
            if (type.equals("datatable")) {
                var dtb = new datatable();
                var arr = value.split(g.c.CHAR7);
                dtb.readFromData(arr[0], arr[1]);
                value = dtb;
            }
            else if (type.equals("json")) {
                value = JSON.parse(value);
            }
            else {
                throw new Error("unsupport datatype: " + type + ", please check.");
            }
            responseData[key] = value;
        }
    }

    return responseData;
}