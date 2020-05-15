var loginPara = {
    txtUserkey: null,
    txtPassword: null,
    txtCheckCode: null,
    imgCheckCode: null,
    chkRemember: null,
    loginPath: "",          // -- 登录页 login.html 所在目录 --
    loginUsePassword: true,
    loginUseCheckCode: false
};
// ----------------------------------------------------------------------------
function initLogin(jsonLoginPara) {
    loginPara = g.x.extendJSON(loginPara, jsonLoginPara);
    // -- 1、调整窗口位置 ---------------------------------
    if (g.b.ie && (window.App || window.Weixin)) {
        window.moveTo(0, 0);
        window.resizeTo(500, screen.availHeight);
    }
    else {
        window.moveTo(0, 0);
        window.resizeTo(screen.availWidth, screen.availHeight);
    }
    // -- 2、获取默认控件 ---------------------------------
    if (!loginPara.txtUserkey) {
        loginPara.txtUserkey = gId("txtUserkey");
        if (loginPara.txtUserkey) {
            jQuery(loginPara.txtUserkey).keyup(function (e) {
                var key = e.which;
                if (key == 13) {
                    loginPara.txtPassword.focus();
                }
            });
        }
    }
    if (!loginPara.txtPassword) {
        loginPara.txtPassword = gId("txtPassword");
        if (loginPara.txtPassword) {
            jQuery(loginPara.txtPassword).focus();
            jQuery(loginPara.txtPassword).keyup(function (e) {
                var key = e.which;
                if (key == 13) {
                    if (loginPara.txtCheckCode) {
                        loginPara.txtCheckCode.focus();
                    }
                    else {
                        btnLogin_click();
                    }
                }
            });
        }
    }
    if (!loginPara.txtCheckCode) {
        loginPara.txtCheckCode = gId("txtCheckCode");
        if (loginPara.txtCheckCode) {
            jQuery(loginPara.txtCheckCode).keyup(function (e) {
                var key = e.which;
                if (key == 13) {
                    btnLogin_click();
                }
            });
        }
    }
    if (!loginPara.chkRemember) {
        loginPara.chkRemember = gId("chkRemember");
    }
    if (loginPara.imgCheckCode == undefined) {
        loginPara.imgCheckCode = gId("imgCheckCode");
    }
    // -- 3、获取记住的用户名 -----------------------------
    var urlLogin = window.location.href;
    var nIdx = urlLogin.indexOf("?");
    if (nIdx > 0) {
        urlLogin = urlLogin.substring(0, nIdx);
    }
    if (loginPara.txtUserkey) {
        loginPara.txtUserkey.value = getLocalItem($.md5(urlLogin) + "_userKey");
    }
    if (loginPara.txtPassword) {
        loginPara.txtPassword.value = getLocalItem($.md5(urlLogin) + "_password");
    }
    if (loginPara.chkRemember && loginPara.txtPassword) {
        loginPara.chkRemember.checked = (loginPara.txtPassword.value.length > 0);
    }

    if (g.local) {
        if (loginPara.txtPassword && loginPara.txtPassword.value.equals("")) loginPara.txtPassword.value = "";
        if (loginPara.txtCheckCode && loginPara.loginUseCheckCode) loginPara.txtCheckCode.value = "1234";
    }
    // -- 4、获取验证码图片 -------------------------------
    if (loginPara.txtCheckCode && loginPara.imgCheckCode) {
        // -- getCheckCode(); --
    }
    getCheckCode();
}

// -- 全屏打开(或跳转到)主页面 ------------------------------------------------
function showMain() {
    var urlMain = getMainUrl();
    var url = urlMain + "?loginPath=" + loginPara.loginPath + "&loginUrl=" + window.location.pathname + "&os=" + (window.App ? App.os : "") + "&rnd=" + Math.random();
    // ----------------------------------------------------
    if ((window.isWindowsApp && window.isWindowsApp()) || window.App || window.Weixin) {       
        window.location = url;
    }
    else {
        var properties = "channelmode=1,resizable=1";
        if (!g.b.ie) {
            properties = "fullscreen=1,channelmode=1,width=" + (screen.availWidth - 10) + ",height=" + (screen.availHeight - 52) + ",left=0,top=0,resizable=1";
        }
        window.open(url, "", properties);

        //window.opener = null;
        //window.open("", "_self");
        //window.close();
    }
}
function getMainUrl() {
    var urlMain = "";
    // -- 优先取调用页面做为主页面 ----
    if (urlPara.urlMain) {
        var urlFrom = urlPara.urlMain;
        var nIndex = urlFrom.indexOf("?");
        if (nIndex > 0) {
            urlFrom = urlFrom.substring(0, nIndex);
        }

        urlMain = urlFrom;
    }
    // -- 如果没有调用页面，取login页面指定的主页面 或 框架默认主页面 --
    if (urlMain.equals("")) {
        urlMain = loginPara.urlMainDefault || (g.appPath + "main.html");
    }

    return urlMain;
}

