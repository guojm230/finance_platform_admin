import {AxiosQueue, Task} from "@/plugins/http/type";
import {preResolve} from "@/plugins/http/confg";

class DefaultAxiosQueue implements AxiosQueue{
  locking: boolean = false;
  taskQueue: Array<Task> = [];

  execute(id?: string): void {
    let task;
    if (id){
      task = this.taskQueue.find(t=>t.id === id);
    } else {
      task = this.taskQueue.shift();
    }
    preResolve(task.config);
    task.resolve(task.config);
  }

  executeAll(): void {
    while (this.taskQueue.length > 0){
      this.execute();
    }
  }

  pushTask(task: Task): void {
    this.taskQueue.push(task);
  }

  clearQueue(): void {
    this.taskQueue = [];
  }

}

const instance = new DefaultAxiosQueue();

export default instance;
