import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  projectForm: FormGroup;
  categories: string[];

  constructor(private fb: FormBuilder, private projectService: ProjectService) {}

  ngOnInit() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      creator: ['', Validators.required],
      description: ['', Validators.required],
      goal: ['', Validators.required],
      purpose: ['', Validators.required],
      // rewards: ['', Validators.required],
      rewards: this.fb.array([]),
      category: ['', Validators.required],
      image_src: ['', Validators.required]
    })
    this.categories = this.projectService.getCategories();
  }

  get rewards(): FormArray {
    return this.projectForm.get('rewards') as FormArray;
  }

  addReward() {
    console.log(this.rewards);
    this.rewards.push(this.fb.group({
      product: [''],
      pledge: [''],
      description: ['']}));
  }

  removeReward(index: number) {
    this.rewards.removeAt(index);
  }

  addProject() {
    var {title, creator, description, goal, purpose, rewards, category, image_src} = this.projectForm.value;
    var newProject = new Project(title, creator, description, goal, purpose, rewards, category, image_src);
    this.projectService.addProject(newProject);
    this.projectForm.reset();
  }

}
