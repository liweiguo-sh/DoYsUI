/**
 * 
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-06-08 14:13:26
 * @version $Id$
 */

/**
 * 冒泡排序
 * @param  {Array} arr 
 * @return {Array}     
 */
const bubbleSort = arr => {
    let temp = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

/**
 * 数组去重
 * 双层循环，外层循环元素，内层循环时比较值
 * 如果有相同的值则跳过，不相同则push进数组
 * @param  Array arr 
 * @return Array     
 */
const distinct = arr => {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
    }

/**
 * trim函数，去除字符串两侧的空格
 * @param  {String} obj 
 * @return {String}     
 */
function trim(str) {
    return $.trim(str);
}

/**
 * 获取日期间隔数
 * @param  {Number} day (-30:表示从当前日期往前推一个月；60:表示从当前日期往后推两个月)
 * @return {String}     "2018-06-08"
 */
function getDay(day){    
    var today = new Date();      
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;            
    today.setTime(targetday_milliseconds); //注意，这行是关键代码    
    var tYear = today.getFullYear();    
    var tMonth = today.getMonth();    
    var tDate = today.getDate();    
    tMonth = doHandleMonth(tMonth + 1);    
    tDate = doHandleMonth(tDate);    
    return tYear+"-"+tMonth+"-"+tDate;    
}
/**
 * 月份补位操作，如果为 1-9 月，则补位为 01-09
 * @param  {Number} month 
 * @return {String}       
 */
function doHandleMonth(month){    
    var m = month;    
    if(month.toString().length == 1){    
        m = "0" + month;    
    }    
    return m;    
}

/**
 * 将 ResultSet 数据转换为数组形式
 * @param  {Object} data 
 * @return {Array}      
 */
function getArray(data) {
    var obj = {};
    var array = [];
    for (var i in data.rows) {
        var row = data.rows[i];
        obj = getObject(data.columns, row);
        array.push(obj);
    }
    array = array.reverse();
    return array;
}

/**
 * 后台返回的 ResultSet 中的分散数据转换为 Object
 * @param  {Array} arr 
 * @param  {Array} row 
 * @return {Object}     
 */
function getObject(arr, row) {
    var obj_ = {};
    for(var i = 0; i < arr.length; i++) {
        for(var j in row) {
            if(arr[i].name === j) {
                var key = j;
                var value = row[j].value;
                obj_[key] = value;
            }
        }
    }
    return obj_;
}