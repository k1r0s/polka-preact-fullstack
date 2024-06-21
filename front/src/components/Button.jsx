import { Stylesheet } from "@/components/Stylesheet.jsx";
import { COLOR } from "@/utils/constants";

const rawCss = `
  a {
    display: block;
    background-color: ${COLOR.green};
    color: white;
    font-size: 18px;
    padding: 10px;
    text-align: center;
    border: outlined 2px ${COLOR.grey};
    border-radius: 5px;
    cursor: pointer;
  }
`;

export function Button ({ text, ...props }) {
  return (
    <Stylesheet scoped={rawCss}>
      <a { ...props }>{text}</a>
    </Stylesheet>
  )
}
