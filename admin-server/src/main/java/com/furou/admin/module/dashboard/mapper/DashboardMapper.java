package com.furou.admin.module.dashboard.mapper;

import com.furou.admin.module.dashboard.dto.SalesTrendVO;
import com.furou.admin.module.dashboard.dto.TopProductVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 仪表盘聚合查询 Mapper（自定义 SQL，使用 @Select 注解）
 * 注意：MyBatis-Plus 不会自动给自定义 SQL 加 deleted=0 条件，需手动添加
 */
@Mapper
public interface DashboardMapper {

    /**
     * 今日订单数（不含已取消）
     */
    @Select("SELECT COUNT(*) FROM `order` " +
            "WHERE DATE(created_at) = CURRENT_DATE " +
            "AND status <> 'CANCELLED' " +
            "AND deleted = 0")
    Long countTodayOrders();

    /**
     * 今日销售额
     */
    @Select("SELECT COALESCE(SUM(total_amount), 0) FROM `order` " +
            "WHERE DATE(created_at) = CURRENT_DATE " +
            "AND status <> 'CANCELLED' " +
            "AND deleted = 0")
    BigDecimal sumTodaySales();

    /**
     * 商品总数
     */
    @Select("SELECT COUNT(*) FROM product WHERE deleted = 0")
    Long countProducts();

    /**
     * 待审核评价数（status=0）
     */
    @Select("SELECT COUNT(*) FROM review WHERE status = 0 AND deleted = 0")
    Long countPendingReviews();

    /**
     * 销售趋势（最近 N 天，按日期分组）
     */
    @Select("SELECT DATE(created_at) AS date, COUNT(*) AS orderCount, COALESCE(SUM(total_amount), 0) AS amount " +
            "FROM `order` " +
            "WHERE created_at >= #{start} " +
            "AND status <> 'CANCELLED' " +
            "AND deleted = 0 " +
            "GROUP BY DATE(created_at) " +
            "ORDER BY date ASC")
    List<SalesTrendVO> salesTrend(@Param("start") LocalDateTime start);

    /**
     * 热销商品 TOP 榜（按 order_item 销量汇总）
     */
    @Select("SELECT p.id AS id, p.name AS name, p.image AS image, p.price AS price, " +
            "COALESCE(SUM(oi.quantity), 0) AS sales, " +
            "COALESCE(SUM(oi.subtotal), 0) AS revenue " +
            "FROM product p " +
            "LEFT JOIN order_item oi ON oi.product_id = p.id " +
            "WHERE p.deleted = 0 " +
            "GROUP BY p.id, p.name, p.image, p.price " +
            "ORDER BY sales DESC " +
            "LIMIT #{limit}")
    List<TopProductVO> topProducts(@Param("limit") Integer limit);
}
