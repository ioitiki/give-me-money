import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectAllComponent } from "./project-all/project-all.component";
import { AboutComponent } from "./about/about.component";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";
import { ProjectEditComponent } from "./project-edit/project-edit.component";


const appRoutes: Routes = [
  {
    path: '',
    component: ProjectAllComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'new',
    component: ProjectNewComponent
  },
  {
    path: 'project/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'project/:id/edit',
    component: ProjectEditComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
