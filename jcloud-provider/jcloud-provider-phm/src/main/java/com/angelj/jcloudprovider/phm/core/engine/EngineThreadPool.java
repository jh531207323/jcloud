package com.angelj.jcloudprovider.phm.core.engine;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * 引擎线程池
 *
 * @author AngelJ
 * @date 2019-06-20 14:08
 */
public class EngineThreadPool {

    public final int CORE_THREAD_SIZE = 10;
    public final int MAX_THREAD_SIZE = Integer.MAX_VALUE;
    public final long KEEP_ALIVE_TIME = 60L;

    public ThreadFactory threadFactory;
    public BlockingQueue<Runnable> blockingQueue;
    public RejectedExecutionHandler rejectedExecutionHandler;
    public ExecutorService executorService;

//    public void createThreadPool() {
//        createThreadPool("Default", CORE_THREAD_SIZE);
//    }

    public void createThreadPool(String threadPoolName, int coreThreadCount) {

        EngineThreadFactory engineThreadFactory = new EngineThreadFactory(threadPoolName);

        SynchronousQueue synchronousQueue = new SynchronousQueue<>();

        ThreadPoolExecutor.AbortPolicy abortPolicy = new ThreadPoolExecutor.AbortPolicy();

        threadFactory = engineThreadFactory;
        blockingQueue = synchronousQueue;
        rejectedExecutionHandler = abortPolicy;

        //Executors.newCachedThreadPool()

        //线程池核心池的大小
        //线程池的最大线程数
        //当线程数大于核心时，此为终止前多余的空闲线程等待新任务的最长时间
        //keepAliveTime 的时间单位
        //用来储存等待执行任务的队列
        //线程工厂
        //拒绝策略
        executorService = new ThreadPoolExecutor(
                coreThreadCount,
                MAX_THREAD_SIZE,
                KEEP_ALIVE_TIME,
                TimeUnit.SECONDS,
                blockingQueue,
                threadFactory,
                rejectedExecutionHandler);
    }


    class EngineThreadFactory implements ThreadFactory {
        private final AtomicInteger poolNumber = new AtomicInteger(1);
        private final ThreadGroup group;
        private final AtomicInteger threadNumber = new AtomicInteger(1);
        private final String namePrefix;

        private int threadPriority = Thread.NORM_PRIORITY;
        private String threadPoolName;

        public String getThreadPoolName() {
            return threadPoolName;
        }

        public int getThreadPriority() {
            return threadPriority;
        }

        public EngineThreadFactory(String simpleThreadPoolName) {

            threadPoolName = simpleThreadPoolName;

            SecurityManager s = System.getSecurityManager();
            group = (s != null) ? s.getThreadGroup() :
                    Thread.currentThread().getThreadGroup();
            namePrefix = "[" + threadPoolName + "]" + "pool-" +
                    poolNumber.getAndIncrement() +
                    "-thread-";
        }

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(group, r,
                    namePrefix + threadNumber.getAndIncrement(),
                    0);

            if (t.isDaemon()) {
                t.setDaemon(false);
            }

            t.setPriority(threadPriority);

            return t;
        }
    }
}
