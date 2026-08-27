import type { Metadata } from 'next';
import { CategoryResourcePage } from '@/components/ui/category-resource-page';

export const metadata: Metadata = {
  title: 'Blogs and Newsletters',
  description: 'Stay updated with insights from industry experts and thought leaders',
};

export default function Page() {
  return (
    <CategoryResourcePage
      title="Blogs and Newsletters"
      description="Stay updated with insights from industry experts and thought leaders"
    />
  );
}
