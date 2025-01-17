import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TodosComponent} from './components/todos/todos.component';
import {ContactComponent} from './components/contact/contact.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'todos', component: TodosComponent},
  {path: 'contact', component: ContactComponent},
];
