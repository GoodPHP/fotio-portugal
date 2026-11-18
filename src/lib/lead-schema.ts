import { z } from 'zod';
import { getCity, getServiceByAnySlug } from './catalog';
import { LOCALES } from './locales';
import { GROUP_SIZE_VALUES, OTHER } from './booking-options';
import { GIFT_TYPES, PROMO_IDS } from './promo';

export { OTHER };

/** Free text the visitor typed, bounded so a bot cannot post a novel. */
const note = (max: number) => z.string().trim().max(max).optional();

/**
 * What `/api/lead` accepts from the booking flow, the home widget and the
 * contact form. Kept out of the route file so it can be tested: a Next route
 * module may only export handlers.
 */
export const LeadSchema = z
  .object({
  name: z.string().min(2).max(100),
  // Either is enough: /book asks for one "phone or email" field.
  email: z.string().email().optional(),
  phone: z.string().min(6).max(30).optional(),
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
  budget: note(100),
  reference: z.string().max(20).optional(),
  source: z.enum(['booking', 'quick-match', 'contact', 'gift-card']).default('contact'),
  // The promotion the visitor came through, for the alert. Same ids as GA4.
  promoId: z.enum(Object.values(PROMO_IDS) as [string, ...string[]]).optional(),
  // A gift card request (source 'gift-card'). The buyer is `name` and
  // `email`/`phone`; the card itself is sent by hand as a PDF.
  gift: z
    .object({
      type: z.enum(GIFT_TYPES),
      recipientName: z.string().trim().min(1).max(100),
      delivery: z.enum(['buyer', 'recipient']),
      // Only when the card goes straight to the recipient: when to send it.
      sendDate: z.string().max(40).optional(),
      recipientContact: note(200),
      message: note(1000),
    })
    .optional(),
  locale: z.enum(LOCALES),
  // Spam trap: legitimate clients leave this empty.
  honeypot: z.string().optional(),
  })
  .refine((lead) => Boolean(lead.email || lead.phone), {
    message: 'email_or_phone_required',
    path: ['email'],
  })
  .refine((lead) => lead.source !== 'gift-card' || Boolean(lead.gift), {
    message: 'gift_required',
    path: ['gift'],
  });

export type Lead = z.infer<typeof LeadSchema>;
