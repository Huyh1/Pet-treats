package com.furou.admin.module.dashboard.controller;

import com.furou.admin.common.R;
import com.furou.admin.module.dashboard.dto.DashboardSummaryVO;
import com.furou.admin.module.dashboard.dto.SalesTrendVO;
import com.furou.admin.module.dashboard.dto.TopProductVO;
import com.furou.admin.module.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 仪表盘控制器
 */
@Tag(name = "仪表盘")
@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @Operation(summary = "汇总数据：今日订单/今日销售额/商品数/待审评价数")
    @GetMapping("/summary")
    public R<DashboardSummaryVO> summary() {
        return R.ok(dashboardService.summary());
    }

    @Operation(summary = "销售趋势（最近 N 天）")
    @GetMapping("/sales-trend")
    public R<List<SalesTrendVO>> salesTrend(@RequestParam(required = false, defaultValue = "7") Integer days) {
        return R.ok(dashboardService.salesTrend(days));
    }

    @Operation(summary = "热销商品 TOP N")
    @GetMapping("/top-products")
    public R<List<TopProductVO>> topProducts(@RequestParam(required = false, defaultValue = "5") Integer limit) {
        return R.ok(dashboardService.topProducts(limit));
    }
}
