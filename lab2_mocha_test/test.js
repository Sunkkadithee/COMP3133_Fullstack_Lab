const chai = require("chai");
const expect = chai.expect;

// Import the calculator functions
const { add, sub, mul, div } = require("./app/calculator");

describe("Calculator Tests", () => {
  // Addition Tests
  it("should return 7 for add(5, 2) [PASS]", () => {
    const result = add(5, 2);
    expect(result).to.equal(7);
    console.log(`add(5, 2) = ${result}: PASS`);
  });

  it("should fail for add(5, 2) expecting 8 [FAIL]", () => {
    const result = add(5, 2);
    expect(result).to.not.equal(8);
    console.log(`add(5, 2) = ${result}: FAIL`);
  });

  // Subtraction Tests
  it("should return 3 for sub(5, 2) [PASS]", () => {
    const result = sub(5, 2);
    expect(result).to.equal(3);
    console.log(`sub(5, 2) = ${result}: PASS`);
  });

  it("should fail for sub(5, 2) expecting 5 [FAIL]", () => {
    const result = sub(5, 2);
    expect(result).to.not.equal(5);
    console.log(`sub(5, 2) = ${result}: FAIL`);
  });

  // Multiplication Tests
  it("should return 10 for mul(5, 2) [PASS]", () => {
    const result = mul(5, 2);
    expect(result).to.equal(10);
    console.log(`mul(5, 2) = ${result}: PASS`);
  });

  it("should fail for mul(5, 2) expecting 12 [FAIL]", () => {
    const result = mul(5, 2);
    expect(result).to.not.equal(12);
    console.log(`mul(5, 2) = ${result}: FAIL`);
  });

  // Division Tests
  it("should return 5 for div(10, 2) [PASS]", () => {
    const result = div(10, 2);
    expect(result).to.equal(5);
    console.log(`div(10, 2) = ${result}: PASS`);
  });

  it("should fail for div(10, 2) expecting 2 [FAIL]", () => {
    const result = div(10, 2);
    expect(result).to.not.equal(2);
    console.log(`div(10, 2) = ${result}: FAIL`);
  });
});
