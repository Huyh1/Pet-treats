package com.furou.admin.module.review.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.furou.admin.common.BizException;
import com.furou.admin.common.PageResult;
import com.furou.admin.module.review.entity.Review;
import com.furou.admin.module.review.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 评价业务：分页、通过/驳回、删除
 */
@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewMapper reviewMapper;

    /**
     * 分页查询
     *
     * @param page    页码
     * @param size    每页
     * @param status  状态：0=待审 1=已通过 2=已驳回（null 查全部）
     * @param productId 商品 ID（可选）
     */
    public PageResult<Review> page(Integer page, Integer size, Integer status, Long productId) {
        int p = page == null ? 1 : page;
        int s = size == null ? 10 : size;
        Page<Review> pageObj = new Page<>(p, s);
        LambdaQueryWrapper<Review> wrapper = new LambdaQueryWrapper<>();
        if (status != null) {
            wrapper.eq(Review::getStatus, status);
        }
        if (productId != null) {
            wrapper.eq(Review::getProductId, productId);
        }
        wrapper.orderByDesc(Review::getCreatedAt);
        Page<Review> result = reviewMapper.selectPage(pageObj, wrapper);
        return new PageResult<>(result.getCurrent(), result.getSize(),
                result.getTotal(), result.getPages(), result.getRecords());
    }

    /**
     * 通过 / 驳回
     *
     * @param id     评价 ID
     * @param status 1=通过 2=驳回
     */
    public void changeStatus(Long id, Integer status) {
        Review existing = reviewMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "评价不存在");
        }
        Review update = new Review();
        update.setId(id);
        update.setStatus(status);
        reviewMapper.updateById(update);
    }

    /**
     * 删除（逻辑删）
     */
    public void delete(Long id) {
        Review existing = reviewMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "评价不存在");
        }
        reviewMapper.deleteById(id);
    }
}
