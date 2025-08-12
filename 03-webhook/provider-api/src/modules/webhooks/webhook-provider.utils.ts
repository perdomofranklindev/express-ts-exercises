import { HmacSHA256, enc, lib } from 'crypto-js';

export class WebhookProviderUtils {
  /**
   * @description - Generates signed headers for webhook payload.
   * @param payload - The payload to be signed.
   * @param secretKey - The hex-encoded secret key for signing.
   * @returns Headers object with signature.
   */
  static generateSignedHeaders(payload: object, secretKey: string): Record<string, string> {
    // Parse hex secret key into WordArray
    const key = enc.Hex.parse(secretKey);
    const payloadString = JSON.stringify(payload);

    // Generate HMAC-SHA256 signature
    const signature = HmacSHA256(payloadString, key).toString(enc.Hex);

    return {
      'Content-Type': 'application/json',
      'X-Hub-Signature': `sha256=${signature}`,
    };
  }

  /**
   * @description - Generates a random secret key.
   * @returns {string} - A randomly generated hex-encoded secret key.
   */
  static generateSecretKey(): string {
    return lib.WordArray.random(32).toString(enc.Hex);
  }
}
