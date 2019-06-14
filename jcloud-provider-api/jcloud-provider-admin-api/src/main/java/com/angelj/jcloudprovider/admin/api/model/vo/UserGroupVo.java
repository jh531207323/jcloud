package com.angelj.jcloudprovider.admin.api.model.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class UserGroupVo implements Serializable {

    private static final long serialVersionUID = 8542098033279746657L;

    private int id;
    private String userGroupCode;
    private String userGroupName;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
