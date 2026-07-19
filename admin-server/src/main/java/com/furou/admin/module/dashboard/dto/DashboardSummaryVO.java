package com.furou.admin.module.dashboard.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * 仪表盘汇总数据
 */
@Data
public class DashboardSummaryVO {

    /** 今日订单数 */
    private Long todayOrderCount;

    /** 今日销售额 */
    private BigDecimal todaySalesAmount;

    /** 商品总数 */
    private Long productCount;

    /** 待审核评价数 */
    private Long pendingReviewCount;
}
