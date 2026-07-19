package com.furou.admin.module.dashboard.service;

import com.furou.admin.module.dashboard.dto.DashboardSummaryVO;
import com.furou.admin.module.dashboard.dto.SalesTrendVO;
import com.furou.admin.module.dashboard.dto.TopProductVO;
import com.furou.admin.module.dashboard.mapper.DashboardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 仪表盘业务：汇总、销售趋势、热销榜
 */
@Service
@RequiredArgsConstructor
public class DashboardService {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final DashboardMapper dashboardMapper;

    /**
     * 汇总数据：今日订单、今日销售额、商品总数、待审评价数
     */
    public DashboardSummaryVO summary() {
        DashboardSummaryVO vo = new DashboardSummaryVO();
        vo.setTodayOrderCount(dashboardMapper.countTodayOrders());
        BigDecimal todaySales = dashboardMapper.sumTodaySales();
        vo.setTodaySalesAmount(todaySales == null ? BigDecimal.ZERO : todaySales);
        vo.setProductCount(dashboardMapper.countProducts());
        vo.setPendingReviewCount(dashboardMapper.countPendingReviews());
        return vo;
    }

    /**
     * 销售趋势：补齐最近 days 天的空日期为 0
     */
    public List<SalesTrendVO> salesTrend(Integer days) {
        int n = (days == null || days <= 0) ? 7 : days;
        LocalDateTime start = LocalDate.now().minusDays(n - 1L).atStartOfDay();
        List<SalesTrendVO> dbList = dashboardMapper.salesTrend(start);

        // 用 Map 加速查找
        Map<String, SalesTrendVO> map = new HashMap<>();
        for (SalesTrendVO v : dbList) {
            if (v.getDate() != null) {
                map.put(v.getDate(), v);
            }
        }

        // 补齐缺失日期
        List<SalesTrendVO> result = new ArrayList<>(n);
        for (int i = n - 1; i >= 0; i--) {
            String date = LocalDate.now().minusDays(i).format(DATE_FMT);
            SalesTrendVO v = map.get(date);
            if (v == null) {
                v = new SalesTrendVO();
                v.setDate(date);
                v.setOrderCount(0L);
                v.setAmount(BigDecimal.ZERO);
            } else {
                if (v.getOrderCount() == null) v.setOrderCount(0L);
                if (v.getAmount() == null) v.setAmount(BigDecimal.ZERO);
            }
            result.add(v);
        }
        return result;
    }

    /**
     * 热销商品 TOP N
     */
    public List<TopProductVO> topProducts(Integer limit) {
        int n = (limit == null || limit <= 0) ? 5 : limit;
        return dashboardMapper.topProducts(n);
    }
}
