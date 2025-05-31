package com.wsk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author kzw
 * @date 2025/4/1
 * @description 静态资源配置
 */
@Configuration
public class MyWebAppConfigurer implements WebMvcConfigurer {

    @Autowired
    private FileConfig fileConfig;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 基础静态资源配置
        registry.addResourceHandler("/image/**", "/images/**", "/css/**", "/js/**", "/img/**")
                .addResourceLocations("classpath:/mystatic/image/", "classpath:/mystatic/images/", "classpath:/mystatic/css/",
                        "classpath:/mystatic/js/", "classpath:/mystatic/img/");
        
        // 图片上传资源配置
        String saveFile = "file:" + fileConfig.getFileSave() + ":/toImage/";
        registry.addResourceHandler("/toImage/**")
                .addResourceLocations(saveFile)
                .addResourceLocations("classpath:/mystatic/toImage/");
        
        // 缩略图配置
        String thumbnailPath = "file:" + fileConfig.getFileSave() + ":/toImage/thumbnails/";
        registry.addResourceHandler("/toImage/thumbnails/**")
                .addResourceLocations(thumbnailPath)
                .addResourceLocations("classpath:/mystatic/toImage/thumbnails/");
        
        // 其他静态资源配置
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/mystatic/**")
                .addResourceLocations("classpath:/mystatic/");
                
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
}
