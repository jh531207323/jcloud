package com.angelj.jcloudprovider.phm.core.data.collection.device.sensor.support;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceCallback;
import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceResult;
import com.angelj.jcloudprovider.phm.core.data.collection.device.sensor.SensorDevice;
import org.apache.commons.lang3.StringUtils;

import java.util.Scanner;

/**
 * 温度传感器
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public class TemperatureSensorDevice extends SensorDevice {

    DeviceCallback deviceCallback;

    @Override
    public void collection() {

        Scanner scanner = new Scanner(System.in);

        System.out.println(Thread.currentThread().getName()
                + "(" + Thread.currentThread().getPriority() + ")");

        while (true) {

            System.out.println("请输入" + "温度" + "：");

//            if (scanner.hasNext()) {
//                String data = scanner.next();
//
//                System.out.println(DateUtil.formatCurrentDate() + " 获取到数据 " + data);
//
//                deviceCallback(deviceId, data);
//            }

            deviceCallback(deviceId, "1");
        }
    }

    @Override
    public void getCollectionData() {

    }

    @Override
    public void init() {

    }

    @Override
    public void run() {
        runMain();
    }


    public DeviceResult runMain() {
        DeviceResult deviceResult = new DeviceResult();
        deviceResult.setSuccess(true);
        deviceResult.setData(null);

        collection();

        return deviceResult;
    }

    @Override
    public void stop() {

    }

    @Override
    public void destroy() {

    }

    @Override
    public DeviceResult call() throws Exception {
        return runMain();
    }

    @Override
    public void onDeviceCallback(DeviceCallback callback) {
        deviceCallback = callback;
    }

    public void deviceCallback(String id, String data) {
        if (deviceCallback != null) {
            deviceCallback.callback(id, data);
        }
    }
}
