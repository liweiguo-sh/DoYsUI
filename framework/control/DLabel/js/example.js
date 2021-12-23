var DLbelExample = {};

// -- 空白新元素模板 -------------------------------------------------------------
DLbelExample.getElement = function (elementType = "text", elementProp = {}) {
    let element;
    if (elementType.equals("text")) {
        element = DLbelExample._getElement_text(elementProp);
    }
    else if (elementType.equals("barcode1D")) {
        element = DLbelExample._getElement_barcode1D(elementProp);
    }
    else if (elementType.equals("barcode2D")) {
        element = DLbelExample._getElement_barcode2D(elementProp);
    }
    else if (elementType.equals("image")) {
        element = DLbelExample._getElement_image(elementProp);
    }
    else if (elementType.equals("shape")) {
        element = DLbelExample._getElement_shape(elementProp);
    }
    else if (elementType.equals("line")) {
        element = DLbelExample._getElement_line(elementProp);
    }
    else {
        alert("debug here");
    }
    return element;
}

DLbelExample._getElement_text = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "text"
        },
        sections: [
            UtilElement.getFixedSection({ pos: 0 }),
            UtilElement.getBlankSection({ pos: 1 })
        ],
        font: {
            // -- 宋体五号 --
            name: "宋体",
            size: "10.5"
        },
        frame: {},
        position: {
            "layer": 1,
            width: 20,
            height: 5,
            textAlign: "left",
            verticalAlign: "top"
        }
    }
    return element;
}
DLbelExample._getElement_barcode1D = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "barcode",
            barcodeType: "CODE_128"
        },
        sections: [
            UtilElement.getFixedSection({ pos: 0 }),
            UtilElement.getBlankSection({ pos: 1 })
        ],
        font: {
            // -- 宋体五号 --
            name: "宋体",
            size: "10.5"
        },
        frame: {},
        position: {
            "layer": 1,
            width: 30,
            height: 10,
            textAlign: "center",
            verticalAlign: "bottom"
        }
    }
    return element;
}
DLbelExample._getElement_barcode2D = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "barcode",
            barcodeType: "QR_CODE"
        },
        sections: [
            UtilElement.getFixedSection({ pos: 0 }),
            UtilElement.getBlankSection({ pos: 1 })
        ],
        font: {
            // -- 宋体五号 --
            name: "宋体",
            size: "10.5"
        },
        frame: {},
        position: {
            "layer": 1,
            width: 20,
            height: 20,
            textAlign: "center",
            verticalAlign: "bottom"
        }
    }
    return element;
}

DLbelExample._getElement_image = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "image"
        },
        frame: {},
        position: {
            "layer": 1,
            width: 20,
            height: 20,
            textAlign: "center",
            verticalAlign: "middle"
        },
        image: {
            "value": "",
            "deformation": "zoom",
            "url": ""
        }
    }
    return element;
}
DLbelExample._getElement_shape = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "shape"
        },
        frame: {
            "type": "rectangle",
            "width": 0.5,
            "color": "#000000"
        },
        position: {
            "layer": 1,
            width: 32,
            height: 18,
            textAlign: "center",
            verticalAlign: "middle"
        }
    }
    return element;
}
DLbelExample._getElement_line = function (elementProp = {}) {
    let element = {
        head: {
            elementType: "shape"
        },
        frame: {
            "type": "rectangle",
            "width": 0,
            "fillColor": "#000000"
        },
        position: {
            "layer": 1,
            width: 30,
            height: 0.5
        }
    }

    return element;
}

DLbelExample.getBlankField = function () {
    return {
        name: "",
        value: "sample data",
        datatype: "string",
        private: false,
        ext_prop: ""
    }
}

