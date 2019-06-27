package com.angelj.jcloudprovider.phm.core.engine;

import com.angelj.jcloudprovider.phm.core.flow.FlowData;
import lombok.Data;

import java.util.Map;

/**
 * 处理结果
 *
 * @author AngelJ
 * @date 2019-06-24 14:56
 */
@Data
public class Result extends EngineDataDecorator {

    private boolean success;
    private String message;

    public boolean success() {
        return this.success;
    }

    public boolean failed() {
        return !this.success;
    }

    public Result()
    {
        super(null);
    }
}
