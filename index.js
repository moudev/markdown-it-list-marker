const listCustomLiterals = (md) => {
  const newTokens = []

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
    const inlineToken =
      md.tokens[Math.min(tokenIndex + 2, md.tokens.length - 1)]
    const isInlineInsideListItemOpen =
      inlineToken && inlineToken.type === "inline"

    if (isListItemOpen && isInlineInsideListItemOpen) {
      token.attrJoin("class", "custom-list")
      newTokens.push(token)

      // flag to remove the 'inline' element because the text will be in the 'span' element
      inlineToken.delete = true

      /* Marker item */
      // https://github.com/markdown-it/markdown-it/blob/d72c68b520cedacae7878caa92bf7fe32e3e0e6f/lib/token.js#L49
      const openMarker = new md.Token("paragraph_open", "span", 1)
      openMarker.attrJoin("class", "literal")
      newTokens.push(openMarker)

      const textMarker = new md.Token("text", "", 0)
      textMarker.content = "marker"
      newTokens.push(textMarker)

      const closeMarker = new md.Token("paragraph_close", "span", -1)
      newTokens.push(closeMarker)

      /* Message item */
      const openMessage = new md.Token("paragraph_open", "span", 1)
      openMessage.attrJoin("class", "literal-text")
      newTokens.push(openMessage)

      const inlineTokenText = inlineToken.children
        ? inlineToken.children[0].content
        : ""

      const textMessage = new md.Token("text", "", 0)
      textMessage.content = inlineTokenText
      newTokens.push(textMessage)

      const closeMessage = new md.Token("paragraph_close", "span", -1)
      newTokens.push(closeMessage)
    } else {
      if (!token.delete) {
        newTokens.push(token)
      }
    }
  })
  md.tokens = newTokens
}

module.exports = function (md) {
  md.core.ruler.push("listCustomLiterals", listCustomLiterals)
}
