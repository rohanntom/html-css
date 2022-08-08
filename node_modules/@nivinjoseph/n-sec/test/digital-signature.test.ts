// import * as Assert from "assert";
// import { AsymmetricEncryption, DigitalSignature } from "./../src/index";
// // import { CryptoException } from "./../src/crypto-exception";
// import "@nivinjoseph/n-ext";


// suite("digitalSignature", () =>
// {
//     suite("sign", () =>
//     {   
//         test("should return string value thats is not null, empty, whitespace, same as value or key pair when invoked with key pair and value", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let value = "some value";
//             let signature = await DigitalSignature.sign(keyPair, value);
//             Assert.ok(signature !== null && !signature.isEmptyOrWhiteSpace());
//             Assert.notStrictEqual(signature, value);
//             Assert.notStrictEqual(signature, keyPair);
//         });
        
        
//         // test("should throw CryptoException when KeyPair is null", async () =>
//         // {
//         //     try
//         //     {
//         //         await DigitalSignature.sign(null, "hello");
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when KeyPair is undefined", async () =>
//         // {
//         //     try
//         //     {
//         //         await DigitalSignature.sign(undefined, "hello");
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     try
//         //     {
//         //         await DigitalSignature.sign(keyPair, null);
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value is undefined", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     try
//         //     {
//         //         await DigitalSignature.sign(keyPair, undefined);
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value is empty string", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     try
//         //     {
//         //         await DigitalSignature.sign(keyPair, "");
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when keyPair is empty string", async () =>
//         // {
//         //     try
//         //     {
//         //         await DigitalSignature.sign("", "password");
//         //     }
//         //     catch (exception)
//         //     {
//         //         assert.ok(exception instanceof CryptoException);
//         //         assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     assert.ok(false);
//         // });
//     });
    
//     suite("verify", () =>
//     {
//         test("should return true when called with public key of key pair, value and signature of value generated using key pair", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             let value = "some-value";
//             let signature = await DigitalSignature.sign(keyPair, value);
//             let verification = await DigitalSignature.verify(publicKey, value, signature);
//             Assert.strictEqual(verification, true);
//         });
        
//         test("should return false when called with unrelated public key, value and signature", async () =>
//         {
//             let keyPair1 = await AsymmetricEncryption.generateKeyPair();
//             let keyPair2 = await AsymmetricEncryption.generateKeyPair();
//             let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair2);
//             let value = "some-value";
//             let signature = await DigitalSignature.sign(keyPair1, value);
//             let verification = await DigitalSignature.verify(publicKey2, value, signature);
//             Assert.strictEqual(verification, false);
//         });
        
//         test("should return false when called with tampered value", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             let value = "some-value";
//             let signature = await DigitalSignature.sign(keyPair, value);
//             let tamperedValue = value + "d";
//             let verification = await DigitalSignature.verify(publicKey, tamperedValue, signature);
//             Assert.strictEqual(verification, false);
//         });
        
//         test("should return false when called with a tampered signature", async () =>
//         {
//             let keyPair = await AsymmetricEncryption.generateKeyPair();
//             let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//             let value = "some-value";
//             let signature = await DigitalSignature.sign(keyPair, value);
//             let tamperedSignature = "d" + signature;
//             let verification = await DigitalSignature.verify(publicKey, value, tamperedSignature);
//             Assert.strictEqual(verification, false);
//         });
        
        
        
//         // test("successfully verify the signed", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     let verify = await DigitalSignature.verify(publicKey, "some-string", signature);
//         //     Assert.ok(verify);
//         // });
        
//         // test("un-verify modified signature", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     signature = signature + "aaaaaaaa";
//         //     let verify = await DigitalSignature.verify(publicKey, "some-string", signature);
//         //     Assert.ok(!verify);
//         // });
        
//         // test("un-verify when wrong public key is given", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     let keyPair2 = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair2);
//         //     let verify = await DigitalSignature.verify(publicKey2, "some-string", signature);
//         //     Assert.ok(!verify);
//         // });
        
//         // test("should throw CryptoException when public key is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     try
//         //     {
//         //         await DigitalSignature.verify(null, "some-string", signature);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     try
//         //     {
//         //         await DigitalSignature.verify(publicKey, null, signature);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value is empty string", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let signature = await DigitalSignature.sign(keyPair, "some-string");
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     try
//         //     {
//         //         await DigitalSignature.verify(publicKey, "", signature);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when signature is null", async () =>
//         // {
//         //     let keyPair = await AsymmetricEncryption.generateKeyPair();
//         //     let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
//         //     try
//         //     {
//         //         await DigitalSignature.verify(publicKey, "some-string", null);
//         //     }
//         //     catch (exception)
//         //     {
//         //         Assert.ok(exception instanceof CryptoException);
//         //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
//         //         return;
//         //     }
//         //     Assert.ok(false);
//         // });
        
//         // test("should throw CryptoException when value, key pair and signature are all null", async () =>
//         // {
//         //     try
//         //     {
//         //         await DigitalSignature.verify(null, null, null);
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