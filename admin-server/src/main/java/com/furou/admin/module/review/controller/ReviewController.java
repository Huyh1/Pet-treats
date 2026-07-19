package com.furou.admin.module.review.controller;

import com.furou.admin.common.PageResult;
import com.furou.admin.common.R;
import com.furou.admin.module.review.entity.Review;
import com.furou.admin.module.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 评价审核控制器
 */
@Tag(name = "评价审核")
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "评价分页查询（可按状态过滤）")
    @GetMapping("/page")
    public R<PageResult<Review>> page(@RequestParam(required = false) Integer page,
                                      @RequestParam(required = false) Integer size,
                                      @RequestParam(required = false) Integer status,
                                      @RequestParam(required = false) Long productId) {
        return R.ok(reviewService.page(page, size, status, productId));
    }

    @Operation(summary = "通过/驳回评价（status=1 通过, status=2 驳回）")
    @PutMapping("/{id}/status")
    public R<Void> changeStatus(@PathVariable Long id, @RequestParam Integer status) {
        reviewService.changeStatus(id, status);
        return R.ok();
    }

    @Operation(summary = "删除评价")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        reviewService.delete(id);
        return R.ok();
    }
}
