'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Tabs.module.css';

/**
 * Tabs
 * Custom tab strip rendered in a blue container. `tabs` (key + label) is
 * passed down from the server, already read from the database. Selecting
 * a tab fetches that tab's text from /api/tabs?tab=<key>, which itself
 * reads from the same mock database (lib/db.js -> getTabContent).
 *
 * A simple cache (keyed by tab) means content already fetched once is
 * shown instantly when you switch back to that tab, without re-hitting
 * the API every time and without ever showing the wrong tab's text.
 */
export default function Tabs({ tabs = [], initialContent }) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key);
  const [content, setContent] = useState(initialContent || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheRef = useRef(initialContent ? { [initialContent.key]: initialContent } : {});

  useEffect(() => {
    if (!activeKey) return undefined;

    // Already fetched this tab before -> show it instantly, no network call.
    if (cacheRef.current[activeKey]) {
      setContent(cacheRef.current[activeKey]);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetch(`/api/tabs?tab=${encodeURIComponent(activeKey)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((data) => {
        cacheRef.current[activeKey] = data.content;
        setContent(data.content);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError('Could not load this tab right now. Please try again.');
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [activeKey]);

  return (
    <section className={styles.blueContainer} aria-label="Quick services">
      <div className={`${styles.tabList} container`} role="tablist" aria-label="Quick services tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={tab.key === activeKey}
            className={`${styles.tabButton} ${tab.key === activeKey ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveKey(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`${styles.panel} container`} role="tabpanel" aria-live="polite">
        {isLoading && <p className={styles.statusText}>Loading…</p>}
        {!isLoading && error && <p className={styles.statusText}>{error}</p>}
        {!isLoading && !error && content && (
          <div key={content.key} className={styles.panelInner}>
            <h3 className={styles.panelTitle}>{content.title}</h3>
            <p className={styles.panelBody}>{content.body}</p>
          </div>
        )}
      </div>
    </section>
  );
}
