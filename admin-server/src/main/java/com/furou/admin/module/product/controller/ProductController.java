package com.furou.admin.module.product.controller;

import com.furou.admin.common.PageResult;
import com.furou.admin.common.R;
import com.furou.admin.module.product.dto.ProductPageReq;
import com.furou.admin.module.product.dto.ProductSaveReq;
import com.furou.admin.module.product.dto.ProductVO;
import com.furou.admin.module.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 商品控制器
 */
@Tag(name = "商品管理")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @Operation(summary = "商品分页查询")
    @GetMapping("/page")
    public R<PageResult<ProductVO>> page(ProductPageReq req) {
        return R.ok(productService.page(req));
    }

    @Operation(summary = "商品详情")
    @GetMapping("/{id}")
    public R<ProductVO> detail(@PathVariable Long id) {
        return R.ok(productService.detail(id));
    }

    @Operation(summary = "新增商品")
    @PostMapping
    public R<Long> save(@Valid @RequestBody ProductSaveReq req) {
        return R.ok(productService.save(req));
    }

    @Operation(summary = "更新商品")
    @PutMapping("/{id}")
    public R<Void> update(@PathVariable Long id, @Valid @RequestBody ProductSaveReq req) {
        productService.update(id, req);
        return R.ok();
    }

    @Operation(summary = "删除商品（逻辑删）")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return R.ok();
    }

    @Operation(summary = "商品上下架")
    @PutMapping("/{id}/status")
    public R<Void> changeStatus(@PathVariable Long id, @RequestParam Integer status) {
        productService.changeStatus(id, status);
        return R.ok();
    }
}
