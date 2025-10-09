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
                  Have More Questions?
                </Heading>
                <p className={styles.ctaText}>
                  We're here to help! Reach out anytime at{' '}
                  <a href="mailto:autonate.ai@gmail.com" style={{ color: 'white', textDecoration: 'underline' }}>
                    <strong>autonate.ai@gmail.com</strong>
                  </a>
                </p>
                <p className={styles.ctaSubtext}>
                  We respond to all inquiries within 24 hours.
                </p>
                <a 
                  href="mailto:autonate.ai@gmail.com?subject=Workshop%20Inquiry" 
                  className={clsx('button button--primary button--lg', styles.mainCta)}
                  target="_blank"
                  rel="noopener noreferrer">
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
