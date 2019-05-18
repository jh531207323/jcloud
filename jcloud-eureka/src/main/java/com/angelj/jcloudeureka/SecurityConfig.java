package com.angelj.jcloudeureka;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception
    {
        //关闭CSRF保护,跨站攻击
        httpSecurity.csrf().disable();
        super.configure(httpSecurity);
    }
}
