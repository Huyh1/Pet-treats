package com.furou.admin.module.order.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.furou.admin.common.BizException;
import com.furou.admin.common.PageResult;
import com.furou.admin.module.order.dto.OrderPageReq;
import com.furou.admin.module.order.dto.OrderVO;
import com.furou.admin.module.order.entity.Order;
import com.furou.admin.module.order.entity.OrderItem;
import com.furou.admin.module.order.mapper.OrderItemMapper;
import com.furou.admin.module.order.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 订单业务：分页、详情、改状态
 */
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final OrderItemMapper orderItemMapper;

    /**
     * 分页查询
     */
    public PageResult<OrderVO> page(OrderPageReq req) {
        int page = req.getPage() == null ? 1 : req.getPage();
        int size = req.getSize() == null ? 10 : req.getSize();
        Page<Order> p = new Page<>(page, size);
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(req.getOrderNo())) {
            wrapper.like(Order::getOrderNo, req.getOrderNo());
        }
        if (StringUtils.hasText(req.getCustomerName())) {
            wrapper.like(Order::getCustomerName, req.getCustomerName());
        }
        if (StringUtils.hasText(req.getStatus())) {
            wrapper.eq(Order::getStatus, req.getStatus());
        }
        wrapper.orderByDesc(Order::getCreatedAt);
        Page<Order> result = orderMapper.selectPage(p, wrapper);
        List<OrderVO> records = result.getRecords().stream()
                .map(this::toVO)
                .collect(Collectors.toList());
        return new PageResult<>(result.getCurrent(), result.getSize(),
                result.getTotal(), result.getPages(), records);
    }

    /**
     * 详情（包含订单明细）
     */
    public OrderVO detail(Long id) {
        Order order = orderMapper.selectById(id);
        if (order == null) {
            throw BizException.of(404, "订单不存在");
        }
        OrderVO vo = toVO(order);
        List<OrderItem> items = orderItemMapper.selectList(new LambdaQueryWrapper<OrderItem>()
                .eq(OrderItem::getOrderId, id));
        vo.setItems(items);
        return vo;
    }

    /**
     * 修改订单状态
     */
    public void changeStatus(Long id, String status) {
        Order existing = orderMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "订单不存在");
        }
        Order update = new Order();
        update.setId(id);
        update.setStatus(status);
        orderMapper.updateById(update);
    }

    private OrderVO toVO(Order order) {
        OrderVO vo = new OrderVO();
        BeanUtils.copyProperties(order, vo);
        vo.setItems(Collections.emptyList());
        return vo;
    }
}
