package com.furou.admin.module.product.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

/**
 * 商品保存请求（新增 / 更新通用）
 */
@Data
public class ProductSaveReq {

    @NotBlank(message = "商品名不能为空")
    private String name;

    private Long categoryId;

    @NotBlank(message = "系列不能为空")
    private String series;

    private String petType;

    @DecimalMin(value = "0.01", message = "价格必须大于 0")
    private BigDecimal price;

    private String weight;

    private String image;

    private String description;

    private String story;

    /** 成分列表 JSON */
    private String ingredients;

    /** 营养成分 JSON */
    private String nutrition;

    private String feeding;

    private String tags;

    private BigDecimal rating;

    private Integer reviewCount;

    private Integer monthlySales;

    private Integer status;
}