// -- 登录系统 ----------------------------------------------------------------
function getCheckCode() {
    if (g.a.send("processType=com.xznext.xpas.Login&actionType=getCheckCode", {}, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            loginPara.loginUsePassword = cReturn.loginUsePassword;
            loginPara.loginUseCheckCode = cReturn.loginUseCheckCode;

            if (loginPara.imgCheckCode && cReturn.urlCheckCode) {
                loginPara.imgCheckCode.src = g.xpasRunPath + "checkcode/" + cReturn.urlCheckCode;
            }
            else {

            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
function loginSystem(userKey, password, checkCode) {
    // -- 1、获取并预处理参数值----------------------------
    if (userKey == undefined && loginPara.txtUserkey) {
        loginPara.txtUserkey.value = loginPara.txtUserkey.value.trim();
        if (loginPara.txtUserkey.value.equals("developer")) {
            alert("developer账户已禁用，请手工创建开发账户。");
            return;
        }
        try {
            userKey = $.md5(loginPara.txtUserkey.value.toLowerCase() + "xwf.js");
        }
        catch (e) {
            alert("loginSystem: " + e.toString());
        }
    }
    if (password == undefined && loginPara.txtPassword) {
        loginPara.txtPassword.value = loginPara.txtPassword.value.trim();
        if (loginPara.txtPassword.value) {
            password = $.md5(loginPara.txtUserkey.value.toLowerCase() + "xwf.js" + loginPara.txtPassword.value.toLowerCase());
        }
        else {
            password = "";
        }
    }
    if (checkCode == undefined && loginPara.txtCheckCode) {
        loginPara.txtCheckCode.value = loginPara.txtCheckCode.value.trim();
        checkCode = loginPara.txtCheckCode.value;
    }
    if (checkCode == undefined) checkCode = "";

    // -- 2、检查空值 -------------------------------------
    if (loginPara.txtUserkey && loginPara.txtUserkey.value.trim().equals("")) {
        showWarn("登录用户不能为空, 请输入.")
        loginPara.txtUserkey.focus();
        return;
    }
    if (loginPara.txtPassword && loginPara.txtPassword.value.equals("") && loginPara.loginUsePassword) {
        showWarn("登录密码不能为空, 请输入.");
        if (loginPara.txtPassword) {
            loginPara.txtPassword.focus();
        }
        return;
    }
    if (checkCode.equals("") && loginPara.txtCheckCode && loginPara.loginUseCheckCode) {
        showWarn("验证码不能为空, 请输入.");
        if (loginPara.txtCheckCode) {
            loginPara.txtCheckCode.focus();
        }
        return;
    }
    // -- 3、提交验证 -------------------------------------
    if (g.a.send("processType=com.xznext.xpas.Login&actionType=login", { userKey: userKey, password: password, checkCode: checkCode, os: (window.App ? App.os : "") }, true)) {
        if (g.a.OK) {
            var c = g.a.cReturn;
            if (c.login) {
                var urlLogin = window.location.href;
                var nIdx = urlLogin.indexOf("?");
                if (nIdx > 0) {
                    urlLogin = urlLogin.substring(0, nIdx);
                }
                if (loginPara.txtUserkey) {
                    setLocalItem($.md5(urlLogin) + "_userKey", loginPara.txtUserkey.value);
                }
                if (loginPara.txtPassword && loginPara.chkRemember) {
                    setLocalItem($.md5(urlLogin) + "_password", loginPara.chkRemember.checked ? loginPara.txtPassword.value : "");
                }
                showMain();
                return true;
            }
            else {
                showMsg("您的密码是初始密码，必须修改后方可登录系统。");
                if (changePassword) {
                    changePassword();
                }
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}