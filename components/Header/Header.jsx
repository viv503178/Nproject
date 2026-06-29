'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

/**
 * Header
 * - Logo sits on the left.
 * - Nav items come in as `items` from the database (fetched server-side
 *   in app/page.js via lib/db.getMenuItems, or re-fetchable from
 *   /api/menu). Keeping the fetch in the server component and passing the
 *   result down here means the menu is present in the very first HTML
 *   response — good for SEO and for users with JavaScript disabled.
 */
export default function Header({ items = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.logoLink} aria-label="Sanmitra Co-operative Bank Ltd. home">
          <img src="/images/logo.svg" alt="Sanmitra Co-operative Bank Ltd." width={180} height={48} />
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
          <span className={styles.menuToggleBar} />
          <span className="sr-only">Toggle navigation menu</span>
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <ul className={styles.navList}>
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
