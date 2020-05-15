/*
 * xwf.tree JavaScript Library v1.0
 * Author: Volant Lee
 * Create Date: 2013-02-18
 * Modify Date: 2018-07-17
 * Copyright 2018, xpas-next.com
 * Description: 树控件 
 */
var css_xwf_tree = true;
// -- 类定义 ------------------------------------------------------------------
window.xwf_tree = function(jsonProp) {
    ///<summary>Tree控件，支持动态加载、全选、半选、单选等</summary>
    if (jsonProp == null) return;
    for (var key in jsonProp) {
        this[key] = jsonProp[key];
    }
    // -- 重新初始化类成员变量，避免类实例间共享 ----------
    this.prefix += this.instanceIndex.index++ + "_";
    this.nodes = {};
    this.nodeKeys = new Array();
    // -- 初始化类 ----------------------------------------
    this.init();
};
window.xwf_tree.prototype = {
    prefix: "xwf_tree_", // -- 类实例统一前缀名称，用于类内部创建的控件id命名 --
    cssPrefix: "xwf_tree_", // -- 样式表统一前缀名称 --
    instanceIndex: { index: 0 }, // -- 类实例下标 --
    doc: document, // -- 类宿主窗口 --
    divContainer: null, // -- 控件容器 --

    imgPath: "", // -- 控件图片路径 --
    sd: "~", // -- nodeKey分隔符 --
    title: "", // -- 树控件title --
    showCheckBoxs: "none", // -- 显示checkbox(none, all, leaf) --
    nodes: {}, // -- 所有节点集合 --
    nodeKeys: new Array(), // -- 所有节点Key值数组 --
    selectedNode: null, // -- 当前选中的节点 --
    selecteMode: "normal", // -- normal：常规(节点选择影响上下级)，single：独立选择(节点选择不影响上下级节点) --

    beforeExpand: null, // -- 节点展开前回调函数 --
    afterExpand: null, // -- 节点展开后回调函数 --
    nodeClick: null, // -- 节点click事件回调函数 --
    beforeCheck: null, // -- 节点check前事件回调函数 --
    nodeCheck: null, // -- 节点check后事件回调函数 --    
    replaceFilter: "", //树替换占位符sql，and 开头  
    img: { //-- 图片集合 --
        plus1: "plus1.gif", //-- 
        plus9: "plus9.gif", //--
        minus1: "minus1.gif", //-- 
        minus9: "minus9.gif", //--

        line0: "line0.gif", //-- 占位符竖线 --
        line1: "line1.gif", //-- 同一个节点下非最后一个子节点 --
        line9: "line9.gif", //-- 同一个节点下最后一个子节点 --

        check0: "check0.gif", //-- 未选中 --
        check1: "check1.gif", //-- 选中 --
        check2: "check2.gif", //-- 半选中 --

        folder0: "folder0.gif", //-- 收起文件夹 --
        folder1: "folder1.gif", //-- 展开文件夹 --
        file: "file.gif", //-- 节点图片 --
        root: "" //-- 顶级节点图片 --
    },

    dragLevel: 5, // -- 允许拖动的节点层级 --
    dropLevel: 4, // -- 允许拖入的节点层级 --
    dropDrop: null, // -- 拖放事件回调函数 --
    // ----------------------------------------------------
    summary: function() {
        var strSummary = "xwf 控件类库，网格控件类。";
        return strSummary;
    }
};
// -- 初始化树控件 ------------------------------------------------------------
window.xwf_tree.prototype.init = function() {
    var html = "";
    if (this.title) {
        html = "<table class='" + this.cssPrefix + "tbTop xwf_select_none'><tr>" +
            "<td class='" + this.cssPrefix + "tbTop_tdImg' style=\"background-image:url('" + this.imgPath + "root.gif')\"></td>" +
            "<td>" + this.title + "</td>" +
            "</tr></table>";
    }
    
    if(typeof jQuery == 'undefined'){
    	g.a.attachJavaScriptFile(g.appPath + "res_plugin/jquery/jquery-3.1.1.min.js");
    }  
    if(typeof jQuery != 'undefined'){
    	html += ' <div class="input-group treeSearchBox" style="    padding: 5px 9px;"> ';
    	html += ' 	<div class="input-control search-box search-box-circle has-icon-left has-icon-right search-example" > ';
    	html += ' 		<input   type="search" class="form-control search-input" placeholder="回车搜索" title="回车搜索" style="padding-right: 0px;">  ';
    	html += ' 		<label   class="input-control-icon-left search-icon"><i class="icon icon-search"></i></label>   ';
    	html += ' 	</div> ';
    	html += ' 	<span class="input-group-btn"> ';
    	html += ' 		<button class="btn btn-primary" type="button">重置</button> ';
    	html += ' 	</span> ';
    	html += ' </div> ';
    }
    
    
    
    
    html += "<div id='" + this.prefix + "divNodes_0' class='" + this.cssPrefix + "divNodes'></div>";
    this.divContainer.innerHTML = html;

    this.nodes["0"] = {
        key: "0", //-- 顶级节点KEY --
        children: 0, //-- 子节点数量 --
        nodes: {}, //-- 子节点集合 --
        keys: new Array(), //-- 子节点集合KEY值数组 --
        expand: false, //-- 节点是否已展开 --
        level: 0, //-- 节点级数 --
        isFirst: true,
        isLast: true,
        isTop: true //-- 顶级节点标志 --
    };
    
    if(typeof jQuery != 'undefined'){
    	$(".treeSearchBox .search-input").on("keydown",function(){
    		if(event.keyCode==13){
    			searchTree($(this));
    		}
    		
    	});
    	$(".treeSearchBox .btn").click(function(){
    		searchTree($(this),true);
    	});
    	// contains 不区分大小写
    	jQuery.expr[':'].Contains = function(a, i, m) {
    	  return jQuery(a).text().toUpperCase()
    	      .indexOf(m[3].toUpperCase()) >= 0;
    	};
    	// OVERWRITES old selecor
    	jQuery.expr[':'].contains = function(a, i, m) {
    	  return jQuery(a).text().toUpperCase()
    	      .indexOf(m[3].toUpperCase()) >= 0;
    	};
    	//Update to work for jQuery 1.8
    	$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    	    return function( elem ) {
    	        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    	    };
    	});
    }
};


