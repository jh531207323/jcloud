package com.angelj.jcloudprovider.admin.api.model.dto;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

@Data
public class UserDto implements Serializable {

    private static final long serialVersionUID = -3694285613642934393L;

    private int id;
    private String userCode;
    private String userName;
    private String password;
    private String nickName;
    private String isEnable;
    private String isValid;
    private Date createTime;
    private int creator;
    private String remark;
}
