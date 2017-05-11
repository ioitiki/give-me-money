import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-project-all',
  templateUrl: './project-all.component.html',
  styleUrls: ['./project-all.component.css', './project-all.component.scss']
})
export class ProjectAllComponent implements OnInit {
  projects: Project[];
  selectedCategory: string = "all";
  categories: string[];

  funding = new FormGroup({
    amount: new FormControl('', Validators.required)
  })

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.categories = this.projectService.getCategories();
  }

  goToDetails(project) {
    this.router.navigate(['project', project.$key]);
  }

  fundProject(project: any) {
    project.progress += parseInt(this.funding.value.amount);
    project.backers++;
    this.projectService.updateProject(project.$key, project);
    this.funding.reset();
  }

}
