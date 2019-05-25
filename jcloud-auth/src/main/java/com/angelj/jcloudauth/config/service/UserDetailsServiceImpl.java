package com.angelj.jcloudauth.config.service;

import com.angelj.jcloudauth.model.Role;
import com.angelj.jcloudauth.model.User;
import com.angelj.jcloudauth.service.RoleService;
import com.angelj.jcloudauth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        User user = userService.findUserByUserName(s);

        if (user == null) {
            throw new UsernameNotFoundException("用户名：" + s + ",不存在");
        }

        Set<GrantedAuthority> grantedAuthoritySet = new HashSet<>();

        boolean enabled = true; // 可用性 :true:可用 false:不可用
        boolean accountNonExpired = true; // 过期性 :true:没过期 false:过期
        boolean credentialsNonExpired = true; // 有效性 :true:凭证有效 false:凭证无效
        boolean accountNonLocked = true; // 锁定性 :true:未锁定 false:已锁定

        List<Role> roleList = roleService.findRoleListByUserId(user.getFId());

        for (Role role : roleList) {
            //角色必须是ROLE_开头，可以在数据库中设置
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_" + role.getFRolecode());
            grantedAuthoritySet.add(grantedAuthority);

            //获取权限
        }

        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();

//        org.springframework.security.core.userdetails.UserDetails user2 = org.springframework.security.core.userdetails.User.withUsername(user.getFUsername())
//                .password(passwordEncoder.encode("123456"))
//                .roles("USER")
//                .build();

        org.springframework.security.core.userdetails.User user1 = new org.springframework.security.core.userdetails.User(
                user.getFUsername(),
                passwordEncoder.encode(user.getFPassword()),
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                grantedAuthoritySet
        );

        return user1;
    }
}
