import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {  
    cars = [
      {
        brand: 'porsche',
        model: '911'
      },
      {
        brand: 'porsche',
        model: 'macan'
      },
      {
        brand: 'ferarri',
        model: '458'
      },
      {
        brand: 'lamborghini',
        model: 'urus'
      }
    ];  

    ngOnInit() {
      this.helloWorldRxJs()
    }

    helloWorldRxJs() { 
      of('World').pipe(
        map(x => `Example 1 : Hello ${x}!`)
      ); 
    }
}