package com.angelj.jcloudprovider.phm.core.data.store;

import java.io.IOException;

/**
 * 存储接口
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public interface Store {

    /**
     * 存储
     * */
    void saveData(String id, long longTime, String data) throws IOException;

    /**
     * 获取
     * */
    String findData(String id, long longTime) throws IOException;

}
