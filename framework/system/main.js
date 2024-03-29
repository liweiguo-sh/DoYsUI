﻿/**
 * DoYs.main.js
 * Author: David.Li
 * Create Date: 2020-04-11
 * Modify Date: 2021-12-24
 * Copyright 2020-2021, doys-next.com
 */

(function () {
   
})()

function openMenu(menu) {
    let win;

    // -- 判断重复打开 --
    if (menu.opened && !menu.allowMulti) {
        let taskbar = app.$refs.taskBar.findBarByMenuPk(menu.pk);
        if (taskbar) {
            app.$refs.taskBar.activeBar(taskbar.name);
            return;
        }
    }

    // -- 打开窗口 --
    if (menu.type.equals("view")) {
        let prop = {
            url: (menu.url ? g.path.project + menu.url : g.path.framework + "/html/view/view.html"),
            text: menu.text
        };
        let para = {
            menuPk: menu.pk,
            viewPk: menu.typePk,
            controller: menu.controller,
            flowPks: menu.flowPksUdf || menu.flowPks,
            vfUrl: g.path.project + menu.vfUrl,
            vfWindowState: menu.flagMaximized
        };
        win = topWin.openFullWindow(prop, para);
    }
    else if (menu.type.equals("win")) {
        let url = g.path.project + menu.url;
        if (menu.url.indexOf("/framework/") == 0) {
            url = g.path.base + menu.url;
        }

        let prop = {
            url: url,
            text: menu.text
        };
        let para = {
            menu: menu,
            menuPk: menu.pk
        };
        if (menu.flagMaximized) {
            win = topWin.openFullWindow(prop, para);
        }
        else {
            win = topWin.openWindow(prop, para);
        }
    }
    else if (menu.type.equals("")) {
        topWin.message("功能开发中，请等待...", "warning");
        return;
    }
    else {
        topWin.alert("unsupport sys_view.type: " + menu.type, "error");
        return;
    }

    // -- 创建taskbar --
    menu.opened = true;
    let taskbar = {
        key: "" + win.id,
        name: "" + win.id,
        title: menu.text,
        menuPk: menu.pk,
        win: win
    };
    app.$refs.taskBar.addBar(taskbar);
}
function changePassword() {
    let prop = {
        url: g.path.project + "/.aid/html/org/change_password.html",
        modal: false
    }; 
    topWin.openWindow(prop, {});
}