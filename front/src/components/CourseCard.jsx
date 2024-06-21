import { useState } from "preact/hooks";
import { Stylesheet } from "@/components/Stylesheet";
import { Flex } from "@/components/Flex";
import { Get, Ajax } from "@/components/Api";
import { COLOR } from "@/utils/constants";
import { Link } from "wouter-preact";
import { Title } from "@/components/Title";

const rawCss = `
  :host {
    padding: 10px;
    border: solid 2px ${COLOR.green};
    border-radius: 10px;
    display: block;
  }

  text[description] {
    font-size: 16px;
    font-weight: 600;
  }

  text {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export function CourseCard ({ uid, reload }) {
  return (
    <Get uri={"/courses/" + uid} resolve={(data = {}) => {
      const { title, description, ...props } = data;
      return (
        <Stylesheet scoped={rawCss}>
          <Flex direction="column">
            <Flex direction="row" justify="space-between">
              <Title text={title} />
              <Flex direction="column">
                <Link to={"/edit/" + uid}>edit</Link>
                <Link to={"/students/" + uid}>students</Link>
                <Ajax actions={[["DELETE", "/courses/" + uid], ["PUT", "/students/" + uid]]} resolve={reload}>
                  <a href="#">remove</a>
                </Ajax>
              </Flex>
            </Flex>
            <br />
            <text description>{description}</text>
            <br />
            <text>{JSON.stringify(props)}</text>
          </Flex>
        </Stylesheet>
      )
    }} />
  )
}
