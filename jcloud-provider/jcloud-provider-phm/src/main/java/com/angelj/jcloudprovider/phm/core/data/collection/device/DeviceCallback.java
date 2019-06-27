package com.angelj.jcloudprovider.phm.core.data.collection.device;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;

/**
 * 设备回调接口
 *
 * @author AngelJ
 * @date 2019-06-20 13:41
 */
public interface DeviceCallback {
    void callback(String id, String data);
}
