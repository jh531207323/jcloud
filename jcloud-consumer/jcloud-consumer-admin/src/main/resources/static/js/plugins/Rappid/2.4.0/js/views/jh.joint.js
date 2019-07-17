/*! jh custom joint js*/

function showJointDialog(title, html) {

    var content = '<textarea style="width: 100%;height: 300px;">' + html + '</textarea>';

    var dialog = new joint.ui.Dialog({
        width: '50%',
        height: '50%',
        draggable: true,
        title: title,
        content: content
    });

    dialog.open();
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function getNodeList() {

    var chart;

    var node = [];
    var flowLink = [];
    var flowStartState = [];
    var flowEndState = [];
    var flowLabel = [];
    var flowGroup = [];
    var flowRectangle = [];
    var flowRectangularModel = [];
    var flowPolygon = [];
    var flowCylinder = [];

    var data = app.graph.toJSON();

    for (var i = 0; i < data.cells.length; i++) {

        node.push(data.cells[i]);

        if (data.cells[i].type == "app.Link") {
            flowLink.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.StartState") {
            flowStartState.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.EndState") {
            flowEndState.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.Label") {
            flowLabel.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.Group") {
            flowGroup.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.Rectangle") {
            flowRectangle.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.RectangularModel") {
            flowRectangularModel.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.Polygon") {
            flowPolygon.push(data.cells[i]);
        } else if (data.cells[i].type == "flow.Cylinder") {
            flowCylinder.push(data.cells[i]);
        }
    }

    chart = {
        node: node,
        flowLink: flowLink,
        flowStartState: flowStartState,
        flowEndState: flowEndState,
        flowLabel: flowLabel,
        flowGroup: flowGroup,
        flowRectangle: flowRectangle,
        flowRectangularModel: flowRectangularModel,
        flowPolygon: flowPolygon,
        flowCylinder: flowCylinder,
    };
    return chart;
}

function getNode(id) {
    var node = null;

    for (var j = 0; j < chart.node.length; j++) {
        if (chart.node[j].id == id) {

            node = chart.node[j];
            break;
        }
    }

    return node;
}

function getNodeText(node) {
    var text = null;

    if (node.attrs.text && node.attrs.text.text) {
        text = node.attrs.text.text;
    }
    if (node.attrs.label && node.attrs.label.text) {
        text = node.attrs.label.text;
    }

    return text;
}

function getNodeTypeByName(name) {
    var nodeTypeID;

    $.each(window.flowNodeTypes,function (index, item) {
        if(item.name == name)
        {
            nodeTypeID = item.id;
            return false;
        }
    });

    return nodeTypeID;
}

function getNodeType(node) {
    var nodeTypeID;

    if (node.type == "flow.StartState") {
        nodeTypeID = getNodeTypeByName("常规节点");
    }
    if (node.type == "flow.EndState") {
        nodeTypeID = getNodeTypeByName("常规节点");
    }
    if (node.type == "flow.Label") {

    }
    if (node.type == "flow.Group") {

    }
    if (node.type == "flow.Rectangle") {
        nodeTypeID = getNodeTypeByName("常规节点");
    }
    if (node.type == "flow.RectangularModel") {
        nodeTypeID = getNodeTypeByName("并行节点");
    }
    if (node.type == "flow.Polygon") {
        nodeTypeID = getNodeTypeByName("判定节点");
    }
    if (node.type == "flow.Cylinder") {
        nodeTypeID = getNodeTypeByName("常规节点");
    }

    return nodeTypeID;
}

function getNodeFlowHandler(node) {
    var flowHandler = null;

    if (node.attrs.body && node.attrs.body.flowHandler) {
        flowHandler = node.attrs.body.flowHandler;
    }

    return flowHandler;
}

function isExistFlowNodes(flowNodes, flowNodeID) {

    var isExist = false;

    $.each(flowNodes, function (index, item) {
        if (item.id == flowNodeID) {
            isExist = true;
            return false;
        }
    });

    return isExist;
}

function getFlowStructure(flowStructures, flowNodes, parentID, parentNodeID, parentCode, nodeIndex) {
    for (var j = 0; j < chart.flowLink.length; j++) {
        if (chart.flowLink[j].source.id == parentNodeID) {

            var id = createUUID();
            var nodeID = chart.flowLink[j].target.id;
            var node = getNode(nodeID);
            var nodeCode = parentCode + (++nodeIndex);
            var nodeText = getNodeText(node);
            var flowHandler = getNodeFlowHandler(node);

            flowStructures.push({
                id: id,
                flowID: operationId,
                parentID: parentID,
                flowNodeID: nodeID,
            });

            if (!isExistFlowNodes(flowNodes, nodeID)) {
                flowNodes.push({
                    id: nodeID,
                    flowNodeTypeID: getNodeType(node),
                    flowHandlerID: flowHandler,
                    flowNodeCode: nodeCode,
                    flowNodeName: nodeText,
                });
            }

            getFlowStructure(flowStructures, flowNodes, id, nodeID, nodeCode + "-", 0);
        }
    }
}

function getFlowHandler() {
    //获取流程处理数据
    getModel({
        url: "/phm/flowhandler/find",
        showSuccessInfo: false,
        async: false,
        beforeSendAction: function () {

        },
        completeAction: function () {

        },
        successCallBack: function (data) {
            for (var i = 0; i < data.length; i++) {
                window.flowHandlers.push({value: data[i].id, content: data[i].flowHandlerName});
            }
        },
        failCallBack: function (data) {

        }
    });
}

function getFlowNodeType() {
    //获取流程节点类型数据
    getModel({
        url: "/phm/flownodetype/find",
        showSuccessInfo: false,
        async: false,
        beforeSendAction: function () {

        },
        completeAction: function () {

        },
        successCallBack: function (data) {
            for (var i = 0; i < data.length; i++) {
                window.flowNodeTypes.push({
                    id: data[i].id,
                    code: data[i].flowNodeTypeCode,
                    name: data[i].flowNodeTypeName
                });
            }
        },
        failCallBack: function (data) {

        }
    });
}

function getFlow() {
    //获取流程
    //判断操作类型
    operationId = getUrlParam("id");
    if (operationId) {
        operationType = "update";
        getModel({
            url: "/phm/flow/get/" + operationId,
            showSuccessInfo: false,
            async: false,
            beforeSendAction: function () {

            },
            completeAction: function () {

            },
            successCallBack: function (data) {
                if (data) {
                    window.currentFlow = data.flowChartJson;
                }
            },
            failCallBack: function (data) {

            }
        });
    }
}

function checkNode(node) {
    var flag = false;

    if (node.type == "flow.StartState") {
        flag = true;
    }
    else if (node.type == "flow.EndState") {
        flag = true;
    }
    else if (node.type == "flow.Label") {
        flag = false;
    }
    else if (node.type == "flow.Group") {
        flag = false;
    }
    else if (node.type == "flow.Rectangle") {
        flag = true;
    }
    else if (node.type == "flow.RectangularModel") {
        flag = true;
    }
    else if (node.type == "flow.Polygon") {
        flag = true;
    }
    else if (node.type == "flow.Cylinder") {
        flag = true;
    }

    return flag;
}