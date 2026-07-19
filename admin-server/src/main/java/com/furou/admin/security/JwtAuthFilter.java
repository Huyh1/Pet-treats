package com.furou.admin.security;

import com.furou.admin.module.admin.entity.Admin;
import com.furou.admin.module.admin.mapper.AdminMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * JWT 认证过滤器：解析 Authorization 头并写入 SecurityContext
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AdminMapper adminMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            Claims claims = jwtUtil.parse(token);
            if (claims != null) {
                Long userId;
                try {
                    userId = Long.valueOf(claims.getSubject());
                } catch (Exception e) {
                    userId = null;
                }
                if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    Admin admin = adminMapper.selectById(userId);
                    if (admin != null && admin.getStatus() != null && admin.getStatus() == 1) {
                        AdminUserDetails userDetails = new AdminUserDetails(
                                admin.getId(), admin.getUsername(), admin.getPasswordHash(),
                                admin.getNickname(), admin.getRole(), admin.getStatus());
                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
            }
        }
        chain.doFilter(request, response);
    }
}
