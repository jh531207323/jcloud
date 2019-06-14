package com.angelj.jcloudprovider.admin.api.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RoleGroupVo implements Serializable {

    private static final long serialVersionUID = -7843580254910394047L;

    private int id;
    private String roleGroupCode;
    private String roleGroupName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
