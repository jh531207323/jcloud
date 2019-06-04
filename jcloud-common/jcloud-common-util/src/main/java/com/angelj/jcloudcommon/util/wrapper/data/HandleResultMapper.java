package com.angelj.jcloudcommon.util.wrapper.data;

public class HandleResultMapper {

    public static DataWrapper wrap(boolean isSuccess) {
        if(isSuccess)
        {
            return wrapSuccess();
        }
        else {
            return wrapFailed();
        }
   }

    public static DataWrapper wrapSuccess() {
        return new DataWrapper<>(DataWrapper.SUCCESS_CODE, DataWrapper.SUCCESS_MESSAGE);
    }

    public static DataWrapper wrapSuccess(String message) {
        return new DataWrapper<>(DataWrapper.SUCCESS_CODE, message);
    }

    public static DataWrapper wrapFailed() {
        return new DataWrapper<>(DataWrapper.ERROR_CODE, DataWrapper.ERROR_MESSAGE);
    }

    public static DataWrapper wrapFailed(String message) {
        return new DataWrapper<>(DataWrapper.ERROR_CODE, message);
    }

    public static DataWrapper wrap(int code, String message) {
        return new DataWrapper<>(code, message);
    }

    public static <T> DataWrapper<T> wrap(int code, String message, T t) {
        return new DataWrapper<>(code, message, t);
    }

    public static <T> DataWrapper<T> wrapPage(T t) {
        return new DataWrapper<>(DataWrapper.SUCCESS_CODE, DataWrapper.SUCCESS_MESSAGE, t);
    }

    public static <T> DataWrapper<T> wrapResult(T t) {
        return new DataWrapper<>(DataWrapper.SUCCESS_CODE, DataWrapper.SUCCESS_MESSAGE, t);
    }
}
