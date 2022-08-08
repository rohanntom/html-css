import * as Assert from "assert";
import { SymmetricEncryption } from "./../src/index";
// import { CryptoException } from "./../src/crypto-exception";
import "@nivinjoseph/n-ext";


suite("SymmetricEncryption", () =>
{
    suite("generateKey", () =>
    { 
        test("must return string value that is not null, empty or whitespace", async () =>
        {
            const key = await SymmetricEncryption.generateKey();
            console.log("key", key);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Assert.ok(key !== null && !key.isEmptyOrWhiteSpace());
        });
        
        
        test("consecutive calls must yield unique values", async () =>
        {
            const key1 = await SymmetricEncryption.generateKey();
            const key2 = await SymmetricEncryption.generateKey();
            Assert.notStrictEqual(key1, key2);
        });
    });    
    
    suite("encrypt", () =>
    { 
        test("must return cipher text value when called with key and plain text value", async () =>
        {
            const key = "E25B269440F88601C453CD171D76EDDC11D8CF33230742DF8CAD5873D28F78B2";
            const value = "password";
            const encrypted = await SymmetricEncryption.encrypt(key, value);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Assert.ok(encrypted !== null);
            Assert.notStrictEqual(encrypted, value);
        });

        // test("encrypt with key as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(null, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);

        // });

        // test("encrypt with key as undefined throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(undefined, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);
        // }); 
        
        // test("encrypt", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let value = "password";
        //     let encrypted = await SymmetricEncryption.encrypt(key, value);
        //     assert.ok(encrypted !== null);
        //     assert.notStrictEqual(value, encrypted);
        // });

        // test("encrypt with key as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(null, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);

        // });

        // test("encrypt with value as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });
        
        // test("encrypt with value as undefined throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, undefined);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });
        
        // test("encrypt with value as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });
        
        // test("encrypt with key as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt("", "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });
        
        // test("encrypt with invalid key as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt("hello", "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);
        // });
    });
    
    suite("decrypt", () =>
    {
        test("must return plain text value when called with key and cipher text value", async () =>
        {
            const key = await SymmetricEncryption.generateKey();
            const value = "password";
            const encrypted = await SymmetricEncryption.encrypt(key, value);
            const decrypted = SymmetricEncryption.decrypt(key, encrypted);
            Assert.strictEqual(decrypted, value);
        });
          
        // test("decrypt with a valid encryption key", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let encryption = await SymmetricEncryption.encrypt(key, "password");
        //     let decryption = await SymmetricEncryption.decrypt(key, encryption);
        //     assert.strictEqual(decryption, "password");
        // });
        
        // test("decrypt with an invalid encryption key", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let key2 = await SymmetricEncryption.generateKey();
        //     let encryption = await SymmetricEncryption.encrypt(key, "password");
        //     let decryption = await SymmetricEncryption.decrypt(key2, encryption);
        //     assert.notStrictEqual(decryption, "password");
        // });
        
        // test("throws an CryptoException when key is null", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.decrypt(null, "encryption");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });
        
        // test("throws an CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.decrypt(key, null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });
        
        // test("throws an CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.decrypt(key, "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });
        
        // test("throws an CryptoException when key and value is empty string", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.decrypt("", "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });
    });
});