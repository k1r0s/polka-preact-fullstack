import { cloneElement } from "preact";

export function List ({ array, iterate, render }) {
  if (typeof iterate === "function") {
    return array.map(iterate);
  } else {
    return array.map(obj => cloneElement(render, obj));
  }
}
