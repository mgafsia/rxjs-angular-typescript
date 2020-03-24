import { Component, OnInit } from '@angular/core';
import { of, from, timer, interval } from 'rxjs';
import { map, take, delay, mergeAll, switchMap, mergeMap, concatMap } from 'rxjs/operators';

export interface Car {
  brand: string;
  model: string;
  price: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {  
/*
    1- of vs from => a- use values with no conversion / from use many types ...
                       b- of will send the value of array all at once  / from will send tha array value one by one    

    2- a- Delay vs interval : most siller , delay can be a 0 for the first ?? ...  
       b- timer ? : it is a observable to give a even on each period ...    

    3- map vs mergeAll vs mergeMap vs switchMap vs concatMap
       a- map to manipulate n to (n modified)                   
       b- mergeAll and mergeMap will merge all observable subscripion on one (we don't care about order - ill will be flat)
       c- switch map will switch between observable subscrition but start by the last of the first one, so can lost others (If we don"t need them, that will be ok)
       d- concatMap will preserve the order of first subscription and the second one (one from first follwed by one from the second)  
*/



    cars: Car[] = [
      {
        brand: 'porsche',
        model: '911',
        price: 10000
      },
      {
        brand: 'Renault',
        model: 'macan',
        price: 20000
      },
      {
        brand: 'ferarri',
        model: '458',
        price: 30000
      },
      {
        brand: 'lamborghini',
        model: 'urus',
        price: 40000
      }
    ];  
    interval$;
    timer$;


    carsOf$ = of(this.cars);  
    carsFrom$ = from(this.cars);

   
    ngOnInit() {    
      this.interval$ = interval(1000).pipe(take(4)).pipe(map(i=> [{name: this.cars[i].brand}]));
      this.timer$ = timer(0, 1000).pipe(map(i=> [{name: 'car 1'},{name: 'car 2'},{name: 'car 3'}]));
      
      // this.simpleDisplayWithOf();
      // this.simpleDisplayWithOfOnArray();
      // this.simpleDisplayWithFrom();
      // this.helloWorldRxJs();
      // this.displyATimerEvenEvery600msOnly10Times();
      // this.useDelayWithOf();
      // this.useDelayWithFrom();
      // this.displayCars();
      // this.getCarDataWithMap();
      // this.getCarDataWithMergeAll();
      // this.getCarDataWithMergeMap();
      // this.getCarDataWithSwitchMap();
      this.getCarDataWithConcatMap();
    }

    simpleDisplayWithOf() {
      console.log("=======simpleDisplayWithOf========");
      of(1,2,3,4).pipe(map(d => d)).subscribe(console.log);
    }

    simpleDisplayWithOfOnArray() {
      console.log("=======simpleDisplayWithOfOnArray========");
      of([1,2,3,4]).pipe(map(d => d)).subscribe(console.log);
    }
    
    simpleDisplayWithFrom() {
      console.log("=======simpleDisplayWithFrom========");
      from([1,2,3,4]).subscribe(console.log);
    }

    helloWorldRxJs() { 
      of('World').pipe(
        map(x => `Example 1 : Hello ${x}!`)
      ); 
    }

    useDelayWithOf() {
      of(1,2,3).pipe(delay(2000)).subscribe(t => console.log('Delay of Of - 2000 is up ! ', t));
    }

    useDelayWithFrom() {
      from([11,22,33]).pipe(delay(2000)).subscribe(t => console.log('Delay of From - 2000 is up ! ==> ', t));
    }

    displyATimerEvenEvery600msOnly10Times() {
      timer(0, 600).pipe(take(10)).subscribe((t) =>  
        console.log('Example 2 : ', t));
    }

    displayCars() {
      console.log("=======displayCars========");
      this.carsFrom$.subscribe(console.log);
    }

    getDataFromServer(q: Car) {
      console.log("=======getDataFromServer========", q);
      return from([q.brand + ' ' + q.price + ' | ~(1)'
                 , q.brand + ' ' + q.price + ' | ~(2)'])
                 .pipe(delay(1000));
    }

    getCarDataWithMap() {
      this.carsFrom$.pipe(map(c => this.getDataFromServer(c)))
                    .subscribe(r => r.subscribe(console.log));
    }

    getCarDataWithMergeAll() {
      this.carsFrom$.pipe(map(c => this.getDataFromServer(c)), mergeAll())                    
                    .subscribe((console.log));
    }

    getCarDataWithMergeMap() {
      this.carsFrom$.pipe(mergeMap(c => this.getDataFromServer(c)))                                           
                    .subscribe((console.log));
    }

    getCarDataWithSwitchMap() { // Fait attention au delay dans getDataFromServer ==> ce n'est pas le meme resulat avec delay et sans 
      this.carsFrom$.pipe(switchMap(c => this.getDataFromServer(c)))                                           
                    .subscribe((console.log));
    }

     getCarDataWithConcatMap() { // Fait attention au delay dans getDataFromServer ==> ce n'est pas le meme resulat avec delay et sans 
      this.carsFrom$.pipe(concatMap(c => this.getDataFromServer(c)))                                           
                    .subscribe((console.log));
    }
}