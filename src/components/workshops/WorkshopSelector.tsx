import React, { useState, useEffect } from 'react';
import type { Workshop } from '../../types/database';
import { getUpcomingWorkshops, hasAvailableSpots } from '../../lib/workshops';
import WorkshopCard from './WorkshopCard';
import styles from './WorkshopSelector.module.css';

interface WorkshopSelectorProps {
  selectedWorkshopId?: string;
  onSelect: (workshopId: string) => void;
  requiredSpots?: number;
  showTitle?: boolean;
}

export default function WorkshopSelector({
  selectedWorkshopId,
  onSelect,
  requiredSpots = 1,
  showTitle = true
}: WorkshopSelectorProps): React.ReactElement {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, []);

  async function loadWorkshops() {
    try {
      setLoading(true);
      setError(null);
      const data = await getUpcomingWorkshops();
      setWorkshops(data);
    } catch (err) {
      console.error('Error loading workshops:', err);
      setError('Failed to load workshops. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        {showTitle && <h3 className={styles.title}>Select Workshop Date</h3>}
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading available workshops...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        {showTitle && <h3 className={styles.title}>Select Workshop Date</h3>}
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={loadWorkshops} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className={styles.container}>
        {showTitle && <h3 className={styles.title}>Select Workshop Date</h3>}
        <div className={styles.empty}>
          <p>No upcoming workshops available at this time.</p>
          <p className={styles.emptySubtext}>Please check back later or contact us for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showTitle && (
        <div className={styles.header}>
          <h3 className={styles.title}>Select Workshop Date</h3>
          <p className={styles.subtitle}>
            Choose when your sponsored students will attend the workshop
            {requiredSpots > 1 && ` (${requiredSpots} spots needed)`}
          </p>
        </div>
      )}

      <div className={styles.workshopGrid}>
        {workshops.map((workshop) => {
          const isDisabled = !hasAvailableSpots(workshop, requiredSpots);
          const isSelected = workshop.id === selectedWorkshopId;

          return (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onSelect={onSelect}
              isSelected={isSelected}
              disabled={isDisabled}
            />
          );
        })}
      </div>

      {requiredSpots > 1 && (
        <div className={styles.notice}>
          <span className={styles.noticeIcon}>ℹ️</span>
          <p>
            Workshops with fewer than {requiredSpots} available spots are disabled. 
            Please select a workshop with enough capacity or reduce the number of students.
          </p>
        </div>
      )}
    </div>
  );
}
