package com.angelj.jcloudprovider.phm.common;

import com.google.common.base.Charsets;
import org.apache.commons.lang3.ClassPathUtils;

import java.io.File;
import java.net.URLDecoder;

public class PathUtil {


    public static String getRootPath() {
        String filePath = PathUtil.class.getClassLoader().getResource("").getFile();
        File file = new File(filePath);

        try {
            filePath = URLDecoder.decode(filePath, Charsets.UTF_8.name());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return filePath;
    }
}
