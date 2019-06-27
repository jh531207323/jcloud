package com.angelj.jcloudprovider.phm.core.engine.support;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.data.collection.device.Device;
import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceCallback;
import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceData;
import com.angelj.jcloudprovider.phm.core.data.collection.device.sensor.support.TemperatureSensorDevice;
import com.angelj.jcloudprovider.phm.core.engine.Engine;
import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineCallback;
import com.angelj.jcloudprovider.phm.core.engine.EngineThreadPool;
import com.angelj.jcloudprovider.phm.core.flow.Flow;

import java.util.ArrayList;
import java.util.List;

/**
 * 采集引擎
 *
 * @author AngelJ
 * @date 2019-06-19 16:09
 */
public class DataCollectionEngine extends EngineThreadPool implements Engine {

    EngineCallback engineCallback;
    List<Device> deviceList = new ArrayList<>();

    public void initDeviceList()
    {
        //读取设备
        Device testdevice = new TemperatureSensorDevice();
        testdevice.setDeviceId("1");
        deviceList.add(testdevice);
    }

    @Override
    public void init() {

        initDeviceList();

        int coreThreadCount = deviceList.size();
        createThreadPool(this.getClass().getSimpleName(), coreThreadCount);

        //加载采集设备
        for (int i = 0; i < deviceList.size(); i++) {

            //判断设备类型

            //内置设备类型

            //外部设备类型

        }

        //初始化设备
        for (int i = 0; i < deviceList.size(); i++) {
            Device device = deviceList.get(i);
            device.onDeviceCallback(new DeviceCallback() {
                @Override
                public void callback(String id, String data) {
                    deviceCallback(id, data);
                }
            });

            device.init();
        }
    }

    @Override
    public void run() {

        for (int i = 0; i < deviceList.size(); i++) {
            Device device = deviceList.get(i);
            executorService.submit(device);
        }
    }

    @Override
    public void stop() {

        for (int i = 0; i < deviceList.size(); i++) {
            Device device = deviceList.get(i);
            device.stop();
        }

        executorService.shutdown();
    }

    @Override
    public void destroy() {

        for (int i = 0; i < deviceList.size(); i++) {
            Device device = deviceList.get(i);
            device.destroy();
        }

        if (!executorService.isShutdown()) {
            executorService.shutdownNow();
        }
    }

    @Override
    public void onEngineCallback(EngineCallback callback) {
        engineCallback = callback;
    }

    public void deviceCallback(String id, String data) {
        if (engineCallback != null) {

            System.out.println(DateUtil.formatCurrentDate() + " 采集引擎-构建数据");

            //构建数据
            //设备ID,采集数据
            DeviceData deviceData = new DeviceData();
            deviceData.putData(Device.DEVICE_ID, id);
            deviceData.putData(Device.DEVICE_DATA, data);

            engineCallback.callback(deviceData);
        }
    }
}
