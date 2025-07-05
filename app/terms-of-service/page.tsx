'use client';

import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="text-foreground-muted text-lg">
            Last updated: July 4, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Agreement to Terms
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              By accessing and using Web Development Hub ("the
              Service," "we," "us," or "our"), you accept and agree to
              be bound by the terms and provision of this agreement.
              If you do not agree to abide by the above, please do not
              use this service.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Description of Service
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Web Development Hub is a curated platform that provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
              <li>
                A comprehensive directory of web development
                resources, tools, and libraries
              </li>
              <li>
                Learning materials and educational content for web
                developers
              </li>
              <li>
                Community recommendations and developer tools
                discovery
              </li>
              <li>Blog articles and industry insights</li>
              <li>
                Search and filtering capabilities for resource
                discovery
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Acceptable Use
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  You may use our Service to:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>
                    Browse and discover web development resources
                  </li>
                  <li>
                    Search for tools, frameworks, and learning
                    materials
                  </li>
                  <li>
                    Bookmark and organize your favorite resources
                  </li>
                  <li>
                    Access educational content and community
                    recommendations
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  You may not use our Service to:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon intellectual property rights</li>
                  <li>
                    Distribute malware, viruses, or harmful code
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our systems
                  </li>
                  <li>Scrape or harvest data without permission</li>
                  <li>
                    Submit false, misleading, or fraudulent
                    information
                  </li>
                  <li>
                    Interfere with the proper functioning of the
                    Service
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Intellectual Property Rights
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  Our Content
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  The Service and its original content, features, and
                  functionality are owned by Web Development Hub and
                  are protected by international copyright, trademark,
                  patent, trade secret, and other intellectual
                  property laws.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  Third-Party Content
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  Our platform links to external resources and
                  third-party websites. We do not claim ownership of
                  any third-party content and respect the intellectual
                  property rights of all content creators and resource
                  providers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  User Contributions
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  Any feedback, suggestions, or contributions you
                  provide may be used by us to improve the Service
                  without compensation or attribution, unless
                  otherwise agreed upon in writing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Privacy and Data
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              Your privacy is important to us. Please review our{' '}
              <Link
                href="/privacy-policy"
                className="text-accent-neon hover:text-accent-neon/80"
              >
                Privacy Policy
              </Link>
              , which also governs your use of the Service, to
              understand our practices regarding the collection and
              use of your information.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Disclaimers and Limitation of Liability
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  Service Disclaimer
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  The Service is provided "as is" and "as available"
                  without warranties of any kind, either express or
                  implied. We do not warrant that the Service will be
                  uninterrupted, secure, or error-free.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  Content Disclaimer
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  We curate and link to external resources but do not
                  guarantee the accuracy, completeness, or reliability
                  of any third-party content. Users should
                  independently verify the suitability of any
                  resources for their specific needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium text-accent-purple mb-2">
                  Limitation of Liability
                </h3>
                <p className="text-foreground-muted leading-relaxed">
                  To the maximum extent permitted by law, Web
                  Development Hub shall not be liable for any
                  indirect, incidental, special, consequential, or
                  punitive damages, including but not limited to loss
                  of profits, data, or business interruption.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Third-Party Links and Services
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              Our Service contains links to third-party websites,
              tools, and resources. We provide these links for your
              convenience and do not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground-muted leading-relaxed">
              <li>
                Endorse or recommend any third-party products or
                services
              </li>
              <li>
                Accept responsibility for the content or practices of
                external sites
              </li>
              <li>
                Guarantee the availability or functionality of linked
                resources
              </li>
              <li>
                Provide support for third-party tools or services
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Termination
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              We may terminate or suspend your access to the Service
              immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you
              breach the Terms. Upon termination, your right to use
              the Service will cease immediately.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Changes to Terms
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              We reserve the right to modify or replace these Terms at
              any time. If a revision is material, we will try to
              provide at least 30 days' notice prior to any new terms
              taking effect. What constitutes a material change will
              be determined at our sole discretion.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Governing Law
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              These Terms shall be interpreted and governed by the
              laws of the jurisdiction where Web Development Hub
              operates, without regard to conflict of law provisions.
              Any disputes arising from these Terms or the Service
              shall be resolved through appropriate legal channels in
              that jurisdiction.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Severability
            </h2>
            <p className="text-foreground-muted leading-relaxed">
              If any provision of these Terms is held to be invalid or
              unenforceable, the remaining provisions will remain in
              full force and effect. The invalid or unenforceable
              provision will be replaced with a valid provision that
              most closely matches the intent of the original
              provision.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-semibold text-accent-neon mb-4">
              Contact Information
            </h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              If you have any questions about these Terms of Service,
              please contact us:
            </p>
            <div className="space-y-2 text-foreground-muted">
              <p>
                <strong>Email:</strong> legal@webdevhub.com
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <Link
                  href="/"
                  className="text-accent-neon hover:text-accent-neon/80"
                >
                  Web Development Hub
                </Link>
              </p>
            </div>
            <p className="text-foreground-muted leading-relaxed mt-4">
              By using Web Development Hub, you acknowledge that you
              have read and understood these Terms of Service and
              agree to be bound by them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
