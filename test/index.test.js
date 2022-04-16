import { expect, describe, it } from "vitest"
import fs from "fs"
import os from "os"
import MarkdownIt from "markdown-it"

import plugin from "../index"

// https://github.com/cmaas/markdown-it-table-of-contents/blob/62bfc75310056156b046d621167c998e8570b019/test/modules/test.js#L47
function adjustEOL(text) {
  const endOfLine = os.EOL

  if (endOfLine !== "\n") {
    text = text.replace(/([^\r])\n/g, "$1" + endOfLine)
  }
  return text
}

describe("markdown-it", () => {
  it("render literalSeparator null", () => {
    const md = MarkdownIt().use(plugin)

    const noRenderedList = fs.readFileSync("test/no-rendered-list.md", "utf8")
    const renderedList = fs.readFileSync(
      "test/rendered-list-separator-null.html",
      "utf8"
    )

    const rendered = md.render(noRenderedList)

    expect(adjustEOL(rendered)).toEqual(renderedList)
  })

  it("render literalSeparator string", () => {
    const md = MarkdownIt().use(plugin)
    md.set({ literalSeparator: "$" })

    const noRenderedList = fs.readFileSync("test/no-rendered-list.md", "utf8")
    const renderedList = fs.readFileSync(
      "test/rendered-list-separator-string.html",
      "utf8"
    )

    const rendered = md.render(noRenderedList)

    expect(adjustEOL(rendered)).toEqual(renderedList)
  })

  it("render literalSeparator array", () => {
    const md = MarkdownIt().use(plugin)
    md.set({ literalSeparator: ["_", "-", "%", "$"] })

    const noRenderedList = fs.readFileSync("test/no-rendered-list.md", "utf8")
    const renderedList = fs.readFileSync(
      "test/rendered-list-separator-array.html",
      "utf8"
    )

    const rendered = md.render(noRenderedList)

    expect(adjustEOL(rendered)).toEqual(renderedList)
  })
})
