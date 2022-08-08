import * as Assert from "assert";

suite("Other", () =>
{
    test("encoding decoding", () =>
    {
        const text = "moonlight43iuj90/;msdnnksdkdkdk[[[][][";
        const encodedText = Buffer.from(text, "utf8").toString("base64");
        Assert.notStrictEqual(encodedText, text);
        
        const decodedText = Buffer.from(encodedText, "base64").toString("utf8");
        Assert.notStrictEqual(decodedText, encodedText);
        Assert.strictEqual(decodedText, text);
    });
});