// -- 样例标签(演示、测试、调试用)、样例脚本 -----------------------------------------
DLbelExample.getExample = function (labelKey) {
    if (labelKey.equals("demo1")) {
        return DLbelExample.demo1();
    }
    else if (labelKey.equals("debug1")) {
        return DLbelExample.debug1();
    }
    else {
        return "";
    }
}
DLbelExample.demo1 = function () {
    return `
{
  "head": {
    "width": 80,
    "height": 60,
    "point": 600,
    "imageBaseUrl": "http://127.0.0.1/DoYsUI/framework/control/DLabel/image/",
    "element_id": 10
  },
  "fields": {
    "gtin": "06938450873308",
    "mfg_date": "2020-10-16",
    "exp_date": "2023-10-15",
    "lot": "2042",
    "price": "1234.56",
    "img01": "http://biosunmed.com/upload/2020/7/61552460.jpg",
    "img02": "http://biosunmed.com/upload/2020/4/1410510871.jpg",
    "img08": "08.png"
  },
  "elements": [
    {
      "head": {
        "name": "barcode_1d",
        "elementType": "barcode",
        "barcodeType": "CODE_128",
        "gs1": true
      },
      "font": {
        "lineHeight": 0,
        "size": "7",
        "name": "宋体",
        "color": "#3300FF",
        "fontHeight": 2.4694444444444446,
        "textHeight": 2.4694444444444446
      },
      "frame": {
        "type": "",
        "width": 0,
        "color": "#04FF00",
        "radius": 0
      },
      "position": {
        "layer": 1,
        "top": 44.95934959349595,
        "left": "3",
        "width": 73.74,
        "height": 12.66,
        "angle": 0,
        "angleR": 0,
        "textAlign": "center",
        "verticalAlign": "bottom",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 73.74,
        "hC": 12.66,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 73.74,
          "y": 0
        },
        "P3": {
          "x": 73.74,
          "y": 12.66
        },
        "P4": {
          "x": 0,
          "y": 12.66
        },
        "P15": {
          "x": 36.87,
          "y": 0
        },
        "P25": {
          "x": 73.74,
          "y": 6.33
        },
        "P35": {
          "x": 36.87,
          "y": 12.66
        },
        "P45": {
          "x": 0,
          "y": 6.33
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 36.87,
        "topText": 12.66,
        "heightBarcode": 10.190555555555555,
        "widthBarcode": 73.74,
        "leftBarcode": 0,
        "topBarcode": 0,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 73.74,
        "clientHeight": 12.66
      },
      "env": "design",
      "point": 600,
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "01",
          "format": ""
        },
        {
          "pos": 1,
          "type": "field",
          "value": "gtin",
          "format": ""
        },
        {
          "pos": 2,
          "type": "fixed",
          "value": "11",
          "format": ""
        },
        {
          "pos": 3,
          "type": "field",
          "value": "mfg_date",
          "format": "yyMMdd"
        },
        {
          "pos": 4,
          "type": "fixed",
          "value": "17",
          "format": ""
        },
        {
          "pos": 5,
          "type": "field",
          "value": "exp_date",
          "format": "yyMMdd"
        },
        {
          "pos": 6,
          "type": "fixed",
          "value": "10",
          "format": ""
        },
        {
          "pos": 7,
          "type": "field",
          "value": "lot",
          "format": ""
        },
        {
          "pos": 8,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "(01)",
          "format": ""
        },
        {
          "pos": 1,
          "type": "field",
          "value": "gtin",
          "format": ""
        },
        {
          "pos": 2,
          "type": "fixed",
          "value": "(11)",
          "format": ""
        },
        {
          "pos": 3,
          "type": "field",
          "value": "mfg_date",
          "format": "yyMMdd"
        },
        {
          "pos": 4,
          "type": "fixed",
          "value": "(17)",
          "format": ""
        },
        {
          "pos": 5,
          "type": "field",
          "value": "exp_date",
          "format": "yyMMdd"
        },
        {
          "pos": 6,
          "type": "fixed",
          "value": "(10)",
          "format": ""
        },
        {
          "pos": 7,
          "type": "field",
          "value": "lot",
          "format": ""
        },
        {
          "pos": 8,
          "type": "",
          "value": "",
          "format": ""
        }
      ]
    },
    {
      "head": {
        "name": "barcode_2d",
        "elementType": "barcode",
        "barcodeType": "QR_CODE"
      },
      "sections": [
        {
          "pos": 0,
          "type": "field",
          "value": "lot",
          "format": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "font": {
        "lineHeight": 0,
        "size": "8",
        "name": "微软雅黑",
        "color": "#ED1414",
        "fontHeight": 2.822222222222222,
        "textHeight": 2.822222222222222
      },
      "frame": {
        "type": "",
        "width": 0,
        "radius": 0
      },
      "position": {
        "layer": 1,
        "top": "1.45",
        "left": "51.70",
        "width": 20,
        "height": 23,
        "angle": 270,
        "angleR": 4.71238898038469,
        "textAlign": "center",
        "verticalAlign": "bottom",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 24.640000000000004,
        "hC": 22.030000000000005,
        "P1": {
          "x": 4.046845347782428e-15,
          "y": 22.030000000000005
        },
        "P2": {
          "x": 0,
          "y": 4.526294569648617e-15
        },
        "P3": {
          "x": 24.64,
          "y": 0
        },
        "P4": {
          "x": 24.640000000000004,
          "y": 22.03
        },
        "P15": {
          "x": 2.023422673891214e-15,
          "y": 11.015000000000004
        },
        "P25": {
          "x": 12.32,
          "y": 2.2631472848243086e-15
        },
        "P35": {
          "x": 24.64,
          "y": 11.015
        },
        "P45": {
          "x": 12.320000000000004,
          "y": 22.03
        },
        "offsetX": 4.046845347782428e-15,
        "offsetY": 22.030000000000005,
        "leftText": 11.015,
        "topText": 24.64,
        "heightBarcode": 21.817777777777778,
        "widthBarcode": 21.817777777777778,
        "leftBarcode": 0.10611111111111171,
        "topBarcode": 0,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 22.03,
        "clientHeight": 24.64
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "http://www.abc.com/?lot=",
          "format": ""
        },
        {
          "pos": 1,
          "type": "field",
          "value": "lot",
          "format": ""
        },
        {
          "pos": 2,
          "type": "fixed",
          "value": "&chinese=中文字符",
          "format": ""
        },
        {
          "pos": 3,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "element_1",
        "elementType": "text"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "样张水印",
          "format": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "font": {
        "lineHeight": 0,
        "size": 12,
        "name": "楷体",
        "color": "#00FF48",
        "fontHeight": 4.2333333333333325,
        "textHeight": 4.2333333333333325
      },
      "frame": {
        "type": "rectangle",
        "width": 0.3,
        "color": "#FFD000",
        "radius": 2
      },
      "position": {
        "layer": 1,
        "top": "23.11",
        "left": "40.51",
        "width": 20,
        "height": 8,
        "angle": 330,
        "angleR": 5.759586531581287,
        "textAlign": "center",
        "verticalAlign": "middle",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 21.32050807568877,
        "hC": 16.928203230275514,
        "P1": {
          "x": 0,
          "y": 10.000000000000009
        },
        "P2": {
          "x": 17.320508075688767,
          "y": 0
        },
        "P3": {
          "x": 21.32050807568877,
          "y": 6.928203230275507
        },
        "P4": {
          "x": 4.0000000000000036,
          "y": 16.928203230275514
        },
        "P15": {
          "x": 8.660254037844384,
          "y": 5.000000000000004
        },
        "P25": {
          "x": 19.32050807568877,
          "y": 3.4641016151377535
        },
        "P35": {
          "x": 12.660254037844387,
          "y": 11.92820323027551
        },
        "P45": {
          "x": 2.0000000000000018,
          "y": 13.46410161513776
        },
        "offsetX": 0,
        "offsetY": 10.000000000000009,
        "leftText": 10,
        "topText": 4,
        "offsetLeft": 0.3,
        "offsetRight": 0.3,
        "offsetTop": 0.3,
        "offsetBottom": 0.3,
        "clientWidth": 19.4,
        "clientHeight": 7.4
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "name",
        "elementType": "text"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "一次性使用血浆胆红素吸附器",
          "format": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "font": {
        "lineHeight": 0,
        "size": "9",
        "name": "微软雅黑",
        "fontHeight": 3.175,
        "textHeight": 3.175
      },
      "frame": {
        "type": "",
        "width": 0,
        "radius": 0
      },
      "position": {
        "layer": 1,
        "top": "3.90",
        "left": "3",
        "width": 47.57,
        "height": 5.93,
        "angle": 0,
        "angleR": 0,
        "textAlign": "left",
        "verticalAlign": "top",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 47.57,
        "hC": 5.93,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 47.57,
          "y": 0
        },
        "P3": {
          "x": 47.57,
          "y": 5.93
        },
        "P4": {
          "x": 0,
          "y": 5.93
        },
        "P15": {
          "x": 23.785,
          "y": 0
        },
        "P25": {
          "x": 47.57,
          "y": 2.965
        },
        "P35": {
          "x": 23.785,
          "y": 5.93
        },
        "P45": {
          "x": 0,
          "y": 2.965
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 0,
        "topText": 0,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 47.57,
        "clientHeight": 5.93
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "price",
        "elementType": "text"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "单价：",
          "format": ""
        },
        {
          "pos": 1,
          "type": "field",
          "value": "price",
          "format": "#,##0.00"
        },
        {
          "pos": 2,
          "type": "",
          "value": "",
          "format": ""
        }
      ],
      "font": {
        "lineHeight": 0,
        "size": "9",
        "name": "微软雅黑",
        "italic": true,
        "color": "#DC1A1A",
        "fontHeight": 3.175,
        "textHeight": 3.175
      },
      "frame": {
        "type": "rectangle",
        "width": 0,
        "fillColor": "#E2E780",
        "radius": 0
      },
      "position": {
        "layer": 1,
        "top": "11.11",
        "left": 10.95,
        "width": 38,
        "height": 8.38,
        "angle": 0,
        "angleR": 0,
        "textAlign": "right",
        "verticalAlign": "middle",
        "marginLeft": 0,
        "marginRight": 1,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 38,
        "hC": 8.38,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 38,
          "y": 0
        },
        "P3": {
          "x": 38,
          "y": 8.38
        },
        "P4": {
          "x": 0,
          "y": 8.38
        },
        "P15": {
          "x": 19,
          "y": 0
        },
        "P25": {
          "x": 38,
          "y": 4.19
        },
        "P35": {
          "x": 19,
          "y": 8.38
        },
        "P45": {
          "x": 0,
          "y": 4.19
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 37,
        "topText": 4.19,
        "offsetLeft": 0,
        "offsetRight": 1,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 37,
        "clientHeight": 8.38
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "image",
        "elementType": "image"
      },
      "font": {
        "lineHeight": 0,
        "size": 12,
        "name": "宋体",
        "fontHeight": 4.2333333333333325,
        "textHeight": 4.2333333333333325
      },
      "frame": {
        "type": "",
        "width": 0,
        "color": "#B30A0A",
        "fillColor": "#00F7FF",
        "radius": 0
      },
      "position": {
        "layer": 1,
        "top": 21.05691056910569,
        "left": "3",
        "width": 24.79,
        "height": 22.52,
        "angle": 0,
        "angleR": 0,
        "textAlign": "left",
        "verticalAlign": "top",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 24.79,
        "hC": 22.52,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 24.79,
          "y": 0
        },
        "P3": {
          "x": 24.79,
          "y": 22.52
        },
        "P4": {
          "x": 0,
          "y": 22.52
        },
        "P15": {
          "x": 12.395,
          "y": 0
        },
        "P25": {
          "x": 24.79,
          "y": 11.26
        },
        "P35": {
          "x": 12.395,
          "y": 22.52
        },
        "P45": {
          "x": 0,
          "y": 11.26
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 2,
        "topText": 2,
        "imgWidth": 20.79,
        "imgHeight": 20.79,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 24.79,
        "clientHeight": 22.52
      },
      "image": {
        "value": "img01",
        "deformation": "zoom",
        "url": "http://biosunmed.com/upload/2020/7/61552460.jpg"
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "elementType": "shape",
        "name": "element_2"
      },
      "frame": {
        "type": "rectangle",
        "width": 0,
        "color": "#000000",
        "fillColor": "#809AE7",
        "radius": 0
      },
      "position": {
        "layer": 1,
        "width": 45.95,
        "height": 0.5,
        "textAlign": "center",
        "verticalAlign": "middle",
        "top": "20.21",
        "left": "3",
        "angle": 0,
        "angleR": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 45.95,
        "hC": 0.5,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 45.95,
          "y": 0
        },
        "P3": {
          "x": 45.95,
          "y": 0.5
        },
        "P4": {
          "x": 0,
          "y": 0.5
        },
        "P15": {
          "x": 22.975,
          "y": 0
        },
        "P25": {
          "x": 45.95,
          "y": 0.25
        },
        "P35": {
          "x": 22.975,
          "y": 0.5
        },
        "P45": {
          "x": 0,
          "y": 0.25
        },
        "offsetX": 0,
        "offsetY": 0,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 45.95,
        "clientHeight": 0.5
      },
      "env": "design"
    }
  ],
  "page": {
    "width": 80,
    "height": 60,
    "marginLeft": 0,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "rows": 1,
    "cols": 1,
    "horizontalSpace": 0,
    "verticalSpace": 0
  },
  "Fields": {
    "gtin": {
      "name": "gtin",
      "value": "06938450873308",
      "datatype": "string",
      "private": false,
      "ext_prop": ""
    },
    "mfg_date": {
      "name": "mfg_date",
      "value": "2020-10-16",
      "datatype": "datetime",
      "private": false,
      "ext_prop": ""
    },
    "exp_date": {
      "name": "exp_date",
      "value": "2023-10-15",
      "datatype": "datetime",
      "private": false,
      "ext_prop": ""
    },
    "lot": {
      "name": "lot",
      "value": "2042",
      "datatype": "string",
      "private": false,
      "ext_prop": ""
    },
    "price": {
      "name": "price",
      "value": "1234.56",
      "datatype": "number",
      "private": false,
      "ext_prop": ""
    },
    "img01": {
      "name": "img01",
      "value": "http://biosunmed.com/upload/2020/7/61552460.jpg",
      "datatype": "string",
      "private": false,
      "ext_prop": ""
    },
    "img02": {
      "name": "img02",
      "value": "http://biosunmed.com/upload/2020/4/1410510871.jpg",
      "datatype": "string",
      "private": false,
      "ext_prop": ""
    },
    "img08": {
      "name": "img08",
      "value": "08.png",
      "datatype": "string",
      "private": false,
      "ext_prop": ""
    }
  }
}
        `;
}
DLbelExample.debug1 = function () {
    return `
{
  "head": {
    "width": 80,
    "height": 60,
    "point": 600,
    "element_id": 7
  },
  "fields": {},
  "elements": [
    {
      "head": {
        "elementType": "barcode",
        "barcodeType": "CODE_128_D",
        "name": "element_3",
        "codeSet": "A",
        "minUnitWidth": "5"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ],
      "font": {
        "name": "宋体",
        "size": "10.5",
        "fontHeight": 3.7041666666666666,
        "lineHeight": null,
        "textHeight": 3.7041666666666666,
        "barcodeColor": "#E32D2D"
      },
      "frame": {
        "type": "rectangle",
        "width": 0.2,
        "radius": 0,
        "color": "#E05050"
      },
      "position": {
        "layer": 1,
        "width": 41.25,
        "height": 10,
        "textAlign": "right",
        "verticalAlign": "bottom",
        "top": "2.40",
        "left": "2.47",
        "angle": 0,
        "angleR": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 41.25,
        "hC": 10,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 41.25,
          "y": 0
        },
        "P3": {
          "x": 41.25,
          "y": 10
        },
        "P4": {
          "x": 0,
          "y": 10
        },
        "P15": {
          "x": 20.625,
          "y": 0
        },
        "P25": {
          "x": 41.25,
          "y": 5
        },
        "P35": {
          "x": 20.625,
          "y": 10
        },
        "P45": {
          "x": 0,
          "y": 5
        },
        "offsetX": 0,
        "offsetY": 0,
        "offsetLeft": 0.2,
        "offsetRight": 0.2,
        "offsetTop": 0.2,
        "offsetBottom": 0.2,
        "clientWidth": 40.849999999999994,
        "clientHeight": 9.600000000000001,
        "leftText": 41.05,
        "topText": 9.8,
        "heightBarcode": 5.895833333333333,
        "widthBarcode": 40.85,
        "leftBarcode": 0.2,
        "topBarcode": 0.2,
        "barcodeAlign": "left"
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "ABcd1234"
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ]
    },
    {
      "head": {
        "elementType": "barcode",
        "barcodeType": "CODE_128_D",
        "name": "element_4",
        "codeSet": "B",
        "minUnitWidth": "10"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ],
      "font": {
        "name": "宋体",
        "size": "10.5",
        "fontHeight": 3.7041666666666666,
        "lineHeight": null,
        "textHeight": 3.7041666666666666,
        "barcodeColor": "#2D61E3"
      },
      "frame": {
        "type": "rectangle",
        "width": 0.2,
        "radius": 0,
        "color": "#E05050"
      },
      "position": {
        "layer": 1,
        "width": 41.25,
        "height": 10,
        "textAlign": "center",
        "verticalAlign": "bottom",
        "top": 19.41,
        "left": "2.47",
        "angle": 0,
        "angleR": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 41.25,
        "hC": 10,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 41.25,
          "y": 0
        },
        "P3": {
          "x": 41.25,
          "y": 10
        },
        "P4": {
          "x": 0,
          "y": 10
        },
        "P15": {
          "x": 20.625,
          "y": 0
        },
        "P25": {
          "x": 41.25,
          "y": 5
        },
        "P35": {
          "x": 20.625,
          "y": 10
        },
        "P45": {
          "x": 0,
          "y": 5
        },
        "offsetX": 0,
        "offsetY": 0,
        "offsetLeft": 0.2,
        "offsetRight": 0.2,
        "offsetTop": 0.2,
        "offsetBottom": 0.2,
        "clientWidth": 40.849999999999994,
        "clientHeight": 9.600000000000001,
        "leftText": 20.625,
        "topText": 9.8,
        "heightBarcode": 5.895833333333333,
        "widthBarcode": 40.85,
        "leftBarcode": 0.2,
        "topBarcode": 0.2,
        "barcodeAlign": "center"
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "ABcd1234"
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ]
    },
    {
      "head": {
        "elementType": "barcode",
        "barcodeType": "CODE_128_D",
        "name": "element_5",
        "codeSet": "C",
        "minUnitWidth": "15"
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ],
      "font": {
        "name": "宋体",
        "size": "10.5",
        "fontHeight": 3.7041666666666666,
        "lineHeight": null,
        "textHeight": 3.7041666666666666,
        "barcodeColor": "#2DE354"
      },
      "frame": {
        "type": "rectangle",
        "width": 0.2,
        "radius": 0,
        "color": "#E05050"
      },
      "position": {
        "layer": 1,
        "width": 41.25,
        "height": 10,
        "textAlign": "left",
        "verticalAlign": "bottom",
        "top": "36.42",
        "left": "2.47",
        "angle": 0,
        "angleR": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 41.25,
        "hC": 10,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 41.25,
          "y": 0
        },
        "P3": {
          "x": 41.25,
          "y": 10
        },
        "P4": {
          "x": 0,
          "y": 10
        },
        "P15": {
          "x": 20.625,
          "y": 0
        },
        "P25": {
          "x": 41.25,
          "y": 5
        },
        "P35": {
          "x": 20.625,
          "y": 10
        },
        "P45": {
          "x": 0,
          "y": 5
        },
        "offsetX": 0,
        "offsetY": 0,
        "offsetLeft": 0.2,
        "offsetRight": 0.2,
        "offsetTop": 0.2,
        "offsetBottom": 0.2,
        "clientWidth": 40.849999999999994,
        "clientHeight": 9.600000000000001,
        "leftText": 0.2,
        "topText": 9.8,
        "heightBarcode": 5.895833333333333,
        "widthBarcode": 40.85,
        "leftBarcode": 0.2,
        "topBarcode": 0.2,
        "barcodeAlign": "right"
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "ABcd1234"
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ]
    },
    {
      "head": {
        "elementType": "barcode",
        "barcodeType": "CODE_128",
        "name": "element_6",
        "codeSet": ""
      },
      "sections": [
        {
          "pos": 0,
          "type": "fixed",
          "value": ""
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ],
      "font": {
        "name": "宋体",
        "size": "10.5",
        "fontHeight": 3.7041666666666666,
        "lineHeight": null,
        "textHeight": 3.7041666666666666
      },
      "frame": {
        "type": "",
        "width": 0,
        "radius": 0,
        "color": ""
      },
      "position": {
        "layer": 1,
        "width": 32.47,
        "height": 10,
        "textAlign": "center",
        "verticalAlign": "bottom",
        "top": 19.41,
        "left": "46.59",
        "angle": 0,
        "angleR": 0,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 32.47,
        "hC": 10,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 32.47,
          "y": 0
        },
        "P3": {
          "x": 32.47,
          "y": 10
        },
        "P4": {
          "x": 0,
          "y": 10
        },
        "P15": {
          "x": 16.235,
          "y": 0
        },
        "P25": {
          "x": 32.47,
          "y": 5
        },
        "P35": {
          "x": 16.235,
          "y": 10
        },
        "P45": {
          "x": 0,
          "y": 5
        },
        "offsetX": 0,
        "offsetY": 0,
        "offsetLeft": 0,
        "offsetRight": 0,
        "offsetTop": 0,
        "offsetBottom": 0,
        "clientWidth": 32.47,
        "clientHeight": 10,
        "leftText": 16.235,
        "topText": 10,
        "heightBarcode": 6.295833333333333,
        "widthBarcode": 32.47,
        "leftBarcode": 0,
        "topBarcode": 0,
        "barcodeAlign": ""
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "ABcd1234"
        },
        {
          "pos": 1,
          "type": "",
          "value": ""
        }
      ]
    }
  ],
  "page": {
    "width": 80,
    "height": 60,
    "marginLeft": 0,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "rows": 1,
    "cols": 1,
    "horizontalSpace": 0,
    "verticalSpace": 0
  },
  "Fields": {}
}
        `;
}

DLbelExample.getExampleScript = function (scriptKey) {
    let script;
    if (scriptKey.equals("")) {
        script = DLbelExample.script1().trim();
    }
    else {
        script = "";
    }
    return script.trim();
}
DLbelExample.script1 = function () {
    return `
    for (let i = 1; i <= 6; i++) {
        let name = "image_" + i;
        let element = this.getElementByName(name);
        element.image.url = this.head.imageBaseUrl + this.fields["image_empty"];
    }

    let tagNames = this.fields["tag_names"];
    let names = tagNames.toLowerCase().replaceAll(",", "").split("");
    for (let i = 1; i <= names.length && i <= 6; i++) {
        let name = "image_" + names[i - 1];
        let imgUrl = this.head.imageBaseUrl + this.fields[name];
        let element = this.getElementByName("image_" + i);

        element.image.url = imgUrl;
    }

    let sscc = this.fields["sscc"].replaceAll(" ","");
    this.fields["sscc18"] = sscc + UtilLib.GetCheckBit_SSCC(sscc);
    `;
}