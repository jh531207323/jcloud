package com.angelj.jcloudprovider.admin.api.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserGroupDto implements Serializable {

    private static final long serialVersionUID = 4351079451428788006L;

    private int id;
    private String userGroupCode;
    private String userGroupName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
