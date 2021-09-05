import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: number, ...args: any[]): number {
    if(value === 2222) return 2;
    if(value === 4444) return 1;
    return null;
  }
}
