import { z } from 'zod';

export const enum SupportedLanguages {
  EN_EN = 'en-EN',
  CN_CN = 'cn-CN',
}

export const languageSchema = z.enum([
  SupportedLanguages.EN_EN,
  SupportedLanguages.CN_CN,
]);

export type Language = z.infer<typeof languageSchema>;
