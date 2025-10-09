import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './sponsors.module.css';

export default function Churches(): ReactNode {
  return (
    <Layout
      title="Church Sponsorship"
      description="Partner with AutoNateAI to invest in the youth of your congregation and community.">
      <main className={styles.sponsorPage}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <Heading as="h1" className={styles.title}>
                Church & Faith Community Sponsorship
              </Heading>
              <p className={styles.subtitle}>
                Invest in the minds and futures of the young people in your congregation and community.
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
                  to="/contact?type=church#sponsor">
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
                <div className={styles.icon}>⛪</div>
                <Heading as="h3">Youth Ministry</Heading>
                <p>Support the intellectual and personal development of young people in your community.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>🤲</div>
                <Heading as="h3">Community Service</Heading>
                <p>Live out your mission by investing in education and youth empowerment.</p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.icon}>🌱</div>
                <Heading as="h3">Lasting Impact</Heading>
                <p>Equip young people with thinking skills that will serve them throughout their lives.</p>
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

              <Heading as="h2">Why Churches Sponsor Students</Heading>
              
              <div className={styles.section}>
                <Heading as="h3">🙏 Aligns with Your Mission</Heading>
                <ul>
                  <li><strong>Youth Development</strong>: Support the growth of young minds and character</li>
                  <li><strong>Community Service</strong>: Demonstrate your commitment to the local community</li>
                  <li><strong>Educational Equity</strong>: Ensure all students have access to quality learning opportunities</li>
                  <li><strong>Stewardship</strong>: Use resources to make a tangible difference in young lives</li>
                  <li><strong>Wisdom & Discernment</strong>: Help students develop critical thinking and sound judgment</li>
                </ul>
              </div>

              <div className={styles.section}>
                <Heading as="h3">💰 Sponsorship Options</Heading>
                <div className={styles.pricingGrid}>
                  <div className={styles.pricingCard}>
                    <h4>Youth Group Sponsor</h4>
                    <p className={styles.price}>$250 - $2,500</p>
                    <p>Sponsor 1-10 students from your congregation</p>
                    <ul>
                      <li>Perfect for youth ministry budgets</li>
                      <li>Student thank-you notes</li>
                      <li>Impact reports</li>
                      <li>Recognition in bulletin/newsletter</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>Community Outreach</h4>
                    <p className={styles.price}>$6,250</p>
                    <p>Sponsor 25 students at a local school</p>
                    <ul>
                      <li>Extend impact beyond congregation</li>
                      <li>Partner with nearby schools</li>
                      <li>Community recognition</li>
                      <li>Invitation to student events</li>
                    </ul>
                  </div>
                  <div className={styles.pricingCard}>
                    <h4>Mission Partnership</h4>
                    <p className={styles.price}>$25,000+</p>
                    <p>Multi-year commitment to youth education</p>
                    <ul>
                      <li>Ongoing community impact</li>
                      <li>Multiple schools or cohorts</li>
                      <li>Speaking opportunities</li>
                      <li>Long-term relationship building</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <Heading as="h3">🎯 How Churches Use Sponsorship</Heading>
                <div className={styles.useCases}>
                  <div className={styles.useCase}>
                    <h4>Youth Ministry Program</h4>
                    <p>Sponsor students from your youth group as part of your discipleship and development programming.</p>
                  </div>
                  <div className={styles.useCase}>
                    <h4>Community Outreach</h4>
                    <p>Partner with local schools to sponsor students who may not have other opportunities for enrichment.</p>
                  </div>
                  <div className={styles.useCase}>
                    <h4>Mission Giving</h4>
                    <p>Allocate mission funds to education and youth development in your local community.</p>
                  </div>
                  <div className={styles.useCase}>
                    <h4>Memorial Gifts</h4>
                    <p>Honor loved ones by sponsoring students in their memory, creating lasting impact.</p>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <Heading as="h3">🌟 What You'll Receive</Heading>
                <div className={styles.benefits}>
                  <div className={styles.benefit}>
                    <strong>Student Impact:</strong> Anonymized reflections showing how students grew through the program
                  </div>
                  <div className={styles.benefit}>
                    <strong>Community Recognition:</strong> Acknowledgment in school communications and local media
                  </div>
                  <div className={styles.benefit}>
                    <strong>Congregation Engagement:</strong> Materials to share the impact with your members
                  </div>
                  <div className={styles.benefit}>
                    <strong>Tax Documentation:</strong> Receipts for tax-deductible charitable contributions
                  </div>
                </div>
              </div>

              <div className={styles.testimonial}>
                <blockquote>
                  <p>"Sponsoring students for the AutoNateAI workshop was a perfect fit for our youth ministry. It gave our young people tools to think critically and make wise decisions—values we deeply care about."</p>
                  <cite>— Youth Pastor, Community Church</cite>
                </blockquote>
              </div>

              <div className={styles.section}>
                <Heading as="h3">📖 Biblical Foundation</Heading>
                <p className={styles.scripture}>
                  <em>"Train up a child in the way he should go; even when he is old he will not depart from it."</em> — Proverbs 22:6
                </p>
                <p className={styles.scripture}>
                  <em>"Whatever you did for one of the least of these brothers and sisters of mine, you did for me."</em> — Matthew 25:40
                </p>
                <p>
                  Investing in education and youth development is an investment in God's kingdom. By sponsoring students, you're helping them develop wisdom, discernment, and the ability to think critically about the world around them.
                </p>
              </div>

              <div className={styles.ctaSection}>
                <Heading as="h2">Ready to Make an Impact?</Heading>
                <p>Partner with AutoNateAI to invest in the next generation of thinkers and leaders.</p>
                <div className={styles.ctaButtons}>
                  <Link
                    className={clsx('button button--primary button--lg')}
                    to="/contact">
                    Schedule a Conversation
                  </Link>
                  <a
                    className={clsx('button button--secondary button--lg')}
                    href="https://whop.com/autonateai/first-coaches-workshop/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Sponsor Students
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
