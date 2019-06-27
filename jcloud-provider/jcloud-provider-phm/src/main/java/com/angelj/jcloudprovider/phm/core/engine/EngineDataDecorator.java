package com.angelj.jcloudprovider.phm.core.engine;

import java.util.Map;

/**
 * 引擎数据装饰类
 * @author AngelJ
 * @date 2019-06-24 11:26
 */
public abstract class EngineDataDecorator extends EngineData {

    protected EngineData engineData;

    public EngineData getEngineData() {
        return engineData;
    }

    public boolean containsEngineKey(String key) {
        return engineData.data.containsKey(key);
    }
    public <T> T getEngineData(String key) {
        if (engineData.data.containsKey(key)) {
            return (T) engineData.data.get(key);
        } else {
            return null;
        }
    }

    public <T> T getEngineData(String key, Class<T> clazz) {
        if (engineData.data.containsKey(key)) {
            return clazz.cast(engineData.data.get(key));
        } else {
            return null;
        }
    }

    public boolean containsKey(String key) {
        return data.containsKey(key);
    }

    public Object getData(String key) {
        if (data.containsKey(key)) {
            return data.get(key);
        } else {
            return null;
        }
    }

    public <T> T getData(String key, Class<T> clazz) {
        if (data.containsKey(key)) {
            return clazz.cast(data.get(key));
        } else {
            return null;
        }
    }

    public void putData(String key, Object value) {
        data.put(key, value);
    }

    public Map<String, Object> getDataSet() {
        return this.data;
    }

    public void setDataSet(Map<String, Object> data) {
        this.data = data;
    }

    public EngineDataDecorator(EngineData engineData)
    {
        this.engineData = engineData;
    }
}
