import { Stylesheet } from "@/components/Stylesheet";
import { COLOR } from "@/utils/constants";

const rawCss = `
  :host {
    background-color: ${COLOR.green};
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
  }
`

export function Title ({ text }) {
  return (
    <Stylesheet scoped={rawCss}>
      <text>{text}</text>
    </Stylesheet>
  )
}
