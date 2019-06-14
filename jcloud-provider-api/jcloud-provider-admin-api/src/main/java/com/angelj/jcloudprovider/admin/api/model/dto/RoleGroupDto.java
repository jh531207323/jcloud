package com.angelj.jcloudprovider.admin.api.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RoleGroupDto implements Serializable {

    private static final long serialVersionUID = 12887885744517735L;

    private int id;
    private String roleGroupCode;
    private String roleGroupName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
