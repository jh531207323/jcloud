package com.angelj.jcloudprovider.phm.core.flow;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineDataDecorator;
import lombok.Data;

/**
 * 流程处理数据
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class FlowHandlerData extends EngineDataDecorator {

    FlowNodeData flowNodeData;

    public FlowHandlerData(FlowNodeData flowNodeData) {
        super(flowNodeData.getFlowData().getEngineData());
        this.flowNodeData = flowNodeData;
    }
}
