import React, { useState, useEffect } from "react";
import "./style.css";
import { from, BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { map, filter, delay, mergeMap, debounceTime } from "rxjs/operators";
const getPokemonByName = async name => {
  const { results: allPokemons } = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=1000"
  ).then(res => {
    res.json();
    console.log(res.json());
  });
  return allPokemons.filter(pokemon => {
    console.log(pokemon);
    pokemon.name.includes(name);
  });
};

let serachSubject = new BehaviorSubject("");
let serachResultObservable = serachSubject.pipe(
  filter(val => val.length > 1),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap(val => from(getPokemonByName(val)))
);

const useObservable = (observable, setter) => {
  useEffect(() => {
    let subscription = observable.subscribe(result => {
      setter(result);
    });
    return () => subscription.ubsubscribe();
  }, []);
};

export default function Fetch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useObservable(serachResultObservable, setResults);

  const handleSearchChange = e => {
    const newValue = e.target.value;
    setSearch(newValue);
    serachSubject.next(newValue);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      {results.map(pokemon =>{
        <div key = {pokemon.name}>{pokemon.name}</div>
      })}
    </div>
  );
}
