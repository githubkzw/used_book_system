package com.wsk.response;

import com.wsk.handle.GlobalExceptionHandler;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author wsk1103
 * @date 2019/5/8
 * @description 描述
 */
@Data
public class BaseResponse {
    private int result;
    private String msg;
    private boolean success;

    public BaseResponse(int result, String msg, boolean success) {
        this.result = result;
        this.msg = msg;
        this.success = success;
    }

    public BaseResponse(int result) {
        this.result = result;
        this.success = result == 1;
    }

    public static BaseResponse fail() {
        return new BaseResponse(0, GlobalExceptionHandler.DEFAULT_ERROR_MESSAGE, false);
    }

    public static BaseResponse fail(String msg) {
        return new BaseResponse(0, msg, false);
    }

    public static BaseResponse fail(int result) {
        return new BaseResponse(result, GlobalExceptionHandler.DEFAULT_ERROR_MESSAGE, false);
    }

    public static BaseResponse success() {
        return new BaseResponse(1, "success", true);
    }

    public static BaseResponse success(String msg) {
        return new BaseResponse(1, msg, true);
    }
}
