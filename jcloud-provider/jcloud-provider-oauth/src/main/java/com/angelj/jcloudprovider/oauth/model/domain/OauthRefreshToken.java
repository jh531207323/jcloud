package com.angelj.jcloudprovider.oauth.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @author AngelJ
 */
@Data
@TableName("oauth_refresh_token")
public class OauthRefreshToken  implements Serializable {

    private static final long serialVersionUID = 4705901826863920958L;
    private String token_id;
    private Byte[] token;
    private Byte[] authentication;
}
