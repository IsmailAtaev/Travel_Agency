// //const crypto = require("crypto");
// import {crypto} from "crypto";
// // https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/

// //const algorithm = "aes-256-cbc";
// //const initVector = crypto.randomBytes(16);
// //const message = "This is a secret message";
// //const Securitykey = crypto.randomBytes(32);

// export default function encrypt(obj) {
//   const cipher = crypto.createCipheriv("aes-256-cbc", crypto.randomBytes(32), crypto.randomBytes(16));
//   let encryptedData = cipher.update(obj, "utf-8", "hex");
//   encryptedData += cipher.final("hex");
//   console.log("Encrypted message: " + encryptedData);
//   return encryptedData;
// }

//import {CryptoJS} from "crypto-js";
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1234567887654321");
const iv = CryptoJS.enc.Utf8.parse("1234567887654321");

export const encrypted = (data) => {
  console.log("=======================ENCRYPT=================");
  console.log(data);
  let encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encryptData.toString();
};

export const decrypted = (data) => {
  console.log("=======================DECRYPT=================");
  console.log(data);
  let decryptData = CryptoJS.AES.decrypt(data, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const ee = CryptoJS.enc.Utf8.stringify(decryptData);
  console.log(ee);
  return ee;
};

//https://youtu.be/Z1sgKNwFdr8