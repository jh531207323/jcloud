package com.angelj.jcloudprovider.oauth.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * @author AngelJ
 */
@Data
@TableName("oauth_code")
public class OauthCode implements Serializable {

    private static final long serialVersionUID = 6418520205109038171L;
    private String code;
    private Byte[] authentication;
}
