package com.furou.admin.module.order.dto;

import lombok.Data;

/**
 * 订单分页查询参数
 */
@Data
public class OrderPageReq {

    private Integer page = 1;
    private Integer size = 10;

    /** 订单号模糊匹配 */
    private String orderNo;

    /** 客户名模糊匹配 */
    private String customerName;

    /** 订单状态：PENDING/PAID/SHIPPED/COMPLETED/CANCELLED */
    private String status;
}
