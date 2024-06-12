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
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa-pss", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    const data = "Important message";

    // Create the signer object
    const signer = crypto.createSign("sha256");

    // Add data to be signed
    signer.update(data);
    signer.end();

    // Sign the data with RSA-PSS padding
    const signature = signer.sign({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
    });

    console.log("Signature:", signature.toString("base64"));

    const signatureBase64 = signature.toString("base64"); // Use the generated signature

    // Create the verifier object
    const verifier = crypto.createVerify("sha256");

    // Add data to be verified
    verifier.update(data);
    verifier.end();

    // Verify the signature with RSA-PSS padding
    const isVerified = verifier.verify(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
      },
      Buffer.from(signatureBase64, "base64")
    );

    console.log("Verified:", isVerified);
    return { privateKey, publicKey };
  };
}
