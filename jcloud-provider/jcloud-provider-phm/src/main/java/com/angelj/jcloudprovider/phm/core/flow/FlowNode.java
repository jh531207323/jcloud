package com.angelj.jcloudprovider.phm.core.flow;

import com.angelj.jcloudprovider.phm.core.engine.Result;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 流程节点
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public abstract class FlowNode {

    public static final String FLOW_NODE_INDEX = "flow_node_index";

    protected List<FlowNode> flowNodeList = new ArrayList<>();
    protected FlowHandler handler;
    protected String flowNodeIndex;

    public String getFlowNodeIndex() {
        return flowNodeIndex;
    }

    public void setFlowNodeIndex(String flowNodeIndex) {
        this.flowNodeIndex = flowNodeIndex;
    }

    public abstract FlowNodeResult process(FlowNodeData flowNodeData) throws Exception;
}
