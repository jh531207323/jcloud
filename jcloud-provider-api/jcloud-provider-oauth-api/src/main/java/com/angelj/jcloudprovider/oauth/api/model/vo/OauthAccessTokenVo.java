package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;
import java.io.Serializable;

@Data
public class OauthAccessTokenVo implements Serializable {

    private static final long serialVersionUID = -6224086071931062600L;
    private String token_id;
    private Byte[] token;
    private String authentication_id;
    private String user_name;
    private String client_id;
    private Byte[] authentication;
    private String refresh_token;
}
