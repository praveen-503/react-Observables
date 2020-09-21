import React from "react";
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
export default class ReactObservables extends React.Component {
  constructor() {
    super();
    this.state = { currentNumber: 0 };
  }
  componentDidMount() {
    this.subscription = squaredNumbers.subscribe(result => {
      this.setState({ currentNumber: result });
    });
  }
  componentWillUnmount(){
    this.subscription.ubsubscribe();
  }
  render() {
    return (
      <div>
        <p>Current Number is :{this.state.currentNumber}</p>
      </div>
    );
  }
}