//显示上级节点
function showToTop(xwf_tree_tbNode){
	xwf_tree_tbNode.show();
	//如果需要无限级支持，请请将此处方法进行递归
	var xwf_tree_divNodes=xwf_tree_tbNode.closest(".xwf_tree_divNodes");
	if(xwf_tree_divNodes.prev(".xwf_tree_tbNode").length>0){
		xwf_tree_divNodes.prev(".xwf_tree_tbNode").show();
		var xwf_tree_divNodes2=xwf_tree_divNodes.prev(".xwf_tree_tbNode").closest(".xwf_tree_divNodes");
		if(xwf_tree_divNodes2.length >0 && xwf_tree_divNodes2.prev(".xwf_tree_tbNode").length >0) showToTop(xwf_tree_divNodes2.prev(".xwf_tree_tbNode"));
		
	}
	
}
/**对已经加载的树节点无限级搜索,
 *  匹配到子节点则也显示上级到根的节点
 *  自动加载jquery
 *  只有一个根节点，则无论搜索什么，根节点强制显示.
 * 
 * */
function searchTree(jqOb,isReset){
	var treeSearchBox=jqOb.closest(".treeSearchBox");
	var treeBoxId=treeSearchBox.next(".xwf_tree_divNodes").attr("id");
	if(isReset){
		$("#"+treeBoxId+" .xwf_tree_tbNode_tdText").each(function(){
			$(this).html($(this).text());
		});
		treeSearchBox.find(".search-input").val("").focus();
		$("#"+treeBoxId+" .xwf_tree_tbNode").show();
		return;
	}
	
	var key=$.trim(treeSearchBox.find(".search-input").val());
	var rootLen=$("#"+treeBoxId+"").children(".xwf_tree_tbNode").length;
	$("#"+treeBoxId+" .xwf_tree_tbNode").hide();
	$("#"+treeBoxId+" .xwf_tree_tbNode_tdText").each(function(){
		$(this).html($(this).text());
	});
	if(rootLen == 1){//只有一个根节点，则根节点必须显示
		$("#"+treeBoxId+" .xwf_tree_tbNode:first").show();
	}
	
	$("#"+treeBoxId+" .xwf_tree_tbNode:contains('"+key+"')").each(function(){
		var xwf_tree_tbNode_tdText=$(this).find(".xwf_tree_tbNode_tdText:first");
		if(xwf_tree_tbNode_tdText.length >0){
			var tdHtml=xwf_tree_tbNode_tdText.html();
			var hidIndex=tdHtml.toUpperCase().indexOf(key.toUpperCase());
			var hitTxt=tdHtml.substring(hidIndex,hidIndex+key.length);
			var newVal=tdHtml.replace(hitTxt,"<span class='treeshit'>"+hitTxt+"</span>");
			xwf_tree_tbNode_tdText.html(newVal);
		}
		showToTop($(this));
	});
}

