
import * as CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_SECRET_KEY;
const secretIv = import.meta.env.VITE_SECRET_IV;

export const encrytpt = (data: string) => {
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(data),
      secretKey,
      {
        keySize: 128 / 8,
        iv: secretIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return encrypted.toString();
}

export const decrytpt = (data: string) => {
    const decrypted = CryptoJS.AES.decrypt(data, secretKey, {
      keySize: 128 / 8,
      iv: secretIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

}
