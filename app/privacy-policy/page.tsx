'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-flex items-center text-accent-neon hover:text-accent-neon/80 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon focus:rounded-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-foreground-muted text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Introduction</h2>
            <p className="text-foreground-muted leading-relaxed">
              Web Development Hub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services to discover web development resources, tools, and communities.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Information You Provide Directly</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Feedback and communications when you contact us via email or other means</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Anonymous Analytics Data (via Vercel Analytics)</h3>
                <p className="text-foreground-muted leading-relaxed mb-3">
                  We use Vercel Analytics to understand how our platform is used. This service collects only anonymous, aggregated data and does not track individual users:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Page views and navigation patterns (anonymized)</li>
                  <li>Referring websites (where visitors came from)</li>
                  <li>General location (country and city level only)</li>
                  <li>Device type and browser information (anonymized)</li>
                  <li>No cookies are used and data is automatically discarded after 24 hours</li>
                  <li>No cross-site tracking or personal identification is possible</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Server Logs (via Cloudflare Hosting)</h3>
                <p className="text-foreground-muted leading-relaxed mb-3">
                  Our hosting provider (Cloudflare) automatically generates server logs for security and performance purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Basic server request information (automatically deleted within 4 hours)</li>
                  <li>Error logs for troubleshooting (automatically deleted within 1 week)</li>
                  <li>No personal information is retained in these technical logs</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">How We Use Your Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Communications</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Respond to your feedback, questions, and support requests</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Anonymous Analytics</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Understand which resources are most helpful to developers</li>
                  <li>Improve the platform's performance and user experience</li>
                  <li>Identify technical issues and optimize our service</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Legal Compliance</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Comply with applicable laws and legal obligations</li>
                  <li>Protect the security and integrity of our platform</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Information Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p className="text-foreground-muted leading-relaxed">
                <strong>We do not sell, trade, or rent any personal information.</strong> Since we collect minimal data, there is very little to share. We may share information only in these specific circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                <li><strong>Service Providers:</strong> Anonymous analytics data is processed by Vercel Analytics and server logs by Cloudflare (our hosting provider) - both services have their own privacy policies and data protection measures</li>
                <li><strong>Legal Requirements:</strong> If required by law, legal process, or to protect rights and safety (though we have minimal data to provide)</li>
                <li><strong>Your Communications:</strong> When you contact us directly, we may use that communication to respond to you</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Data Security</h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Monitoring for suspicious activities</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Your Privacy Rights</h2>
            <div className="space-y-4">
              <p className="text-foreground-muted leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Withdraw consent for certain data processing activities</li>
              </ul>
              <p className="text-foreground-muted leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Cookies and Tracking</h2>
            <div className="space-y-4">
              <p className="text-foreground-muted leading-relaxed">
                <strong>We do not use cookies for tracking or analytics.</strong> Our analytics solution (Vercel Analytics) is cookie-free and privacy-focused.
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                <li><strong>No Analytics Cookies:</strong> Our analytics system uses request-based hashing instead of cookies</li>
                <li><strong>No Tracking Cookies:</strong> We do not track users across websites or store personal identifiers</li>
                <li><strong>Third-Party Services:</strong> Our hosting provider (Cloudflare) may use technical cookies for security and performance purposes</li>
              </ul>
              <p className="text-foreground-muted leading-relaxed">
                Since we don't use tracking cookies, there are no cookie settings to manage for analytics purposes.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Third-Party Links</h2>
            <p className="text-foreground-muted leading-relaxed">
              Our platform contains links to external websites and resources. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Changes to This Policy</h2>
            <p className="text-foreground-muted leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes by posting the updated policy on our website and updating the "Last updated" date above.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Contact Us</h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you have questions about this Privacy Policy or wish to contact us about your data, please reach out:
            </p>
            <div className="space-y-2 text-foreground-muted">
              <p><strong>Website:</strong> <Link href="/" className="text-accent-neon hover:text-accent-neon/80">Web Development Hub</Link></p>
              <p className="text-sm">
                You can contact us through our website or any available contact methods. Since we collect minimal personal data, most privacy requests can be addressed quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}