// -- 添加新节点 --------------------------------------------------------------
window.xwf_tree.prototype.addNode = function(jsonNode) {
    var node = {
        key: "", // -- 节点KEY --
        text: "", // -- 节点文本 --
        title: "", // -- 提示内容 --
        value: "", // -- 节点VALUE --
        image: "", // -- 个性化图标 --

        isFirst: false, // -- 是否当前父节点集合的首节点 --
        isLast: false, // -- 是否当前父节点集合的尾节点 --
        level: 0, // -- 节点所在级数 --

        divNodes: null, // -- 子节点集合容器 --
        children: 0, // -- 子节点数量 --
        keys: new Array(), // -- 子节点集合KEY值数组(提高遍历子节点集合时的效率) --

        parent: null, // -- 父节点对象  --        
        previous: null, // -- 同级上一个节点 --
        next: null, // -- 同级节点下一个 --     
        first: null, // -- 子节点集中首节点对象 --
        last: null, // -- 子节点集中尾节点对象 --

        showCheckBox: undefined, // -- 是否显示checkbox --
        checked: 0, // -- 选中状态, 1:选中, 0:未选中, -1:半选中 --
        selfGenerated: false, // -- 节点自身HTML内容是否已生成 --
        generated: false, // -- 节点的子节点HTML内容是否已生成 --        
        expand: false // -- 子节点是否已展开 --
    };
    node = g.x.extendJSON(node, jsonNode);
    // -- node.key = node.key.toString();
    // -- node.text = node.text.toString();
    if (node.text == " ") node.text = "_____";
    if (node.title == "") node.title = node.text;
    this.nodeKeys.push(node.key);
    // -- 获取上级节点 ------------------------------------------
    var index = node.key.lastIndexOf(this.sd);
    var nodeKeyParent = node.key.substring(0, index);
    var nodeP = this.nodes[nodeKeyParent];
    if (!nodeP) { //-- 如果父节点不存在(暂不存在), 创建临时父节点 --
        var nodeParent = {
            key: nodeKeyParent,
            // text: "_._._",
            text: "根节点",
            title: "临时节点, 代码缺失."
        };
        this.addNode(nodeParent);
        nodeP = this.nodes[nodeKeyParent];
    }
    if (!nodeP) {
        alert("上级节点不存在, 请先添加上级节点.\n\n当前添加的节点为[" + node.key + ": " + node.text + "].");
        return false;
    }
    // -- 检查节点是否已存在 ------------------------------
    if (this.nodes[node.key]) {
        if (this.nodes[node.key].text.equals("_._._")) {
            this.nodes[node.key].title = "";
            this.nodes[node.key] = g.x.extendJSON(this.nodes[node.key], jsonNode);
            return;
        } else {
            alert("节点 [" + node.key + ": " + node.text + "] 已存在, 不允许重复添加.");
            return false;
        }
    }
    // ----------------------------------------------------
    this.nodes[node.key] = node;
    nodeP.keys[nodeP.children] = node.key;
    nodeP.children++;
    node.parent = nodeP;
    node.level = nodeP.level + 1;

    if (nodeP.children == 1) {
        node.isFirst = true;
        nodeP.first = node;
    } else {
        if (nodeP.last) {
            nodeP.last.isLast = false;
            nodeP.last.next = node;
            node.previous = nodeP.last;
        }
    }
    nodeP.last = node;
    node.isLast = true;
};
window.xwf_tree.prototype.removeNode = function(nodeKey) {
    var index = nodeKey.lastIndexOf(this.sd);
    // -- 递归删除当前节点的子节点 ------------------------
    var node = this.nodes[nodeKey];
    if (node) {
        for (var i = 0; i < node.keys.length; i++) {
            this.removeNode(node.keys[i]);
        }
    }
    // --从父节点删除当前节点 -----------------------------
    var nodeP = this.nodes[nodeKey.substring(0, index)];
    if (nodeP) {
        for (var i = 0; i < nodeP.keys.length; i++) {
            if (nodeP.keys[i] == nodeKey) {
                nodeP.keys.splice(i, 1);
                nodeP.children--;
                break;
            }
        }
    }
    // -- 从全局集合中删除当前节点 ------------------------
    delete this.nodes[nodeKey];
    for (var i = 0; i < this.nodeKeys.length; i++) {
        if (this.nodeKeys[i].equals(nodeKey)) {
            this.nodeKeys.splice(i, 1);
            break;
        }
    }
};

