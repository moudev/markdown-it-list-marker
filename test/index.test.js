import { assert, describe, it } from "vitest"

import { sum } from "../index"

describe("suite", () => {
  it("sum", () => {
    assert.equal(sum(2, 2), 4)
  })
})
