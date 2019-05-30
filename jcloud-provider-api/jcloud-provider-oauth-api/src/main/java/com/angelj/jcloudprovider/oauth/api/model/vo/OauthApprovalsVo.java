package com.angelj.jcloudprovider.oauth.api.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

@Data
public class OauthApprovalsVo implements Serializable {

    private static final long serialVersionUID = -4202132232798192199L;
    private String userid;
    private String clientid;
    private String scope;
    private String status;
    private Timestamp expiresat;
    private String lastmodifiedat;
}
