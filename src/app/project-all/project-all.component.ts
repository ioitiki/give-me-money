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

  funding = new FormGroup({
    amount: new FormControl('', Validators.required)
  })

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    })
  }

  goToDetails(project) {
    this.router.navigate(['project', project.$key]);
  }

  fundProject(project: Project) {
    project.progress += parseInt(this.funding.value.amount);
    project.backers++;
    this.projectService.updateProject(project);
    this.funding.reset();
  }

}
