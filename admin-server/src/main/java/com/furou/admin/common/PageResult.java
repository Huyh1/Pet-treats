package com.furou.admin.common;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * 分页响应结果
 */
@Data
public class PageResult<T> implements Serializable {

    /** 当前页 */
    private Long current;
    /** 每页大小 */
    private Long size;
    /** 总条数 */
    private Long total;
    /** 总页数 */
    private Long pages;
    /** 数据列表 */
    private List<T> records;

    public PageResult() {
    }

    public PageResult(Long current, Long size, Long total, Long pages, List<T> records) {
        this.current = current;
        this.size = size;
        this.total = total;
        this.pages = pages;
        this.records = records;
    }
}
