import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project.model';

@Pipe({
  name: 'progress',
  pure: true
})
export class ProgressPipe implements PipeTransform {

  transform(project: Project, option: string): any {
    var progress = project.progress / project.goal;
    if (option === 'style') {
      var color = progress * 120;
        return {'width': `${progress*100}%`,
                'background-color': `hsl(${color}, 90%, 45%)`};
    } else if (option === 'percent') {
      return `${(progress*100).toFixed(2)}%`;
    }
  }

}
