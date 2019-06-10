$(function () {
    // 设置jQuery Ajax全局的参数  
    $.ajaxSetup({
        statusCode: {
            400: function (xhr, ajaxOptions, thrownError) {
                swal({
                        title: "警告",
                        text: "会话超时!",
                        type: "warning",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    }
                    , function () {
                        top.location.href = "/";
                    });
            }
        }
    });
});

function serializeArrayToJsonObject(serializeArray) {
    var jsonOjbject = {};//声明一个对象
    $.each(serializeArray, function (index, field) {
        jsonOjbject[field.name] = field.value;//通过变量，将属性值，属性一起放到对象中
    });

    return jsonOjbject;
}

function fillJsonToForm(formId, jsonData) {
    var form = $("#" + formId);
    $.each(jsonData, function (index, item) {


        //判断标签类型，根据不同的标签不同的赋值方式
        var $control = form.find("[name=" + index + "]");
        if ($control != null && $control.length > 0) {
            var controlType = form.find("[name=" + index + "]")[0].type;

            if (controlType == "text") {
                form.find("[name=" + index + "]").val(item);
            }
            else if (controlType == "select-one") {
                $control.select2("val", "");

                if (item != null) {
                    var itemArray = item.split(",");
                    $control.select2("val", itemArray);
                }
            }
            else if (controlType == "select-multiple") {
                $control.select2("val", "");

                if (item != null) {
                    var itemArray = item.split(",");
                    $control.select2("val", itemArray);
                }
            } else if (controlType == "checkbox") {
                $control.iCheck('uncheck');

                var itemArray = item.split(",");
                $.each(itemArray, function (index, item) {
                    for (var i = 0; i < $control.length; i++) {
                        if ($($control[i]).attr("value") == item) {
                            $($control[i]).iCheck("check");
                        }
                    }
                });
            }
        }
    });
}

function getModel(settings) {
    submitForm(settings);
}

function executeAjax(settings) {
    submitForm(settings);
}

