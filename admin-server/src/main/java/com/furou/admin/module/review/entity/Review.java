package com.furou.admin.module.review.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 评价实体
 */
@Data
@TableName("review")
public class Review implements Serializable {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long productId;

    /** 商品名称（非数据库字段，查询时填充） */
    @TableField(exist = false)
    private String productName;

    private String petName;

    private String petType;

    private String petBreed;

    private String author;

    private Integer rating;

    private String content;

    /** 0=待审 1=已通过 2=已驳回 */
    private Integer status;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    private Integer deleted;
}
