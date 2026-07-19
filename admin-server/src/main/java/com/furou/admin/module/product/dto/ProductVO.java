package com.furou.admin.module.product.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 商品视图
 */
@Data
public class ProductVO {

    private Long id;
    private String name;
    private Long categoryId;
    private String series;
    private String petType;
    private BigDecimal price;
    private String weight;
    private String image;
    private String description;
    private String story;
    private String ingredients;
    private String nutrition;
    private String feeding;
    private String tags;
    private BigDecimal rating;
    private Integer reviewCount;
    private Integer monthlySales;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
