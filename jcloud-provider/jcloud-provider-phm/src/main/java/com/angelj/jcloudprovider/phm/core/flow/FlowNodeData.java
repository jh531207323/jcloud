package com.angelj.jcloudprovider.phm.core.flow;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineDataDecorator;
import lombok.Data;

import java.util.Map;

/**
 * 流程数据
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class FlowNodeData extends EngineDataDecorator {

    public void putFlowNodeIndex(Object value)
    {
        putData(FlowNode.FLOW_NODE_INDEX, value);
    }

    private FlowData flowData;
    private FlowNodeData previousFlowNodeData;

    public FlowNodeData(FlowData flowData)
    {
        super(flowData.getEngineData());
        this.flowData = flowData;
    }
}
