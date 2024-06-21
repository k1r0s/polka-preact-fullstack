import { Stylesheet } from "@/components/Stylesheet.jsx";
import { COLOR } from "@/utils/constants";

const rawCss = `
  .loader {
    margin: auto;
    --c: no-repeat linear-gradient(${COLOR.green} 0 0);
  }
`;

/* animation features defined in style.css */
export function Loader () {
  return (
    <Stylesheet scoped={rawCss}>
      <div class="loader" />
    </Stylesheet>
  )
}