function submitForm(settings) {

    var defaultSetting = {
        url: "",
        dataType: "json",
        method: "POST",
        formId: null,
        postData: null,
        cache: false,
        async: true,
        beforeSendAction: null,
        completeAction: null,
        successCallBack: null,
        failCallBack: null,
        showSuccessInfo: true,
        showErrorInfo: true,
    };

    $.extend(defaultSetting, settings);

    if (!defaultSetting.postData || !defaultSetting.formId) {
        var serializeArray = $("#" + defaultSetting.formId).serializeArray();
        var jsonObject = serializeArrayToJsonObject(serializeArray);

        defaultSetting.postData = JSON.stringify(jsonObject);
    }

    var loadingIndex;

    $.ajax({
        url: defaultSetting.url,
        type: defaultSetting.method,
        data: defaultSetting.postData,
        cache: defaultSetting.cache,
        async: defaultSetting.async,
        contentType: "application/json;charset=UTF-8",
        beforeSend: function (event, xhr, options) {

            loadingIndex = layer.load(1, {
                shade: [0.5, '#232D37'] //0.1透明度的白色背景
            });

            if (defaultSetting.beforeSendAction != null) {
                defaultSetting.beforeSendAction(event, xhr, options);
            }
        },
        complete: function (event, xhr, options) {
            layer.close(loadingIndex);

            if (defaultSetting.completeAction != null) {
                defaultSetting.completeAction(event, xhr, options);
            }
        },
        success: function (responseText) {

            var jsonData;

            //判断是否为JSON对象
            if (typeof(responseText) == "object" &&
                Object.prototype.toString.call(responseText).toLowerCase() == "[object object]" &&
                !responseText.length) {
                jsonData = responseText;
            }
            else {
                jsonData = JSON.parse(responseText);
            }

            if (jsonData) {
                if (jsonData.code == 200) {

                    if (defaultSetting.showSuccessInfo) {
                        swal({
                            title: "提示",
                            text: jsonData.message,
                            type: "success",
                            confirmButtonText: "确定",
                            closeOnConfirm: true
                        });
                    }

                    if (defaultSetting.successCallBack != null) {
                        defaultSetting.successCallBack(jsonData.result);
                    }

                    return;
                }
                else {

                    if (defaultSetting.showErrorInfo) {
                        swal({
                            title: "警告",
                            text: jsonData.message,
                            type: "warning",
                            confirmButtonText: "确定",
                            closeOnConfirm: true
                        });
                    }

                    if (defaultSetting.failCallBack != null) {
                        defaultSetting.failCallBack(jsonData.result);
                    }

                    return;
                }

                if (defaultSetting.showErrorInfo) {
                    swal({
                        title: "错误",
                        text: responseText,
                        type: "error",
                        confirmButtonText: "确定",
                        closeOnConfirm: true
                    });
                }

                if (defaultSetting.failCallBack != null) {
                    defaultSetting.failCallBack(jsonData.result);
                }

                return;
            }
            else {
                swal({
                    title: "错误",
                    text: "未知返回数据",
                    type: "error",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });

                if (defaultSetting.failCallBack != null) {
                    defaultSetting.failCallBack(responseText);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {

            var message = xhr.responseText;

            var jsonData = JSON.parse(xhr.responseText);

            if (jsonData) {
                message = jsonData.message;
            }

            swal({
                title: "错误",
                text: message,
                type: "error",
                confirmButtonText: "确定",
                closeOnConfirm: true
            });
        },
        statusCode: {}
    });
};

function submitFormFile(url, method, formId, successCallBack, failCallBack) {

    var form = new FormData(document.getElementById("formWJDBAdd"));

    $.ajax({
        url: url,
        type: method,
        data: form,
        cache: false,
        async: true,
        success: function (data) {
            var json;

            try {
                if ($.type(data) == 'string') {
                    json = eval('(' + data + ')');
                }
                else {
                    return json = data;
                }
            } catch (e) {
                json = {};
            }

            if (json.code == 200) {
                if (successCallBack != null) {
                    successCallBack(json.data);
                }
            }
            else if (json.code == 300) {
                swal({
                    title: "警告",
                    text: json.message,
                    type: "warning",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });

                if (failCallBack != null) {
                    failCallBack(json.data);
                }
            }
            else if (json.code == 301) {
                swal({
                    title: "错误",
                    text: json.message,
                    type: "error",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });

                if (failCallBack != null) {
                    failCallBack(json.data);
                }
            } else {
                swal({
                    title: "错误",
                    text: "未知的返回数据",
                    type: "error",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });

                if (failCallBack != null) {
                    failCallBack(json.data);
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            swal({
                title: "错误",
                text: "<div>Http status: " + xhr.status + " " + xhr.statusText + "</div>"
                + "<div>ajaxOptions: " + ajaxOptions + "</div>"
                + "<div>thrownError: " + thrownError + "</div>"
                + "<div>" + xhr.responseText + "</div>",
                type: "error",
                confirmButtonText: "确定",
                closeOnConfirm: true,
                html: true
            });
        },
        statusCode: {
            503: function (xhr, ajaxOptions, thrownError) {
                swal({
                    title: "错误",
                    text: "服务器异常!",
                    type: "error",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });
            }
        }
    });
};

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

//禁用,移除所有事件,并添加样式
function disabledUl(controlID) {
    //$("#" + controlID + " *").unbind();
    //$("#" + controlID + " a").unbind(); 
    $("#" + controlID).css("background", "#CCCCCC");
}

function FormatDate(now, mask) {
    var d;

    if (now == "") {
        return "";
    }

    if (now == null || now == undefined) {
        d = new Date();
    }
    else {
        d = new Date(Date.parse(now));
    }

    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0) {
        switch ($0) {
            case 'd':
                return d.getDate();
            case 'dd':
                return zeroize(d.getDate());
            case 'ddd':
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M':
                return d.getMonth() + 1;
            case 'MM':
                return zeroize(d.getMonth() + 1);
            case 'MMM':
                return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy':
                return String(d.getFullYear()).substr(2);
            case 'yyyy':
                return d.getFullYear();
            case 'h':
                return d.getHours() % 12 || 12;
            case 'hh':
                return zeroize(d.getHours() % 12 || 12);
            case 'H':
                return d.getHours();
            case 'HH':
                return zeroize(d.getHours());
            case 'm':
                return d.getMinutes();
            case 'mm':
                return zeroize(d.getMinutes());
            case 's':
                return d.getSeconds();
            case 'ss':
                return zeroize(d.getSeconds());
            case 'l':
                return zeroize(d.getMilliseconds(), 3);
            case 'L':
                var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt':
                return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT':
                return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z':
                return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default:
                return $0.substr(1, $0.length - 2);
        }
    });
};

function generateDateTimeNo() {
    var d = new Date();

    var zeroize = function (value, length) {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {
            zeros += '0';
        }
        return zeros + value;
    };

    return d.getFullYear() + zeroize(d.getMonth() + 1) + zeroize(d.getDate()) + zeroize(d.getHours()) + zeroize(d.getMinutes()) + zeroize(d.getSeconds());
}

