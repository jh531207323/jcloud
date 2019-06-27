package com.angelj.jcloudprovider.phm.core.data.collection;

/**
 * 采集接口
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public interface Collection {

    /**
     * 采集
     */
    void collection();

    /**
     * 获取采集数据
     */
    void getCollectionData();
}
