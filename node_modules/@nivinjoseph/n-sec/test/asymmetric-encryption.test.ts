// import * as Assert from "assert";
// import { AsymmetricEncryption } from "./../src/index";
// // import { CryptoException } from "./../src/crypto-exception";
// import "@nivinjoseph/n-ext";

// suite("AsymmetricEncryption", () =>
// {
//     suite("generateKeyPair", () =>
//     { 
//         test("should return string value that is not null, empty or whitespace", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             Assert.ok(keyPair !== null && !keyPair.isEmptyOrWhiteSpace());
//         });
        
//         test("consecutive invocations must generate different values", async () =>
//         {
//             let keyPair1 = await AsymmetricEncryption.generateKeyPair();
//             let keyPair2 = await AsymmetricEncryption.generateKeyPair();
//             Assert.notStrictEqual(keyPair1, keyPair2);
//         });

//         // test("generate 3 KeyPairs", async () =>
//         // {
//         //     let keyPair1 = await AsymmetricEncryption.generateKeyPair();
//         //     let keyPair2 = await AsymmetricEncryption.generateKeyPair();
//         //     let keyPair3 = await AsymmetricEncryption.generateKeyPair();
//         //     assert.ok(keyPair1 !== null);
//         //     assert.ok(keyPair2 !== null);
//         //     assert.ok(keyPair3 !== null);
//         //     assert.notStrictEqual(keyPair1, keyPair2);
//         //     assert.notStrictEqual(keyPair1, keyPair3);
//         //     assert.notStrictEqual(keyPair2, keyPair3);
//         // });
//     });
    
//     suite("getPublicKey", () =>
//     {
//         test("should return a string value that is not null, empty, whitespace or same as the input when called with a valid keypair", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             Assert.ok(publicKey !== null && !publicKey.isEmptyOrWhiteSpace());
//             Assert.notStrictEqual(keyPair, publicKey);
//         });
        
//         test("multiple invocations should return the same value for the same keypair", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey1 = await AsymmetricEncryption.getPublicKey(keyPair);
//             let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair);
//             Assert.strictEqual(publicKey1, publicKey2);
//         });
        
//         test("should return different values for different keypairs", async () =>
//         {
//             let keyPair1 = await AsymmetricEncryption.generateKeyPair();
//             let publicKey1 = await AsymmetricEncryption.getPublicKey(keyPair1);
            
//             let keyPair2 = await AsymmetricEncryption.generateKeyPair(); 
//             let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair2);
            
//             Assert.notStrictEqual(publicKey1, publicKey2);
//         });
        
//         // test("get 2 public keys with same key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey1 = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     Assert.ok(publicKey1 !== null);
//         //     Assert.ok(publicKey2 !== null);
//         //     Assert.notStrictEqual(keyPair, publicKey1);
//         //     Assert.notStrictEqual(keyPair, publicKey2);
//         //     Assert.strictEqual(publicKey1, publicKey2);
//         // });
        
//         // test("throws CryptoException when key pair is null", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.getPublicKey(null);
//         //     } 
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair is undefined", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.getPublicKey(undefined);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair is empty String", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.getPublicKey("");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
//     });
    
//     suite("encrypt", () =>
//     {
//         test("should return cipher text when called with a keypair and plain text value", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let value = "password";
//             let encrypted = await AsymmetricEncryption.encrypt(keyPair, value);
//             Assert.ok(encrypted !== null && !encrypted.isEmptyOrWhiteSpace());
//             Assert.notStrictEqual(encrypted, value);
//             Assert.notStrictEqual(encrypted, keyPair);
//         });
        
//         test("should return cipher text when called with a public key and plain text value", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             let value = "password";
//             let encrypted = await AsymmetricEncryption.encrypt(publicKey, value);
//             Assert.ok(encrypted !== null && !encrypted.isEmptyOrWhiteSpace());
//             Assert.notStrictEqual(encrypted, value);
//             Assert.notStrictEqual(encrypted, keyPair);
//         });
        
//         // test("encrypt a string with public Key", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
//         //     Assert.ok(encrypt !== null && !encrypt.isEmptyOrWhiteSpace());
//         //     Assert.notStrictEqual(encrypt, "password");
//         // });
        
