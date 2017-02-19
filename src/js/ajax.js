(function () {
    function CreateXmlHttp() {
        let xmlHttp;
        if (window.XMLHttpRequest) {//如果是非ie浏览器创建对象
            xmlHttp = new XMLHttpRequest();
        }
        if (window.ActiveXObject) {//如果是ie浏览器
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                xmlHttp = new ActiveXObject("msxml2.XMLHTTP");
            }
        }
        return xmlHttp;
    }
    function myAjax() {
        new Promise(function (resolve, reject) {
            let xmlHttp = CreateXmlHttp();
            if (!xmlHttp) {
                alert('xmlHttp创建失败');
                return false;
            }
            xmlHttp.open("POST", "user/login", false);//开启xmlHttp（配置相关选项）
            xmlHttp.onreadystatechange = function () {//设置xmlHttp的状态发生改变事件执行函数
                if (xmlHttp.readyState == 4) {//当xmlHttp的状态为响应完成 可以获取完整数据
                    if (xmlHttp.status == 200) {//当响应头为200时
                        resolve(xmlHttp.responseText);//获取响应数据
                    } else {
                        reject(xmlHttp.status);
                    }
                }
            };
            xmlHttp.send();//调用发送请求方法
        }).then(function (data) {
            let a = document.getElementsByClassName('ajaxTest')[0];
            a.innerHTML = data;
            console.log(data);
        }).catch(function (code) {
            console.log(JSON.stringify(code));
        })
    }
    myAjax();
})();