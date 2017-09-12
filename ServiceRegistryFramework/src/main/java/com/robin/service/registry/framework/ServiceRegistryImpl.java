package com.robin.service.registry.framework;


import org.apache.zookeeper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.CountDownLatch;

/**
 * Copyright : com.robin
 * Author : Robin
 * Date : 2017/9/11
 * Time : 下午10:07
 * Version : 1.0
 * Description : desc
 */

public class ServiceRegistryImpl implements ServiceRegistry,Watcher {
    private static final  String REGISTRY_PATH = "/registry";
    private static final int SESSION_TIMEOUT = 5000;
    private static Logger logger = LoggerFactory.getLogger(ServiceRegistryImpl.class);
    private static CountDownLatch latch = new CountDownLatch(1);
    private ZooKeeper zk;
    public ServiceRegistryImpl(){}
    public ServiceRegistryImpl(String zkServers){
        System.out.println("++++++++ServiceRegistryImpl : "+zkServers);
        try {
            zk = new ZooKeeper(zkServers,SESSION_TIMEOUT,this);
            latch.await();
            logger.debug("connected to zookeeper");
        }catch (Exception e){
            logger.error("create zookeeper client failure",e);
        }
    }
    public void register(String serviceName, String serviceAddress) {
        System.out.println("------robin ------register -------"+serviceAddress);
        try {
            String registryPath = REGISTRY_PATH;
            if (zk.exists(registryPath,false) == null) {
                zk.create(registryPath,null,ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
                logger.debug("create registry node:{}", registryPath);
                System.out.println("------robin ------create success1");
            } else {
                System.out.println("------robin ------create failure1");
            }
            String servicePath  = registryPath + "/" +serviceName;
            if (zk.exists(servicePath,false) == null) {
                zk.create(servicePath,null,ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.PERSISTENT);
                logger.debug("create service node{}:"+servicePath);
            } else {
                System.out.println("------robin ------create failure2");
            }
            String addressPath = servicePath + "/address-";
            System.out.println("======:"+serviceAddress);
            String addressNode = zk.create(addressPath,serviceAddress.getBytes(),ZooDefs.Ids.OPEN_ACL_UNSAFE,CreateMode.EPHEMERAL_SEQUENTIAL);
            logger.debug("create address node :{}=>{}",addressNode,serviceAddress);
        } catch (Exception e){
            logger.error("create node failure",e);
        }
    }

    public void process(WatchedEvent watchedEvent) {
        if (watchedEvent.getState() == Event.KeeperState.SyncConnected) {
            latch.countDown();
        }
    }
}
