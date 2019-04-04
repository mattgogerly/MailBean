import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyFolder'
})

export class PrettyFolderPipe implements PipeTransform {
  transform(value: string): any {
    return value.replace('[Gmail]/', '');
  }
}
