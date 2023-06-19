const CryptoJS = require("crypto-js");

const key = CryptoJS.enc.Utf8.parse("1234567887654321");
const iv = CryptoJS.enc.Utf8.parse("1234567887654321");

const encrypted = (data) => {
  let encryptData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encryptData.toString();
};

module.exports = decrypted = (data) => {
  let decryptData = CryptoJS.AES.decrypt(data, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decryptData);
};

// let qq = decrypted(ff);
// console.log(JSON.parse(qq));

// module.exports = class Cryptography {
//   key = CryptoJS.enc.Utf8.parse("1234567887654321");
//   iv = CryptoJS.enc.Utf8.parse("1234567887654321");

//   static encrypted = (data) => {
//     let encryptData = CryptoJS.AES.encrypt(
//       CryptoJS.enc.Utf8.parse(data),
//       this.key,
//       {
//         keySize: 128 / 8,
//         iv: this.iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       }
//     );
//     return encryptData.toString();
//   };

//   static decrypted(data) {
//     let decryptData = CryptoJS.AES.decrypt(data, this.key, {
//       keySize: 128 / 8,
//       iv: this.iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return CryptoJS.enc.Utf8.stringify(decryptData);
//   }
// };
