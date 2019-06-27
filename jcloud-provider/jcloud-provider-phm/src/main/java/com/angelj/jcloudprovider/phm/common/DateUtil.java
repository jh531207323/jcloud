package com.angelj.jcloudprovider.phm.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    public static String formatCurrentDate() {

        //设置日期格式
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        String str = df.format(new Date());

        return str;
    }

}
