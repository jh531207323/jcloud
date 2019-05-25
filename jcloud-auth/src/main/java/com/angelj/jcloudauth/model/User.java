package com.angelj.jcloudauth.model;

import lombok.Data;

import java.util.Date;

@Data
public class User {

    private Integer fId;
    private String fUsercode;
    private String fUsername;
    private String fPassword;
    private String fNickname;
    private String fIsvalid;
    private Date fCreatetime;
}
