function getCurrentLayerIndex() {
    //注意：parent 是 JS 自带的全局对象，可用于操作父页面
    var index = null;
    if (parent) {
        parent.layer.getFrameIndex(window.name); //获取窗口索引
    }

    return index;
}

function closeCurrentLayer() {
    if (parent) {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);
    }
    else {
        window.close();
    }
}

function closeLayer(index) {
    layer.close(index);
}


var callbackType = "";
var callbackData = null;

function setCallBackType(type) {
    callbackType = type;
}

function setCallBackTypeOk() {
    setCallBackType("ok");
}

function setCallBackTypeCancel() {
    setCallBackType("cancel");
}

function setCallBackData(data) {
    callbackData = data;
}

function pageCallBack() {
    var result = {type: callbackType, data: callbackData};
    return result;
}

function refreshParentGrid(gridTableSelector) {
    if (!gridTableSelector) {
        gridTableSelector = "#gridTable";
    }

    if (parent) {
        parent.refreshGrid(gridTableSelector);
    }
}

function enableControl(controlId)
{
    setControlEnable(controlId, true);
}

function disableControl(controlId)
{
    setControlEnable(controlId, false);
}

function setControlEnable(controlId, isEnable) {
    if (isEnable) {
        $(controlId).removeClass("disabled").attr("disabled", false);
    }
    else {
        $(controlId).addClass("disabled").attr("disabled", true);
    }
}