import {AxiosRequestConfig, AxiosInstance} from 'axios';

//请求任务
export interface Task {
  resolve: Function,
  config: AxiosRequestConfig,
  id?: string
}

//支持请求队列。允许按照顺序阻塞式请求
export interface Axios extends AxiosQueue,AxiosInstance{}

export interface AxiosQueue {
  taskQueue: Array<Task>,
  pushTask(task: Task): void,
  executeAll(): void,
  execute(id?: string): void,
  clearQueue(): void,
  //请求锁,如果值为true，请求将会放入队列。false时正常请求
  locking: boolean,
}
