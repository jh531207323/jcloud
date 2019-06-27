package com.angelj.jcloudprovider.phm.core.engine;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

/**
 * 引擎数据
 *
 * @author AngelJ
 * @date 2019-06-19 16:09
 */
public abstract class EngineData {
    protected Map<String, Object> data = new HashMap<>();
}
