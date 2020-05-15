var PrintService = {};
PrintService.printSN = function (printSource, preview) {
    /*
    *可以传入Datatable，或者DataRow数组，必须包含下列字段
    *pack_id,sn_count，sn_no，manufacturer_name，material_name，material_spec，remark,valid_date(有效期），valid_date2（灭菌有效期），sp_name,disinfection_date（灭菌日期）
    *定数包传入数量qty
    */
    var drs = new Array();
    if (printSource&&printSource.rowCount) {
        for (var i = 0; i < printSource.rowCount; i++) {
            drs.push(printSource.rows[i]);
        }
    } else {
        drs = printSource;
    }
    if (drs.length < 1) return;
    openExcel("c:\\spd2\\sn.xls");
    // openExcel("c:\\spd2\\sn-nj.xls");
    ExcelApp.WindowState = -4140;   // -- 最小化 --

    var rowsPerPage = 8;
    var curPage = 0;
    for (var i = 0; i < drs.length; i++) {
        for (j = 0; j < drs[i]["sn_count"].value; j++) {
            if (curPage > 0) {
                addPageBreaks(curPage * rowsPerPage);
                oWorkSheet.Rows("1:" + (rowsPerPage)).Select();
                ExcelApp.Selection.Copy();
                oWorkSheet.Rows((curPage * rowsPerPage + 1) + ":" + (curPage * rowsPerPage + 1)).Select();
                oWorkbook.ActiveSheet.Paste();
            }
            var categoryCode = "";
            if (drs[i]["category_code"]) {
                categoryCode = drs[i]["category_code"].value;
                if (!categoryCode.equals("")) {
                    categoryCode += "-";
                }
            }
            out("A", 1 + curPage * rowsPerPage, getCode128(drs[i]["sn_no"].value));
            out("A", 2 + curPage * rowsPerPage, categoryCode + drs[i]["sn_no"].value + "    (" + drs[i]["sn_count"].value + "-" + (j + 1) + ")");

            out("B", 3 + curPage * rowsPerPage, drs[i]["lot"].value);
           
            out("B", 4 + curPage * rowsPerPage, drs[i]["sp_name"].value);
            out("B", 5 + curPage * rowsPerPage, drs[i]["disinfection_date"].value.substring(0, 10) + " 效期 " + drs[i]["valid_date2"].value);
            out("B", 6 + curPage * rowsPerPage, drs[i]["material_name"].value);
            if (drs[i]["pack_id"].value == "0") {
                out("A", 6 + curPage * rowsPerPage, "耗材名称");
                out("A", 7 + curPage * rowsPerPage, "规格型号");
                out("B", 7 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["remark"].value);
            } else if (drs[i]["pack_id"].value == "-2") {
                out("A", 6 + curPage * rowsPerPage, "耗材名称");
                out("A", 7 + curPage * rowsPerPage, "品规数量");
                out("B", 7 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["qty"].value);
            }else {
                out("A", 6 + curPage * rowsPerPage, "手 术 包");
                out("A", 7 + curPage * rowsPerPage, "描    述");
                out("B", 7 + curPage * rowsPerPage, drs[i]["remark"].value);
            }
            //out("B", 5 + curPage * rowsPerPage, drs[i]["remark"].value);
 

            curPage++;
        }
    }
    
    // for (var i = 0; i < drs.length; i++) {
    //     for (j = 0; j < drs[i]["sn_count"].value; j++) {
    //         if (curPage > 0) {
    //             addPageBreaks(curPage * rowsPerPage);
    //             oWorkSheet.Rows("1:" + (rowsPerPage)).Select();
    //             ExcelApp.Selection.Copy();
    //             oWorkSheet.Rows((curPage * rowsPerPage + 1) + ":" + (curPage * rowsPerPage + 1)).Select();
    //             oWorkbook.ActiveSheet.Paste();
    //         }
    //         var categoryCode = "";
    //         if (drs[i]["category_code"]) {
    //             categoryCode = drs[i]["category_code"].value;
    //             if (!categoryCode.equals("")) {
    //                 categoryCode += "-";
    //             }
    //         }
    //         out("A", 1 + curPage * rowsPerPage, getCode128(drs[i]["sn_no"].value));
    //         out("A", 2 + curPage * rowsPerPage, categoryCode + drs[i]["sn_no"].value + "    (" + drs[i]["sn_count"].value + "-" + (j + 1) + ")");

    //         // out("B", 3 + curPage * rowsPerPage, drs[i]["manufacturer_name"].value);
           
    //         out("B", 3 + curPage * rowsPerPage, drs[i]["sp_name"].value);
    //         out("B", 4 + curPage * rowsPerPage, drs[i]["lot"].value);
    //         out("B", 5 + curPage * rowsPerPage, drs[i]["manufacture_date"].value);
    //         out("B", 6 + curPage * rowsPerPage, drs[i]["expired_date"].value);
    //         out("B", 7 + curPage * rowsPerPage, drs[i]["material_name"].value);
    //         if (drs[i]["pack_id"].value == "0") {
    //             out("A", 7 + curPage * rowsPerPage, "耗材名称");
    //             out("A", 8 + curPage * rowsPerPage, "规格型号");
    //             out("B", 8 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["remark"].value);
    //         } else if (drs[i]["pack_id"].value == "-2") {
    //             out("A", 6 + curPage * rowsPerPage, "耗材名称");
    //             out("A", 7 + curPage * rowsPerPage, "品规数量");
    //             out("B", 7 + curPage * rowsPerPage, drs[i]["material_spec"].value + " " + drs[i]["qty"].value);
    //         }else {
    //             out("A", 6 + curPage * rowsPerPage, "手 术 包");
    //             out("A", 7 + curPage * rowsPerPage, "描    述");
    //             out("B", 7 + curPage * rowsPerPage, drs[i]["remark"].value);
    //         }
    //         //out("B", 5 + curPage * rowsPerPage, drs[i]["remark"].value);
 

    //         curPage++;
    //     }
    // }
    PrintService.finishPrint(preview,"sn");
}
PrintService.printWi = function (wiId, preview,wiType) {
    /*
    *传入入库单ID
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWi", { wiId: wiId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWi = cReturn.dtbWi;
            var dtbWiDtl = cReturn.dtbWiDtl;
            // --------------------
            if(topWin.serverName.equals("spd-107")){
                openExcel("c:\\spd2\\wi_107.xls", true);
            } else {
                if (wiType.equals("PURCHASE_LOW") || wiType.equals("CONSIGN_LOW")) {
                    openExcel("c:\\spd2\\wi_low.xls", true);
                } else {
                    openExcel("c:\\spd2\\wi.xls", true);
                }
                
            }
            var rptTitle = dtbWi.rows[0]["company_name"].value + "入库单（"+ dtbWi.rows[0]["storage_name"].value+")";
            out("A", 1, rptTitle);
            out("H", 1, getCode128(dtbWi.rows[0]["wi_key"].value));
            out("H", 2, dtbWi.rows[0]["wi_key"].value);
            if(dtbWi.rows[0]["distributor_sp_id"].value.equals("0")){
               out("B", 3, "供应商：" + dtbWi.rows[0]["sp_name"].value);
            }else{
               out("B", 3, "供应商：" + dtbWi.rows[0]["sp_name"].value+"                                配送商:"+dtbWi.rows[0]["dsp_name"].value);
            }
         
            out("J", 3, dtbWi.rows[0]["wi_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWiDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWiDtl.rows[iRow];
                packId = drRow["pack_id"].value;

                if (nRowNo > 26) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                if (packId > 0) {		// -- 包 --
                    out("B", nRowNo, "    " + drRow["material_name"].value);
                } else if (packId == -1) {
                    prePack = iRow + 1;
                    out("B", nRowNo, drRow["material_name"].value);
                } else {
                    out("B", nRowNo, drRow["material_name"].value);
                }
                out("C", nRowNo, drRow["material_spec"].value);
                out("D", nRowNo, drRow["manufacturer_name"].value);
                if (wiType.equals("SP_LOW")) {
                    
                } else {
                    out("E", nRowNo, drRow["operation_code"].value);
                }
                
                out("F", nRowNo, drRow["lot"].value);
                out("G", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("H", nRowNo, drRow["qty"].value);
                out("I", nRowNo, drRow["material_unit"].value);
                out("J", nRowNo, drRow["storage_fullname"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
PrintService.printWi_little = function (wiId, preview) {
   //24×9小纸张打印，传入入库单ID
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWi", { wiId: wiId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWi = cReturn.dtbWi;
            var dtbWiDtl = cReturn.dtbWiDtl;
            // --------------------
            openExcel("c:\\spd2\\wi_little.xls", true);
            out("A", 1, topWin.office0Name + "入库单");

            out("G", 1, getCode128(dtbWi.rows[0]["wi_key"].value));
            out("G", 2, dtbWi.rows[0]["wi_key"].value);
            if (dtbWi.rows[0]["distributor_sp_id"].value.equals("0")) {
                out("B", 3, "供应商：" + dtbWi.rows[0]["sp_name"].value);
            } else {
                out("B", 3, "供应商：" + dtbWi.rows[0]["sp_name"].value + "                                配送商:" + dtbWi.rows[0]["dsp_name"].value);
            }

            out("H", 3, dtbWi.rows[0]["wi_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWiDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWiDtl.rows[iRow];
                packId = drRow["pack_id"].value;

                if (nRowNo > 9) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                if (packId > 0) {		// -- 包 --
                    out("B", nRowNo, "    " + drRow["material_name"].value);
                } else if (packId == -1) {
                    prePack = iRow + 1;
                    out("B", nRowNo, drRow["material_name"].value);
                } else {
                    out("B", nRowNo, drRow["material_name"].value);
                }
                out("C", nRowNo, drRow["material_spec"].value);
                out("D", nRowNo, drRow["manufacturer_name"].value);
                //out("E", nRowNo, drRow["operation_code"].value);
                out("F", nRowNo, drRow["lot"].value);
                out("G", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("H", nRowNo, drRow["qty"].value);
                out("I", nRowNo, drRow["material_unit"].value);
                //out("J", nRowNo, drRow["storage_fullname"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}
PrintService.printWoApply = function (tapplyDistId, preview) {
    /*
    *打印科室请领出库单，传入出库单ID;preveiw:true or false
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoApply", { tapplyDistId: tapplyDistId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-apply.xls", true);
            out("A", 1, dtbWo.rows[0]["storage_to"].value+ "请领配送单");
            out("C", 2, dtbWo.rows[0]["tapply_dist_key"].value);
            out("C", 3, dtbWo.rows[0]["storage_name"].value);
            out("E", 2, dtbWo.rows[0]["tapply_dist_date0"].value.substring(0, 10));
            out("I", 2, dtbWo.rows[0]["auditor"].value);
            out("E", 3, dtbWo.rows[0]["tapply_dist_user"].value);
            out("G", 2, dtbWo.rows[0]["storage_to"].value);
            out("G", 3, dtbWo.rows[0]["remark"].value);
              out("G", 1, dtbWo.rows[0]["tapply_dist_key"].value);
            
            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
            

                if (nRowNo > 10) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["barcode"].value);
                out("C", nRowNo, drRow["matr_name"].value);          
                out("D", nRowNo, drRow["matr_spec"].value);
                out("F", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo, drRow["lot"].value);
                out("H", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("I", nRowNo, drRow["qty"].value);
                out("J", nRowNo, drRow["material_unit"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}

PrintService.printWoSp = function (woId, preview) {
    /*
    *打印供应商退货出库单，传入出库单ID;preveiw:true or false
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoSp", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-sp.xls", true);
            out("A", 1, topWin.office1Name + "退货出库单");
            out("G", 1, getCode128(dtbWo.rows[0]["wo_key"].value));

            out("C", 2, dtbWo.rows[0]["wo_key"].value);
            out("C", 3, dtbWo.rows[0]["sp_name"].value);
            out("E", 2, dtbWo.rows[0]["wo_date"].value.substring(0, 10));
            out("I", 2, dtbWo.rows[0]["wo_sender"].value);
            out("E", 3, dtbWo.rows[0]["wo_receiver"].value);
            out("G", 3, dtbWo.rows[0]["wo_remark"].value);
            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
                packId = drRow["pack_id"].value;

                if (nRowNo > 10) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["sn_no"].value);
                if (packId > 0) {		// -- 包 --
                    out("C", nRowNo, "    (" + prePack + ")" + drRow["material_name"].value);
                } else if (packId == -1) {
                    prePack = iRow + 1;
                    out("C", nRowNo, drRow["material_name"].value);
                } else {
                    out("C", nRowNo, drRow["material_name"].value);
                }
                out("D", nRowNo, drRow["material_spec"].value);
                out("F", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo, drRow["lot"].value);
                out("H", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("I", nRowNo, drRow["qty"].value);
                out("J", nRowNo, drRow["material_unit"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}


PrintService.printWoOpS2 = function (woId, preview) {
    /*
    *打印手术退货出库单，传入出库单ID;preveiw:true or false
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoOpS2", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-op.xls", true);
            out("A", 1, topWin.office0Name + "手术器械反洗出库单");

            out("E", 2, dtbWo.rows[0]["wo_key"].value);
            out("C", 2, dtbWo.rows[0]["sp_name"].value);
            out("G", 2, dtbWo.rows[0]["wo_date"].value.substring(0, 10));
            out("I", 2, dtbWo.rows[0]["wo_sender"].value);
            out("C", 3, dtbWo.rows[0]["dept_name"].value + "/" + dtbWo.rows[0]["doctor_name"].value);
            out("E", 3, dtbWo.rows[0]["operation_date"].value);
            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
                packId = drRow["pack_id"].value;

                if (nRowNo > 19) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["sn_no"].value);
                if (packId > 0) {		// -- 包 --
                    out("C", nRowNo, "    (" + prePack + ")" + drRow["material_name"].value);
                } else if (packId == -1) {
                    prePack = iRow + 1;
                    out("C", nRowNo, drRow["material_name"].value);
                } else {
                    out("C", nRowNo, drRow["material_name"].value);
                }
                out("D", nRowNo, drRow["material_spec"].value);
                out("F", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo, drRow["lot"].value);
                out("H", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("I", nRowNo, drRow["qty"].value);
                out("J", nRowNo, drRow["material_unit"].value);
                out("K", nRowNo, drRow["re_disinfection_type"].value);
                out("L", nRowNo, drRow["re_disinfection_date"].value.substring(0, 10));
                out("M", nRowNo, drRow["re_disinfector"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}

PrintService.printWoOp = function (woId, preview) {
    /*
    *打印手术退货出库单，传入出库单ID;preveiw:true or false
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoOp", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-op.xls", true);
            out("A", 1, topWin.office0Name + "手术器械反洗出库单");

            out("E", 2, dtbWo.rows[0]["wo_key"].value);
            out("C", 2, dtbWo.rows[0]["sp_name"].value);
            out("G", 2, dtbWo.rows[0]["wo_date"].value.substring(0, 10));
            out("I", 2, dtbWo.rows[0]["wo_sender"].value);
            out("C", 3, dtbWo.rows[0]["dept_name"].value + "/" + dtbWo.rows[0]["doctor_name"].value);
            out("E", 3, dtbWo.rows[0]["operation_date"].value);
            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
                packId = drRow["pack_id"].value;

                if (nRowNo > 19) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["sn_no"].value);
                if (packId > 0) {		// -- 包 --
                    out("C", nRowNo, "    (" + prePack + ")" + drRow["material_name"].value);
                } else if (packId == -1) {
                    prePack = iRow + 1;
                    out("C", nRowNo, drRow["material_name"].value);
                } else {
                    out("C", nRowNo, drRow["material_name"].value);
                }
                out("D", nRowNo, drRow["material_spec"].value);
                out("F", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo, drRow["lot"].value);
                out("H", nRowNo, drRow["expired_date"].value.substring(0, 10));
                out("I", nRowNo, drRow["qty"].value);
                out("J", nRowNo, drRow["material_unit"].value);
                out("K", nRowNo, drRow["re_disinfection_type"].value);
                out("L", nRowNo, drRow["re_disinfection_date"].value.substring(0, 10));
                out("M", nRowNo, drRow["re_disinfector"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
PrintService.printWoUseCheckout = function (woId, preview) {
    /*
    *打印手术消耗出库单，传入出库单ID;preveiw:true or false
    */

    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoUseCheckOut", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-use_checkout.xls", true);
            out("A", 1, dtbWo.rows[0]["wo_key"].value);
            out("A", 2, dtbWo.rows[0]["wo_key"].value);
            out("C", 3, dtbWo.rows[0]["operation_name"].value);
            out("E", 3, dtbWo.rows[0]["office_name"].value);
            out("G", 3, dtbWo.rows[0]["doctor_name"].value);
            out("I", 3, dtbWo.rows[0]["operation_code"].value);
            out("L", 3, dtbWo.rows[0]["wo_date"].value.substring(0, 10));
            out("C", 4, dtbWo.rows[0]["patient_name"].value);
            out("E", 4, dtbWo.rows[0]["patient_gender"].value);
            out("G", 4, dtbWo.rows[0]["patient_age"].value);
            out("I", 4, dtbWo.rows[0]["patient_no"].value);
            out("L", 4, dtbWo.rows[0]["patient_bed_no"].value);
            // --------------------
            var nRowBegin = 6, nRowNo = 0, packId = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
                packId = drRow["pack_id"].value;
  
                if (nRowNo >25) {
                
                    copyRow(nRowNo - 1);
                 if (iRow % 20 == 0) {
							addPageBreaks(nRowNo - 1);
						}
                }


                out("A", nRowNo , (iRow + 1));
                if (packId > 0) {		// -- 包明细 --
                    out("B", nRowNo , "    " + drRow["material_name"].value);
                }
                else {
                    out("B", nRowNo , drRow["material_name"].value);
                }
                out("E", nRowNo , drRow["material_spec"].value);
                //out("G", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo , drRow["sp_name"].value);
                out("I", nRowNo , drRow["qty"].value);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
