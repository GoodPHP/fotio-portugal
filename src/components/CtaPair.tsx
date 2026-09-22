import { Link } from '@/i18n/navigation';
import type { City, Service } from '@/lib/types';
import { tx, type Locale } from '@/lib/locales';
import { CTA } from '@/lib/cta';
import { bookHref } from '@/lib/routes';
import { localizedCityName } from '@/lib/catalog';
import { whatsappBookingLink } from '@/lib/site';
import { trackAttrs } from '@/lib/analytics';
import { ArrowIcon, WhatsAppIcon } from './Icons';

interface CtaPairProps {
  locale: Locale;
  /**
   * Where on the site the pair sits — 'hero', 'final', 'pricing'. Sent with
   * the click events so the report can say which placement converts.
   */
  context: string;
  /** Whatever the page already knows; both buttons carry it forward. */
  city?: City;
  service?: Service;
  photographer?: string;
  /** Replaces "Check availability", e.g. "Check availability in Lisbon". */
  primaryLabel?: string;
  /** Set on ink backgrounds: the focus ring and outline button invert. */
  onDark?: boolean;
  /** Drop the secondary action where a WhatsApp button is already adjacent. */
  primaryOnly?: boolean;
  className?: string;
}

/**
 * The site's two actions, as one unit.
 *
 * There is exactly one primary action on this site — check availability — and
 * one secondary — chat on WhatsApp. They used to be assembled by hand on
 * every page, with eight different labels between them and a hero event
 * nowhere. This is the only place either button is drawn, so the hierarchy
 * cannot drift again: the primary is always the filled button, the WhatsApp
 * link is always the outline one, and both always prefill what the page
 * knows — the booking form through its query string, WhatsApp through the
 * message.
 */
export default function CtaPair({
  locale,
  context,
  city,
  service,
  photographer,
  primaryLabel,
  onDark = false,
  primaryOnly = false,
  className = '',
}: CtaPairProps) {
  const focus = onDark
    ? 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
    : 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark';

  const whatsappHref = whatsappBookingLink(
    {
      where: city ? localizedCityName(city, locale) : undefined,
      session: service ? tx(service.name, locale) : undefined,
    },
    locale,
  );

  const trackProps = { context, city: city?.slug, service: service?.slug };

  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center ${className}`}>
      <Link
        href={bookHref({ service, city, photographer })}
        className={`btn btn-primary justify-center ${focus}`}
        {...trackAttrs(context === 'hero' ? 'hero_check_availability' : 'cta_check_availability', trackProps)}
      >
        {primaryLabel ?? tx(CTA.checkAvailability, locale)}
        <ArrowIcon />
      </Link>
      {!primaryOnly && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-outline justify-center ${focus}`}
          {...trackAttrs('whatsapp_clicked', trackProps)}
        >
          <WhatsAppIcon className="h-4 w-4" />
          {tx(CTA.chatWhatsapp, locale)}
        </a>
      )}
    </div>
  );
}
