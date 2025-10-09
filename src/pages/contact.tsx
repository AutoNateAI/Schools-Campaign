import React, { useState } from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ConsultationForm from '@site/src/components/forms/ConsultationForm';
import SponsorshipForm from '@site/src/components/forms/SponsorshipForm';

import styles from './contact.module.css';

type FormType = 'consultation' | 'sponsorship';

export default function Contact(): ReactNode {
  const [activeForm, setActiveForm] = useState<FormType>('consultation');

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with AutoNateAI to bring critical thinking workshops to your students.">
      <main className={styles.contactPage}>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.title}>
              Let's Bring Critical Thinking to Your Students
            </Heading>
            <p className={styles.subtitle}>
              Request a consultation or sponsor students for our next workshop.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className="container">
            <div className={styles.formToggle}>
              <button
                className={clsx(styles.toggleButton, activeForm === 'consultation' && styles.active)}
                onClick={() => setActiveForm('consultation')}
              >
                Request Consultation
              </button>
              <button
                className={clsx(styles.toggleButton, activeForm === 'sponsorship' && styles.active)}
                onClick={() => setActiveForm('sponsorship')}
              >
                Sponsor Students
              </button>
            </div>

            <div className={styles.formContainer}>
              {activeForm === 'consultation' ? (
                <ConsultationForm />
              ) : (
                <SponsorshipForm />
              )}
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.cardsGrid}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>📧</div>
                <Heading as="h2" className={styles.cardTitle}>Email Us</Heading>
                <p className={styles.cardText}>
                  <strong>schools@autonateai.com</strong>
                </p>
                <p className={styles.cardSubtext}>
                  We respond to all inquiries within 24 hours
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardIcon}>📅</div>
                <Heading as="h2" className={styles.cardTitle}>Schedule a Call</Heading>
                <p className={styles.cardText}>
                  Let's discuss your district's needs
                </p>
                <a 
                  href="mailto:schools@autonateai.com?subject=Workshop Inquiry" 
                  className={clsx('button button--primary', styles.ctaButton)}>
                  Get in Touch
                </a>
              </div>

              <div className={styles.card}>
                <div className={styles.cardIcon}>💬</div>
                <Heading as="h2" className={styles.cardTitle}>What to Expect</Heading>
                <ul className={styles.expectList}>
                  <li>Listen to your goals</li>
                  <li>Answer your questions</li>
                  <li>Customize a plan</li>
                  <li>Provide next steps</li>
                </ul>
              </div>
            </div>

            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <Heading as="h2" className={styles.sectionTitle}>
                  Common Questions We Can Address
                </Heading>
                <div className={styles.questionsGrid}>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>How does the workshop align with our district's strategic priorities?</span>
                  </div>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>What does the implementation process look like?</span>
                  </div>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>How do we measure student outcomes?</span>
                  </div>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>What are the different sponsorship options?</span>
                  </div>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>Can we start with a pilot program?</span>
                  </div>
                  <div className={styles.question}>
                    <span className={styles.questionIcon}>✓</span>
                    <span>How does this integrate with our existing curriculum?</span>
                  </div>
                </div>
              </div>

              <div className={styles.ctaCard}>
                <Heading as="h2" className={styles.ctaTitle}>
                  Ready to Get Started?
                </Heading>
                <p className={styles.ctaText}>
                  Email us at <strong>schools@autonateai.com</strong>
                </p>
                <p className={styles.ctaSubtext}>
                  <strong>Subject line:</strong> "Workshop Inquiry - [Your District Name]"
                </p>
                <p className={styles.ctaSubtext}>
                  <strong>Include:</strong> Your name and role, your district/school, number of students you're considering, and any specific questions or goals.
                </p>
                <a 
                  href="mailto:schools@autonateai.com?subject=Workshop Inquiry" 
                  className={clsx('button button--primary button--lg', styles.mainCta)}>
                  Contact Us Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
