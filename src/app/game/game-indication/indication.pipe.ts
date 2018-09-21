import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'indication'
})
export class IndicationPipe implements PipeTransform {

    transform (distance: number, format: string = 'human'): any {
        if(format != 'human' && format != 'class'){
            return;
        }
        if (!distance) {
            return 'Click to stop this music';
        }
        if (distance < 80) {
            return format === 'human' ? 'Burning' : 'burning';
        }
        if (distance < 150) {
            return format === 'human' ? 'Very hot' : 'very-hot';
        }
        if (distance < 250) {
            return format === 'human' ? 'Hot' : 'hot';
        }
        if (distance < 350) {
            return format === 'human' ? 'Tepid' : 'tepid';
        }
        if (distance < 450) {
            return format === 'human' ? 'Cold' : 'cold';
        }
        if (distance < 550) {
            return format === 'human' ? 'Very cold' : 'very-cold';
        }
        if (distance >= 550) {
            return format === 'human' ? 'Glacial' : 'glacial';
        }
    }

}
