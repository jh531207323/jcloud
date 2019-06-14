package com.angelj.jcloudcommon.util.bean;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.BeanUtils;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

public class BeanConverter {

    public static ObjectMapper objectMapper = new ObjectMapper();

    public static void copyObject(Object source, Object target) {
        BeanUtils.copyProperties(source, target);
    }

    public static <T> T copyProperties(Object source, Class<T> targetClass) {

        T instance;

        try {
            instance = targetClass.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            throw new RuntimeException(String.format("Create new instance of %s failed: %s", targetClass, e.getMessage()));
        }

        BeanUtils.copyProperties(source, instance);

        return instance;
    }

    public static <T> List<T> copyList(List<?> source, Class<T> targetClass) {

        //效率很低
        try {

//            //性能：差，4倍
//            long start = System.nanoTime();
//            forCopy(source, clazz);
//            System.out.println("-------" + (System.nanoTime() - start));
//
//            //性能：中，2倍
//            start = System.nanoTime();
//            jsonCopy(source, clazz);
//            System.out.println("-------" + (System.nanoTime() - start));
//
//            //性能：优，1倍
//            start = System.nanoTime();
//            cglibCopy(source, clazz);
//            System.out.println("-------" + (System.nanoTime() - start));

            return cglibCopy(source, targetClass);

        } catch (IOException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (InstantiationException | IllegalAccessException |InvocationTargetException e){
            throw new RuntimeException(String.format("Create new instance of %s failed: %s", targetClass, e.getMessage()));
        }

        return null;
    }

    public static <T> List<T> forCopy(List<?> source, Class<T> targetClass) throws IllegalAccessException, InstantiationException {

        List<T> list = new ArrayList<>();

        for (int i = 0; i < source.size(); i++) {

            T instance = targetClass.newInstance();
            BeanUtils.copyProperties(source.get(i), instance);

            list.add(instance);
        }

        return list;
    }

    public static <T> List<T> jsonCopy(List<?> source, Class<T> targetClass) throws IOException {

        List<T> list = new ArrayList<>();

        byte[] bytes = objectMapper.writeValueAsBytes(source);
        list = objectMapper.readValue(bytes, list.getClass());

        return list;
    }

    public static <T> List<T> cglibCopy(List<?> source, Class<T> targetClass) throws IOException, NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {

        return CglibConverter.copyPropertiesOfList(source, targetClass);
    }
}
