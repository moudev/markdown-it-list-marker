const listMarker = (md) => {
  const newTokens = []
  const defaultMarkerSeparator = "-"

  // markdown-it creates an ordered list when detects ")" or "."
  // https://github.com/markdown-it/markdown-it/blob/d72c68b520cedacae7878caa92bf7fe32e3e0e6f/lib/rules_block/list.js#L66
  let separator = md.md.options.markerSeparator || defaultMarkerSeparator

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  separator =
    typeof separator === "object"
      ? `[\\${separator.join("\\")}]`
      : `\\${separator}`

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
      newTokens.push(token)

      const inlineTokenText = inlineToken.children
        ? inlineToken.children[0].content
        : ""

      const itemRegexGroups = inlineTokenText.match(
        new RegExp(`(.*\\S${separator})\\s(.+)`)
      )
      const isLiteralRegexMatch = itemRegexGroups && itemRegexGroups.length > 0

      if (isLiteralRegexMatch) {
        token.attrJoin("class", "custom-list")

        // flag to remove the 'inline' element because the text will be in the 'span' element
        inlineToken.delete = true

        /* Marker item */
        // https://github.com/markdown-it/markdown-it/blob/d72c68b520cedacae7878caa92bf7fe32e3e0e6f/lib/token.js#L49
        const openMarker = new md.Token("paragraph_open", "span", 1)
        openMarker.attrJoin("class", "literal")
        newTokens.push(openMarker)

        const markerText = new md.Token("text", "", 0)
        markerText.content = itemRegexGroups[1]
        newTokens.push(markerText)

        const closeMarker = new md.Token("paragraph_close", "span", -1)
        newTokens.push(closeMarker)

        /* Message item */
        const openMessage = new md.Token("paragraph_open", "span", 1)
        openMessage.attrJoin("class", "literal-text")
        newTokens.push(openMessage)

        const messageText = new md.Token("text", "", 0)
        messageText.content = itemRegexGroups[2]
        newTokens.push(messageText)

        const closeMessage = new md.Token("paragraph_close", "span", -1)
        newTokens.push(closeMessage)
      }
    } else {
      if (!token.delete) {
        newTokens.push(token)
      }
    }
  })
  md.tokens = newTokens
}

module.exports = function (md) {
  md.core.ruler.push("listMarker", listMarker)
}
