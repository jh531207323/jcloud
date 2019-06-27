package com.angelj.jcloudprovider.phm.core.flow;

import com.angelj.jcloudprovider.phm.core.engine.EngineData;
import com.angelj.jcloudprovider.phm.core.engine.EngineDataDecorator;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * 流程数据
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
@Data
public class FlowData extends EngineDataDecorator {

    public FlowData(EngineData engineData)
    {
        super(engineData);
    }
}
