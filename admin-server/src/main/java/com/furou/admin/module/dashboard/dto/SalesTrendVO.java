package com.furou.admin.module.dashboard.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 销售趋势单日数据
 */
@Data
public class SalesTrendVO {

    /** 日期 yyyy-MM-dd */
    private String date;

    /** 当日订单数 */
    private Long orderCount;

    /** 当日销售额 */
    private BigDecimal amount;
}
