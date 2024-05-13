import CryptoJS from "crypto-js";
import { CONFIG } from "../../config/config";
import crypto from "crypto";

export class CommonSevices {
  /**
   * async function for decrypting the tokens and id details
   */
  decryptDetails = (data) => {
    if (data) {
      const bytes = CryptoJS.AES.decrypt(data.toString(), CONFIG.secretKey);
      const result = bytes.toString(CryptoJS.enc.Utf8).replace(/\|/g, "\\");
      return result;
    } else {
      return null;
    }
  };

  /**
   * async function for encrypting the tokens and id details
   */
  encryptDetails = (data, secretKey?) => {
    if (data) {
      const text = CryptoJS.AES.encrypt(
        data.toString(),
        CONFIG.secretKey
      ).toString();
      return text.replace(/\\/g, "|");
    } else {
      return null;
    }
  };

  /**
   * encrypt details using RSA algorthim
   */
  encryptRSA(message: string, publicKey: string) {
    return crypto
      .publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(message)
      )
      .toString("base64");
  }

  decryptRSA(encryptedMessage: string, privateKey: string) {
    const buffer = Buffer.from(encryptedMessage, "base64");
    return crypto
      .privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer
      )
      .toString();
  }

  /**
   * Generate New public key and private key
   */

  generateRSAKeys = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
      },
    });
    return { privateKey, publicKey };
  };
}
