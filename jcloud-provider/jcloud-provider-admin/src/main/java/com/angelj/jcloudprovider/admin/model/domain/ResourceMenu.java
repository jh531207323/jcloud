package com.angelj.jcloudprovider.admin.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("Sys_Resource_Menu")
public class ResourceMenu implements Serializable {

    private static final long serialVersionUID = 6844512840016633639L;

    @TableId(value = "F_ID", type = IdType.ID_WORKER)
    @TableField(value = "F_ID")
    private int id;

    @TableField(value = "F_ResourceID")
    private int resourceId;

    @TableField(value = "F_MenuID")
    private int menuId;

    @TableField(value = "F_IsValid")
    private String isValid;

    @TableField(value = "F_CreateTime")
    private Date createTime;

    @TableField(value = "F_Creator")
    private int creator;

    @TableField(value = "F_Remark")
    private String remark;
}
