package com.angelj.jcloudauth.config;

import com.angelj.jcloudauth.config.service.UserDetailsServiceImpl;
import com.angelj.jcloudauth.config.translator.MssWebResponseExceptionTranslator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService;
import org.springframework.security.oauth2.provider.error.WebResponseExceptionTranslator;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.oauth2.provider.token.store.redis.RedisTokenStore;

import javax.sql.DataSource;


@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private RedisConnectionFactory redisConnectionFactory;

//    @Bean
//    public RedisTokenStore redisTokenStore()
//    {
//        return  new RedisTokenStore(redisConnectionFactory);
//    }

    @Bean
    public JdbcTokenStore jdbcTokenStore() {
        return new JdbcTokenStore(dataSource);
    }

    @Bean
    public WebResponseExceptionTranslator<OAuth2Exception> webResponseExceptionTranslator(){
        return new MssWebResponseExceptionTranslator();
    }

//    @Bean
    public ClientDetailsService clientDetailsService() {
        return new JdbcClientDetailsService(dataSource);
    }

    /**
     * <p>注意，自定义TokenServices的时候，需要设置@Primary，否则报错，</p>
     * @return
     */
    @Primary
    @Bean
    public DefaultTokenServices defaultTokenServices(){
        DefaultTokenServices tokenServices = new DefaultTokenServices();
        tokenServices.setTokenStore(jdbcTokenStore());
        tokenServices.setSupportRefreshToken(true);
        tokenServices.setClientDetailsService(clientDetailsService());
        //token有效期自定义设置，默认12小时
        tokenServices.setAccessTokenValiditySeconds(60*60*12);
        //token刷新，默认30天，这里修改
        tokenServices.setRefreshTokenValiditySeconds(60 * 60 * 24 * 7);
        return tokenServices;
    }


    //用来配置客户端详情服务（ClientDetailsService），
    //客户端详情信息在这里进行初始化，
    //你能够把客户端详情信息写死在这里或者是通过数据库来存储调取详情信息
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//        clients.inMemory() // 使用in-memory存储
//                .withClient("client") // client_id
//                .secret("secret") // client_secret
//                .authorizedGrantTypes("authorization_code","password ","client_credentials ","implicit ","refresh_token") // 该client允许的授权类型
//                .scopes("app"); // 允许的授权范围

        clients.withClientDetails(clientDetailsService());
    }

    //用来配置授权（authorization）以及令牌（token）的访问端点和令牌服务(token services)，
    //还有token的存储方式(tokenStore)
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {

        //Token的存储方式为内存
        endpoints.tokenStore(jdbcTokenStore());
        //WebSecurity配置好的
        endpoints.authenticationManager(authenticationManager);
        //读取用户的验证信息
        endpoints.userDetailsService(userDetailsService);
        // 配置TokenServices参数
        endpoints.tokenServices(defaultTokenServices());
        //认证异常翻译
        endpoints.exceptionTranslator(webResponseExceptionTranslator());
    }

    //用来配置令牌端点(Token Endpoint)的安全约束
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        //对获取Token的请求不再拦截
        security.tokenKeyAccess("permitAll()");
        //验证获取Token的验证信息
        security.checkTokenAccess("isAuthenticated()");
        //让/oauth/token支持client_id以及client_secret作登录认证
        security.allowFormAuthenticationForClients();
        //一般我们客户端账号密码不需要加密,所以在这里实现 .passwordEncoder(NoOpPasswordEncoder.getInstance())
        //告诉security客户端密码不需要加密
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        security.passwordEncoder(passwordEncoder);
    }
}
