package com.angelj.jcloudprovider.phm.core.flow.support;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.engine.Result;
import com.angelj.jcloudprovider.phm.core.flow.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

/**
 * 并行流程节点
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class ParallelFlowNode extends FlowNode {

    public ParallelFlowNode(FlowNode... flowNodes) {
        for (int i = 0; i < flowNodes.length; i++) {
            flowNodeList.add(flowNodes[i]);
        }
    }

    @Override
    public FlowNodeResult process(FlowNodeData flowNodeData) throws Exception {

        if (this.handler != null) {

            System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-执行并行流程节点处理 " + this.getFlowNodeIndex());

            FlowHandlerData flowHandlerData = new FlowHandlerData(flowNodeData);
            FlowHandlerResult flowHandlerResult = handler.process(flowHandlerData);

            FlowNodeResult flowNodeResult = new FlowNodeResult();
            flowNodeResult.setSuccess(true);
            flowNodeResult.setDataSet(flowHandlerResult.getDataSet());

            return flowNodeResult;
        } else {
            throw new Exception("缺少可以执行流程处理器");
        }
    }
}