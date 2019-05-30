package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class OauthRefreshTokenVo implements Serializable {

    private static final long serialVersionUID = -5793513849140902473L;
    private String token_id;
    private Byte[] token;
    private Byte[] authentication;
}
