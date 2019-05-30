package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class OauthCodeVo implements Serializable {

    private static final long serialVersionUID = -287627623560918370L;
    private String code;
    private Byte[] authentication;
}
