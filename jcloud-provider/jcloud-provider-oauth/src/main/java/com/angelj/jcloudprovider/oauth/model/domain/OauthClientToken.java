package com.angelj.jcloudprovider.oauth.model.domain;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @author AngelJ
 */
@Data
@TableName("oauth_client_token")
public class OauthClientToken  implements Serializable {

    private static final long serialVersionUID = 1200470300029542713L;
    private String token_id;
    private Byte[] token;
    @TableId
    private String authentication_id;
    private String user_name;
    private String client_id;

}
