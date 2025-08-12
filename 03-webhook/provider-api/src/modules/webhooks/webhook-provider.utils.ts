import { createHmac, randomBytes } from 'crypto';

export class WebhookProviderUtils {
  /**
   * @description - Generates signed headers for webhook payload.
   * @param payload - The payload to be signed.
   * @param secretKey - The secret key for signing.
   * @returns Headers object with signature.
   */
  static generateSignedHeaders(payload: object, secretKey: string): Record<string, string> {
    const signature = createHmac('sha256', secretKey).update(JSON.stringify(payload)).digest('hex');

    return {
      'Content-Type': 'application/json',
      'X-Hub-Signature': `sha256=${signature}`,
    };
  }

  /**
   * @description - Generates a random secret key.
   * @returns {string} - A randomly generated secret key.
   */
  static generateSecretKey(): string {
    return randomBytes(32).toString('hex');
  }
}
