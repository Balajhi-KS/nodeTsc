
import CryptoJS from 'crypto-js';
import { CONFIG } from '../../config/config';

export class CommonSevices {
/**
 * async function for decrypting the tokens and id details
 */
 decryptDetails = (data) => {
     if (data) {
       const bytes = CryptoJS.AES.decrypt(data.toString(), CONFIG.secretKey);
       const result = bytes.toString(CryptoJS.enc.Utf8).replace(/\|/g, "\\");
       // console.log('result', result);
       return result;
     } else {
       return null;
     }
   }
   
   /**
    * async function for encrypting the tokens and id details
    */
    encryptDetails = (data, secretKey?) => {
     if (data) {
       const text = CryptoJS.AES.encrypt(data.toString(), CONFIG.secretKey).toString();
       return text.replace(/\\/g, '|');
     } else {
       return null;
     }
   }
}
