import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * Copyright : com.robin
 * Author : Robin
 * Date : 2017/9/11
 * Time : 下午7:43
 * Version : 1.0
 * Description : desc
 */

public class ZooKeeperDemo {
    private static final String CONNECTION_STRING = "127.0.0.1:2181";
    private static final int SESSION_TIMEOUT = 5000;
    private static CountDownLatch latch = new CountDownLatch(1);
    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        ZooKeeper zk = new ZooKeeper(CONNECTION_STRING, SESSION_TIMEOUT, new Watcher() {
            public void process(WatchedEvent watchedEvent) {
                if (watchedEvent.getState() == Event.KeeperState.SyncConnected) {
                    latch.countDown();
                }
            }
        });
        latch.await();
        System.out.println("print zk");
        System.out.println(zk);
        //1、同步方式：列出子节点
        List<String> children = zk.getChildren("/",null);
        for (String node : children) {
            System.out.println("node=====:"+node);
        }
        //2、同步方式：判断节点是否存在
        Stat stat = zk.exists("/",null);
        if (stat == null) {
            System.out.println("node does not exist");
        } else {
            System.out.println("node exist");
        }
        //3、同步方式：创建节点
        String name = zk.create("/foo","hello".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
        System.out.println(name);
        //4、同步方式：获取节点数据
        byte[] data = zk.getData("/foo", null, null);
        System.out.println(new String(data));
        //5、同步方式：更新节点数据
        Stat stat1=zk.setData("/foo", "hi".getBytes(), -1);
        System.out.println(stat1 != null);
        byte[] datatmp = zk.getData("/foo", null, null);
        System.out.println(new String(datatmp));
        //6、同步方式：删除节点
        zk.delete("/foo",-1);
    }
}
