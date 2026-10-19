// The site footer: the wordmark and a line on what the site is, links to the
// privacy policy and terms of service, the copyright line and the colophon.
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-foreground">
      <div className="container grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <p className="font-serif text-4xl leading-none tracking-tight">
            Web Development Hub
          </p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A hand-kept index of resources for people who build for the
            web.
          </p>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <Link
            href="/privacy-policy"
            className="text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-4 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} Web Development Hub. All rights
            reserved.
          </p>
          <p>Set in Instrument Serif, Inter and IBM Plex Mono</p>
        </div>
      </div>
    </footer>
  );
}
