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

        //通过变量，将属性值，属性一起放到对象中
        //如何存在则叠加值
        if (jsonOjbject[field.name]) {
            jsonOjbject[field.name] = jsonOjbject[field.name] + "," + field.value;
        }
        else {
            jsonOjbject[field.name] = field.value;
        }
    });

    return jsonOjbject;
}

function fillJsonToForm(formId, jsonData) {
    var form = $("#" + formId);
    $.each(jsonData, function (index, item) {


        //判断标签类型，根据不同的标签不同的赋值方式
        var $control = form.find("[name=" + index + "]");
        if ($control != null && $control.length > 0) {
            var controlType = form.find("[name='" + index + "']")[0].type;

            //文本框
            if (controlType == "text") {
                form.find("[name=" + index + "]").val(item);
            }//单选下拉框
            else if (controlType == "select-one") {
                $control.select2().val([]);

                if (item) {
                    var itemArray = item.split(",");
                    $control.select2().val(itemArray).trigger("change");;
                }
            }//多选下拉框
            else if (controlType == "select-multiple") {
                $control.select2().val([]);

                if (item) {
                    var itemArray = item.split(",");
                    $control.select2().val(itemArray).trigger("change");;
                }
            }//复选框
            else if (controlType == "checkbox") {

                //switch
                if($control.hasClass("switch"))
                {
                    if(item == "Y") {
                        $control.bootstrapSwitch("state", true);
                    }
                    else {
                        $control.bootstrapSwitch("state", false);
                    }

                    return;
                }

                $control.iCheck('uncheck');

                //查找对应控件

                if (item) {

                    var itemArray = item.split(",");
                    $.each(itemArray, function (index, item) {

                        for (var i = 0; i < $control.length; i++) {
                            if ($($control[i]).attr("value") == item) {
                                $($control[i]).iCheck("check");
                                break;
                            }
                        }
                    });
                }
            }
        }
    });
}

function getModel(settings) {
    doAjax(settings);
}

function executeAjax(settings) {
    doAjax(settings);
}

function submitForm(settings) {
    doAjax(settings);
}

function doAjax(settings) {

    var defaultSetting = {
        url: "",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        method: "POST",
        data: null,
        cache: false,
        async: true,
        formId: null,
        postDataType: "",
        beforeSendAction: null,
        completeAction: null,
        successCallBack: null,
        failedCallBack: null,
        showSuccessInfo: true,
        showErrorInfo: true,
    };

    $.extend(defaultSetting, settings);

    if (defaultSetting.formId) {
        var serializeArray = $("#" + defaultSetting.formId).serializeArray();
        var jsonObject = serializeArrayToJsonObject(serializeArray);

        defaultSetting.data = JSON.stringify(jsonObject);
    }

    if(defaultSetting.postDataType == "url")
    {
        defaultSetting.contentType = "application/x-www-form-urlencoded";
    }
    else if(defaultSetting.postDataType == "json")
    {
        defaultSetting.contentType = "application/json;charset=UTF-8";
    }

    var loadingIndex;

    $.ajax({
        url: defaultSetting.url,
        type: defaultSetting.method,
        data: defaultSetting.data,
        cache: defaultSetting.cache,
        async: defaultSetting.async,
        contentType: defaultSetting.contentType,
        beforeSend: function (event, xhr, options) {

            loadingIndex = layer.load(1, {
                shade: [0.5, '#232D37'] //0.1透明度的白色背景
            });

            if (defaultSetting.beforeSendAction) {
                defaultSetting.beforeSendAction(event, xhr, options);
            }
        },
        complete: function (event, xhr, options) {
            layer.close(loadingIndex);

            if (defaultSetting.completeAction) {
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

                    if (defaultSetting.successCallBack) {
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

                    if (defaultSetting.failedCallBack) {
                        defaultSetting.failedCallBack(jsonData.result);
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

                if (defaultSetting.failedCallBack) {
                    defaultSetting.failedCallBack(jsonData.result);
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

                if (defaultSetting.failedCallBack) {
                    defaultSetting.failedCallBack(responseText);
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

function fillSelectRemote(controlId,url,nameField,valueField,defaultSelection)
{
    var settings = {
        url: url,
        data: null,
        showSuccessInfo: false,
        beforeSendAction: function () {

        },
        completeAction: function () {

        },
        successCallBack: function (data) {

            if(defaultSelection)
            {
                $(controlId).append("<option value='' selected='selected'>请选择</option>");
            }

            $.each(data,function (index, item) {
                $(controlId).append("<option value='" + item[valueField] + "'>" + item[nameField] + "</option>");
            });
        },
        failCallBack: function (data) {

        }
    };

    doAjax(settings);
}

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

