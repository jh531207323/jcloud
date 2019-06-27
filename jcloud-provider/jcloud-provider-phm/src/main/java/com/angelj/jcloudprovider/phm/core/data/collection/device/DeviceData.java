package com.angelj.jcloudprovider.phm.core.data.collection.device;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineDataDecorator;
import lombok.Data;

/**
 * 设备数据
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class DeviceData extends EngineDataDecorator {

    public DeviceData()
    {
        super(null);
    }
}
