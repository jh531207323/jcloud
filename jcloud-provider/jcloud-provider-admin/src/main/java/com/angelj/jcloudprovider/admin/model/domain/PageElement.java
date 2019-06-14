package com.angelj.jcloudprovider.admin.model.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@TableName("Sys_PageElement")
public class PageElement implements Serializable {

    private static final long serialVersionUID = 5536251080056519686L;

    @TableId(value = "F_ID", type = IdType.ID_WORKER)
    @TableField(value = "F_ID")
    private int id;

    @TableField(value = "F_ParentID")
    private int parentId;

    @TableField(value = "F_PageElementCode")
    private String pageElementCode;

    @TableField(value = "F_PageElementName")
    private String pageElementName;

    @TableField(value = "F_IsValid")
    private String isValid;

    @TableField(value = "F_CreateTime")
    private Date createTime;

    @TableField(value = "F_Creator")
    private int creator;

    @TableField(value = "F_Remark")
    private String remark;
}
