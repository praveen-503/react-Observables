import React, { useState, useEffect  } from "react";
import "./style.css";
import { from } from "rxjs";
import { map, filter, delay,mergeMap } from "rxjs/operators";
let numbersObservable = from([1, 2, 3, 4, 5]);
let squaredNumbers = numbersObservable.pipe(
  filter(val => val > 2),
  mergeMap(val => from([val]).pipe(delay(1000 * val))),
  map(val => val * val)
);
// let subscription = squaredNumbers.subscribe(result => {
//   console.log(result);
//   //subscription.unsubscribe();
// });
const useObservable = (observable, setter)=>{
useEffect(() => {
    let subscription = observable.subscribe(result => {
      setter(result);
    });
    return () => this.subscription.ubsubscribe();
  },[])
}
export default function ReactHooks(){
  const [currentNumber,setCurrentNumber] = useState(0);

useObservable(squaredNumbers, setCurrentNumber)
  
    return (
      <div>
        <p>From Hooks Current Number is :{currentNumber}</p>
      </div>
    );
}
