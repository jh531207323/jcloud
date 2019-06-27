package com.angelj.jcloudprovider.phm.core.data.collection.device;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.flow.FlowData;
import lombok.Data;

/**
 * 设备结果
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class DeviceResult {

    private EngineData data;
    private boolean success;
    private String message;

    public boolean sucess()
    {
        return this.success;
    }

    public boolean failed()
    {
        return !this.success;
    }
}
