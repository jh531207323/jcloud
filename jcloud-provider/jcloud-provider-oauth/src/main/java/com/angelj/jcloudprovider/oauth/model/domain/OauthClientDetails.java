package com.angelj.jcloudprovider.oauth.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @author AngelJ
 */
@Data
@TableName("oauth_client_details")
public class OauthClientDetails implements Serializable {

    private static final long serialVersionUID = 8606835648218234635L;
    @TableId
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
