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
                <h3 className="text-xl font-medium text-accent-purple mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Search queries and preferences when using our resource discovery features</li>
                  <li>Bookmarks and favorites when you save resources</li>
                  <li>Feedback and communications when you contact us</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Device information (browser type, operating system, screen resolution)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Log data (IP address, access times, referring URLs)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
              <li>Provide and maintain our web development resource discovery platform</li>
              <li>Personalize your experience and improve our content recommendations</li>
              <li>Analyze usage patterns to enhance our service offerings</li>
              <li>Communicate with you about updates, new resources, and support</li>
              <li>Ensure security and prevent fraud or abuse</li>
              <li>Comply with legal obligations and protect our rights</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">Information Sharing and Disclosure</h2>
            <div className="space-y-4">
              <p className="text-foreground-muted leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in operating our platform (analytics, hosting, etc.)</li>
                <li><strong>Legal Requirements:</strong> When required by law, legal process, or to protect rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong>Consent:</strong> When you explicitly agree to share information</li>
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
                We use cookies and similar technologies to enhance your experience. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-foreground-muted leading-relaxed">
                You can control cookies through your browser settings, though disabling certain cookies may affect site functionality.
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
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-foreground-muted">
              <p><strong>Email:</strong> privacy@webdevhub.com</p>
              <p><strong>Website:</strong> <Link href="/" className="text-accent-neon hover:text-accent-neon/80">Web Development Hub</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}