import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectId: string;
  project: Project;

  funding = new FormGroup({
    amount: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.projectId = urlParameters['id'];
      this.projectService.getProjectById(this.projectId).subscribe((project) => {
        this.project = project;
      })
    })
  }

  fundProject(project: Project) {
    project.progress += parseInt(this.funding.value.amount);
    project.backers++;
    this.projectService.updateProject(project);
    this.funding.reset();
  }

}
