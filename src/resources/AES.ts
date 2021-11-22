import crypto from "crypto";
import config from "../config";

const ENCRYPTION_KEY = config.AESKey; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  const encrypted = cipher.update(text);

  return (
    iv.toString("hex") +
    "." + // IV Separator
    Buffer.concat([encrypted, cipher.final()]).toString("hex")
  );
};

export const decrypt = (text: string) => {
  const textParts = text.split("."); // Split the IV and encrypted text
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join("."), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  const decrypted = decipher.update(encryptedText);

  return Buffer.concat([decrypted, decipher.final()]).toString();
};
