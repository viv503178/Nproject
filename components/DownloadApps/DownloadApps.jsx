import styles from './DownloadApps.module.css';

export default function DownloadApps() {
  return (
    <section className={`${styles.section} container`} aria-label="Downloads and mobile app">
      <div className={styles.text}>
        <h2 className={styles.heading}>Forms &amp; Mobile Banking</h2>
        <ul className={styles.linkList}>
          <li>
            <a href="/downloads/account-opening-form.pdf" download className={styles.link}>
              Account Opening Form (PDF)
            </a>
          </li>
          <li>
            <a href="/downloads/loan-application-form.pdf" download className={styles.link}>
              Loan Application Form (PDF)
            </a>
          </li>
          <li>
            <a href="/downloads/fixed-deposit-form.pdf" download className={styles.link}>
              Fixed Deposit Form (PDF)
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.appBadges}>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get the app on Google Play"
          className={styles.badgeLink}
        >
          <img src="/images/play-store-badge.svg" alt="Get it on Google Play" width={170} height={50} />
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download on the App Store"
          className={styles.badgeLink}
        >
          <img src="/images/app-store-badge.svg" alt="Download on the App Store" width={170} height={50} />
        </a>
      </div>
    </section>
  );
}
