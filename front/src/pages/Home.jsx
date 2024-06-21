import { Flex } from "@/components/Flex.jsx";
import { Stylesheet } from "@/components/Stylesheet.jsx";

const rawCss = `
  :host {
    height: inherit;
    display: block;
  }

  text.featured {
    font-size: 36px;
    text-align: center;
    text-transform: capitalize;
    font-weight: 600;
  }
`;

export function Home () {
  return (
    <Stylesheet scoped={rawCss}>
      <Flex direction="column" justify="space-around" css="height: inherit;">
        <text class="featured">course platform</text>
      </Flex>
    </Stylesheet>
  );
}