// -- 展开、收起、创建节点, 全选节点 ------------------------------------------
window.xwf_tree.prototype.expand = function(nodeKey) {
    if (nodeKey == null || nodeKey == 0 || nodeKey.equals("")) nodeKey = "0";
    var node = this.nodes[nodeKey];
    if (node.expand) return;
    var blFirstExpand = !node.generated;
    var nodeP = node.parent;

    //-- 递归展开父节点 -----------------------------------
    if (nodeP && !nodeP.expand) {
        this.expand(nodeP.key);
    }
    //-- 生成节点(初次展开)、展开节点 ---------------------  
    if (this.beforeExpand && !nodeKey.equals("0")) {
        this.beforeExpand(node, blFirstExpand);
    }

    if (blFirstExpand) {
        this.generateNode(nodeKey);
    }
    node.divNodes.style.display = "";
    node.expand = true;

    if (this.afterExpand) {
        this.afterExpand(node, blFirstExpand);
    }
    //-- 刷新节点图标 -------------------------------------
    if (nodeKey.equals("0")) return;
    var tdA = gId(this.prefix + "tdA_" + nodeKey);
    var tdB = tdA.nextSibling;
    tdA.style.backgroundImage = tdA.style.backgroundImage.replace("plus", "minus");
    tdB.style.backgroundImage = tdB.style.backgroundImage.replace("folder0", "folder1");

    //-- 特殊处理：容错修复无子节点错误情况 ---------------
    if (node.children == 0) {
        tdA.onclick = "";
        tdA.style.backgroundImage = tdA.style.backgroundImage.replace("minus", "line");
        tdB.style.backgroundImage = tdB.style.backgroundImage.replace("folder1", "file");
    } else if (node.children == 1) { // -- 添加第一个子节点时 --
        tdA.style.backgroundImage = tdA.style.backgroundImage.replace("line", "minus");
        tdB.style.backgroundImage = tdB.style.backgroundImage.replace("file", "folder1");
    }
};
window.xwf_tree.prototype.expandAll = function(nodeKey) {
    ///<summary>展开指定节点的所有子节点</summary>    
    var node = this.nodes[nodeKey];

    this.expand(nodeKey);
    for (var i = 0; i < node.keys.length; i++) {
        this.expandAll(node.keys[i]);
    }
};
window.xwf_tree.prototype.collapse = function(nodeKey) {
    var node = this.nodes[nodeKey];
    if (!node.expand) return;
    node.divNodes.style.display = "none";
    node.expand = false;
    //-- 刷新节点图标 -------------------------------------
    if (nodeKey.equals("0")) return;
    var tdA = gId(this.prefix + "tdA_" + nodeKey);
    var tdB = tdA.nextSibling;
    tdA.style.backgroundImage = tdA.style.backgroundImage.replace("minus", "plus");
    tdB.style.backgroundImage = tdB.style.backgroundImage.replace("folder1", "folder0");
};

