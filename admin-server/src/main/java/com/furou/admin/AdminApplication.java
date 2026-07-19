package com.furou.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 毛茸手作宠物零食 - 后台管理 API 启动类
 */
@SpringBootApplication
@MapperScan("com.furou.admin.module.**.mapper")
public class AdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}
