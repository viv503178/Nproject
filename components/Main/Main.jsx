import Link from 'next/link';
import styles from './Main.module.css';

function formatDate(isoDate) {
  try {
    return new Date(isoDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return isoDate;
  }
}

/**
 * Main
 * Three-column section directly below the carousel:
 *  1. About Us blurb + Important Notification
 *  2. Corporate video
 *  3. Interest rate board with "effective from" date
 */
export default function Main({ interestRates }) {
  return (
    <section className={`${styles.threeCol} container`} aria-label="Bank highlights">
      {/* Column 1: About + Notification */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>About Us</h2>
        <p className={styles.cardText}>
          Sanmitra Co-operative Bank Ltd. has served depositors and borrowers across Mumbai since 1965,
          combining the personal service of a cooperative with the digital convenience of a modern bank.
          We are regulated and committed to transparent pricing on every loan and deposit product we offer.
        </p>
        <Link href="/about-us" className={styles.readMore}>
          Read more <span aria-hidden="true">→</span>
        </Link>

        <hr className={styles.divider} />

        <h3 className={styles.noticeTitle}>Important Notification</h3>
        <p className={styles.cardText}>
          The bank&rsquo;s registered office will remain closed on account of a regional holiday. All
          digital banking services continue to be available as usual.
        </p>
        <Link href="/notifications" className={styles.readMore}>
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Column 2: Video */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Watch &amp; Know</h2>
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            poster="/images/about-video-poster.svg"
            controls
            preload="none"
            aria-label="Corporate introduction video for Sanmitra Co-operative Bank"
          >
            {/* Replace with a real hosted video file or signed URL. */}
            <source src="" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
        <p className={styles.captionNote}>A two-minute introduction to our products and member benefits.</p>
      </div>

      {/* Column 3: Interest rates */}
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Rate of Interest</h2>
        <ul className={styles.rateList}>
          {interestRates.rows.map((row) => (
            <li key={row.scheme} className={styles.rateRow}>
              <span className={styles.rateScheme}>{row.scheme}</span>
              <span className={styles.rateValue}>{row.rate}</span>
            </li>
          ))}
        </ul>
        <p className={styles.effectiveFrom}>
          Effective from <strong>{formatDate(interestRates.effectiveFrom)}</strong> onwards
        </p>
        <Link href="/calculators" className={styles.readMore}>
          Calculate your EMI <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
