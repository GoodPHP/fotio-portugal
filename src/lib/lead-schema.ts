import { z } from 'zod';
import { getCity, getServiceByAnySlug } from './catalog';
import { LOCALES } from './locales';
import { GROUP_SIZE_VALUES, OTHER } from './booking-options';

export { OTHER };

/** Free text the visitor typed, bounded so a bot cannot post a novel. */
const note = (max: number) => z.string().trim().max(max).optional();

/**
 * What `/api/lead` accepts from the booking flow, the home widget and the
 * contact form. Kept out of the route file so it can be tested: a Next route
 * module may only export handlers.
 */
export const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  // Optional because the contact form may name neither. It used to send the
  // first city and service in the catalogue instead, so every general
  // question arrived in Telegram as a Lisbon studio-portrait enquiry.
  citySlug: z
    .string()
    .refine((s) => s === OTHER || Boolean(getCity(s)), { message: 'unknown_city' })
    .optional(),
  serviceSlug: z
    .string()
    .refine((s) => s === OTHER || Boolean(getServiceByAnySlug(s)), { message: 'unknown_service' })
    .optional(),
  date: z.string().max(40).optional(),
  flexibleDates: z.boolean().optional(),
  time: z.string().max(20).optional(),
  groupSize: z.enum(GROUP_SIZE_VALUES as [string, ...string[]]).optional(),
  preferences: z
    .object({
      location: note(200),
      time: note(100),
      photographer: note(200),
      occasion: note(200),
      accessibility: note(500),
    })
    .optional(),
  duration: z.string().max(40).optional(),
  addons: z
    .object({
      express: z.boolean().optional(),
      secondPhotographer: z.boolean().optional(),
    })
    .optional(),
  remarks: z.string().max(2000).optional(),
  reference: z.string().max(20).optional(),
  source: z.enum(['booking', 'quick-match', 'contact']).default('contact'),
  locale: z.enum(LOCALES),
  // Spam trap: legitimate clients leave this empty.
  honeypot: z.string().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
