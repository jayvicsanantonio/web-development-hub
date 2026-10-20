// The site footer: the copyright line and links to the privacy policy and
// terms of service.
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground md:flex-row">
        <p>
          © {new Date().getFullYear()} Web Development Hub. All rights
          reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-foreground"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
