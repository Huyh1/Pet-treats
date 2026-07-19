package com.furou.admin.module.admin.controller;

import com.furou.admin.common.R;
import com.furou.admin.module.admin.dto.AdminVO;
import com.furou.admin.module.admin.dto.ChangePasswordReq;
import com.furou.admin.module.admin.dto.LoginReq;
import com.furou.admin.module.admin.dto.LoginResp;
import com.furou.admin.module.admin.service.AdminService;
import com.furou.admin.security.AdminUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 管理员控制器：登录、当前用户、修改密码
 */
@Tag(name = "管理员", description = "登录 / 当前用户 / 修改密码")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @Operation(summary = "登录")
    @PostMapping("/login")
    public R<LoginResp> login(@Valid @RequestBody LoginReq req) {
        return R.ok(adminService.login(req));
    }

    @Operation(summary = "获取当前登录管理员")
    @GetMapping("/me")
    public R<AdminVO> me(@AuthenticationPrincipal AdminUserDetails principal) {
        return R.ok(adminService.me(principal));
    }

    @Operation(summary = "修改密码")
    @PutMapping("/password")
    public R<Void> changePassword(@AuthenticationPrincipal AdminUserDetails principal,
                                  @Valid @RequestBody ChangePasswordReq req) {
        adminService.changePassword(principal, req);
        return R.ok();
    }
}
