import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './sponsors.module.css';

export default function LocalBusinesses(): ReactNode {
  return (
    <Layout
      title="Local Business Sponsorship"
      description="Invest in your community's future by sponsoring students for critical thinking education.">
      <main className={styles.sponsorPage}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.title}>
                Local Business Sponsorship
              </Heading>
              <p className={styles.subtitle}>
                Build your brand while building the future workforce of your community.
              </p>
              
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoBox}>
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/jj-A1tvmJoM"
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
                  to="/contact?type=local-business#sponsor">
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
                <div className={styles.icon}>🏢</div>
                <Heading as="h3">Community Leadership</Heading>
                <p>Show your commitment to education and youth development in your community.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>💼</div>
                <Heading as="h3">Future Workforce</Heading>
                <p>Develop the critical thinkers and problem-solvers your business will need.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>📣</div>
                <Heading as="h3">Brand Recognition</Heading>
                <p>Get recognized as a community partner in schools and local media.</p>
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
                <p>Build your brand while building the future workforce of your community.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact?type=local-business#sponsor">
                    Sponsor Students Now
                  </Link>
                  <Link
                    className={clsx('button button--secondary button--lg')}
                    to="/contact">
                    Schedule a Conversation
                  </Link>
                </div>
              </div>

              <Heading as="h2">Why Local Businesses Sponsor Students</Heading>
              
              <div className={styles.section}>
                <Heading as="h3">🎯 The Business Case for Sponsorship</Heading>
                <ul>
                  <li><strong>Workforce Development</strong>: Today's students are tomorrow's employees</li>
                  <li><strong>Community Investment</strong>: Strengthen the local economy through education</li>
                  <li><strong>Brand Visibility</strong>: Recognition in schools, newsletters, and events</li>
                  <li><strong>Tax Benefits</strong>: Sponsorship is tax-deductible as a charitable contribution</li>
                  <li><strong>Employee Morale</strong>: Team members feel proud to work for a company that gives back</li>
                </ul>
              </div>

              <div className={styles.section}>
                <Heading as="h3">💰 Sponsorship Levels</Heading>
                <div className={styles.pricingGrid}>
                  <div className={styles.pricingCard}>
                    <h4>Individual Sponsor</h4>
                    <p className={styles.price}>$250 - $2,500</p>
                    <p>Sponsor 1-10 students</p>
                    <ul>
                      <li>Student thank-you letters</li>
                      <li>Recognition on school website</li>
                      <li>Impact report with student outcomes</li>
                      <li>Tax-deductible receipt</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>Classroom Sponsor</h4>
                    <p className={styles.price}>$6,250</p>
                    <p>Sponsor an entire classroom (25 students)</p>
                    <ul>
                      <li>All Individual benefits, plus:</li>
                      <li>Logo on workshop materials</li>
                      <li>Social media recognition</li>
                      <li>Invitation to student showcase</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>School Partner</h4>
                    <p className={styles.price}>$25,000+</p>
                    <p>Sponsor 100+ students or multiple schools</p>
                    <ul>
                      <li>All Classroom benefits, plus:</li>
                      <li>Press release & media coverage</li>
                      <li>Speaking opportunity at events</li>
                      <li>Multi-year partnership options</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.ctaSection}>
                <Heading as="h2">Invest in Your Community's Future</Heading>
                <p>Join local businesses making a difference through education sponsorship.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact?type=local-business#sponsor">
                    Sponsor Students Now
                  </Link>
                </div>
              </div>

              <div className={styles.section}>
                <Heading as="h3">🌟 Recognition & Benefits</Heading>
                <div className={styles.benefits}>
                  <div className={styles.benefit}>
                    <strong>School Recognition:</strong> Your business name/logo on school website, newsletters, and sponsor boards
                  </div>
                  <div className={styles.benefit}>
                    <strong>Social Media:</strong> Tagged posts celebrating your sponsorship on school and AutoNateAI channels
                  </div>
                  <div className={styles.benefit}>
                    <strong>Community Events:</strong> Recognition at school board meetings, parent nights, and student showcases
                  </div>
                  <div className={styles.benefit}>
                    <strong>Impact Stories:</strong> Receive anonymized student reflections showing how your sponsorship made a difference
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <blockquote>
                  <p>"Sponsoring 10 students at our local middle school was the best marketing investment we made this year. The community recognition was incredible, and our team felt proud to support local kids."</p>
                  <cite>— Coffee Shop Owner, Grand Rapids</cite>
                </blockquote>
              </div>

              <div className={styles.section}>
                <Heading as="h3">📋 How It Works</Heading>
                <ol className={styles.steps}>
                  <li><strong>Choose Your Level:</strong> Decide how many students you'd like to sponsor</li>
                  <li><strong>Connect with a School:</strong> We'll help you find a local school or you can choose one</li>
                  <li><strong>Make Your Contribution:</strong> Simple payment process with immediate tax receipt</li>
                  <li><strong>Get Recognized:</strong> School announces your sponsorship to students and community</li>
                  <li><strong>See the Impact:</strong> Receive reports showing how students benefited from your support</li>
                </ol>
              </div>

              <div className={styles.ctaSection}>
                <Heading as="h2">Ready to Invest in Your Community?</Heading>
                <p>Become a sponsor today and help local students develop the thinking skills they need to succeed.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact?type=local-business#sponsor">
                    Sponsor Students Now
                  </Link>
                  <Link
                    className={clsx('button button--secondary button--lg')}
                    to="/contact">
                    Schedule a Call
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
