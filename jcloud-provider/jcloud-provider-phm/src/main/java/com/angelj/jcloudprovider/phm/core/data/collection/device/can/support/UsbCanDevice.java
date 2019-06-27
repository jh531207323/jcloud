package com.angelj.jcloudprovider.phm.core.data.collection.device.can.support;

import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceCallback;
import com.angelj.jcloudprovider.phm.core.data.collection.device.DeviceResult;
import com.angelj.jcloudprovider.phm.core.data.collection.device.can.CanDevice;

/**
 * USB-CAN设备
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public class UsbCanDevice extends CanDevice {

    DeviceCallback deviceCallback;

    @Override
    public void collection() {

    }

    @Override
    public void getCollectionData() {

    }

    @Override
    public void init() {

    }

    @Override
    public void run() {

    }

    public DeviceResult runMain()
    {
        DeviceResult deviceResult = new DeviceResult();
        deviceResult.setSuccess(true);
        deviceResult.setData(null);

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
}
