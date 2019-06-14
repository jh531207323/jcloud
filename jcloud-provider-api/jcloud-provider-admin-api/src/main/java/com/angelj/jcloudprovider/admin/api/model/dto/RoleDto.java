package com.angelj.jcloudprovider.admin.api.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RoleDto implements Serializable {

    private static final long serialVersionUID = 7550129528862591890L;

    private int id;
    private String roleCode;
    private String roleName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
