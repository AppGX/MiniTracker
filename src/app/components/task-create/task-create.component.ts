import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Task } from '../../models/task.model';
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent implements OnInit{
  taskForm: FormGroup;
  priorities: string[] = [];
  assignees: string[] = [];
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      assignees: [[]] // Assuming assignees is an array of strings
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      //this.store.dispatch(addTask({ task: taskData }));
      this.taskService.addTask(taskData);
      this.taskForm.reset();
    }
  }

  ngOnInit(): void {
    this.priorities = this.taskService.getPriorities();
    this.assignees = this.taskService.getAssignees();
  }
}
