import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectId: string;
  project: Project;

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

}
