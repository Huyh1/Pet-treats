package com.furou.admin.module.dashboard.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 热销商品 TOP 榜单
 */
@Data
public class TopProductVO {

    private Long id;
    private String name;
    private String image;
    private BigDecimal price;
    /** 销量（来自 order_item 汇总） */
    private Long sales;
    /** 销售额 */
    private BigDecimal revenue;
}
