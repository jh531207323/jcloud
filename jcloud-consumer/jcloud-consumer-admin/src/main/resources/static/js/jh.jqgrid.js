function loadGrid(settings) {
    var defaultSetting = {
        gridTableSelector: "#gridTable",
        url: "",
        dataType: "json",
        method: "GET",
        sortname: "id",
        sortorder: "asc",
        colNames: null,
        colModel: null,
        ondblClickRow: null,
    };

    $.extend(defaultSetting, settings);

    $(defaultSetting.gridTableSelector).jqGrid({
        url: defaultSetting.url,
        datatype: defaultSetting.dataType,
        mtype: defaultSetting.method,
        jsonReader: {
            root: "result.data",
            page: "result.pageIndex",
            total: "result.pageCount",
            records: "result.dataCount"
        },
        prmNames: {
            page: "pageIndex",
            rows: "pageSize",
            sort: "sortName",
            order: "sortMode",
            search: "isSearch"
        },
        height: 250,
        sortable: true,
        sortname: defaultSetting.sortname,
        sortorder: defaultSetting.sortorder,
        rownumbers: true,
        styleUI: "jQueryUI",
        colNames: defaultSetting.colNames,
        colModel: defaultSetting.colModel,
        subGrid: true,//subgrid options
        //subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
        //datatype: "xml",
        subGridOptions: {
            plusicon: "ace-icon glyphicon-plus icon-plus center blue",
            minusicon: "ace-icon glyphicon-minus center blue",
            openicon: "ace-icon glyphicon glyphicon-chevron-right center orange"
        },
        subGridRowExpanded: function (subgridDivId, rowId) {
            showSubGridRowExpanded(gridTableSelector, subgridDivId, rowId);
        },

        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 50],
        pager: "#gridPager",
        altRows: true,
        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,
        loadComplete: function () {

            loadCompleteCallBack(this);
        },
        loadError: function () {

            loadErrorCallBack(this);
        },
        ondblClickRow: function (rowId, iRow, iCol, e) {

            if (defaultSetting.ondblClickRow) {
                defaultSetting.ondblClickRow(rowId, iRow, iCol, e);
            }
        }
    });
}

function refreshGrid(gridTableSelector)
{
    $(gridTableSelector).trigger("reloadGrid");
}

function loadCompleteCallBack(table) {
    setTimeout(function () {

        updatePagerIcons(table);
        enableTooltips(table);
    }, 0);
}

function loadErrorCallBack(table) {

    setTimeout(function () {

        updatePagerIcons(table);
        enableTooltips(table);
    }, 0);

    alertLoadFailed();
}

//replace icons with FontAwesome icons like above
function updatePagerIcons(table) {
    var replacement =
        {
            'ui-icon-seek-first': 'fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'fa fa-angle-double-right bigger-140'
        };
    $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
        var icon = $(this);
        var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

        if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
    })
}

function enableTooltips(table) {
    $('.navtable .ui-pg-button').tooltip({container: 'body'});
    $(table).find('.ui-pg-div').tooltip({container: 'body'});
}

function showSubGridRowExpanded(gridTableSelector, subgridDivId, rowId) {
    var subgridTableId = subgridDivId + "_t";


    var row = $(gridTableSelector).jqGrid("getRowData", rowId);
    //获取列名
    var colNames = $(gridTableSelector).jqGrid('getGridParam', 'colNames');
    //获取列字段
    var colModel = $(gridTableSelector).jqGrid('getGridParam', 'colModel');

    var html = [];
    html.push("<div class='table-detail'>");

    for (var i = 0; i < colModel.length; i++) {
        var columnHidden = colModel[i].hidden;
        var columnName = colModel[i].name;
        if (columnHidden == false && columnName != "rn" && columnName != "subgrid" && columnName != "cb") {

            html.push("    <div class='row'>");
            html.push("        <div class='col-xs-12'>");
            html.push("            <span class='green'>" + colNames[i] + ": </span>");
            html.push("            <span class='black' style='white-space:normal;'>" + row[colModel[i].name] + "</span>");
            html.push("        </div>");
            html.push("    </div>");
        }
    }

    html.push("</div>");

    $("#" + subgridDivId).html(html.join(''));
}