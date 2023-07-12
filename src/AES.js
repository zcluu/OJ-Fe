import CryptoJS from 'crypto-js';

const AES_KEY = 'zjuerzclu'.padEnd(16, ' ')
const encryptData = (plaintext) => {
    plaintext = String(plaintext).replace('/', '~')
    plaintext = CryptoJS.enc.Utf8.parse(plaintext)
    const iv = CryptoJS.lib.WordArray.random(16); // 生成随机的16字节IV
    const encrypted = CryptoJS.AES.encrypt(
        plaintext,
        CryptoJS.enc.Utf8.parse(AES_KEY),
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    const ciphertext = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    return ciphertext;
}
const decryptData = (ciphertext) => {
    const ciphertextBytes = CryptoJS.enc.Base64.parse(ciphertext);
    const iv = ciphertextBytes.clone().splice(0, 16);
    const encrypted = ciphertextBytes.clone().splice(16);

    const decrypted = CryptoJS.AES.decrypt(
        {ciphertext: encrypted},
        CryptoJS.enc.Utf8.parse(AES_KEY),
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8).replace('~', '/');
    return plaintext;
}
export {encryptData, decryptData}
