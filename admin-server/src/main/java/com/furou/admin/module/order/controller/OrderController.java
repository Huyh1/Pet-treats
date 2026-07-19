package com.furou.admin.module.order.controller;

import com.furou.admin.common.PageResult;
import com.furou.admin.common.R;
import com.furou.admin.module.order.dto.OrderPageReq;
import com.furou.admin.module.order.dto.OrderStatusReq;
import com.furou.admin.module.order.dto.OrderVO;
import com.furou.admin.module.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 订单控制器
 */
@Tag(name = "订单管理")
@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "订单分页查询")
    @GetMapping("/page")
    public R<PageResult<OrderVO>> page(OrderPageReq req) {
        return R.ok(orderService.page(req));
    }

    @Operation(summary = "订单详情")
    @GetMapping("/{id}")
    public R<OrderVO> detail(@PathVariable Long id) {
        return R.ok(orderService.detail(id));
    }

    @Operation(summary = "修改订单状态")
    @PutMapping("/{id}/status")
    public R<Void> changeStatus(@PathVariable Long id, @RequestParam(required = false) String status,
                                @Valid @RequestBody(required = false) OrderStatusReq req) {
        // 支持 ?status=xxx 简便调用，也支持 body
        String finalStatus = (req != null && req.getStatus() != null) ? req.getStatus() : status;
        if (finalStatus == null || finalStatus.isBlank()) {
            throw new IllegalArgumentException("status 不能为空");
        }
        orderService.changeStatus(id, finalStatus);
        return R.ok();
    }
}
