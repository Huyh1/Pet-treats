package com.furou.admin.module.admin.dto;

import lombok.Data;

/**
 * 管理员视图（不含密码哈希）
 */
@Data
public class AdminVO {

    private Long id;
    private String username;
    private String nickname;
    private String role;
    private Integer status;
}
