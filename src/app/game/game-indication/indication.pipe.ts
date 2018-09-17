import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indication'
})
export class IndicationPipe implements PipeTransform {

  transform(distance: number, format:string = "human"): any {
		if (!distance) return;
		if  (format != "human" && format != "class") return;
		
		if (distance < 30) {
			return format === "human" ? "Burning" : "burning";
		}
		if (distance < 100) {
			return format === "human" ? "Very hot" : "very-hot";
		}
		if (distance < 200) {
			return format === "human" ? "Hot" : "hot";
		}
		if (distance < 300) {
			return format === "human" ? "Tepid" : "tepid";
		}
		if (distance < 400) {
			return format === "human" ? "Cold" : "cold";
		}
		if (distance < 500) {
			return format === "human" ? "Very cold" : "very-cold";
		}
		if (distance < 600) {
			return format === "human" ? "Glacial" : "glacial";
		}
	}

}
