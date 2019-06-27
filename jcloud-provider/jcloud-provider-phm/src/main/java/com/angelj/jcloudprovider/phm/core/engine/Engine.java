package com.angelj.jcloudprovider.phm.core.engine;

import com.angelj.jcloudprovider.phm.core.base.Component;

/**
 * 引擎接口
 *
 * @author AngelJ
 * @date 2019-06-19 16:09
 */
public interface Engine extends Component {

    void onEngineCallback(EngineCallback notice);
}
