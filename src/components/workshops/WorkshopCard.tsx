import React from 'react';
import type { Workshop } from '../../types/database';
import { formatWorkshopDate, formatWorkshopTime, getWorkshopStatusLabel } from '../../lib/workshops';
import styles from './WorkshopCard.module.css';

interface WorkshopCardProps {
  workshop: Workshop;
  onSelect?: (workshopId: string) => void;
  isSelected?: boolean;
  disabled?: boolean;
}

export default function WorkshopCard({ 
  workshop, 
  onSelect, 
  isSelected = false,
  disabled = false 
}: WorkshopCardProps): React.ReactElement {
  const status = getWorkshopStatusLabel(workshop);
  const isFull = workshop.availableSpots === 0;
  const isDisabled = disabled || isFull;
  
  const capacityPercentage = (workshop.currentEnrollment / workshop.maxCapacity) * 100;

  const handleClick = () => {
    if (!isDisabled && onSelect && workshop.id) {
      onSelect(workshop.id);
    }
  };

  return (
    <div 
      className={`${styles.workshopCard} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
      onClick={handleClick}
      role={onSelect ? 'button' : 'article'}
      tabIndex={onSelect && !isDisabled ? 0 : -1}
      onKeyDown={(e) => {
        if (onSelect && !isDisabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.workshopHeader}>
        <h3 className={styles.workshopTitle}>{workshop.title}</h3>
        {isSelected && <span className={styles.selectedBadge}>✓ Selected</span>}
      </div>

      <div className={styles.workshopDate}>
        <span className={styles.dateIcon}>📅</span>
        <div>
          <div className={styles.dateText}>{formatWorkshopDate(workshop)}</div>
          <div className={styles.timeText}>{formatWorkshopTime(workshop)}</div>
        </div>
      </div>

      <div className={styles.capacitySection}>
        <div className={styles.capacityBar}>
          <div 
            className={styles.capacityFill}
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
        <div className={styles.capacityText}>
          <span className={styles.enrolled}>{workshop.currentEnrollment}/{workshop.maxCapacity} enrolled</span>
          <span className={styles.available}>
            {workshop.availableSpots} {workshop.availableSpots === 1 ? 'spot' : 'spots'} available
          </span>
        </div>
      </div>

      <div className={`${styles.statusBadge} ${styles[status.color]}`}>
        <span className={styles.statusIcon}>{status.icon}</span>
        <span className={styles.statusLabel}>{status.label}</span>
      </div>

      {onSelect && (
        <button
          className={styles.selectButton}
          disabled={isDisabled}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          {isFull ? 'Full' : isSelected ? 'Selected' : 'Select This Workshop'}
        </button>
      )}
    </div>
  );
}
