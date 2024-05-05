import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import { Task } from '../../models/task.model';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task-list-v2',
  templateUrl: './task-list-v2.component.html',
  styleUrl: './task-list-v2.component.scss'
})
export class TaskListV2Component implements OnInit {
  tasks: Observable<Task[]> | undefined;
  displayedColumns: string[] = ['id', 'title', 'deadline', 'status', 'actions'];
  statuses: string[] = [];
  assignees: string[] = [];
  selectedStatus: string = '';
  selectedAssignee: string = '';
  selectedSort: string = 'asc';
  filteredTasks: MatTableDataSource<Task> | undefined;

  @ViewChild(MatSort, {static: true}) sort: MatSort | undefined;
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.statuses = this.taskService.getStatuses();
    this.assignees = this.taskService.getAssignees();
    this.tasks.subscribe(tasks => {
      this.filteredTasks = new MatTableDataSource(tasks);
      this.filteredTasks.sort = this.sort!;
    });
  }

  applyFilter(): void {
    let filteredData = [];
    // console.log(this.tasks)
    this.tasks!.subscribe(tasks => {
      // console.log(tasks)
      filteredData = tasks.slice();
      if (this.selectedStatus) {
        filteredData = filteredData.filter(task => task.status === this.selectedStatus);
      }
      if (this.selectedAssignee) {
        console.log(this.selectedAssignee);
        for (let item of this.selectedAssignee) {
          if (item == undefined) continue;
          filteredData = filteredData.filter(task => task.assignees.includes(item));
        }
      }
      if (this.selectedSort === 'asc') {
        filteredData.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      } else {
        filteredData.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
      }
      this.filteredTasks!.data = filteredData;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}
