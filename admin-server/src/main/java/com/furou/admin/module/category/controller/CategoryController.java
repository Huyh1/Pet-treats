package com.furou.admin.module.category.controller;

import com.furou.admin.common.R;
import com.furou.admin.module.category.entity.Category;
import com.furou.admin.module.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 分类控制器
 */
@Tag(name = "分类管理")
@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "分类列表")
    @GetMapping("/list")
    public R<List<Category>> list() {
        return R.ok(categoryService.list());
    }

    @Operation(summary = "分类详情")
    @GetMapping("/{id}")
    public R<Category> detail(@PathVariable Long id) {
        return R.ok(categoryService.detail(id));
    }

    @Operation(summary = "新增分类")
    @PostMapping
    public R<Long> save(@RequestBody Category category) {
        return R.ok(categoryService.save(category));
    }

    @Operation(summary = "更新分类")
    @PutMapping("/{id}")
    public R<Void> update(@PathVariable Long id, @RequestBody Category category) {
        categoryService.update(id, category);
        return R.ok();
    }

    @Operation(summary = "删除分类")
    @DeleteMapping("/{id}")
    public R<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return R.ok();
    }
}
