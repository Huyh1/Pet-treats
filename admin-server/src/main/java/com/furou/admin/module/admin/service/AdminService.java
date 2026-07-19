package com.furou.admin.module.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.furou.admin.common.BizException;
import com.furou.admin.module.admin.dto.AdminVO;
import com.furou.admin.module.admin.dto.ChangePasswordReq;
import com.furou.admin.module.admin.dto.LoginReq;
import com.furou.admin.module.admin.dto.LoginResp;
import com.furou.admin.module.admin.entity.Admin;
import com.furou.admin.module.admin.mapper.AdminMapper;
import com.furou.admin.security.AdminUserDetails;
import com.furou.admin.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 管理员业务：登录、获取当前用户、修改密码
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminMapper adminMapper;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    /**
     * 登录
     */
    public LoginResp login(LoginReq req) {
        Admin admin = adminMapper.selectOne(new LambdaQueryWrapper<Admin>()
                .eq(Admin::getUsername, req.getUsername()));
        if (admin == null) {
            throw BizException.of(401, "用户名或密码错误");
        }
        if (!passwordEncoder.matches(req.getPassword(), admin.getPasswordHash())) {
            throw BizException.of(401, "用户名或密码错误");
        }
        if (admin.getStatus() == null || admin.getStatus() != 1) {
            throw BizException.of(403, "账号已被禁用");
        }
        String token = jwtUtil.generate(admin.getId(), admin.getUsername(), admin.getRole());
        return new LoginResp(token, toVO(admin));
    }

    /**
     * 根据当前登录态获取管理员 VO
     */
    public AdminVO me(AdminUserDetails principal) {
        if (principal == null) {
            throw BizException.of(401, "未登录");
        }
        Admin admin = adminMapper.selectById(principal.getId());
        if (admin == null) {
            throw BizException.of(404, "管理员不存在");
        }
        return toVO(admin);
    }

    /**
     * 修改密码
     */
    public void changePassword(AdminUserDetails principal, ChangePasswordReq req) {
        if (principal == null) {
            throw BizException.of(401, "未登录");
        }
        Admin admin = adminMapper.selectById(principal.getId());
        if (admin == null) {
            throw BizException.of(404, "管理员不存在");
        }
        if (!passwordEncoder.matches(req.getOldPassword(), admin.getPasswordHash())) {
            throw BizException.of(400, "原密码错误");
        }
        admin.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        adminMapper.updateById(admin);
    }

    private AdminVO toVO(Admin admin) {
        AdminVO vo = new AdminVO();
        BeanUtils.copyProperties(admin, vo);
        return vo;
    }
}
