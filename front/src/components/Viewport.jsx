import { Stylesheet } from "@/components/Stylesheet";
import { COLOR } from "@/utils/constants";

const rawCss = `
  :host {
    height: calc(100vh - 3rem - 20px);
    padding: 10px;
    overflow: auto;
  }
`

export function Viewport ({ children }) {
  return (
    <Stylesheet scoped={rawCss}>
      {children}
    </Stylesheet>
  )
}
