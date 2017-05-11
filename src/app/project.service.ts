import { Injectable } from '@angular/core';
import { Project } from "./project.model";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class ProjectService {
  categories: string[] = ["Art", "Comics", "Crafts", "Dance", "Design", "Fashion", "Film & Video", "Food", "Games", "Journalism", "Music", "Photography", "Publishing", "Technology", "Theater"];
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

  getProjectById(projectId: string) {
    return this.database.object('projects/' + projectId);
  }

  updateProject(projectId: string, projectToUpdate) {
    this.projects.update(projectId, projectToUpdate);
  }

  deleteProject(projectId: string) {
    this.projects.remove(projectId);
  }



}
