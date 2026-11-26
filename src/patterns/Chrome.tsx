import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Container } from '../layout/Layout';

export interface NavLink {
  href: string;
  label: ReactNode;
  /** Marks the link to the page being viewed (aria-current="page"). */
  current?: boolean;
}

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  /** The site's name or logo, usually a link to the home page. */
  brand: ReactNode;
  /** Accessible name of the main navigation. */
  navLabel: string;
  links: NavLink[];
  /** The call to action at the end of the bar (a ButtonLink). */
  action?: ReactNode;
}

/** Sticky top bar: brand, main navigation, one call to action. */
export const SiteHeader = forwardRef<HTMLElement, SiteHeaderProps>(
  ({ brand, navLabel, links, action, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn('sticky top-0 z-40 border-b-2 border-line bg-canvas/95 backdrop-blur', className)}
      {...props}
    >
      <Container size="wide" className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        {brand}
        <nav aria-label={navLabel}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.href} className="hidden md:block">
                <a
                  href={link.href}
                  aria-current={link.current ? 'page' : undefined}
                  className={cn(
                    'rounded-sm font-bold text-ink underline-offset-8 hover:text-brand hover:underline',
                    'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand',
                    'aria-[current=page]:text-brand aria-[current=page]:underline'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {action && <li>{action}</li>}
          </ul>
        </nav>
      </Container>
    </header>
  )
);
SiteHeader.displayName = 'SiteHeader';

export interface FooterGroup {
  title: ReactNode;
  links: NavLink[];
  /** Makes the group a named <nav>. Leave out for a group that is not navigation (contact). */
  navLabel?: string;
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  tagline?: ReactNode;
  groups: FooterGroup[];
  /** Last line: copyright, credits. */
  note?: ReactNode;
}

/** Page footer: brand and tagline, then groups of links. */
export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(
  ({ brand, tagline, groups, note, className, ...props }, ref) => (
    <footer ref={ref} className={cn('border-t-2 border-line bg-surface-sunken py-12', className)} {...props}>
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          {brand}
          {tagline && <p className="mt-3 max-w-xs text-muted">{tagline}</p>}
        </div>
        {groups.map((group, i) => {
          const Wrapper = group.navLabel ? 'nav' : 'div';
          return (
            <Wrapper key={i} aria-label={group.navLabel}>
              <p className="font-heading text-ink">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={link.current ? 'page' : undefined}
                      className={cn(
                        'rounded-sm text-muted underline underline-offset-4 hover:text-brand',
                        'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand',
                        'aria-[current=page]:font-bold aria-[current=page]:text-ink'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Wrapper>
          );
        })}
      </Container>
      {note && (
        <Container className="mt-10 text-sm text-muted">
          <p>{note}</p>
        </Container>
      )}
    </footer>
  )
);
SiteFooter.displayName = 'SiteFooter';

export interface ShowcaseNote {
  title: ReactNode;
  body?: ReactNode;
}

export interface ShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  /** The image or illustration in the middle. */
  media: ReactNode;
  /** Up to four short notes placed around the media from the `md` breakpoint up, listed under it below. */
  notes?: ShowcaseNote[];
  /** Gentle floating motion of the media. Stopped when motion is reduced. */
  float?: boolean;
}

const corners = [
  'md:absolute md:left-0 md:top-4',
  'md:absolute md:right-0 md:top-12',
  'md:absolute md:bottom-14 md:left-2',
  'md:absolute md:bottom-2 md:right-4',
];

/**
 * An illustration with notes around it. The notes are a real list, in reading
 * order, so their placement never changes what a screen reader says.
 */
export const Showcase = forwardRef<HTMLDivElement, ShowcaseProps>(
  ({ media, notes = [], float = true, className, ...props }, ref) => (
    <div ref={ref} className={cn('relative md:min-h-[26rem]', className)} {...props}>
      <div className={cn('mx-auto flex max-w-xs justify-center md:max-w-sm md:pt-10', float && 'animate-bob')}>{media}</div>
      {notes.length > 0 && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-0 md:block">
          {notes.slice(0, 4).map((note, i) => (
            <li
              key={i}
              className={cn(
                'rounded-card border-2 border-line bg-surface px-4 py-3 shadow-raised md:max-w-[13rem] animate-rise-in',
                corners[i]
              )}
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <p className="font-heading text-ink">{note.title}</p>
              {note.body && <p className="text-sm text-muted">{note.body}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
);
Showcase.displayName = 'Showcase';

export interface WindowFrameProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Text in the title bar (an address, an app name). */
  title?: ReactNode;
}

/** A browser-like window around a preview. The dots are decorative. */
export const WindowFrame = forwardRef<HTMLDivElement, WindowFrameProps>(({ title, className, children, ...props }, ref) => (
  <div ref={ref} className={cn('overflow-hidden rounded-card border-2 border-line bg-surface shadow-raised', className)} {...props}>
    <div className="flex items-center gap-3 border-b-2 border-line bg-surface-sunken px-4 py-2.5">
      <span aria-hidden="true" className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong/40" />
      </span>
      {title && <span className="truncate text-sm text-muted">{title}</span>}
    </div>
    {children}
  </div>
));
WindowFrame.displayName = 'WindowFrame';

export interface WordmarkProps extends HTMLAttributes<HTMLSpanElement> {
  /** The name, written in lowercase. */
  name: string;
  size?: 'md' | 'lg' | 'xl';
}

/**
 * A text logo: the name followed by a brand-coloured full stop. The dot is
 * decorative, so the name is read once, without "point".
 */
export const Wordmark = forwardRef<HTMLSpanElement, WordmarkProps>(({ name, size = 'lg', className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'font-display font-heading lowercase tracking-tight text-ink',
      { md: 'text-lg', lg: 'text-2xl', xl: 'text-3xl' }[size],
      className
    )}
    {...props}
  >
    {name}
    <span aria-hidden="true" className="text-brand">.</span>
  </span>
));
Wordmark.displayName = 'Wordmark';

export interface IllustrationProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Required: write `alt=""` for a decorative image. */
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

/** A responsive image capped to a maximum width. */
export const Illustration = forwardRef<HTMLImageElement, IllustrationProps>(({ size = 'md', className, alt, ...props }, ref) => (
  <img
    ref={ref}
    alt={alt}
    className={cn('h-auto w-full', { sm: 'max-w-[10rem]', md: 'max-w-xs', lg: 'max-w-md' }[size], className)}
    {...props}
  />
));
Illustration.displayName = 'Illustration';

export interface SideNavItem {
  label: ReactNode;
  /** Without href, the item is the current view: plain text marked aria-current. */
  href?: string;
}

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  items: SideNavItem[];
  /** Makes the list a named <nav>; leave out inside a decorative preview. */
  navLabel?: string;
}

/** A vertical menu, the current item marked by a bar and bold text, not colour alone. */
export const SideNav = forwardRef<HTMLElement, SideNavProps>(({ items, navLabel, className, ...props }, ref) => {
  const Wrapper = navLabel ? 'nav' : 'div';
  return (
    <Wrapper ref={ref as never} aria-label={navLabel} className={className} {...props}>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <a
                href={item.href}
                className={cn(
                  'block rounded-token border-l-[3px] border-transparent px-3 py-2 text-muted underline-offset-4 hover:text-brand hover:underline',
                  'focus-visible:outline-none focus-visible:ring-focus focus-visible:ring-brand'
                )}
              >
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="block rounded-token border-l-[3px] border-brand bg-brand-subtle px-3 py-2 font-bold text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
});
SideNav.displayName = 'SideNav';

export interface ComparisonProps extends HTMLAttributes<HTMLDivElement> {
  before: ReactNode;
  after: ReactNode;
}

/**
 * Two panels side by side (one under the other on small screens), joined by a
 * dashed seam. The panels name themselves ("Avant", "Après") in their
 * headings: the order and the seam are not the only cue.
 */
export const Comparison = forwardRef<HTMLDivElement, ComparisonProps>(({ before, after, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('grid overflow-hidden rounded-card border-2 border-line bg-surface md:grid-cols-[1fr_3rem_1fr]', className)}
    {...props}
  >
    <div className="p-6 sm:p-10">{before}</div>
    <div aria-hidden="true" className="relative h-8 bg-brand-subtle md:h-auto">
      <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-seam md:inset-x-auto md:inset-y-0 md:left-1/2 md:top-0 md:border-l-2 md:border-t-0" />
    </div>
    <div className="p-6 sm:p-10">{after}</div>
  </div>
));
Comparison.displayName = 'Comparison';

export interface IconBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'brand' | 'subtle' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

/** A decorative round holder for an icon. Hidden from assistive technologies. */
export const IconBadge = forwardRef<HTMLSpanElement, IconBadgeProps>(({ tone = 'brand', size = 'lg', className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded-full',
      { sm: 'h-7 w-7', md: 'h-10 w-10', lg: 'h-12 w-12' }[size],
      {
        brand: 'bg-brand text-on-brand',
        subtle: 'bg-brand-subtle text-brand',
        success: 'bg-success text-on-brand',
        danger: 'bg-danger text-on-brand',
      }[tone],
      className
    )}
    {...props}
  />
));
IconBadge.displayName = 'IconBadge';