//         // test("encrypt twice using the same key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     let encrypt2 = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     Assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
//         //     Assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
//         //     Assert.notStrictEqual(encrypt1, "password");
//         //     Assert.notStrictEqual(encrypt2, "password");
//         //     Assert.strictEqual(encrypt2, encrypt1);
//         // });
        
//         // test("encrypt 2 strings using the same key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "hello world");
//         //     let encrypt2 = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     Assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
//         //     Assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
//         //     Assert.notStrictEqual(encrypt1, "hello world");
//         //     Assert.notStrictEqual(encrypt2, "password");
//         //     Assert.notStrictEqual(encrypt2, encrypt1);
//         // });
        
//         // test("throws CryptoException when key pair is null", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.encrypt(null, "password");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair is undefined", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.encrypt(undefined, "password");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair is empty string", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.encrypt("", "password");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair is empty string", async () =>
//         // {
//         //     try
//         //     {
//         //         let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //         await AsymmetricEncryption.encrypt(keyPair, "");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key pair and value are empty strings", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.encrypt("", "");
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("encrypt using public key and key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "hello world");
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let encrypt2 = await AsymmetricEncryption.encrypt(publicKey, "hello world");
//         //     Assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
//         //     Assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
//         //     Assert.notStrictEqual(encrypt1, "hello world");
//         //     Assert.notStrictEqual(encrypt2, "hello world");
//         //     Assert.notStrictEqual(encrypt1, encrypt2);
//         // });
//     });
    
//     suite("decrypt", () =>
//     {
//         test("should return plain text when called with key pair and cipher text encrypted with key pair", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let value = "password";
//             let encrypted = await AsymmetricEncryption.encrypt(keyPair, value);
//             let decrypted = await AsymmetricEncryption.decrypt(keyPair, encrypted);
//             Assert.strictEqual(decrypted, value);
//         });
        
//         test("should return plain text when called with key pair and cipher text encrypted with public key of key pair", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             let value = "password";
//             let encrypted = await AsymmetricEncryption.encrypt(publicKey, value);
//             let decrypted = await AsymmetricEncryption.decrypt(keyPair, encrypted);
//             Assert.strictEqual(decrypted, value);
//         });
        
        
        
//         // test("decrypt using public key when encrypted by key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     let decrypt = await AsymmetricEncryption.decrypt(publicKey, encrypt);
//         //     Assert.ok(decrypt !== null && !decrypt.isEmptyOrWhiteSpace());
//         //     Assert.strictEqual(decrypt, "password");
//         // });
        
//         // test("decrypt using key pair when encrypted by public key", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
//         //     let decrypt = await AsymmetricEncryption.decrypt(keyPair, encrypt);
//         //     Assert.ok(decrypt !== null && !decrypt.isEmptyOrWhiteSpace());
//         //     Assert.strictEqual(decrypt, "password");
//         // });
        
//         // test("decrypt using key pair when encrypted by key pair", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     let decrypt = await AsymmetricEncryption.decrypt(keyPair, encrypt);
//         //     Assert.notStrictEqual(decrypt, "password");
//         // });
        
//         // test("decrypt using public key when encrypted by public key", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
//         //     let decrypt = await AsymmetricEncryption.decrypt(publicKey, encrypt);
//         //     Assert.notStrictEqual(decrypt, "password");
//         // });
        
//         // test("throws CryptoException when key is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     try
//         //     {
//         //         await AsymmetricEncryption.decrypt(null, encrypt);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key is undefined", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
//         //     try
//         //     {
//         //         await AsymmetricEncryption.decrypt(undefined, encrypt);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when value is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     try
//         //     {
//         //         await AsymmetricEncryption.decrypt(publicKey, null);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });

//         // test("throws CryptoException when value is undefined", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     try
//         //     {
//         //         await AsymmetricEncryption.decrypt(publicKey, undefined);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("throws CryptoException when key and value is null", async () =>
//         // {
//         //     try
//         //     {
//         //         await AsymmetricEncryption.decrypt(null, null);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
//     });
// });