package com.angelj.jcloudprovider.phm.core.data.store.support.file;

import com.angelj.jcloudprovider.phm.common.PathUtil;
import com.angelj.jcloudprovider.phm.core.data.store.Store;
import com.google.common.base.Charsets;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * 文件存储
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public class FileStore implements Store {

    @Override
    public void saveData(String id, long longTime, String data) throws IOException {

        String folderPath = PathUtil.getRootPath()
                + File.separator + "store"
                + File.separator + "file"
                + File.separator + id
                + File.separator + longTime;

        File folder = new File(folderPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String filePath = folderPath + File.separator + "data.phm";
        File file = new File(filePath);
        if (!file.exists()) {
            file.createNewFile();
        }

        FileOutputStream fileOutputStream = new FileOutputStream(file);
        fileOutputStream.write(data.getBytes(Charsets.UTF_8));
        fileOutputStream.close();
    }

    @Override
    public String findData(String id, long longTime) throws IOException {
        String data = null;

        String folderPath = PathUtil.getRootPath()
                + File.separator + "store"
                + File.separator + "file"
                + File.separator + id
                + File.separator + longTime;

        File folder = new File(folderPath);
        if (folder.exists()) {
            String filePath = folderPath + File.separator + "data.phm";
            File file = new File(filePath);
            if (file.exists()) {

                Long fileLength = file.length();
                byte[] bytes = new byte[fileLength.intValue()];

                FileInputStream fileInputStream = new FileInputStream(file);
                fileInputStream.read(bytes);
                fileInputStream.close();

                data = new String(bytes, Charsets.UTF_8);
            }
        }

        return data;
    }
}
