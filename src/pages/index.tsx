import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Empower Local Students to Think Critically in the Age of AI
          </Heading>
          <p className={styles.heroSubtitle}>
            A 2-hour interactive workshop that transforms how students learn, reflect, and reason — 
            preparing them to thrive in a world powered by artificial intelligence.
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
              className={clsx('button button--primary button--lg', styles.primaryCta)}
              to="/contact#sponsor">
              <span className={styles.buttonTextFull}>Sponsor Students for the Next Workshop</span>
              <span className={styles.buttonTextShort}>Sponsor Students</span>
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
  );
}

function WhySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <Heading as="h2" className={styles.sectionTitle}>
            Real Learning Begins with Better Thinking
          </Heading>
          <div className={styles.cardContent}>
            <p className={styles.leadText}>
              Today's students face more information than ever before — yet most aren't taught how to think deeply about what they learn.
            </p>
            <p>
              Our Critical Thinking + AI Workshop gives them the mental framework to:
            </p>
            <ul className={styles.benefitsList}>
              <li>See connections between ideas across subjects</li>
              <li>Turn curiosity into insight maps they can use for real learning</li>
              <li>Engage AI tools as thought partners, not shortcuts</li>
              <li>Build confidence in their own reasoning and decision-making</li>
            </ul>
            <p className={styles.emphasis}>
              This isn't another lecture. It's a cognitive gym where students train their ability to think clearly, creatively, and critically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          The Workshop Experience
        </Heading>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📚</div>
            <Heading as="h3" className={styles.cardTitle}>10 mins Lecture</Heading>
            <p>Learn the model and mindset</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>💻</div>
            <Heading as="h3" className={styles.cardTitle}>10 mins Activity</Heading>
            <p>Apply it through a guided AI challenge</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>👥</div>
            <Heading as="h3" className={styles.cardTitle}>7.5 mins Breakout</Heading>
            <p>Discuss with small group of 5</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✍️</div>
            <Heading as="h3" className={styles.cardTitle}>7.5 mins Reflection</Heading>
            <p>Personal journaling with guided questions</p>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.centerText}>
            Hosted on <strong>Discord</strong>, students interact in private, moderated learning channels. 
            They'll use games, prompts, and AI reflections to turn knowledge into lived experience — 
            and generate data-driven progress reports for post-session review.
          </p>
        </div>
      </div>
    </section>
  );
}

function MidPageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2" className={styles.ctaTitle}>
            Invest in the Next Generation
          </Heading>
          <p className={styles.ctaSubtitle}>
            Sponsor students in your community and give them the critical thinking skills they need to thrive in an AI-powered world.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.primaryCta)}
              to="/contact#sponsor">
              <span className={styles.buttonTextFull}>Sponsor Students for the Next Workshop</span>
              <span className={styles.buttonTextShort}>Sponsor Students</span>
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
  );
}

function SponsorshipSection() {
  return (
    <section className={styles.section} id="sponsor">
      <div className="container">
        <div className={styles.card}>
          <Heading as="h2" className={styles.sectionTitle}>
            When You Sponsor, You Do More Than Fund a Seat
          </Heading>
          <div className={styles.cardContent}>
            <p className={styles.leadText}>Each sponsorship gives a student access to:</p>
            <div className={styles.sponsorshipGrid}>
              <div className={styles.sponsorshipItem}>
                <div className={styles.itemIcon}>🎓</div>
                <div>
                  <strong>The 2-hour live workshop experience</strong>
                </div>
              </div>
              <div className={styles.sponsorshipItem}>
                <div className={styles.itemIcon}>🤖</div>
                <div>
                  <strong>1-year access</strong> to our AI Prompts & Reflection Portal — a private forum where students explore life and academic challenges through AI-enhanced discussions
                </div>
              </div>
              <div className={styles.sponsorshipItem}>
                <div className={styles.itemIcon}>🧩</div>
                <div>
                  <strong>Ongoing AI & Thinking Tools</strong> that help them connect classroom learning to real-world intelligence
                </div>
              </div>
              <div className={styles.sponsorshipItem}>
                <div className={styles.itemIcon}>📈</div>
                <div>
                  <strong>Progress tracking</strong> and reflection insights you can review to see growth in reasoning and engagement
                </div>
              </div>
            </div>
            <p className={styles.emphasis}>
              This ensures that sponsored students begin receiving value immediately — and continue applying what they learn long after the workshop ends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyDistrictsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Why Sponsor Students?
        </Heading>
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🎯</div>
            <Heading as="h3" className={styles.cardTitle}>Future-Ready Skills</Heading>
            <p>Equip students with critical thinking and AI literacy for tomorrow's workforce</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🤝</div>
            <Heading as="h3" className={styles.cardTitle}>Community Impact</Heading>
            <p>Strengthen your local community by investing in student success</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>🧠</div>
            <Heading as="h3" className={styles.cardTitle}>Proven Results</Heading>
            <p>Students develop metacognition, reasoning skills, and confidence</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <Heading as="h3" className={styles.cardTitle}>Track Your Impact</Heading>
            <p>Receive progress reports showing how sponsored students grow</p>
          </div>
        </div>
        <div className={styles.card}>
          <p className={styles.centerText}>
            Whether you're a school district, local business, church, or individual — sponsoring students positions you as a champion of educational innovation and community development. Together, we equip the next generation not just to adapt to AI, but to <strong>think with it</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaCard}>
          <Heading as="h2" className={styles.ctaTitle}>
            Ready to Make a Lasting Impact?
          </Heading>
          <p className={styles.ctaSubtitle}>
            Join school districts, local businesses, churches, and individuals who are investing in the next generation. Sponsor students today and give them the thinking tools that will define their future.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className={clsx('button button--primary button--lg', styles.primaryCta)}
              to="/contact#sponsor">
              <span className={styles.buttonTextFull}>Sponsor Students for the Next Workshop</span>
              <span className={styles.buttonTextShort}>Sponsor Students</span>
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
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Empower Students with Critical Thinking"
      description="AutoNateAI's 2-hour workshop gives students the ability to think critically, connect ideas, and learn how to learn using AI tools.">
      <main>
        <HeroSection />
        <WhySection />
        <HowItWorksSection />
        <MidPageCTA />
        <SponsorshipSection />
        <WhyDistrictsSection />
        <FinalCTASection />
      </main>
    </Layout>
  );
}
