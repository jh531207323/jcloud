package com.angelj.jcloudprovider.phm;

import com.angelj.jcloudprovider.phm.common.DateUtil;
import com.angelj.jcloudprovider.phm.core.engine.support.FlowEngine;
import com.angelj.jcloudprovider.phm.core.engine.support.PhmEngine;
import com.angelj.jcloudprovider.phm.core.flow.*;
import com.angelj.jcloudprovider.phm.core.flow.support.SimpleFlowNode;
import com.google.common.base.Stopwatch;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;
import java.util.*;
import java.util.concurrent.*;

//@SpringBootApplication
//@EnableDiscoveryClient
public class JcloudProviderPhmApplication {

    static List<String> integerList = new Vector<>();

    public static void main(String[] args) throws InterruptedException {
        //SpringApplication.run(JcloudProviderPhmApplication.class, args);

        // 构造一个脚本引擎管理器
        ScriptEngineManager manager = new ScriptEngineManager();
        // 遍历所有的引擎工厂，输出引擎工厂的信息
        for (ScriptEngineFactory factory : manager.getEngineFactories()) {
            String engineName = factory.getEngineName();
            String engineVersion = factory.getEngineVersion();
            String languageName = factory.getLanguageName();
            String languageVersion = factory.getLanguageVersion();
            ScriptEngine engine = factory.getScriptEngine();
            System.out.println(String.format("引擎名称：%s\t引擎版本：%s\t语言名称：%s\t语言版本：%s\t",
                    engineName, engineVersion, languageName, languageVersion));
        }


        System.out.println(Thread.currentThread().getName()
                + "(" + Thread.currentThread().getPriority() + ")");

        PhmEngine phmEngine = new PhmEngine();
        phmEngine.init();
        phmEngine.run();

    }
}