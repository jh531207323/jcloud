package com.angelj.jcloudprovider.admin.api.model.vo;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;

@Data
public class UserVo implements Serializable {

    private static final long serialVersionUID = -7965917694369761675L;

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
