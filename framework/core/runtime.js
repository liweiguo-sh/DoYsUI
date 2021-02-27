/**
 * DoYs JavaScript Library v1.0
 * Author: David.Li
 * Create Date: 2021-02-27
 * Modify Date: 2021-02-27
 * Copyright 2021, doys-next.com
 * runtime environment config
 */

(function () {    
    window.runtime = {                         
        prefix: "http://{domain}:9988/DoYsSV",

        remark: "this is runtime.remark"
    };

    console.log(window.runtime.remark);
})()