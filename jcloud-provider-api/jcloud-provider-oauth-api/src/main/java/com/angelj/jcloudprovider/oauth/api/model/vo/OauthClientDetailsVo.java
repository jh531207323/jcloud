package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class OauthClientDetailsVo implements Serializable {

    private static final long serialVersionUID = 5564245126994203741L;
    private String client_id;
    private String resource_ids;
    private String client_secret;
    private String scope;
    private String authorized_grant_types;
    private String web_server_redirect_uri;
    private String authorities;
    private Integer access_token_validity;
    private Integer refresh_token_validity;
    private String additional_information;
    private String autoapprove;

}
