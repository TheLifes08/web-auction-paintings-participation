const assert = require("assert");

function sum(a, b) {
    return a + b;
}

describe("sum", () => {
    it("positive numbers", () => {
        assert.equal(sum(1, 1), 2);
        assert.equal(sum(1, 10), 11);
        assert.equal(sum(0, 5), 5);
        assert.equal(sum(6, 0), 6);
        assert.equal(sum(100, 10000), 10100);
    })

    it("negative numbers", () => {
        assert.equal(sum(-1, -1), -2);
        assert.equal(sum(-1, -10), -11);
        assert.equal(sum(-0, -5), -5);
        assert.equal(sum(-6, -0), -6);
        assert.equal(sum(-100, -10000), -10100);
    })

    it("positive and negative numbers", () => {
        assert.equal(sum(-1, 1), 0);
        assert.equal(sum(1, -10), -9);
        assert.equal(sum(-100, 10000), 9900);
    })
})