window.xwf_tree.prototype.generateNode = function(nodeKey) {
    var _this = this;

    var index = 0;
    var node = this.nodes[nodeKey];
    var arrHtml = new Array();
    // -- 1、生成子节点集HTML ---------
    var htmlTDLine = "";
    for (var i = 0; i < node.level; i++) {
        var nodeP = node;
        for (var j = i; j < node.level - 1; j++) {
            nodeP = nodeP.parent;
        }
        if (nodeP.isLast) {
            htmlTDLine += "<td class='" + this.cssPrefix + "tbNode_tdImg'></td>";
        } else {
            htmlTDLine += "<td class='" + this.cssPrefix + "tbNode_tdImg' style=\"background-image:url('" + this.imgPath + "line0.gif')\"></td>"
        }
    }

    var blShowCheckBox = false;
    for (var i = 0; i < node.children; i++) {
        var idx = 0;
        var arr = new Array();
        var nodeC = this.nodes[node.keys[i]];
        var dragHtml = (nodeC.level >= this.dragLevel ? " draggable='true'   ondragstart='dragstart(event)' " : "");
        var dropHtml = (nodeC.level >= this.dropLevel ? " ondragover='dragover(event)' ondrop='drop(event)' " : "");

        arr[idx++] = "<table class='" + this.cssPrefix + "tbNode xwf_select_none' nodeKey='" + nodeC.key + "'" + dragHtml + dropHtml + "><tr>" + htmlTDLine;
        //-- 加减图标 -----------------
        arr[idx++] = "<td id='" + this.prefix + "tdA_" + nodeC.key + "' class='" + this.cssPrefix + "tbNode_tdImg' style=\"background-image:url('" + this.imgPath;
        if (nodeC.children > 0) {
            arr[idx++] = (nodeC.isLast ? this.img.plus9 : this.img.plus1);
        } else {
            arr[idx++] = (nodeC.isLast ? this.img.line9 : this.img.line1);
        }
        arr[idx++] = "')\"></td>";
        //-- 节点图标 -----------------
        arr[idx++] = "<td class='" + this.cssPrefix + "tbNode_tdImg' style=\"background-image:url('" + this.imgPath;
        arr[idx++] = (nodeC.image ? nodeC.image : (nodeC.children == 0 ? this.img.file : this.img.folder0));
        arr[idx++] = "')\" title='" + nodeC.key + "'></td>";

        //-- CheckBox图标 -------------        
        if (nodeC.showCheckBox != undefined) {
            blShowCheckBox = nodeC.showCheckBox; // -- 节点有定义，以节点定义为准 --
        } else {
            blShowCheckBox = ((this.showCheckBoxs.equals("all") || (this.showCheckBoxs.equals("leaf") && nodeC.children == 0)));
        }
        if (blShowCheckBox) {
            arr[idx++] = "<td id='" + this.prefix + "tdC_" + nodeC.key + "' class='" + this.cssPrefix + "tbNode_tdImg' style=\"background-image:url('" + this.imgPath + "check" + nodeC.checked + ".gif')\"></td>";
        }
        //-- 节点文本 -----------------
        arr[idx++] = "<td id='" + this.prefix + "tdT_" + nodeC.key + "' class='" + this.cssPrefix + "tbNode_tdText' title='" + nodeC.title + "'>" + nodeC.text + "</td>";

        arr[idx++] = "</tr></table>";
        arr[idx++] = "<div id='" + this.prefix + "divNodes_" + nodeC.key + "' class='" + this.cssPrefix + "divNodes' style='display:none'></div>";
        arrHtml[index++] = arr.join("");
    }
    // -- 2、显示HTML -----------------
    var divNodes = gId(this.prefix + "divNodes_" + node.key);
    divNodes._this = _this;
    divNodes.innerHTML = arrHtml.join("");
    node.divNodes = divNodes;
    node.generated = true;
    //-- 3、后期绑定事件 --------------
    var key = "",
        tdA = null,
        tdC = null,
        tdT = null;
    for (var i = 0; i < node.children; i++) {
        key = node.keys[i];
        this.nodes[key].selfGenerated = true;

        tdA = gId(this.prefix + "tdA_" + key);
        tdA.onclick = this.aClick(this, key);

        tdC = gId(this.prefix + "tdC_" + key);
        if (tdC) tdC.onclick = this.cClick(this, key);

        tdT = gId(this.prefix + "tdT_" + key);
        tdT.onclick = this.tClick(this, key);
    }
};
window.xwf_tree.prototype.reloadNode = function(node) {
    ///<summary>重新加载节点。如节点从未展开过，一般不需要调用重新加载，节点会在用户操作时自动加载。</summary>
    ///<param name="nodeKey">节点对象</param>
    // -- 清理还原到初次展开前状态 ------------------------
    for (var i = node.keys.length - 1; i >= 0; i--) {
        this.removeNode(node.keys[i]);
    }
    node.generated = false;
    node.expand = false;
    // -- 添加loading...虚拟节点 --------------------------
    var keyLoading = node.key + this.sd + "loading";
    if (!this.nodes[keyLoading]) {
        this.addNode({ key: node.key + this.sd + "loading", text: "loading..." });
    }
    // -- 展开节点 ----------------------------------------
    this.expand(node.key);
};

