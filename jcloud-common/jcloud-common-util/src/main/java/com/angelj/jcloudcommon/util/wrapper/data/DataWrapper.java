package com.angelj.jcloudcommon.util.wrapper.data;

import lombok.Data;

import java.io.Serializable;

/**
 * @author AngelJ
 */
@Data
public class DataWrapper<T> implements Serializable {
    private static final long serialVersionUID = 2912540215647115817L;

    /**
     * 成功码.
     */
    public static final int SUCCESS_CODE = 200;

    /**
     * 成功信息.
     */
    public static final String SUCCESS_MESSAGE = "操作成功";

    /**
     * 错误码.
     */
    public static final int ERROR_CODE = 500;

    /**
     * 错误信息.
     */
    public static final String ERROR_MESSAGE = "内部异常";

    private int code;
    private String message;
    private T result;

    DataWrapper() {
        this(SUCCESS_CODE, SUCCESS_MESSAGE);
    }

    DataWrapper(int code, String message) {
        this(code, message, null);
    }

    DataWrapper(int code, String message, T result) {
        super();
        this.code(code).message(message).result(result);
    }

    private DataWrapper<T> code(int code) {
        this.setCode(code);
        return this;
    }

    public DataWrapper<T> message(String message) {
        this.setMessage(message);
        return this;
    }

    public DataWrapper<T> result(T result) {
        this.setResult(result);
        return this;
    }

    public boolean sucess() {
        return this.code == DataWrapper.SUCCESS_CODE;
    }

    public boolean error() {
        return this.code == DataWrapper.ERROR_CODE;
    }
}
