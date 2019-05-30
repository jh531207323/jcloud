package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class OauthClientTokenVo implements Serializable {

    private static final long serialVersionUID = -1999508155776653101L;
    private String token_id;
    private Byte[] token;
    private String authentication_id;
    private String user_name;
    private String client_id;

}
