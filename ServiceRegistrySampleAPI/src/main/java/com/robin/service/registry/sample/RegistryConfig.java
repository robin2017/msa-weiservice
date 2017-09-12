package com.robin.service.registry.sample;

import com.robin.service.registry.framework.ServiceRegistry;
import com.robin.service.registry.framework.ServiceRegistryImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Copyright : com.robin
 * Author : Robin
 * Date : 2017/9/11
 * Time : 下午10:53
 * Version : 1.0
 * Description : desc
 */

@Configuration
@ConfigurationProperties(prefix = "registry")
public class RegistryConfig {
    @Value("${registry.servers}")
    private String services;

    @Bean
    public ServiceRegistry serviceRegistry(){
        return new ServiceRegistryImpl(services);
    }
    public void setServices(String servers) {
        this.services = servers;
    }
}
