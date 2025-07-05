import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="container mx-auto py-8 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground-muted">
          © {new Date().getFullYear()} Web Development Hub. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/privacy-policy"
            className="text-sm text-foreground-muted hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="text-sm text-foreground-muted hover:text-foreground"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
