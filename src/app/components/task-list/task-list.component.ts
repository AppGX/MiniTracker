import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit{
  tasks$: Observable<Task[]> | undefined;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
