import { Stylesheet } from "@/components/Stylesheet";
import { COLOR } from "@/utils/constants";

let rawCss = `
  :host {
    display: block;
  }

  *:not([type=checkbox]) {
    margin: 5px 0;
    width: calc(100% - 20px);
  }

  input, select, textarea {
    padding: 8px;
    border: solid 2px ${COLOR.green};
    border-radius: 10px;
    background-color: white;
    color: black;
  }

  a {
    display: block;
    background-color: ${COLOR.green};
    color: white;
    font-size: 14px;
    padding: 8px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

  select {
    width: 100% !important;
  }

  input[type=checkbox] {
  }
`

export function ControlWrapper ({ children }) {
/* IS IT A PREACT ISSUE?
  if ("top,bottom,right,left".split(",").includes(padding)) rawCss += `
    :host {
      padding-${padding}: 10px;
    }
  `;
*/
  return (
    <control-wrapper>
      <Stylesheet scoped={rawCss}>
        {children}
      </Stylesheet>
    </control-wrapper>
  )
}
