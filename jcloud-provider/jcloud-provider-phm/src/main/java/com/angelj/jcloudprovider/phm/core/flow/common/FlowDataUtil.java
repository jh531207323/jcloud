package com.angelj.jcloudprovider.phm.core.flow.common;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.flow.FlowData;
import com.angelj.jcloudprovider.phm.core.flow.FlowNodeData;
import com.angelj.jcloudprovider.phm.core.flow.FlowNodeResult;
import com.angelj.jcloudprovider.phm.core.flow.FlowResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 流程数据工具类
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
public class FlowDataUtil {

//    public static FlowData merge(List<FlowData> flowDataList) {
//        FlowData flowData = new FlowData();
//
//        for (int i = 0; i < flowDataList.size(); i++) {
//            flowData.getInputData().putAll(flowDataList.get(i).getInputData());
//            flowData.getOutputData().putAll(flowDataList.get(i).getOutputData());
//        }
//
//        return flowData;
//    }
//
//    public static FlowResult mergeNodeData(List<FlowResult> flowResultList) {
//        List<FlowData> flowDataList = new ArrayList<>();
//        for (int i = 0; i < flowResultList.size(); i++) {
//            FlowResult result = flowResultList.get(i);
//            if (result.success()) {
//                flowDataList.add(result.getData());
//            }
//        }
//
//        FlowData flowData = merge(flowDataList);
//        FlowResult flowResult = new FlowResult();
//        flowResult.setSuccess(true);
//        flowResult.setData(flowData);
//
//        return flowResult;
//    }
//
//    public static void reverseData(FlowResult flowResult)
//    {
//        if(flowResult.success())
//        {
//            flowResult.getData().getInputData().putAll(flowResult.getData().getOutputData());
//        }
//    }

    public static FlowNodeData getFlowNodeData(FlowNodeResult flowNodeResult) {
        if (flowNodeResult == null || flowNodeResult.getDataSet() == null) {
            return null;
        }

        //构建了一个空的流程节点数据
        FlowNodeData flowNodeData = new FlowNodeData(new FlowData(null));
        flowNodeData.setDataSet(flowNodeResult.getDataSet());

        return flowNodeData;
    }
}
