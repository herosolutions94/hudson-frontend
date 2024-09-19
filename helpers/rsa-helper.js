var CryptoJS = require("crypto-js");

export function encrypt_decrypt(action, string) {
    let output = false;
    const encrypt_method = "AES-256-CBC";
    const secret_key = 'learnpassencryptedurlgjhfgs65675fsdjhjh3423hgj';
    const secret_iv = 'learnpassencryptedurlgjhfgs65675fsdjhjh3423hgjx';
    // hash
    const key = CryptoJS.SHA256(secret_key).toString();
    // iv - encrypt method AES-256-CBC expects 16 bytes 
    const iv = CryptoJS.SHA256(secret_iv).toString().substring(0, 16);
    if (action == 'encrypt') {
        output = CryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
        output = btoa(output);
    } else if (action == 'decrypt') {
        output = CryptoJS.AES.decrypt(atob(string), key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    }
    return output;
}