import React from "react";
import "./style.css";
import { from } from "rxjs";
import { map, filter } from "rxjs/operators";
import ReactObservables from './ReactObservables';
import ReactHooks from './ReactHooks';
import Fetch from './Fetch'


export default function App() {
  return (
    <div>
      <h1>Hello Praveen!</h1>
      <p>
        Start editing to see some <b>magic</b> happen :)
      </p>
      <ReactObservables />
      <ReactHooks />
      <Fetch />
    </div>
  );
}
