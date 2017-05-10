import { Injectable } from '@angular/core';
import { Project } from "./project.model";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class ProjectService {
  categories: string[] = ["Tech", "Community", "Health"];
  projects: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.projects = database.list('projects');
  }

  getProjects() {
    return this.projects;
  }

  getCategories() {
    return this.categories;
  }

  addProject(project: Project) {
    this.projects.push(project);
  }


}
