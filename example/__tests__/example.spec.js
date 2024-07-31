/**
 * @jest-environment jsdom
 */

require('../example')
const example = window.example;



describe("our example module", () => {
    test("should be defined", () => {
        const name = "Alex"
        const expected = example.hello(name)
        expect(expected).toEqual("Hello Alex");
    });
    test("should be an object", () => {
        expect(typeof example).toEqual("object");
    });
});