import { Stylesheet } from "@/components/Stylesheet.jsx";

export function Flex ({ direction, justify, css, nthWidth, children }) {

  let rawCss = `
    :host {
      display: flex;
      flex-direction: ${direction};
      justify-content: ${justify};

      ${css || ""}
    }
  `

  if (typeof nthWidth !== "undefined") {
    const predicate = (item, idx) => `
      :host>*:nth-child(${idx + 1}) {
        width: ${item};
      }
    `;
    rawCss += nthWidth.split(",").map(predicate).join("\n");
  }

  return (
    <Stylesheet scoped={rawCss}>
      {children}
    </Stylesheet>
  )
}
