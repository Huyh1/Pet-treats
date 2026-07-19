package com.furou.admin.module.product.dto;

import lombok.Data;

/**
 * 商品分页查询参数
 */
@Data
public class ProductPageReq {

    private Integer page = 1;
    private Integer size = 10;

    /** 关键字（名称模糊匹配） */
    private String keyword;

    private Long categoryId;

    /** 系列：dog / cat / functional */
    private String series;

    /** 状态：1 上架 0 下架 */
    private Integer status;
}
