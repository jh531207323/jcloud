package com.angelj.jcloudprovider.phm.core.engine.support;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.data.collection.device.Device;
import com.angelj.jcloudprovider.phm.core.engine.Engine;
import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineCallback;
import com.angelj.jcloudprovider.phm.core.engine.EngineThreadPool;
import com.angelj.jcloudprovider.phm.core.flow.*;
import com.angelj.jcloudprovider.phm.core.flow.support.ParallelFlowNode;
import com.angelj.jcloudprovider.phm.core.flow.support.SimpleFlowNode;
import com.google.common.base.Stopwatch;
import org.apache.commons.lang3.StringUtils;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.*;

/**
 * 流程引擎
 *
 * @author AngelJ
 * @date 2019-06-19 16:09
 */
public class FlowEngine extends EngineThreadPool implements Engine {

    EngineCallback engineCallback;
    List<Flow> flowList = new ArrayList<>();

    public void initFlowList() {
        //构建流程
        FlowNode flowNode1 = new SimpleFlowNode();
        flowNode1.setHandler(new TestFlowHandler());

        FlowNode flowNode2 = new SimpleFlowNode();
        flowNode2.setHandler(new TestFlowHandler());

        FlowNode flowNode3 = new SimpleFlowNode();
        flowNode3.setHandler(new TestFlowHandler());

        FlowNode flowNode4 = new SimpleFlowNode();
        flowNode4.setHandler(new TestFlowHandler());

        FlowNode flowNode5 = new SimpleFlowNode();
        flowNode5.setHandler(new TestFlowHandler());

        FlowNode flowNode6 = new ParallelFlowNode(flowNode4, flowNode5);
        flowNode6.setHandler(new TestFlowHandler());

        Flow testflow = new Flow.FlowBuilder()
                .AddSimpleFlowNode(new TestFlowHandler())
                .AddJudgeFlowNode(new TestFlowHandler(), flowNode1, flowNode2)
                .addParallelFlowNode(new TestFlowHandler(), flowNode3, flowNode4, flowNode5, flowNode6)
                .build("1");

        flowList.add(testflow);
    }

    @Override
    public void init() {

        initFlowList();

        int coreThreadCount = flowList.size();
        createThreadPool(this.getClass().getSimpleName(), coreThreadCount);

        for (int i = 0; i < flowList.size(); i++) {
            Flow flow = flowList.get(i);
            flow.init();
        }
    }

    @Override
    public void run() {

        for (int i = 0; i < flowList.size(); i++) {
            Flow flow = flowList.get(i);
            executorService.submit(flow);
        }
    }

    @Override
    public void stop() {

        for (int i = 0; i < flowList.size(); i++) {
            Flow flow = flowList.get(i);
            flow.stop();
        }

        executorService.shutdown();
    }

    @Override
    public void destroy() {

        for (int i = 0; i < flowList.size(); i++) {
            Flow flow = flowList.get(i);
            flow.destroy();
        }

        if (!executorService.isShutdown()) {
            executorService.shutdownNow();
        }
    }

    @Override
    public void onEngineCallback(EngineCallback callback) {
        engineCallback = callback;
    }

    public void noticeData(EngineData engineData) {

        System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-收到通知数据");

        FlowData flowData = (FlowData) engineData;
        String flowId = flowData.getData(Flow.FLOW_ID, String.class);

        if (StringUtils.isEmpty(flowId)) {
            System.out.println("参数错误，跳过执行");
            return;
        }

        //被通知，根据采集设备开启对应流程
        Flow flow = null;
        for (int i = 0; i < flowList.size(); i++) {
            if (flowList.get(i).getFlowId().equals(flowId)) {
                flow = flowList.get(i);
                break;
            }
        }

        if (flow != null) {

            System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-转换数据");
            //FlowData flowData = BeanConverter.copyProperties(engineData, FlowData.class);
            flow.setFlowData(flowData);
            System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-转换数据");

            System.out.println(DateUtil.formatCurrentDate() + " 流程引擎-提交流程任务");
            executorService.submit(flow);
        } else {
            System.out.println("未找到流程，跳过执行");
        }
    }
}

class TestFlowHandler implements FlowHandler {

