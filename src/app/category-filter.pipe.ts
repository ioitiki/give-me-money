import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(projects: Project[], category: string): any {
    if (category === 'all') {
      return projects
    } else {
      return projects.filter(project => {
        return (project.category === category);
      })
    }
  }

}
