import { useId, useMemo } from "preact/hooks";
import scope from "scope-css";

export function Stylesheet ({ scoped, children }) {
  const uid = "style-" + useId();
  const stylesheet = useMemo(
    () => scope(scoped.replace(/(\r\n|\n|\r)/gm, ""), `[${uid}]`),
    []
  );

  return (
    <style-root { ...{[uid]: 1} }>
      {children}
      <style scoped>
        {stylesheet}
      </style>
    </style-root>
  );
}