    @Override
    public FlowHandlerResult process(FlowHandlerData flowHandlerData) throws InterruptedException {

        FlowHandlerResult flowHandlerResult = new FlowHandlerResult();
        flowHandlerResult.setSuccess(true);

        String flowNodeIndex = flowHandlerData.getFlowNodeData().getData(FlowNode.FLOW_NODE_INDEX, String.class);

        if (flowNodeIndex.equals("1")) {
            Integer no = Integer.parseInt(flowHandlerData.getFlowNodeData().getEngineData(Device.DEVICE_DATA, String.class));
            flowHandlerResult.putData("no1", no);

            Stopwatch stopwatch = new Stopwatch();
            stopwatch.start();

            //调用解析规则
            ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
            ScriptEngine scriptEngine = scriptEngineManager.getEngineByName("nashorn");
            //ScriptEngine scriptEngine = scriptEngineManager.getEngineFactories().get(0).getScriptEngine();

            try {

                FileReader fileReader = new FileReader("C:\\Users\\AngelJ\\Desktop\\test.js");
                scriptEngine.eval(fileReader);

                Invocable invocable = (Invocable) scriptEngine;

                Object result = invocable.invokeFunction("fun0", 1);
                System.out.println(result);
                System.out.println(result.getClass());

                //System.out.println(DateUtil.formatCurrentDate() + " script result:" + obj.toString());
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }

            stopwatch.stop();
            System.out.println(stopwatch.elapsed(TimeUnit.NANOSECONDS));
        }
        if (flowNodeIndex.equals("2")) {
            Integer no = flowHandlerData.getFlowNodeData().getPreviousFlowNodeData().getData("no1", Integer.class);
            no++;

            flowHandlerResult.putData("no2", no);
            flowHandlerResult.putData("judge", "true");
        }
        if (flowNodeIndex.equals("2-yes")) {
            Integer no = flowHandlerData.getFlowNodeData().getPreviousFlowNodeData().getData("no2", Integer.class);
            no *= 2;

            flowHandlerResult.putData("no-yes", no);
        }
        if (flowNodeIndex.equals("3-1")) {

            Integer no = flowHandlerData.getFlowNodeData().getPreviousFlowNodeData().getData("no2", Integer.class);
            no = 31;

            flowHandlerResult.putData("no3-1", no);
        }
        if (flowNodeIndex.equals("3-2")) {

            Integer no = flowHandlerData.getFlowNodeData().getPreviousFlowNodeData().getData("no2", Integer.class);
            no = 32;

            flowHandlerResult.putData("no3-2", no);
        }
        if (flowNodeIndex.equals("3-3")) {
            Integer no = flowHandlerData.getFlowNodeData().getPreviousFlowNodeData().getData("no2", Integer.class);
            no = 33;

            flowHandlerResult.putData("no3-3", no);
        }

        return flowHandlerResult;
    }


    //自定义方法获取不重复随机数
    private static int[] testB(int sz) {
        long startTime = System.currentTimeMillis(); //开始测试时间
        Random rd = new Random();
        int[] rds = new int[sz];//随机数数组
        int n = 0;//序号
        List<Integer> lst = new ArrayList<Integer>();//存放有序数字集合
        //获取随机数数组, 里面有重复数字
        while (n < rds.length) {
            lst.add(n);
            rds[n++] = (int) (rd.nextFloat() * sz);
        }
        //把随机数和有序集合进行匹对, 把随机数在集合出现的数字从集合中移除掉.
        for (int i = 0; i < rds.length; i++) {
            for (int j = 0; j < lst.size(); j++) {
                if (rds[i] == lst.get(j)) {
                    lst.remove(j);
                    break;
                }
            }
        }
        //把数组中重复的第二个数字用集合的第一个数字替换掉, 并移除掉数组的第一个数字
        for (int i = 0; i < rds.length; i++) {
            for (int j = 0; j < rds.length; j++) {
                if (i != j && rds[i] == rds[j]) {
                    rds[j] = lst.get(0);
                    lst.remove(0);
                    break;
                }
            }
        }
        //得到的  rds  数组就是不重复的随机数组
        long endTime = System.currentTimeMillis(); //获取结束时间
        //System.out.println("自定义代码运行时间： "+(endTime-startTime)+"ms");

        return rds;
    }
}