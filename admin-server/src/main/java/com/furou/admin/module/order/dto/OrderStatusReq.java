package com.furou.admin.module.order.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 订单状态变更请求
 */
@Data
public class OrderStatusReq {

    @NotBlank(message = "状态不能为空")
    private String status;
}
