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
                <Link
                  className={clsx('button button--primary button--lg')}
                  to="/contact?type=school-district#sponsor">
                  Sponsor Students Now
                </Link>
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
              <Heading as="h2">How It Works</Heading>
              <p className={styles.processIntro}>
                We've made the sponsorship process simple and transparent. Here's what to expect:
              </p>
              
              <div className={styles.processSteps}>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Submit Your Sponsorship Request</h4>
                    <p>Choose how many students you want to sponsor, select a workshop date, and specify your preferred districts or students.</p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Receive Your Invoice</h4>
                    <p>We'll email you an invoice within 24 hours. Secure payment via Stripe/PayPal with tax-deductible receipt provided.</p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Personalize Your Impact (30-min call)</h4>
                    <p>After payment, we schedule a call to learn about your organization and craft a personalized message to your sponsored students.</p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Students Get Access</h4>
                    <p>3-5 days before the workshop, students receive your personalized message and join their Discord cohort.</p>
                  </div>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>5</div>
                  <div className={styles.stepContent}>
                    <h4>Workshop & Beyond</h4>
                    <p>2-hour interactive workshop, followed by 12 months of continued learning. You receive impact reports showing student growth.</p>
                  </div>
                </div>
              </div>

              <div className={styles.ctaSection}>
                <Heading as="h2">Ready to Get Started?</Heading>
                <p>Bring critical thinking skills to your students and position your district as an innovation leader.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact?type=school-district#sponsor">
                    Sponsor Students Now
                  </Link>
                  <Link
                    className={clsx('button button--secondary button--lg')}
                    to="/contact">
                    Schedule a Consultation
                  </Link>
                </div>
              </div>

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

              <div className={styles.ctaSection}>
                <Heading as="h2">Transform Your District</Heading>
                <p>Join forward-thinking districts investing in student critical thinking skills.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact?type=school-district#sponsor">
                    Sponsor Students Now
                  </Link>
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
                    to="/contact?type=school-district#sponsor">
                    Sponsor Students Now
                  </Link>
                  <Link
                    className={clsx('button button--secondary button--lg')}
                    to="/contact">
                    Schedule a Consultation
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
