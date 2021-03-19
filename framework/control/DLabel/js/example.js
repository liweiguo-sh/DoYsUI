﻿var DLbelExample = {};

DLbelExample.getExample = function (labelKey) {
    if (labelKey.equals("debug1")) {
        return DLbelExample.debug1();
    }
    else {
        return "";
    }
}
DLbelExample.debug1 = function () {
    return `
{
  "head": {
    "width": 80,
    "height": 60,
    "point": 600,
    "imageBaseUrl": "http://127.0.0.1/DoYsUI/framework/control/DLabel/image/"
  },
  "fields": {
    "gtin": "06938450873308",
    "mfg_date": "201016",
    "exp_date": "231015",
    "lot": "231015",
    "name": "一次性使用血浆胆红素吸附器",
    "price": "$5,678",
    "img01": "http://biosunmed.com/upload/2020/7/61552460.jpg",
    "img02": "02.png",
    "sn": "12340005"
  },
  "elements": [
    {
      "head": {
        "name": "doys_label_element_1",
        "elementType": "barcode",
        "barcodeType": "CODE_128",
        "gs1": true
      },
      "font": {
        "lineHeight": 0,
        "size": "8",
        "name": "宋体",
        "color": "#3300FF"
      },
      "frame": {
        "type": "",
        "width": 0,
        "color": "#04FF00"
      },
      "position": {
        "layer": 1,
        "top": 44.95934959349595,
        "left": "3.90",
        "width": "73.74",
        "height": "12.66",
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
        "heightBarcode": 9.837777777777777,
        "widthBarcode": 73.74,
        "leftBarcode": 0,
        "topBarcode": 0
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
          "format": ""
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
          "format": ""
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
          "format": ""
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
          "format": ""
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
        "name": "doys_label_element_2",
        "elementType": "barcode",
        "barcodeType": "QR_CODE"
      },
      "sections": [
        {
          "pos": 0,
          "type": "field",
          "value": "sn",
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
        "color": "#ED1414"
      },
      "frame": {
        "type": "",
        "width": 0
      },
      "position": {
        "layer": 1,
        "top": "3.41",
        "left": "52.76",
        "width": 20,
        "height": "22.20",
        "angle": 270,
        "angleR": 4.71238898038469,
        "textAlign": "center",
        "verticalAlign": "bottom",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 22.200000000000003,
        "hC": 20.000000000000004,
        "P1": {
          "x": 3.673940397442059e-15,
          "y": 20.000000000000004
        },
        "P2": {
          "x": 0,
          "y": 4.0780738411606855e-15
        },
        "P3": {
          "x": 22.2,
          "y": 0
        },
        "P4": {
          "x": 22.200000000000003,
          "y": 20
        },
        "P15": {
          "x": 1.8369701987210296e-15,
          "y": 10.000000000000004
        },
        "P25": {
          "x": 11.1,
          "y": 2.0390369205803427e-15
        },
        "P35": {
          "x": 22.200000000000003,
          "y": 10
        },
        "P45": {
          "x": 11.100000000000003,
          "y": 20
        },
        "offsetX": 3.673940397442059e-15,
        "offsetY": 20.000000000000004,
        "leftText": 10,
        "topText": 22.2,
        "heightBarcode": 19.377777777777776,
        "widthBarcode": 19.377777777777776,
        "leftBarcode": 0.3111111111111118,
        "topBarcode": 0
      },
      "segments": [
        {
          "pos": 0,
          "type": "fixed",
          "value": "http://www.abc.com/?sn=",
          "format": ""
        },
        {
          "pos": 1,
          "type": "field",
          "value": "sn",
          "format": ""
        },
        {
          "pos": 2,
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
        "name": "doys_label_element_3",
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
        "color": "#00FF48"
      },
      "frame": {
        "type": "rectangle",
        "width": 0.3,
        "color": "#FFD000"
      },
      "position": {
        "layer": 1,
        "top": "23.82",
        "left": "31.71",
        "width": 20,
        "height": 8,
        "angle": 330,
        "angleR": 0,
        "textAlign": "center",
        "verticalAlign": "middle",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 20,
        "hC": 8,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 20,
          "y": 0
        },
        "P3": {
          "x": 20,
          "y": 8
        },
        "P4": {
          "x": 0,
          "y": 8
        },
        "P15": {
          "x": 10,
          "y": 0
        },
        "P25": {
          "x": 20,
          "y": 4
        },
        "P35": {
          "x": 10,
          "y": 8
        },
        "P45": {
          "x": 0,
          "y": 4
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 10,
        "topText": 4
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "doys_label_element_4",
        "elementType": "text"
      },
      "sections": [
        {
          "pos": 0,
          "type": "field",
          "value": "name",
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
        "size": "10"
      },
      "frame": {
        "type": "",
        "width": 0
      },
      "position": {
        "layer": 1,
        "top": "3.90",
        "left": "3",
        "width": "47.57",
        "height": 8,
        "angle": 0,
        "angleR": 0,
        "textAlign": "left",
        "verticalAlign": "top",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 47.57,
        "hC": 8,
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
          "y": 8
        },
        "P4": {
          "x": 0,
          "y": 8
        },
        "P15": {
          "x": 23.785,
          "y": 0
        },
        "P25": {
          "x": 47.57,
          "y": 4
        },
        "P35": {
          "x": 23.785,
          "y": 8
        },
        "P45": {
          "x": 0,
          "y": 4
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 0,
        "topText": 0
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "doys_label_element_5",
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
          "format": ""
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
        "italic": true
      },
      "frame": {
        "type": "rectangle",
        "width": 0.5,
        "color": "#EA5C5C",
        "fillColor": "#E7E580"
      },
      "position": {
        "layer": 1,
        "top": "12",
        "left": "3",
        "width": "37.31",
        "height": "7.87",
        "angle": 0,
        "angleR": 0,
        "textAlign": "left",
        "verticalAlign": "middle",
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "wC": 37.31,
        "hC": 7.87,
        "P1": {
          "x": 0,
          "y": 0
        },
        "P2": {
          "x": 37.31,
          "y": 0
        },
        "P3": {
          "x": 37.31,
          "y": 7.87
        },
        "P4": {
          "x": 0,
          "y": 7.87
        },
        "P15": {
          "x": 18.655,
          "y": 0
        },
        "P25": {
          "x": 37.31,
          "y": 3.935
        },
        "P35": {
          "x": 18.655,
          "y": 7.87
        },
        "P45": {
          "x": 0,
          "y": 3.935
        },
        "offsetX": 0,
        "offsetY": 0,
        "leftText": 0,
        "topText": 3.935
      },
      "env": "design",
      "point": 600
    },
    {
      "head": {
        "name": "doys_label_element_6",
        "elementType": "image"
      },
      "font": {
        "lineHeight": 0,
        "size": 12
      },
      "frame": {
        "type": "",
        "width": 0,
        "color": "#B30A0A",
        "fillColor": "#00F7FF"
      },
      "position": {
        "layer": 1,
        "top": 21.05691056910569,
        "left": 2.93,
        "width": "24.79",
        "height": "22.52",
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
        "imgHeight": 20.79
      },
      "image": {
        "value": "img01",
        "deformation": "zoom",
        "url": "http://biosunmed.com/upload/2020/7/61552460.jpg"
      },
      "env": "design",
      "point": 600
    }
  ]
}
        `;
}