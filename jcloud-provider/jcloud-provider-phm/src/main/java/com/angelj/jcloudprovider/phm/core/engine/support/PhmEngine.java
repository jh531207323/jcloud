package com.angelj.jcloudprovider.phm.core.engine.support;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.data.collection.device.Device;
import com.angelj.jcloudprovider.phm.core.engine.Engine;
import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineCallback;
import com.angelj.jcloudprovider.phm.core.engine.EngineThreadPool;
import com.angelj.jcloudprovider.phm.core.flow.Flow;
import com.angelj.jcloudprovider.phm.core.flow.FlowData;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author AngelJ
 * @date 2019-06-20 13:11
 */
public class PhmEngine extends EngineThreadPool implements Engine {

    EngineCallback engineCallback;

    DataCollectionEngine dataCollectionEngine;
    FlowEngine flowEngine;

    Map<Device, Flow> deviceFlowMap = new HashMap<>();

    public PhmEngine() {
        dataCollectionEngine = new DataCollectionEngine();
        flowEngine = new FlowEngine();
    }

    public void initDeviceFlowMap() {
        //配置设备与流程对应处理关系
        for (int i = 0; i < dataCollectionEngine.deviceList.size(); i++) {

            Device device = dataCollectionEngine.deviceList.get(i);

            for (int j = 0; j < flowEngine.flowList.size(); j++) {
                Flow flow = flowEngine.flowList.get(j);

                if (device.getDeviceId().equals(flow.getFlowId())) {
                    deviceFlowMap.put(device, flow);
                }
            }
        }
    }

    public Flow getFlowByDevice(String deviceId) {
        Flow flow = null;

        for (Map.Entry<Device, Flow> item : deviceFlowMap.entrySet()) {
            if (item.getKey().getDeviceId().equals(deviceId)) {
                flow = item.getValue();
                break;
            }
        }

        return flow;
    }

    @Override
    public void init() {

        dataCollectionEngine.onEngineCallback(new EngineCallback() {
            @Override
            public void callback(EngineData engineData) {
                dataCollectionEngineCallback(engineData);
            }
        });

        flowEngine.onEngineCallback(new EngineCallback() {
            @Override
            public void callback(EngineData engineData) {
                flowEngineCallback(engineData);
            }
        });

        dataCollectionEngine.init();
        flowEngine.init();

        initDeviceFlowMap();
    }

    @Override
    public void run() {
        dataCollectionEngine.run();
        flowEngine.run();
    }

    @Override
    public void stop() {
        dataCollectionEngine.stop();
        flowEngine.stop();
    }


    @Override
    public void destroy() {
        dataCollectionEngine.destroy();
        flowEngine.destroy();
    }

    @Override
    public void onEngineCallback(EngineCallback callback) {
        engineCallback = callback;
    }

    public void dataCollectionEngineCallback(EngineData engineData) {

        System.out.println(DateUtil.formatCurrentDate() + " PHM引擎-收到数据");

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //寻找设备配置的流程
        FlowData flowData = new FlowData(engineData);
        Flow flow = getFlowByDevice(flowData.getEngineData(Device.DEVICE_ID));
        if (flow != null) {
            //对应流程ID
            flowData.putData(Flow.FLOW_ID, flow.getFlowId());
            flowEngine.noticeData(flowData);
        } else {
            System.out.println(DateUtil.formatCurrentDate() + " 未找到设备所有配置的流程");
        }
    }

    public void flowEngineCallback(EngineData engineData) {

    }
}
