import {Injectable} from "@angular/core";
import { Task } from "../models/task.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  private priorities: string[] = ['High', 'Medium', 'Low'];
  private assignees: string[] = ['Assignee 1', 'Assignee 2', 'Assignee 3'];
  private statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.tasksSubject.next(this.tasks);
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.tasks.length;
    this.tasks.push(task);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      const task = this.tasks[index];
      task.status = updatedTask.status;
      task.assignees = updatedTask.assignees;
      this.saveTasks();
    }
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex(task => task.id === taskId);
    //this.tasks = this.tasks.filter(task => task.id !== taskId);
    if (index !== -1 ) {
      this.tasks.splice(index, 1)
      this.saveTasks();
    }

  }

  private saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.tasksSubject.next(this.tasks);
  }

  getPriorities(): string[] {
    return this.priorities;
  }

  getAssignees(): string[] {
    return this.assignees;
  }
  getStatuses(): string[] {
    return this.statuses;
  }

  getTaskById(id: number): Observable<Task> {
    const task = this.tasks.find(t => t.id === id);
    return new BehaviorSubject<Task>(<Task>{...task}); // Emit a copy of the task
  }
}
