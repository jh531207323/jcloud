package com.angelj.jcloudprovider.phm.core.flow;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.base.Component;
import com.angelj.jcloudprovider.phm.core.engine.EngineThreadPool;
import com.angelj.jcloudprovider.phm.core.flow.common.FlowDataUtil;
import com.angelj.jcloudprovider.phm.core.flow.support.JudgeFlowNode;
import com.angelj.jcloudprovider.phm.core.flow.support.ParallelFlowNode;
import com.angelj.jcloudprovider.phm.core.flow.support.SimpleFlowNode;

import java.util.*;
import java.util.concurrent.*;

/**
 * 流程
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
public class Flow extends EngineThreadPool implements Component, Callable<FlowResult> {

    public static final String FLOW_ID = "flow_id";

    String flowId;
    List<FlowNode> flowNodeList = new ArrayList<>();
    FlowData flowData;

    private Flow(String id) {
        flowId = id;
    }

    public String getFlowId() {
        return flowId;
    }

    public void setFlowId(String flowId) {
        this.flowId = flowId;
    }

    public void setFlowNodeList(List<FlowNode> flowNodeList) {
        this.flowNodeList = flowNodeList;
    }

    public void setFlowData(FlowData flowData) {
        this.flowData = flowData;
    }

    @Override
    public void init() {

        int coreThreadCount = getCoreCount(flowNodeList);
        createThreadPool(this.getClass().getSimpleName(), coreThreadCount);
    }

    public int getCoreCount(List<FlowNode> list) {

        int count = 0;

        for (int i = 0; i < list.size(); i++) {

            FlowNode node = list.get(i);
            if (node instanceof ParallelFlowNode) {

                count += node.getFlowNodeList().size();
                count += getCoreCount(node.getFlowNodeList());
            }
        }

        return count;
    }

    @Override
    public void run() {
        runMain(this.flowData);
    }

    public FlowResult runMain(FlowData data) {

        FlowResult flowResult = new FlowResult();

        if (data == null) {
            flowResult.setSuccess(false);
            flowResult.setMessage("数据为空,跳过执行");
            return flowResult;
        }

        FlowNodeData flowNodeData = new FlowNodeData(data);

        for (int i = 0; i < flowNodeList.size(); i++) {

            FlowNode flowNode = flowNodeList.get(i);
            FlowNodeResult flowNodeResult = executeNode(flowNode, flowNodeData);
            if (flowNodeResult.success()) {

                flowNodeData = new FlowNodeData(data);
                flowNodeData.setPreviousFlowNodeData(FlowDataUtil.getFlowNodeData(flowNodeResult));

                flowResult.setDataSet(flowNodeResult.getDataSet());

            } else {
                flowResult.setSuccess(false);
                break;
            }
        }

        return flowResult;
    }

    public FlowNodeResult executeNode(FlowNode node, FlowNodeData data) {

        System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-执行流程节点 " + node.getFlowNodeIndex());

        FlowNodeResult flowNodeResult;
        data.putFlowNodeIndex(node.getFlowNodeIndex());


        try {
            if (node instanceof SimpleFlowNode) {

                flowNodeResult = executeSimpleNode(node, data);
            } else if (node instanceof JudgeFlowNode) {

                flowNodeResult = executeSimpleNode(node, data);

                if (flowNodeResult.success()) {

                    JudgeFlowNode judgeFlowNode = (JudgeFlowNode) node;

                    if (judgeFlowNode.isJudgeResult()) {
                        FlowNode childNode = judgeFlowNode.getYesFlowNode();
                        if (childNode != null) {
                            data.setPreviousFlowNodeData(FlowDataUtil.getFlowNodeData(flowNodeResult));
                            return executeNode(childNode, data);
                        } else {
                            return flowNodeResult;
                        }
                    } else {
                        FlowNode childNode = judgeFlowNode.getNoFlowNode();
                        if (childNode != null) {
                            data.setPreviousFlowNodeData(FlowDataUtil.getFlowNodeData(flowNodeResult));
                            return executeNode(childNode, data);
                        } else {
                            return flowNodeResult;
                        }
                    }
                }
            } else if (node instanceof ParallelFlowNode) {

                flowNodeResult = executeSimpleNode(node, data);

                if (flowNodeResult.success()) {

                    data.setPreviousFlowNodeData(FlowDataUtil.getFlowNodeData(flowNodeResult));

                    List<FlowNode> parallelFlowNodeList = node.getFlowNodeList();

                    final CountDownLatch parallelCountDownLatch = new CountDownLatch(parallelFlowNodeList.size());
                    List<Future<FlowNodeResult>> futureList = new Vector<>();

                    System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-执行流程节点 " + node.getFlowNodeIndex() + "并行节点");
                    for (int i = 0; i < parallelFlowNodeList.size(); i++) {

                        final FlowNode parallelFlowNode = parallelFlowNodeList.get(i);

                        final FlowNodeData parallelFlowData = new FlowNodeData(data.getFlowData());
                        parallelFlowData.setPreviousFlowNodeData(data.getPreviousFlowNodeData());

                        Callable callable = new Callable() {
                            @Override
                            public FlowNodeResult call() throws Exception {

                                FlowNodeResult result = null;
                                try {
                                    result = executeNode(parallelFlowNode, parallelFlowData);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                } finally {
                                    parallelCountDownLatch.countDown();

                                    return result;
                                }
                            }
                        };

                        Future<FlowNodeResult> future = executorService.submit(callable);
                        futureList.add(future);
                    }

                    parallelCountDownLatch.await();

                    //处理并发的结果集
                    Map<String, Object> resultData = new HashMap<>();

                    flowNodeResult = new FlowNodeResult();
                    for (Future<FlowNodeResult> future : futureList) {
                        if (future.isDone()) {
                            if (future.get().success()) {
                                resultData.putAll(future.get().getDataSet());
                            } else {
                                flowNodeResult.setSuccess(false);
                                flowNodeResult.setMessage(future.get().getMessage());
                            }
                        } else {
                            flowNodeResult.setSuccess(false);
                            flowNodeResult.setMessage("并行节点未执行完成");
                        }
                    }

                    flowNodeResult.setDataSet(resultData);
                }
            } else {

                flowNodeResult = executeSimpleNode(node, data);
            }

        } catch (Exception e) {

            e.printStackTrace();

            flowNodeResult = new FlowNodeResult();
            flowNodeResult.setSuccess(false);
            flowNodeResult.setMessage(e.getMessage());
        }

        return flowNodeResult;
    }

    public FlowNodeResult executeSimpleNode(FlowNode node, FlowNodeData data) {

        FlowNodeResult flowNodeResult;

        try {
            flowNodeResult = node.process(data);
        } catch (Exception e) {
            e.printStackTrace();

            flowNodeResult = new FlowNodeResult();
            flowNodeResult.setSuccess(false);
            flowNodeResult.setMessage(e.getMessage());
        }

        return flowNodeResult;
    }

    @Override
    public void stop() {
        executorService.shutdown();
    }


    @Override
    public void destroy() {

        if (!executorService.isShutdown()) {
            executorService.shutdownNow();
        }
    }

    @Override
    public FlowResult call() throws Exception {
        return runMain(this.flowData);
    }

    public static class FlowBuilder {

        private List<FlowNode> list = new ArrayList<>();

        private String createFlowIndex() {
            return String.valueOf(list.size() + 1);
        }

        public FlowBuilder addNode(FlowNode flowNode) {
            list.add(flowNode);

            return this;
        }

        public FlowBuilder AddSimpleFlowNode(FlowHandler flowHandler) {
            SimpleFlowNode simpleFlowNode = new SimpleFlowNode();
            simpleFlowNode.setFlowNodeIndex(createFlowIndex());
            simpleFlowNode.setHandler(flowHandler);

            addNode(simpleFlowNode);

            return this;
        }

        public FlowBuilder AddJudgeFlowNode(FlowHandler flowHandler, FlowNode yesFlowNode, FlowNode noFlowNode) {
            String flowIndex = createFlowIndex();

            yesFlowNode.setFlowNodeIndex(flowIndex + "-yes");
            noFlowNode.setFlowNodeIndex(flowIndex + "-no");

            JudgeFlowNode judgeFlowNode = new JudgeFlowNode(yesFlowNode, noFlowNode);
            judgeFlowNode.setFlowNodeIndex(flowIndex);
            judgeFlowNode.setHandler(flowHandler);

            addNode(judgeFlowNode);

            return this;
        }

        public FlowBuilder addParallelFlowNode(FlowHandler flowHandler, FlowNode... flowNodes) {

            String flowIndex = createFlowIndex();

            for (int i = 0; i < flowNodes.length; i++) {
                flowNodes[i].setFlowNodeIndex(flowIndex + "-" + (i + 1));
            }

            ParallelFlowNode parallelFlowNode = new ParallelFlowNode(flowNodes);
            parallelFlowNode.setFlowNodeIndex(flowIndex);
            parallelFlowNode.setHandler(flowHandler);

            addNode(parallelFlowNode);

            return this;
        }

        public Flow build(String flowId) {
            Flow flow = new Flow(flowId);
            flow.setFlowNodeList(list);

            return flow;
        }
    }
}
