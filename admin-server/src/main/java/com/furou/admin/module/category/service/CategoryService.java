package com.furou.admin.module.category.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.furou.admin.common.BizException;
import com.furou.admin.module.category.entity.Category;
import com.furou.admin.module.category.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 分类业务
 */
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryMapper categoryMapper;

    /**
     * 查询全部分类（按 sort 升序）
     */
    public List<Category> list() {
        return categoryMapper.selectList(new LambdaQueryWrapper<Category>()
                .orderByAsc(Category::getSort)
                .orderByAsc(Category::getId));
    }

    /**
     * 详情
     */
    public Category detail(Long id) {
        Category c = categoryMapper.selectById(id);
        if (c == null) {
            throw BizException.of(404, "分类不存在");
        }
        return c;
    }

    /**
     * 新增
     */
    public Long save(Category category) {
        if (category.getStatus() == null) {
            category.setStatus(1);
        }
        if (category.getSort() == null) {
            category.setSort(0);
        }
        categoryMapper.insert(category);
        return category.getId();
    }

    /**
     * 更新
     */
    public void update(Long id, Category category) {
        Category existing = categoryMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "分类不存在");
        }
        category.setId(id);
        categoryMapper.updateById(category);
    }

    /**
     * 删除（逻辑删）
     */
    public void delete(Long id) {
        Category existing = categoryMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "分类不存在");
        }
        categoryMapper.deleteById(id);
    }
}
