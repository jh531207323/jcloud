package com.angelj.jcloudprovider.admin.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("Sys_User")
public class User implements Serializable {

    private static final long serialVersionUID = -7133525951423824379L;

    @TableId(value = "F_ID", type = IdType.ID_WORKER)
    @TableField(value = "F_ID")
    private int id;

    @TableField(value = "F_UserCode")
    private String userCode;

    @TableField(value = "F_UserName")
    private String userName;

    @TableField(value = "F_Password")
    private String password;

    @TableField(value = "F_NickName")
    private String nickName;

    @TableField(value = "F_IsEnable")
    private String isEnable;

    @TableField(value = "F_IsValid")
    private String isValid;

    @TableField(value = "F_CreateTime")
    private Date createTime;

    @TableField(value = "F_Creator")
    private int creator;

    @TableField(value = "F_Remark")
    private String remark;
}
