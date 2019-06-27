package com.angelj.jcloudprovider.phm.core.data.collection.device;

import com.angelj.jcloudprovider.phm.core.base.Component;
import lombok.Data;

import java.util.concurrent.Callable;

/**
 * 设备类
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
@Data
public abstract class Device implements Component, Callable<DeviceResult> {

    public static final String DEVICE_ID = "device_id";
    public static final String DEVICE_DATA = "device_data";

    protected String deviceId;

    public abstract void onDeviceCallback(DeviceCallback callback);
}
