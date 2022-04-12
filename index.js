const listCustomLiterals = (md) => {
  md.tokens.forEach((token, tokenIndex) => {
    /*
    'list_item' token structure:
      - list_item_open <li> (tokenIndex)
        - paragraph_open <p> (tokenIndex + 1)
          - inline (tokenIndex + 2)
            - text
        - paragraph_close </p>
      - list_item_close </li>
    */
    const isListItemOpen = token.type === "list_item_open"

    // Math.min() to avoid exceed the tokens array length
    const originalTextNode =
      md.tokens[Math.min(tokenIndex + 2, md.tokens.length - 1)]
    const isInlineInsideListItemOpen =
      originalTextNode && originalTextNode.type === "inline"

    if (isListItemOpen && isInlineInsideListItemOpen) {
      console.log("isListItemOpen")
    }
  })
}

module.exports = function (md) {
  md.core.ruler.push("listCustomLiterals", listCustomLiterals)
}
