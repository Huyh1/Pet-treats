package com.furou.admin.module.admin.dto;

import lombok.Data;

/**
 * 登录响应：返回 token + 管理员信息
 */
@Data
public class LoginResp {

    private String token;
    private AdminVO admin;

    public LoginResp(String token, AdminVO admin) {
        this.token = token;
        this.admin = admin;
    }
}
