import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indication'
})
export class IndicationPipe implements PipeTransform {

  transform(distance: number): any {
		if(!distance) return;
		
		if(distance < 30){
			return "Burning";
		}
		if(distance < 100){
			return "Very hot";
		}
		if(distance < 200){
			return "Hot";
		}
		if(distance < 300){
			return "Tepid";
		}
		if(distance < 400){
			return "Cold";
		}
		if(distance < 500){
			return "Very cold";
		}
		if(distance < 600){
			return "Glacial";
		}
	}

}
