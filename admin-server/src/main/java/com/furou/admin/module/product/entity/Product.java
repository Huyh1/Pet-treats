package com.furou.admin.module.product.entity;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 商品实体
 */
@Data
@TableName("product")
public class Product implements Serializable {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private Long categoryId;

    /** 系列：dog / cat / functional */
    private String series;

    /** 适用宠物类型：dog,cat（逗号分隔） */
    private String petType;

    private BigDecimal price;

    private String weight;

    private String image;

    private String description;

    private String story;

    /** 成分列表 JSON 字符串 */
    private String ingredients;

    /** 营养成分 JSON 字符串 */
    private String nutrition;

    private String feeding;

    private String tags;

    private BigDecimal rating;

    private Integer reviewCount;

    private Integer monthlySales;

    /** 1=上架 0=下架 */
    private Integer status;

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    @TableLogic
    @TableField(fill = FieldFill.INSERT)
    @JsonIgnore
    private Integer deleted;
}
