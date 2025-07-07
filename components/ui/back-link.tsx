import Link from 'next/link';

interface BackLinkProps {
  href?: string;
  text?: string;
  className?: string;
}

export function BackLink({
  href = '/',
  text = 'Back to Home',
  className = 'inline-flex items-center text-sm text-foreground-muted hover:text-foreground transition-colors',
}: BackLinkProps) {
  return (
    <Link href={href} className={className}>
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {text}
    </Link>
  );
}
