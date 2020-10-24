var UtilFont = {};

UtilFont.getNames = function () {
    if (UtilFont.__names) return UtilFont.__names;

    let names = [];
    // -- 中文字体 ------------------------------------------
    names.push("等线");
    names.push("等线 Light");
    names.push("仿宋");
    names.push("黑体");
    names.push("楷体");
    names.push("宋体");
    names.push("微软雅黑");
    names.push("微软雅黑 Light");
    names.push("新宋体");

    // -- 英文字体 ------------------------------------------  
    names.push("Arial");
    names.push("Arial Black");
    names.push("Consolas");
    names.push("Courier New");
    names.push("Microsoft Sans Serif");
    names.push("Webdings");
    names.push("Wingdings");

    // ----------------------------------------------------
    UtilFont.__names = names;
    return UtilFont.__names;
}
UtilFont.getSizes = function () {
    if (UtilFont.__sizes) return UtilFont.__sizes;

    let sizes = [];
    // -- 数字字体大小 --------------------------------------
    sizes.push("8");
    sizes.push("9");
    sizes.push("10");
    sizes.push("11");
    sizes.push("12");
    sizes.push("14");
    sizes.push("16");
    sizes.push("18");
    sizes.push("20");
    sizes.push("22");
    sizes.push("24");
    sizes.push("26");
    sizes.push("28");
    sizes.push("36");
    sizes.push("48");
    sizes.push("72");

    // -- 中文字体大小 --------------------------------------
    // -- names.push("五号"); --

    // ----------------------------------------------------
    UtilFont.__sizes = sizes;
    return UtilFont.__sizes;
}