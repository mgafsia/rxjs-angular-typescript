import { Component, OnInit } from '@angular/core';
import { of, from, timer, interval } from 'rxjs';
import { map, take, delay } from 'rxjs/operators';

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
        brand: 'Renault',
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
    interval$;
    timer$;

    /*
    // in the service
getVehicles(){
    return Observable.interval(2200).map(i=> [{name: 'car 1'},{name: 'car 2'}])
}

// in the controller
vehicles: Observable<Array<any>>
ngOnInit() {
    this.vehicles = this._vehicleService.getVehicles();
}

// in template
<div *ngFor='let vehicle of vehicles | async'>
    {{vehicle.name}}
</div>
*/

    ngOnInit() {    
      this.interval$ = interval(1000).pipe(take(4)).pipe(map(i=> [{name: this.cars[i].brand}]));
      this.timer$ = timer(0, 1000).pipe(map(i=> [{name: 'car 1'},{name: 'car 2'},{name: 'car 3'}]));
      // 
      this.helloWorldRxJs();
      this.displyATimerEvenEvery600msOnly10Times();
      this.useDelay();
      this.useDelayWithFrom();
    }

    helloWorldRxJs() { 
      of('World').pipe(
        map(x => `Example 1 : Hello ${x}!`)
      ); 
    }

    useDelay() {
      of(1,2,3).pipe(delay(10000)).subscribe(t => console.log('Delay of 10000 is up ! '));
    }

    useDelayWithFrom() {
      from([1,2,3]).pipe(delay(13000)).subscribe(t => console.log('Delay of 13000 is up ! '));
    }

    displyATimerEvenEvery600msOnly10Times() {
      timer(0, 600).pipe(take(10)).subscribe((t) =>  
        console.log('Example 2 : ', t));
    }
}