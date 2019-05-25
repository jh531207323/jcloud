package com.angelj.jcloudauth.model;

import lombok.Data;

import java.util.Date;

@Data
public class Role {

    private Integer fId;
    private String fRolecode;
    private String fRolename;
    private String fIsvalid;
    private Date fCreatetime;
}
