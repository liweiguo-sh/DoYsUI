
function printReport() {
    var data = gridview.dtbViewData;
    var billTitle;
    var txtDept = gId("txtDept").dropdown.dataRow.dept_name.value;
    if (txtDept == "全部"){
        txtDept = "";
    }
    if (gId("radioSum").checked){
        billTitle = "科室记帐综合查询汇总报表";
    }else if(gId("radioDtl").checked){
        billTitle = "科室记帐综合查询明细报表";
    }else {
        return false;
    }
    var param = {
        title: billTitle ,
        pageRowNum: 100, //每页数量
        colNumThs: 3, //表头每行多少列，默认为4
        colNumTfooters: 3, //表尾每行多少列，默认为4
    }
    param.form = {
        ths: [{
            text: "科室",
            value: txtDept
        }],

        tfooters: [{
            text: "审核",
            value: '',
            width: '10%'
        }]
    }
    if (gId("radioSum").checked) {
        param.grid ={
            ths: ["序号", "来源", "品名", "品规","单价", "数量", "金额"],
            thwidths: ["auto", "auto","auto", "auto", "auto", "auto", "auto"],
            data: (function () {
                var arr = [],
                    row;
                if (data && data.rowCount > 0) {
                    for (var i in data.rows) {
                        row = data.rows[i];

                        arr.push([(parseInt(i) + 1), row["source_type"].value, row["material_name"].value, row["material_spec"].value,
                            row["price_sp"].value.toFixed(3), row["qty0"].value.toFixed(2), row["amount_sp"].value]);
                    }
                }
                return arr;
            })()
        };
    } else if(gId("radioDtl").checked) {
        //param.sumTableFun = _whPrint.isomoc.issum;
         param.grid = {
             ths: ["序号","科室", "记账日期", "单号","品名", "品规","价格", '数量', '金额',"供应商","厂商","来源业务单号","来源业务类型"],
             thwidths:["auto", "auto","auto", "auto", "auto", "auto","auto", "auto", "auto"],
             data: (function () {
                 var arr = [],
                     row;
                 if (data && data.rowCount > 0) {
                     for (var i in data.rows) {
                         row = data.rows[i];
                         arr.push([(parseInt(i) + 1), row["dept_name"].value, row["bill_date"].value, row["bill_key"].value, row["material_name"].value
                             , row["material_spec"].value, row["price_sp"].value, row["qty0"].value,row["amount_sp"].value,row["sp_name"].value,row["mfc_name"].value
                             , row["ref_bus_key"].value,row["source_type"].value]);
                     }
                 }
                 return arr;
             })()
         };
    }
    WebPrint.goPrintFormModel(param);

}
