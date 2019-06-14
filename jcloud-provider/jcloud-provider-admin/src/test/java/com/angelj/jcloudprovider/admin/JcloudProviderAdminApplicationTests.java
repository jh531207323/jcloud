package com.angelj.jcloudprovider.admin;

import com.angelj.jcloudprovider.admin.mapper.UserMapper;
import com.angelj.jcloudprovider.admin.model.domain.User;
import com.angelj.jcloudprovider.admin.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class JcloudProviderAdminApplicationTests {


    @Autowired
    private UserMapper userMapper;

    @Autowired
    UserService userService;

    @Test
    public void testSelect() {

        User user = new User();
        user.setUserName("1");
        user.setPassword("1");

        //User loginuser = userService.Login(user);

        //System.out.println(("----- selectAll method test ------" + loginuser.getFUsername()));

        System.out.println(("----- selectAll method test ------"));
        List<User> userList = userMapper.selectList(null);
        Assert.assertEquals(5, userList.size());
        userList.forEach(System.out::println);
    }
}
