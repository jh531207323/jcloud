
function alertSuccess(successCallBack)
{
    swal({
        title: "提示",
        text: "保存成功",
        type: "success",
        confirmButtonText: "确定",
        closeOnConfirm: true
    }, function () {

        if(successCallBack) {
            successCallBack();
        }
    });
}

function alertChooseHint() {
    swal({
        title: "提示",
        text: "请选择一行数据!",
        type: "info",
        confirmButtonText: "确定",
        closeOnConfirm: true
    });
}

function alertDeleteHint()
{
    swal({
        title: "提示",
        text: "请选择要删除的数据!",
        type: "info",
        confirmButtonText: "确定",
        closeOnConfirm: true
    });
}

function alertDeleteConfirm(confirmCallBack)
{
    swal({
        title: "请确认?",
        text: "是否删除所选数据！",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "否",
        confirmButtonText: "是",
        closeOnConfirm: false
    }, function () {
        if(confirmCallBack)
        {
            confirmCallBack();
        }
    });
}

function alertLoadFailed()
{
    swal({
        title: "错误",
        text: "加载数据失败!",
        type: "error",
        confirmButtonText: "确定",
        closeOnConfirm: true
    });
}