import { Component, OnInit, EventEmitter, AfterContentInit } from '@angular/core';
import { Project } from '../project.model';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectService } from '../project.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, AfterContentInit {
  projectForm: FormGroup;
  categories: string[];
  projectId: string;
  project: Project;

  deleteModal = new EventEmitter<string|MaterializeAction>();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private location: Location,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe((urlParameters) => {
      this.projectId = urlParameters['id'];
      this.getProject();
    })
  }

  ngAfterContentInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.project = project;
      this.projectForm = this.fb.group({
        title: ['', Validators.required],
        creator: ['', Validators.required],
        description: ['', Validators.required],
        goal: ['', Validators.required],
        purpose: ['', Validators.required],
        rewards: this.fb.array([]),
        category: ['', Validators.required],
        image_src: ['', Validators.required]
      })
      this.categories = this.projectService.getCategories();
      this.setForm();
    })
  }


  setForm() {
    this.projectForm.reset({
      title: this.project.title,
      creator: this.project.creator,
      description: this.project.description,
      goal: this.project.goal,
      purpose: this.project.purpose,
      category: this.project.category,
      image_src: this.project.image_src
    })
    if (this.project.rewards) {
      const rewardFGs = this.project.rewards.map(reward => this.fb.group(reward));
      const rewardFormArray = this.fb.array(rewardFGs);
      this.projectForm.setControl('rewards', rewardFormArray);
    }

  }

  get rewards(): FormArray {
    return this.projectForm.get('rewards') as FormArray;
  }

  addReward() {
    this.rewards.push(this.fb.group({
      product: [''],
      pledge: [''],
      description: ['']}));
  }

  removeReward(index: number) {
    this.rewards.removeAt(index);
  }

  updateProject() {
    var updateProject: Project = Object.assign({}, this.projectForm.value);
    this.projectService.updateProject(this.projectId, updateProject);

  }

  deleteProject() {
    this.projectService.deleteProject(this.projectId);
  }

  openDeleteModal() {
    this.deleteModal.emit({action:'modal',params:['open']});
  }

}
