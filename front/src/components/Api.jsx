import { cloneElement } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loader } from "@/components/Loader.jsx";

const { VITE_API_PREFIX } = import.meta.env;

function doRequest ({ actions, resolve, children }) {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const endLoading = () => setLoading(false);

  const onClick = e => {
    startLoading();

    Promise.all(actions.map((action) => {
      const [ method, uri, data ] = action;
      const options = {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };

      return fetch(VITE_API_PREFIX + uri, options).then(respo => respo.json());
    })).then(results => resolve(results.pop())).then(endLoading);
  }

  return loading ? <Loader />: cloneElement(children, { onClick, ...children.props })
}

export function Post ({ uri, data, resolve, children }) {
  return doRequest({ actions: [["POST", uri, data]], resolve, children });
}

export function Put ({ uri, data, resolve, children }) {
  return doRequest({ actions: [["PUT", uri, data]], resolve, children });
}

export function Del ({ uri, resolve, children }) {
  return doRequest({ actions: [["DELETE", uri]], resolve, children });
}

export function Ajax ({ actions, resolve, children }) {
  return doRequest({ actions, resolve, children });
}

export function Get ({ uri, state, resolve, children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = typeof state === "undefined" ? useState(undefined): state;
  const startLoading = () => setLoading(true);
  const endLoading = () => setLoading(false);

  function trigger () {
    startLoading();
    fetch(VITE_API_PREFIX + uri).then(respo => respo.json()).then(data => {
      setData(data || undefined);
      endLoading();
    });
  }

  useEffect(() => {
    trigger();
  }, [uri]);

  return loading ? <Loader />: resolve(data, trigger);
}
