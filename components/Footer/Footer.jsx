import Link from 'next/link';
import styles from './Footer.module.css';

const ICONS = {
  facebook: (
    <path d="M13.5 9H15V6.5h-1.5C11.6 6.5 10.5 7.6 10.5 9.5V11H9v2.5h1.5V19h2.5v-5.5H15l.5-2.5h-2v-1c0-.6.4-1 1-1Z" />
  ),
  twitter: (
    <path d="M19 7.3c-.5.2-1 .4-1.6.5.6-.4 1-1 1.2-1.7-.5.3-1.1.6-1.7.7a2.7 2.7 0 0 0-4.6 2.5 7.7 7.7 0 0 1-5.6-2.9 2.7 2.7 0 0 0 .8 3.6 2.7 2.7 0 0 1-1.2-.3 2.7 2.7 0 0 0 2.1 2.7 2.7 2.7 0 0 1-1.2 0 2.7 2.7 0 0 0 2.5 1.9A5.5 5.5 0 0 1 5 14.9 7.7 7.7 0 0 0 9.2 16c5 0 7.8-4.3 7.8-8v-.4c.5-.4 1-.9 1.4-1.5z" />
  ),
  instagram: (
    <path d="M9 6.5h6A2.5 2.5 0 0 1 17.5 9v6a2.5 2.5 0 0 1-2.5 2.5H9A2.5 2.5 0 0 1 6.5 15V9A2.5 2.5 0 0 1 9 6.5Zm0 1.5A1 1 0 0 0 8 9v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9Zm3 1.6a2.9 2.9 0 1 1 0 5.8 2.9 2.9 0 0 1 0-5.8Zm0 1.5a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm3.6-2.4a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z" />
  ),
  linkedin: (
    <path d="M7.3 9.6H5V17h2.3V9.6Zm-1.1-3.5a1.3 1.3 0 1 0 0 2.7 1.3 1.3 0 0 0 0-2.7ZM14 9.4c-1.1 0-1.8.6-2.1 1.1h0V9.6H9.6V17H12v-3.9c0-1 .2-2 1.4-2s1.4 1.1 1.4 2.1V17H17v-4.3c0-2.1-1.1-3.3-3-3.3Z" />
  ),
  youtube: (
    <path d="M18.5 8.4a1.9 1.9 0 0 0-1.3-1.3C15.9 6.7 12 6.7 12 6.7s-3.9 0-5.2.4A1.9 1.9 0 0 0 5.5 8.4 19 19 0 0 0 5 12a19 19 0 0 0 .5 3.6 1.9 1.9 0 0 0 1.3 1.3c1.3.4 5.2.4 5.2.4s3.9 0 5.2-.4a1.9 1.9 0 0 0 1.3-1.3A19 19 0 0 0 19 12a19 19 0 0 0-.5-3.6ZM10.6 14.3V9.7L14.5 12l-3.9 2.3Z" />
  ),
};

const BRAND_COLORS = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
};

export default function Footer({ columns = [], social = [], phone }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.top} container`}>
        <div className={styles.brandBlock}>
          <img src="/images/logo.svg" alt="" aria-hidden="true" className={styles.brandLogo} width={150} height={40} />
          <p className={styles.brandText}>
            A multi-state scheduled co-operative bank serving members with savings, loans and digital
            banking since 1965.
          </p>
          <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className={styles.callUs}>
            <span aria-hidden="true">📞</span> Call us: {phone}
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.heading} className={styles.column}>
            <h3 className={styles.columnHeading}>{col.heading}</h3>
            <ul className={styles.columnList}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.columnLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`${styles.bottom} container`}>
        <p className={styles.copy}>© {year} Sanmitra Co-operative Bank Ltd. All rights reserved.</p>
        <ul className={styles.socialList} aria-label="Follow us on social media">
          {social.map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={styles.socialLink}
                style={{ background: BRAND_COLORS[s.id] || 'var(--color-gold-500)' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  {ICONS[s.id]}
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
