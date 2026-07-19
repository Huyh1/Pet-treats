package com.furou.admin.module.product.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.furou.admin.common.BizException;
import com.furou.admin.common.PageResult;
import com.furou.admin.module.product.dto.ProductPageReq;
import com.furou.admin.module.product.dto.ProductSaveReq;
import com.furou.admin.module.product.dto.ProductVO;
import com.furou.admin.module.product.entity.Product;
import com.furou.admin.module.product.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 商品业务：分页、增、改、删、上下架
 */
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;

    /**
     * 分页查询
     */
    public PageResult<ProductVO> page(ProductPageReq req) {
        int page = req.getPage() == null ? 1 : req.getPage();
        int size = req.getSize() == null ? 10 : req.getSize();
        Page<Product> p = new Page<>(page, size);
        LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(req.getKeyword())) {
            wrapper.like(Product::getName, req.getKeyword());
        }
        if (req.getCategoryId() != null) {
            wrapper.eq(Product::getCategoryId, req.getCategoryId());
        }
        if (StringUtils.hasText(req.getSeries())) {
            wrapper.eq(Product::getSeries, req.getSeries());
        }
        if (req.getStatus() != null) {
            wrapper.eq(Product::getStatus, req.getStatus());
        }
        wrapper.orderByDesc(Product::getCreatedAt);
        Page<Product> result = productMapper.selectPage(p, wrapper);
        List<ProductVO> records = result.getRecords().stream()
                .map(this::toVO)
                .collect(Collectors.toList());
        return new PageResult<>(result.getCurrent(), result.getSize(),
                result.getTotal(), result.getPages(), records);
    }

    /**
     * 详情
     */
    public ProductVO detail(Long id) {
        Product p = productMapper.selectById(id);
        if (p == null) {
            throw BizException.of(404, "商品不存在");
        }
        return toVO(p);
    }

    /**
     * 新增
     */
    public Long save(ProductSaveReq req) {
        Product p = new Product();
        BeanUtils.copyProperties(req, p);
        if (p.getStatus() == null) {
            p.setStatus(1);
        }
        if (p.getRating() == null) {
            p.setRating(java.math.BigDecimal.valueOf(5.0));
        }
        if (p.getReviewCount() == null) {
            p.setReviewCount(0);
        }
        if (p.getMonthlySales() == null) {
            p.setMonthlySales(0);
        }
        productMapper.insert(p);
        return p.getId();
    }

    /**
     * 更新
     */
    public void update(Long id, ProductSaveReq req) {
        Product existing = productMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "商品不存在");
        }
        BeanUtils.copyProperties(req, existing);
        existing.setId(id);
        productMapper.updateById(existing);
    }

    /**
     * 逻辑删除
     */
    public void delete(Long id) {
        Product existing = productMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "商品不存在");
        }
        productMapper.deleteById(id);
    }

    /**
     * 上下架
     */
    public void changeStatus(Long id, Integer status) {
        Product existing = productMapper.selectById(id);
        if (existing == null) {
            throw BizException.of(404, "商品不存在");
        }
        Product update = new Product();
        update.setId(id);
        update.setStatus(status);
        productMapper.updateById(update);
    }

    private ProductVO toVO(Product p) {
        ProductVO vo = new ProductVO();
        BeanUtils.copyProperties(p, vo);
        return vo;
    }
}
