package com.angelj.jcloudprovider.oauth.model.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @author AngelJ
 */
@Data
@TableName("oauth_approvals")
public class OauthApprovals  implements Serializable {

    private String userid;
    private String clientid;
    private String scope;
    private String status;
    private Timestamp expiresat;
    private String lastmodifiedat;
}
