import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

import java.io.*;
import java.net.URI;

public class hadoop {
    private static  final String HDFS = "hdfs://localhost:9000/";

    public static void mkdir(String folder) throws Exception{
        //与hdfs建立联系
        FileSystem fs = FileSystem.get(new URI(HDFS),new Configuration());
        Path path = new Path(folder);
        if (!fs.exists(path)) {
            //在HDFS上指定的路径创建目录
            fs.mkdirs(path);
            System.out.println("创建成功: " + folder);
        }else{
            System.out.println("文件夹已存在:" + folder);
        }
        fs.close();
    }

    public static void put(String local, String remote) throws Exception {
        // 建立联系
        FileSystem fs = FileSystem.get(new URI(HDFS), new Configuration());
        fs.copyFromLocalFile(new Path(local), new Path(remote));
        System.out.println("从:" + local  + "   上传到 : " + remote);
        fs.close();
    }

    public static void main(String[] args) throws Exception {
        mkdir("./data");
        put("D:\\hwadee-project-gitee\\data\\all.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\all.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\gross_top10.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\newAll.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\newAllConvert.txt","./data");
        put("D:\\hwadee-project-gitee\\data\\relation.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\top250.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\top250gross.csv","./data");
        put("D:\\hwadee-project-gitee\\data\\top250reviews.txt","./data");
        put("D:\\hwadee-project-gitee\\data\\top250reviewsConvert.txt","./data");
    }


}