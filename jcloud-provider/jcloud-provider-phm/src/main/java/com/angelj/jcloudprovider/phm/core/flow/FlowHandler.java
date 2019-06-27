package com.angelj.jcloudprovider.phm.core.flow;

/**
 * 流程处理接口
 *
 * @author AngelJ
 * @date 2019-06-20 10:17
 */
public interface FlowHandler {

    FlowHandlerResult process(FlowHandlerData flowHandlerData) throws InterruptedException;

}
