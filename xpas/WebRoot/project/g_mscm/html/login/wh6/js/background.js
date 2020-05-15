/**
 * 
 * @authors Dujing (1198994896@qq.com)
 * @date    2018-12-17 22:29:54
 * @version 1.0.0
 */

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
 * 判断某个值是否存在与数组中
 * @param  {Array}  arr 
 * @param  {String}  num 
 * @return {Number}     返回数据下标，没有则返回 -1
 */
function hasValue (arr, str) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i].date === str) {
      return i;
    }
  }
  return -1;
}

/**
 * 冒泡排序
 * @param  {Array} arr 
 * @return {Array}     
 */
function bubbleSort (arr) {
  var len = arr.length - 1;
  for (var i = 0; i <= len-1; i++) {
    for (var j = 0; j < len-i; j++) {
      var temp = null;
      if (arr[j] > arr[j+1]) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

function bubbleSort2 (arr) {
  var len = arr.length - 1;
  for (var i = 0; i <= len-1; i++) {
    for (var j = 0; j < len-i; j++) {
      var temp = null;
      if (arr[j].date > arr[j+1].date) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
