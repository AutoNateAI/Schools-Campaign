import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './sponsors.module.css';

export default function SchoolDistricts(): ReactNode {
  return (
    <Layout
      title="School District Sponsorship"
      description="Partner with AutoNateAI to bring critical thinking skills to your students.">
      <main className={styles.sponsorPage}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.title}>
                School District Sponsorship
              </Heading>
              <p className={styles.subtitle}>
                Invest in your students' future with critical thinking skills that last a lifetime.
              </p>
              
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoBox}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/Jb1M4y5DWZo?start=1"
                    title="AutoNateAI Workshop Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '12px' }}
                  ></iframe>
                </div>
              </div>

              <div className={styles.heroButtons}>
                <a
                  className={clsx('button button--primary button--lg')}
                  href="https://whop.com/autonateai/first-coaches-workshop/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Sponsor Students Now
                </a>
                <Link
                  className="button button--secondary button--lg"
                  to="/contact">
                  📅 Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.valueProps}>
              <div className={styles.valueCard}>
                <div className={styles.icon}>🎓</div>
                <Heading as="h3">District-Wide Impact</Heading>
                <p>Scale critical thinking instruction across multiple schools and grade levels.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>📊</div>
                <Heading as="h3">Measurable Results</Heading>
                <p>Get comprehensive data showing student growth in thinking skills and metacognition.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>🤝</div>
                <Heading as="h3">Strategic Alignment</Heading>
                <p>Support your Portrait of a Graduate and 21st-century skills initiatives.</p>
              </div>
            </div>

            <div className={styles.mainContent}>
              <Heading as="h2">Why School Districts Choose AutoNateAI</Heading>
              
              <div className={styles.section}>
                <Heading as="h3">✅ Addresses Real District Priorities</Heading>
                <ul>
                  <li><strong>College & Career Readiness</strong>: Develops the thinking skills employers demand</li>
                  <li><strong>Equity & Access</strong>: Provides universal access to critical thinking instruction</li>
                  <li><strong>Innovation Leadership</strong>: Positions your district as a leader in AI literacy</li>
                  <li><strong>SEL Integration</strong>: Builds self-awareness and metacognitive skills</li>
                </ul>
              </div>

              <div className={styles.section}>
                <Heading as="h3">💰 Flexible Funding Options</Heading>
                <div className={styles.pricingGrid}>
                  <div className={styles.pricingCard}>
                    <h4>Pilot Program</h4>
                    <p className={styles.price}>25-50 students</p>
                    <p>Perfect for testing impact before scaling</p>
                    <ul>
                      <li>One school or grade level</li>
                      <li>Full data & reporting</li>
                      <li>Educator training included</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>School-Wide</h4>
                    <p className={styles.price}>100-200 students</p>
                    <p>Reach an entire grade level or multiple classes</p>
                    <ul>
                      <li>Volume pricing available</li>
                      <li>Customized scheduling</li>
                      <li>Administrator dashboard</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>District Partnership</h4>
                    <p className={styles.price}>500+ students</p>
                    <p>Multi-year partnership across schools</p>
                    <ul>
                      <li>Custom pricing & terms</li>
                      <li>Dedicated support team</li>
                      <li>Professional development</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <Heading as="h3">📈 What You'll Receive</Heading>
                <div className={styles.benefits}>
                  <div className={styles.benefit}>
                    <strong>Pre-Workshop:</strong> Consultation call, enrollment support, parent communication templates
                  </div>
                  <div className={styles.benefit}>
                    <strong>During Workshop:</strong> Expert facilitation, real-time monitoring, immediate support
                  </div>
                  <div className={styles.benefit}>
                    <strong>Post-Workshop:</strong> Comprehensive reports, educator recommendations, 12-month portal access
                  </div>
                  <div className={styles.benefit}>
                    <strong>Ongoing:</strong> Quarterly data reports, continued student engagement tracking, success stories
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <blockquote>
                  <p>"AutoNateAI gave us a way to demonstrate critical thinking instruction to our school board. The data was compelling, and the student engagement was undeniable."</p>
                  <cite>— District Curriculum Director, Michigan</cite>
                </blockquote>
              </div>

              <div className={styles.ctaSection}>
                <Heading as="h2">Ready to Bring AutoNateAI to Your District?</Heading>
                <p>Schedule a free consultation to discuss your goals and explore partnership options.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact">
                    Schedule a Consultation
                  </Link>
                  <Link
                    className={clsx('button button--secondary button--lg')}
                    to="/docs/for-educators/sponsorship-guide">
                    View Sponsorship Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
