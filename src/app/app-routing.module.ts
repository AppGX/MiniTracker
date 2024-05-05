import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskDetailComponent} from "./components/task-detail/task-detail.component";
import {TaskCreateComponent} from "./components/task-create/task-create.component";
import {TaskEditComponent} from "./components/task-edit/task-edit.component";
import {TaskListV2Component} from "./components/task-list-v2/task-list-v2.component";

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/list', component: TaskListV2Component },
  { path: 'tasks/create', component: TaskCreateComponent },
  { path: 'tasks/edit/:id', component: TaskEditComponent },
  { path: 'tasks/detail/:id', component: TaskDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
