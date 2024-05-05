import {Component, Input, OnInit} from '@angular/core';
import { Task } from '../../models/task.model';
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit{
  task: Task | undefined;

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const taskId = +params['id'];
      this.taskService.getTaskById(taskId).subscribe(task => {
        // console.log(task);
        this.task = task;
      });
    });
  }
}
