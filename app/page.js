import Header from '@/components/Header/Header';
import Carousel from '@/components/Carousel/Carousel';
import Main from '@/components/Main/Main';
import Tabs from '@/components/Tabs/Tabs';
import DownloadApps from '@/components/DownloadApps/DownloadApps';
import Footer from '@/components/Footer/Footer';

import {
  getMenuItems,
  getCarouselSlides,
  getInterestRates,
  getTabKeys,
  getTabContent,
  getFooterData,
} from '@/lib/db';

export const metadata = {
  title: 'Home',
  description:
    'View today\u2019s interest rates, browse bank-approved housing projects and apply for a loan or deposit online with Sanmitra Co-operative Bank Ltd.',
  alternates: { canonical: '/' },
};

// Revalidate this page's data periodically. Tune to how often your real
// database content (menu, rates, notifications) actually changes.
export const revalidate = 300;

export default async function HomePage() {
  // All of these "database" calls run in parallel on the server. In a real
  // deployment they'd be Prisma/SQL calls -- the components below never
  // know the difference.
  const [menuItems, slides, interestRates, tabKeys, footerData] = await Promise.all([
    getMenuItems(),
    getCarouselSlides(),
    getInterestRates(),
    getTabKeys(),
    getFooterData(),
  ]);

  const initialTabContent = tabKeys[0] ? await getTabContent(tabKeys[0].key) : null;

  return (
    <>
      <Header items={menuItems} />

      <main id="main-content">
        <Carousel slides={slides} />

        <Main interestRates={interestRates} />

        <Tabs tabs={tabKeys} initialContent={initialTabContent} />

        <DownloadApps />
      </main>

      <Footer columns={footerData.columns} social={footerData.social} phone={footerData.phone} />
    </>
  );
}
