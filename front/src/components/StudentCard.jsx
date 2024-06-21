import { COLOR } from "@/utils/constants";
import { Stylesheet } from "@/components/Stylesheet";
import { Flex } from "@/components/Flex";

const rawCss = `
  :host {
    padding: 5px;
    margin-bottom: 5px;
    border: solid 2px ${COLOR.green};
    border-radius: 10px;
    display: block;
  }

  text[bold] {
    font-weight: 600;
  }

  a {
    cursor: pointer;
    color: red;
  }
`

export function StudentCard ({ name, email, onRemove }) {
  return (
    <Stylesheet scoped={rawCss}>
      <Flex direction="row" justify="space-between">
        <Flex direction="column">
          <text bold>{name}</text>
          <small>{email}</small>
        </Flex>
        <a onClick={onRemove}>&#x2715;</a>
      </Flex>
    </Stylesheet>
  )
}
