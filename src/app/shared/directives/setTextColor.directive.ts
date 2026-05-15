import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector:'[appSetTextColor]',
    standalone:true
})
export class SetColoTextDirective{

    constructor(private element:ElementRef){
        

    }

}