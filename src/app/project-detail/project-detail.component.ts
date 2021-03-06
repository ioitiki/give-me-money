import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectId: string;
  project: Project;
  projectCreator: any;
  user: any = null;

  funding = new FormGroup({
    amount: new FormControl('', Validators.required)
  })

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.projectId = urlParameters['id'];
      this.projectService.getProjectById(this.projectId).subscribe((project) => {
        this.project = project;
        this.projectService.getUserById(this.project.creator).subscribe((user) => {
          this.projectCreator = user;
        })
      })
    })
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
  }

  fundProject(project: Project) {
    project.progress += parseInt(this.funding.value.amount);
    project.backers++;
    this.projectService.updateProject(this.projectId, project);
    this.funding.reset();
  }

  setFunding(amount: number) {
    this.funding.controls['amount'].setValue(amount);
  }

  resetFunding() {
    this.funding.reset();
  }

  goToEdit() {
    this.router.navigate(['project', this.projectId, 'edit']);
  }

}
