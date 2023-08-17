import BakeryCategoryLoader from '@/components/ui/loaders/bakery-categories-loader';
import NotFound from '@/components/ui/not-found';
import SolidBoxedProduct  from '@/components/ui/solid-boxed-product';
import { Category } from '@/framework/types';

interface SlidingProductCardsProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
}

const SlidingProductCards: React.FC<
  SlidingProductCardsProps
> = ({ notFound, categories, loading }) => {
  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-full h-52 flex justify-center mt-8 px-2">
          <BakeryCategoryLoader />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-200/50">
      {!notFound ? (
        <div className="pt-5 px-4 lg:p-8 lg:pb-0">
          <h3 className='text-2xl text-heading mb-2'>Suggested For <b className='text-green-500'>YOU!</b></h3>
          <SolidBoxedProduct items={categories} className="py-8" />
        </div>
      ) : (
        <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
          <NotFound text="text-no-category" className="h-96" />
        </div>
      )}
    </div>
  );
};

export default SlidingProductCards;