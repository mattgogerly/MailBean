import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})

export class StripHtmlPipe implements PipeTransform {
  transform(value: string): any {
    // remove <style> tags and their contents
    value = value.replace(/<style[\s\S]*<\/style>/g, '').replace(/\r?\n|\r/g, ' ').replace(/\s\s+/g, ' ');

    const temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || '';
  }
}