PrintService.printWoUseCheckout_little = function (woId, preview) {
    //打印手术消耗出库单，传入出库单ID;preveiw:true or false

    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoUseCheckOut_little", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbWo = cReturn.dtbWo;
            var dtbWoDtl = cReturn.dtbWoDtl;
            // --------------------
            openExcel("c:\\spd2\\wo-use_checkout_little.xls", true);
            out("A", 1, dtbWo.rows[0]["wo_key"].value);
            out("A", 2, dtbWo.rows[0]["wo_key"].value);
            out("C", 3, dtbWo.rows[0]["operation_name"].value);
            out("E", 3, dtbWo.rows[0]["office_name"].value);
            out("G", 3, dtbWo.rows[0]["doctor_name"].value);
            out("I", 3, dtbWo.rows[0]["operation_code"].value);
            out("L", 3, dtbWo.rows[0]["wo_date"].value.substring(0, 10));
            out("C", 4, dtbWo.rows[0]["patient_name"].value);
            out("E", 4, dtbWo.rows[0]["patient_gender"].value);
            out("G", 4, dtbWo.rows[0]["patient_age"].value);
            out("I", 4, dtbWo.rows[0]["patient_no"].value);
            out("L", 4, dtbWo.rows[0]["patient_bed_no"].value);
            // --------------------
            var nRowBegin = 6, nRowNo = 0, packId = 0;
            var nRowCount = dtbWoDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbWoDtl.rows[iRow];
                packId = drRow["pack_id"].value;
                
                if (nRowNo > 10) {
                    copyRow(nRowNo - 1);
                }
                
                out("A", nRowNo, (iRow + 1));
                if (packId > 0) {		// -- 包明细 --
                    out("B", nRowNo, "    " + drRow["material_name"].value);
                }
                else {
                    out("B", nRowNo, drRow["material_name"].value);
                }
                  out("E", nRowNo, drRow["material_spec"].value);
                //out("G", nRowNo, drRow["manufacturer_name"].value);
                  out("G", nRowNo, drRow["price_sp"].value);
                  out("H", nRowNo, drRow["qty"].value);
                  var sum=parseFloat(drRow["price_sp"].value)*parseInt(drRow["qty"].value);
                  out("I", nRowNo, sum);
                  out("F", nRowNo, drRow["material_unit"].value);
                  out("K", nRowNo, drRow["disinfection_expired_date"].value);                 
            }
            if(nRowCount>5){
                out("A", nRowNo + 1, "打印日期：" + dtbWo.rows[0]["print_date"].value);
                out("F", nRowNo + 1, "收货人：" + dtbWo.rows[0]["wo_receiver"].value);
                out("H", nRowNo + 1, "总金额：" + cReturn.sum);
            }else{
                out("A", 11, "打印日期：" + dtbWo.rows[0]["print_date"].value);
                out("F", 11, "收货人：" + dtbWo.rows[0]["wo_receiver"].value);
                out("H", 11, "总金额："+cReturn.sum);           
            }
             
             
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
PrintService.printGTIN = function (materialIds,preview) {
    // 打印GTIN条码,传入逗号分隔的物料IDs
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getMaterialGTIN", { materialIds: materialIds }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbMaterial = cReturn.dtbMaterial;
            openExcel("c:\\spd2\\ma_gtin.xls", true);
            // --------------------
            var nRowBegin = 3, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbMaterial.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbMaterial.rows[iRow];
                if (nRowNo > 10) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["material_name"].value);
                out("C", nRowNo, drRow["material_spec"].value);
                out("D", nRowNo, drRow["sp_name"].value);
                var barcode = drRow["material_gtin"].value.equals("") ? drRow["material_hibc"].value : drRow["material_gtin"].value;
                out("E", nRowNo, barcode);
                if (barcode.length > 0) {
                    out("F", nRowNo, getCode128("01"+barcode));
                }

            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview,"",true);

        }
    }
};
PrintService.printBills2 = function (billSpId, preview) {
 /*
    *传入记账单ID
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSps2", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------
            openExcel("c:\\spd2\\bill-sp.xls", true);
            out("R", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value));
            out("R", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("C", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("I", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("M", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("S", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("X", 3, dtbBillSp.rows[0]["operation_date"].value.substring(0, 10));

            out("C", 4, dtbBillSp.rows[0]["office_name"].value);
            out("F", 4, dtbBillSp.rows[0]["operation_name"].value);
            out("M", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("X", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 6, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null;
            var sum = 0;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbBillSpDtl.rows[iRow];

                if (nRowNo > 14) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, drRow["material_name"].value);
                out("E", nRowNo, drRow["material_spec"].value);
                out("H", nRowNo, drRow["注册证号"].value);
                out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                out("K", nRowNo, drRow["disinfection_exp"].value.substring(0, 10));
                out("M", nRowNo, drRow["lot"].value);
                out("Q", nRowNo, drRow["patient_qty"].value);
                out("S", nRowNo, drRow["patient_price"].value);
                out("U", nRowNo, drRow["material_is_imported"].value.equals("0") ? "国产" : "进口");
                out("W", nRowNo, drRow["manufacturer_name"].value);
                sum += parseFloat(drRow["patient_price"].value) * parseFloat(drRow["patient_qty"].value);
            }
            var sumRow = 15;
            if (nRowNo + 1 > 15) {
                sumRow = nRowNo + 1;
            }
            sum = sum.toFixed(2);
            out("E", sumRow, PrintService.cashUpper(sum));
            out("S", sumRow, sum);
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}

PrintService.printBill = function (billSpId, preview) {
    /*
    *传入记账单ID
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSp", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------
            openExcel("c:\\spd2\\bill-sp.xls", true);
            out("R", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value));
            out("R", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("C", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("I", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("M", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("S", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("X", 3, dtbBillSp.rows[0]["oprt_date"].value.substring(0, 10));

            out("C", 4, dtbBillSp.rows[0]["office_name"].value);
            out("F", 4, dtbBillSp.rows[0]["oprt_name"].value);
            out("M", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("X", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 6, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null;
            var sum = 0;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbBillSpDtl.rows[iRow];

                if (nRowNo > 14) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, drRow["material_name"].value);
                out("E", nRowNo, drRow["material_spec"].value);
                out("H", nRowNo, drRow["注册证号"].value);
                out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                out("M", nRowNo, drRow["lot"].value);
                out("Q", nRowNo, drRow["qty1"].value);
                out("S", nRowNo, drRow["price"].value);
                out("U", nRowNo, drRow["material_is_imported"].value.equals("0") ? "国产" : "进口");
                out("W", nRowNo, drRow["manufacturer_name"].value);
                sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            var sumRow = 15;
            if (nRowNo + 1 > 15) {
                sumRow = nRowNo + 1;
            }
            sum = sum.toFixed(2);
            out("E", sumRow, PrintService.cashUpper(sum));
            out("S", sumRow, sum);
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
PrintService.printBill_107 = function (billSpId, preview) {
    /*
    *传入记账单ID(107模式)
    */
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSp", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            var dtbBC = cReturn.dtbBC;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------
            openExcel("c:\\spd2\\bill-sp-107.xlsx", true);
            out("R", 1, dtbBillSp.rows[0]["bill_key"].value);

            out("C", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("I", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("M", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("S", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("X", 3, dtbBillSp.rows[0]["operation_date"].value.substring(0, 10));

            out("C", 4, dtbBillSp.rows[0]["office_name"].value);
            out("F", 4, dtbBillSp.rows[0]["operation_name"].value);
            out("M", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("X", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------
            var nRowBegin = 6, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null;
            var sum = 0;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbBillSpDtl.rows[iRow];

                if (nRowNo > 17) {
                    copyRow(nRowNo - 1);
                }

                out("A", nRowNo, drRow["material_name"].value);
                out("E", nRowNo, drRow["material_spec"].value);
                out("H", nRowNo, drRow["注册证号"].value);
                out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                out("M", nRowNo, drRow["lot"].value);
                out("Q", nRowNo, drRow["qty1"].value);
                //out("S", nRowNo, drRow["price"].value);
                out("S", nRowNo, drRow["material_is_imported"].value.equals("0") ? "国产" : "进口");
                out("U", nRowNo, drRow["manufacturer_name"].value);
                sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }

            var arrBC = new Array();
            nRowBegin = 18, nRowBC = 0;
            if (nRowNo >= 18) {
                nRowBegin = nRowNo + 1;
            }
            for (var i = 0; i < dtbBC.rowCount; i++) {
                var bc = dtbBC.rows[i]["his_fee_bc"].value;
                nRowBC = parseInt(i / 3);
                nRowNo = nRowBegin + nRowBC;
                colNum = i % 3;
                if (nRowBC > 4 && colNum == 0) {
                    copyLastRow(nRowNo);
                    PrintService.finishPrint(preview);
                    return;
                }
                var qrUrl = g.httpServer + g.appPath + "res_run/spd/bill_bc/" + bc + ".png";
                try {
                    oWorkSheet.shapes(i + 1).Fill.UserPicture(qrUrl);
                }
                catch (e) {
                    debug(e.toString());
                }
                out(_colName[colNum], nRowNo, bc);
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}
var _colName = ["A", "H", "Q"];
function copyLastRow(nRow) {
    oWorkSheet.Rows(nRow + ":" + nRow).Select();
    ExcelApp.Selection.Copy();
    oWorkSheet.Rows((nRow + 1) + ":" + (nRow + 1)).Select();
    oWorkbook.ActiveSheet.Paste();
    ExcelApp.CutCopyMode = false;   //-- 清除剪贴板 --
}
//完成打印
PrintService.finishPrint = function (preview, printerType, canSave) {
    //ExcelApp.Visible = true;
    //return;
    setActivePrinter(printerType);
    if (preview) {
        ExcelApp.Visible = true;
        if (canSave) {
            return;
        }
        oWorkbook.PrintPreview();
    } else {
        oWorkbook.PrintOut();
    }
    oWorkbook.Close();
    ExcelApp.Quit();
    ExcelApp = null;
    setTimeout(CollectGarbage, 1000);
}
function setActivePrinter(printerType){
    var snPrinter = getLocalItem("SPD2_SNPrinter");
    var rptPrinter = getLocalItem("SPD2_RptPrinter");
    var targetPrinter = "";
    if (printerType&&printerType.equals("sn")) {
        targetPrinter = snPrinter;
    } else {
        targetPrinter = rptPrinter;
    }
    if (targetPrinter.length > 0) {
        try {
            ExcelApp.ActivePrinter = targetPrinter;
        } catch (e) {
            showErr("设置的打印机不存在，请重新在“工位设置”里设置！");
        }
    }
}
PrintService.cashUpper = function (num) {
    var strOutput = "";
    var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
    if (intPos >= 0)
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++)
        strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
}

PrintService.printBill_107Bs2 = function (billSpId, preview) {
  if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSps2", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["oprt_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["oprt_name"].value);
            out("H", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["his_fee_bc"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_exp"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["patient_price"].value);
                //sum += parseFloat(drRow["patient_price"].value) * parseFloat(drRow["patient_qty"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
                        out("B", nRowNo + 9, dtbBillSp.rows[0]["doctor_name"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}

PrintService.printBill_107B = function (billSpId, preview) {
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSp", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["oprt_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["oprt_name"].value);
            out("H", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["charge_barcode"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["price"].value);
                //sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
                       out("B", nRowNo + 9, dtbBillSp.rows[0]["doctor_name"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}

PrintService.printBill_107B1s2 = function (billSpId, preview) {
if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSps2", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["operation_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["operation_name"].value);
            out("H", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["his_fee_bc"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["price"].value);
                //sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
                       out("B", nRowNo + 9, dtbBillSp.rows[0]["operation_doctor"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            //PrintService.finishPrint(preview);
        }
    }
}

PrintService.printBill_107B1 = function (billSpId, preview) {
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getBillSp", { billSpId: billSpId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["oprt_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["oprt_name"].value);
            out("H", 4, dtbBillSp.rows[0]["sp_name"].value);
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["charge_barcode"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["price"].value);
                //sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
                       out("B", nRowNo + 9, dtbBillSp.rows[0]["doctor_name"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            //PrintService.finishPrint(preview);
        }
    }
}

PrintService.printBill_107B_2 = function (woId, preview) {
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getWoBillSp", { woId: woId }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["operation_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["operation_name"].value);
            out("H", 4, "");
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["charge_barcode"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["price"].value);
                //sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
                       out("B", nRowNo + 9, dtbBillSp.rows[0]["doctor_name"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}

PrintService.printBill_107B_S2 = function (opc_id, preview) {
    if (g.a.send("processType=g_spd.stock.ResourcePrint&actionType=getOpcBillSp", { opc_id: opc_id }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbBillSp = cReturn.dtbBillSp;
            var dtbBillSpDtl = cReturn.dtbBillSpDtl;
            if (dtbBillSp.rowCount < 1 || dtbBillSpDtl.rowCount < 1) {
                showErr("缺少打印数据！");
                return;
            }
            // --------------------------------------------
            openExcel("c:\\spd2\\bill-sp-107B.xls", false);
            out("G", 1, getCode128(dtbBillSp.rows[0]["bill_key"].value, "A"));
            out("G", 2, dtbBillSp.rows[0]["bill_key"].value);

            out("B", 3, dtbBillSp.rows[0]["patient_name"].value);
            out("D", 3, dtbBillSp.rows[0]["patient_gender"].value);
            out("F", 3, dtbBillSp.rows[0]["patient_age"].value);
            out("H", 3, dtbBillSp.rows[0]["patient_no"].value);
            out("J", 3, dtbBillSp.rows[0]["patient_bed_no"].value);
            out("L", 3, dtbBillSp.rows[0]["operation_date"].value.substring(0, 10));

            out("B", 4, dtbBillSp.rows[0]["office_name"].value);
            out("D", 4, dtbBillSp.rows[0]["operation_name"].value);
            out("H", 4, "");
            out("L", 4, dtbBillSp.rows[0]["bill_date"].value.substring(0, 10));

            // --------------------------------------------
            var nRem = 0, nPageGroup = 1;
            var nRowNo = 0, nRowBegin = 5, nRowHeight = 7;
            var nRowCount = dtbBillSpDtl.rowCount;
            var drRow = null; var beginRow = 0, endRow = 0;
            var realRow = 0; var code = new Array();
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                drRow = dtbBillSpDtl.rows[iRow];
                code = drRow["his_fee_bc"].value.split("-");
                beginRow = endRow;
                endRow += code.length;
                for (realRow = beginRow; realRow < endRow; realRow++) {
                    nRem = realRow % 2;
                    nRowNo = nRowBegin + nRowHeight * (realRow - nRem) / 2;

                    if (nRowNo > nRowBegin && nRem == 0) {
                        copyRows(nRowBegin, nRowBegin + nRowHeight - 1, nRowNo);
                        if (nPageGroup % 4 == 0) {
                            addPageBreaks(nRowNo - 1);
                        }
                        nPageGroup++;
                    }
                    if (nRem == 0) {
                        if (code[realRow - beginRow].equals("")) out("A", nRowNo + 1, "");
                        out("A", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("A", nRowNo + 2, code[realRow - beginRow]);
                        out("B", nRowNo + 3, drRow["material_name"].value);
                        out("B", nRowNo + 4, drRow["material_spec"].value);
                        out("B", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("B", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("F", nRowNo + 6, 1);
                    }
                    else {
                        if (code[realRow - beginRow].equals("")) out("G", nRowNo + 1, "");
                        out("G", nRowNo + 1, getCode128(code[realRow - beginRow], "A"));
                        out("G", nRowNo + 2, code[realRow - beginRow]);
                        out("H", nRowNo + 3, drRow["material_name"].value);
                        out("H", nRowNo + 4, drRow["material_spec"].value);
                        out("H", nRowNo + 5, drRow["manufacturer_name"].value);
                        out("H", nRowNo + 6, (drRow["material_is_imported"].value.equals("0") ? "国产" : "进口"));
                        out("L", nRowNo + 6, 1);
                    }
                }
                //out("H", nRowNo, drRow["注册证号"].value);
                //out("J", nRowNo, drRow["manufacture_date"].value.substring(0, 10));
                //out("K", nRowNo, drRow["disinfection_expired_date"].value.substring(0, 10));
                //out("M", nRowNo, drRow["lot"].value);
                //out("S", nRowNo, drRow["price"].value);
                //sum += parseFloat(drRow["price"].value) * parseFloat(drRow["qty1"].value);
            }
            // -- 清除最后一张无效标签 --------------------
            if (nRem == 0) {
                out("G", nRowNo + 1, "");
                out("G", nRowNo + 2, "");
                out("H", nRowNo + 3, "");
                out("H", nRowNo + 4, "");
                out("H", nRowNo + 5, "");
                out("H", nRowNo + 6, "");
                out("L", nRowNo + 6, "");
            }
            out("B", nRowNo + 9, dtbBillSp.rows[0]["operation_doctor"].value);
                        out("F", nRowNo + 9, dtbBillSp.rows[0]["sp_name"].value);
                        out("F", nRowNo + 10, (cReturn.username));
                        //out("L", nRowNo + 10, 1);
            // --------------------------------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);
        }
    }
}




//打印手术备货申请单
PrintService.printTdopa = function (tdopa_id, preview) {
    /*
    *打印手术退货出库单，传入出库单ID;preveiw:true or false
    */
    if (g.a.send("processType=g_spd.dept.TdeptOpra&actionType=getTdopa", { tdopa_id: tdopa_id,viewKey:"tdept_oprt_prep_apply_sto" }, true)) {
        if (g.a.OK) {
            var cReturn = g.a.cReturn;
            var dtbTdopa = cReturn.dtbTdopa;
            var dtbTdopaDtl = cReturn.dtbTdopaDtl;
            // --------------------
            openExcel("c:\\spd2\\tdopa.xls", true);
            out("A", 1, topWin.office0Name + "手术备货申请单");
            out("E", 2, dtbTdopa.rows[0]["tdopa_key"].value);
            out("C", 2, dtbTdopa.rows[0]["dept_name"].value);
            out("G", 2, dtbTdopa.rows[0]["tdopa_date"].value);
            out("I", 2, dtbTdopa.rows[0]["staff_name"].value);
            out("C", 3, dtbTdopa.rows[0]["dept_name_room"].value);
            out("E", 3, dtbTdopa.rows[0]["oprt_date"].value);
            out("G", 3, dtbTdopa.rows[0]["oprt_name"].value);
            out("I", 3, dtbTdopa.rows[0]["doctor_name"].value);
            // --------------------
            var nRowBegin = 5, nRowNo = 0, packId = 0, prePack = 0;
            var nRowCount = dtbTdopaDtl.rowCount;
            var drRow = null;
            for (var iRow = 0; iRow < nRowCount; iRow++) {
                nRowNo = nRowBegin + iRow;
                drRow = dtbTdopaDtl.rows[iRow];
                if (nRowNo > 19) {
                    copyRow(nRowNo - 1);
                }
                out("A", nRowNo, (iRow + 1));
                out("B", nRowNo, drRow["gtin"].value);
                out("C", nRowNo, drRow["material_name"].value);
                out("D", nRowNo, drRow["material_spec"].value);
                out("F", nRowNo, drRow["manufacturer_name"].value);
                out("G", nRowNo, drRow["matr_qty"].value);
                out("H", nRowNo, drRow["package_rate"].value);
                out("I", nRowNo, drRow["package_unit"].value);
                out("K", nRowNo, drRow["remark"].value);  
            }
            // --------------------
            oWorkSheet.Range("A1:A1").Select;
            PrintService.finishPrint(preview);

        }
    }
}

PrintService.printOprtWs = function (ws_id, preview) {
    /*
    *传入入库单ID
    */
		if (g.a.send("processType=g_spd.ws.WsReport&actionType=getOprtWs", { wsId: ws_id }, true)) {
			if (g.a.OK) {
				var cReturn = g.a.cReturn;
				var dtbWs = cReturn.dtbWs;
				var dtbWsDtl = cReturn.dtbWsDtl;
				// --------------------
				openExcel("c:\\spd2\\ws_prepare.xls", true);

				out("A", 1, getCode128(dtbWs.rows[0]["ws_key"].value), "A");
				out("A", 2, dtbWs.rows[0]["ws_key"].value);
				out("C", 3, dtbWs.rows[0]["oprt_name"].value);
				out("E", 3, dtbWs.rows[0]["office_name"].value);
				out("G", 3, dtbWs.rows[0]["doctor_name"].value);
				out("I", 3, dtbWs.rows[0]["oprt_code"].value);
				out("K", 3, dtbWs.rows[0]["ws_date"].value.substring(0, 10));

				out("C", 4, dtbWs.rows[0]["patient_name"].value);
				out("E", 4, dtbWs.rows[0]["patient_gender"].value);
				out("G", 4, dtbWs.rows[0]["patient_age"].value);
				out("I", 4, dtbWs.rows[0]["patient_no"].value);
				out("K", 4, dtbWs.rows[0]["patient_bed_no"].value);
				// --------------------
				var nRowBegin = 6, nRowNo = 0, packId = 0;
				var nRowCount = dtbWsDtl.rowCount;
				var drRow = null;
				for (var iRow = 0; iRow < nRowCount; iRow++) {
					nRowNo = nRowBegin + iRow;
					drRow = dtbWsDtl.rows[iRow];
					packId = drRow["pack_id"].value;

					if (iRow >= 20) {
						copyRow(nRowNo - 1);
						if (iRow % 20 == 0) {
							addPageBreaks(nRowNo - 1);
						}
					}

					out("A", nRowNo, (iRow + 1));
					if (packId > 0) {		// -- 包明细 --
						out("B", nRowNo, "    " + drRow["material_name"].value);
					}
					else {
						out("B", nRowNo, drRow["material_name"].value);
					}
					out("E", nRowNo, drRow["material_spec"].value);
					out("G", nRowNo, drRow["manufacturer_name"].value);
					out("I", nRowNo, drRow["sn_no"].value);
					out("J", nRowNo, drRow["qty"].value);
				}
				// --------------------
				oWorkSheet.Range("A1:A1").Select;
				ExcelApp.Visible = true;
				oWorkbook.PrintPreview();
			}
		}
}