window.xwf_tree.prototype.textClick = function(nodeKey) {
    var tdText = null;
    var node = this.nodes[nodeKey];

    if (this.selectedNode) {
        tdText = gId(this.prefix + "tdT_" + this.selectedNode.key);
        tdText.className = tdText.className.substring(0, tdText.className.length - 1);
    }

    tdText = gId(this.prefix + "tdT_" + nodeKey);
    tdText.className = tdText.className + "H";
    this.selectedNode = node;

    if (this.nodeClick) {
        this.nodeClick(node);
    }
};
window.xwf_tree.prototype.checkNode = function(nodeKey, checked, isSystem) {
    var node = this.nodes[nodeKey];
    // ----------------------------------------------------
    if (this.beforeCheck) {
        if (!this.beforeCheck(node, isSystem)) {
            return false;
        }
    }
    // ----------------------------------------------------
    var tdC = gId(this.prefix + "tdC_" + nodeKey);
    if (checked === undefined) {
        node.checked = (node.checked == 0 ? 1 : 0);
    } else {
        if (node.checked == checked) return;
        node.checked = checked;
    }
    if (node.selfGenerated) {
        tdC.style.backgroundImage = "url(\"" + this.imgPath + "check" + node.checked + ".gif\")";
    }

    if (this.showCheckBoxs.equals("all")) {
        if (this.selecteMode.equals("normal")) {
            this.checkParent(node); //-- 处理父节点选中状态 --
            this.checkChildren(node); //-- 处理子节点选中状态 --
        }
    }

    if (this.nodeCheck) {
        this.nodeCheck(node);
    }
};
window.xwf_tree.prototype.checkParent = function(node) {
    if (node.parent.isTop) return;

    var checked = node.checked;
    var nodeParent = node.parent;
    var tdC = gId(this.prefix + "tdC_" + nodeParent.key);
    // ----------------------------------------------------
    if (node.checked == 0) {
        for (var i = 0; i < nodeParent.keys.length; i++) {
            if (this.nodes[nodeParent.keys[i]].checked > 0) {
                checked = 2;
                break;
            }
        }
    } else if (node.checked == 1) {
        for (var i = 0; i < nodeParent.keys.length; i++) {
            if (this.nodes[nodeParent.keys[i]].checked != 1) {
                checked = 2;
                break;
            }
        }
    }
    nodeParent.checked = checked;
    // ----------------------------------------------------
    if (nodeParent.selfGenerated) {
        tdC.style.backgroundImage = "url(\"" + this.imgPath + "check" + nodeParent.checked + ".gif\")";
    }
    this.checkParent(nodeParent); //-- 递归父节点 --
};
window.xwf_tree.prototype.checkChildren = function(nodeP) {
    var node = null,
        tdC = null;
    var urlImage = "url(\"" + this.imgPath + "check" + nodeP.checked + ".gif\")";

    for (var i = 0; i < nodeP.keys.length; i++) {
        node = this.nodes[nodeP.keys[i]];
        node.checked = nodeP.checked;
        if (node.selfGenerated) {
            tdC = gId(this.prefix + "tdC_" + node.key);
            
            if(typeof jQuery != 'undefined'){
            	 var tdcJq=$(tdC);
            	 var tdcP=tdcJq.closest(".xwf_tree_tbNode");
            	 //该节点被隐藏则跳过
            	 if(tdcP.is(":hidden")) continue;
            }
            tdC.style.backgroundImage = urlImage;
        }
        this.checkChildren(node);
    }
};

