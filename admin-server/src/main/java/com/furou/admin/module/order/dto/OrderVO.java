package com.furou.admin.module.order.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.furou.admin.module.order.entity.OrderItem;

/**
 * 订单视图
 */
@Data
public class OrderVO {

    private Long id;
    private String orderNo;
    private String customerName;
    private String customerPhone;
    private BigDecimal totalAmount;
    private String status;
    private String remark;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /** 订单明细列表 */
    private List<OrderItem> items;
}
