import * as Assert from "assert";
import { Hmac, SymmetricEncryption } from "./../src/index";
// import { CryptoException } from "./../src/crypto-exception";
import "@nivinjoseph/n-ext";

suite("Hmac", () =>
{
    suite("create", () =>
    {
        test("should return string value that is not null, empty, whitespace or same as the key or input", async () =>
        {
            const key = await SymmetricEncryption.generateKey();
            const value = "hello world";
            const hmac = Hmac.create(key, value);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Assert.ok(hmac !== null && !hmac.isEmptyOrWhiteSpace());
            Assert.notStrictEqual(hmac, key);
            Assert.notStrictEqual(hmac, value);
        });
        
        test("multiple invocations with the same key and value must return the same output", async () =>
        {
            const key = await SymmetricEncryption.generateKey();
            const value = "hello world";
            const hmac1 = Hmac.create(key, value);
            const hmac2 = Hmac.create(key, value);
            Assert.strictEqual(hmac1, hmac2);
        });
        
        test("multiple invocations with different keys and different values must return different outputs", async () =>
        {
            const key1 = await SymmetricEncryption.generateKey();
            const value1 = "hello world";
            const hmac1 = Hmac.create(key1, value1);
            
            const key2 = await SymmetricEncryption.generateKey();
            const value2 = "goodbye world";
            const hmac2 = Hmac.create(key2, value2);
            Assert.notStrictEqual(hmac1, hmac2);
        });
        
        test("multiple invocations with the same key and different values must return different outputs", async () =>
        {
            const key = await SymmetricEncryption.generateKey();
            const value1 = "hello world";
            const value2 = "goodbye world";
            const hmac1 = Hmac.create(key, value1);
            const hmac2 = Hmac.create(key, value2);
            Assert.notStrictEqual(hmac1, hmac2);
        });
        
        test("multiple invocations with different keys and the same value must return different outputs", async () =>
        {
            const key1 = await SymmetricEncryption.generateKey();
            const key2 = await SymmetricEncryption.generateKey();
            const value = "hello world";
            const hmac1 = Hmac.create(key1, value);
            const hmac2 = Hmac.create(key2, value);
            Assert.notStrictEqual(hmac1, hmac2);
        });
        
        
        
        // test("should create same Hmacs for a given value and key", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let hmac1 = await Hmac.create(key, "some-string");
        //     let hmac2 = await Hmac.create(key, "some-string");
        //     Assert.ok(hmac1 !== null && !hmac1.isEmptyOrWhiteSpace());
        //     Assert.ok(hmac2 !== null && !hmac2.isEmptyOrWhiteSpace());
        //     Assert.notStrictEqual(hmac1, "some-string");
        //     Assert.notStrictEqual(hmac2, "some-string");
        //     Assert.strictEqual(hmac1, hmac2);
        // });
        
        // test("should throw CryptoException when key is null", async () =>
        // {
        //     try
        //     {
        //         await Hmac.create(null, "some-string");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await Hmac.create(key, null);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when key is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hmac.create(undefined, "some-string");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });

        // test("should throw CryptoException when value is undefined", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await Hmac.create(key, undefined);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when invalid key", async () =>
        // {
        //     try
        //     {
        //         await Hmac.create("key", "hello world");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
    });
    
});