window.xwf_tree.prototype.setNodeChecked = function(nodeKey, checked, isSystem) {
    var node = this.nodes[nodeKey];
    var tdC = null;
    if (checked === true) checked = 1;
    if (checked === false) checked = 0;
    if (node.checked == checked) return;

    if (true) {
        // -- 新写法 --
        this.checkNode(nodeKey, checked, isSystem);
    } else {
        node.checked = checked;
        if (node.selfGenerated) {
            tdC = gId(this.prefix + "tdC_" + nodeKey);
            tdC.style.backgroundImage = "url(\"" + this.imgPath + "check" + node.checked + ".gif\")";
        }
    }
};
window.xwf_tree.prototype.setNodeSelected = function(nodeKey) {
    ///<summary>仅设置节点的显示样式为选中状态，不触发任何事件。如果希望触发事件，请使用其它方法</summary>
    var tdText = null;
    var node = this.nodes[nodeKey];

    if (this.selectedNode) {
        tdText = gId(this.prefix + "tdT_" + this.selectedNode.key);
        tdText.className = tdText.className.substring(0, tdText.className.length - 1);
    }

    tdText = gId(this.prefix + "tdT_" + nodeKey);
    tdText.className = tdText.className + "H";
    this.selectedNode = node;
};
window.xwf_tree.prototype.selectNode = function(nodeKey) {
    this.textClick(nodeKey);
};
// -- click事件 ---------------------------------------------------------------
window.xwf_tree.prototype.aClick = function(_this, nodeKey) {
    return function(event) {
        var node = _this.nodes[nodeKey];
        if (node.expand) {
            _this.collapse(nodeKey);
        } else {
            _this.expand(nodeKey);
        }
    };
};
window.xwf_tree.prototype.tClick = function(_this, nodeKey) {
    return function(event) {
        _this.textClick(nodeKey);
    };
};
window.xwf_tree.prototype.cClick = function(_this, nodeKey) {
    return function(event) {
        _this.checkNode(nodeKey);
    };
};

// -- 选中节点集 ---------------------------------------------------------------
window.xwf_tree.prototype.getCheckedKeys = function(onlyFinalNode) {
    ///<summary>返回所有选中节点的KEY值数组，然后通过循环该数组遍历所有选中节点集</summary>
    var node = null;
    var arrKeys = new Array();
    for (var i = 0; i < this.nodeKeys.length; i++) {
        node = this.nodes[this.nodeKeys[i]];
        if (onlyFinalNode && node.children > 0) continue;
        if (node.checked > 0) {
            arrKeys.push(node.key);
        }
    }
    return arrKeys;
};

// -- 节点查找 ----------------------------------------------------------------
window.xwf_tree.prototype.findNodeByText = function(nodeText) {
    var nodeKey = "";
    var node = null;
    // ----------------------------------------------------
    for (var i = 0; i < this.nodeKeys.length; i++) {
        nodeKey = this.nodeKeys[i];
        if (this.nodes[nodeKey].text.equals(nodeText)) {
            node = this.nodes[nodeKey];
            break;
        }
    }
    return node;
};

// -- 节点拖动 ----------------------------------------------------------------
function dragstart(event) {
    var srcEl = g.x.getEventTarget(event);
    event.dataTransfer.setData("Text", srcEl.getAttribute("nodeKey"));
}

function dragover(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    var nodeKeyDrag = event.dataTransfer.getData("Text");
    var nodeKeyDrop = "";

    var targetEl = g.x.getEventTarget(event);
    var targetParent = targetEl;
    // ----------------------------------------------------
    while (targetParent) {
        if (targetParent.tagName.equals("TABLE")) {
            nodeKeyDrop = targetParent.getAttribute("nodeKey");

            var _this = targetParent.parentElement._this;
            var nodeDrag = _this.nodes[nodeKeyDrag];
            var nodeDrop = _this.nodes[nodeKeyDrop];

            if (!nodeDrag.key.equals(nodeDrop.key)) {
                var jsonPara = {
                    tree: _this,
                    nodeDrag: nodeDrag,
                    nodeDrop: nodeDrop
                }
                if (_this.dragDrop) {
                    _this.dragDrop(jsonPara);
                }
                // -- debug(nodeDrag.key + "  :  " + nodeDrop.key); --
            }
            return;
        }
        targetParent = targetParent.parentElement;
    }
}