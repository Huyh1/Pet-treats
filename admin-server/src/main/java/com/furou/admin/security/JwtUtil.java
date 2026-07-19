package com.furou.admin.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT 工具：生成、解析、校验 Token
 * 使用 jjwt 0.12.x API
 */
@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expire:86400}")
    private long expireSeconds;

    private SecretKey key;

    @PostConstruct
    public void init() {
        // 密钥长度需 ≥ 256 bit（32 字节）以适配 HS256
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        log.info("JWT 初始化完成，过期时间 {}s", expireSeconds);
    }

    /**
     * 生成 token
     */
    public String generate(Long userId, String username, String role) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expireSeconds * 1000L);
        return Jwts.builder()
                .subject(String.valueOf(userId))
                .claim("username", username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }

    /**
     * 解析 token，失败返回 null
     */
    public Claims parse(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            log.debug("token 解析失败: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 校验 token 是否有效
     */
    public boolean verify(String token) {
        return parse(token) != null;
    }

    /**
     * 从 token 中提取用户 ID
     */
    public Long getUserId(String token) {
        Claims claims = parse(token);
        if (claims == null) return null;
        try {
            return Long.valueOf(claims.getSubject());
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从 token 中提取用户名
     */
    public String getUsername(String token) {
        Claims claims = parse(token);
        return claims == null ? null : claims.get("username", String.class);
    }
}
