package com.angelj.jcloudprovider.admin.api.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class RoleVo implements Serializable {

    private static final long serialVersionUID = -7356095475695222178L;

    private int id;
    private String roleCode;
    private String roleName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
