import {testFn} from "./demo";

describe("samle", () => {
    it("should work", () => {
        const res = testFn(2,3);
        expect(res).toBe(5);
    });

    it("should work 2", () => {
        const res = testFn(2,3);
        expect(res).toBe(4);
    });
});