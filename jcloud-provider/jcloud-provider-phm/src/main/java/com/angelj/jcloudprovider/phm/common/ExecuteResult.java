package com.angelj.jcloudprovider.phm.common;

import lombok.Data;

/**
 * 执行返回类
 * */
@Data
public class ExecuteResult {

    private boolean isSuccess;
    private String message;

    public boolean sucess()
    {
        return this.isSuccess;
    }

    public boolean failed()
    {
        return !this.isSuccess;
    }
}
