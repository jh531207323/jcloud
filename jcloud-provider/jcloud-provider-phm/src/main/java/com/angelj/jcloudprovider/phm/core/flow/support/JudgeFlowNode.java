package com.angelj.jcloudprovider.phm.core.flow.support;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.engine.Result;
import com.angelj.jcloudprovider.phm.core.flow.*;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 判断流程节点
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class JudgeFlowNode extends FlowNode {

    public static final String JUDGE = "judge";

    private boolean judgeResult;
    private FlowNode yesFlowNode;
    private FlowNode noFlowNode;

    public JudgeFlowNode(FlowNode yes, FlowNode no) {

        yesFlowNode = yes;
        noFlowNode = no;

        flowNodeList.add(yesFlowNode);
        flowNodeList.add(noFlowNode);
    }

    @Override
    public FlowNodeResult process(FlowNodeData flowNodeData) throws Exception {

        if (this.handler != null) {

            System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-执行判断流程节点处理 " + this.getFlowNodeIndex());

            FlowHandlerData flowHandlerData = new FlowHandlerData(flowNodeData);
            FlowHandlerResult flowHandlerResult = handler.process(flowHandlerData);

            if (!flowHandlerResult.containsKey(JudgeFlowNode.JUDGE)) {
                throw new Exception("执行结果输出集中缺少判断键值");
            }

            String strJudgeResult = flowHandlerResult.getData(JudgeFlowNode.JUDGE, String.class);
            if (StringUtils.isEmpty(strJudgeResult)) {
                throw new Exception("执行结果输出集中判断键值错误");
            }

            this.judgeResult = Boolean.parseBoolean(strJudgeResult);


            FlowNodeResult flowNodeResult = new FlowNodeResult();
            flowNodeResult.setSuccess(true);
            flowNodeResult.setDataSet(flowHandlerResult.getDataSet());

            return flowNodeResult;
        } else {
            throw new Exception("缺少可以执行流程处理器");
        }
    }
}