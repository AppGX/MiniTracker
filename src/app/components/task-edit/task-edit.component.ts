import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit{
  taskForm: FormGroup;
  priorities: string[] = [];
  assignees: string[] = [];
  statuses: string[] = [];
  taskId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignees: ['']
    });
  }

  ngOnInit(): void {
    this.priorities = this.taskService.getPriorities();
    this.assignees = this.taskService.getAssignees();
    this.statuses = this.taskService.getStatuses();

    this.route.params.subscribe(params => {
      this.taskId = +params['id'];
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        console.log(task);
        if (task) {
          this.taskForm.patchValue(task);
        }
      });

    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        id: this.taskId,
        ...this.taskForm.value
      };

      this.taskService.updateTask(updatedTask);
      this.router.navigate(['/tasks']);
    }
  }
}
