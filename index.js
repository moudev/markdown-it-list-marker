const listCustomLiterals = (md) => {
  console.log(md)
}

module.exports = function (md) {
  md.core.ruler.push("listCustomLiterals", listCustomLiterals)
}
