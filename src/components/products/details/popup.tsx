import Spinner from '@/components/ui/loaders/spinner/spinner';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Details from './details';
import ShortDetails from './short-details';
import { stickyShortDetailsAtom } from '@/store/sticky-short-details-atom';
import { useAtom } from 'jotai';
import { AttributesProvider } from './attributes.context';
import { useProduct, useProducts } from '@/framework/product';

const RelatedProducts = dynamic(() => import('./related-products'));
interface ProductPopupProps {
  productSlug: string;
}
const Popup: React.FC<ProductPopupProps> = ({ productSlug }) => {
  const { t } = useTranslation('common');
  const [showStickyShortDetails] = useAtom(stickyShortDetailsAtom);
  const { product, isLoading } = useProduct({ slug: productSlug });

  const { products } = useProducts({
    limit: 5,
    orderBy: 'price',
    sortedBy: 'DESC',
    name: product?.name,
    category: product?.categories[0].slug,
    // text: product?.slug
  });

  if (isLoading || !product)
    return (
      <div className="relative flex items-center justify-center w-96 h-96 bg-light">
        <Spinner text={t('common:text-loading')} />
      </div>
    );

  return (
    <AttributesProvider>
      <article className="bg-light w-full max-w-6xl xl:min-w-[1152px] relative z-[51] md:rounded-xl">
        {/* Sticky bar */}
        <ShortDetails product={product} isSticky={showStickyShortDetails} />
        {/* End of sticky bar */}
        <Details product={product} backBtn={false} isModal={true} />

        {products?.length! > 0 && (
          <div className="p-5 md:pb-10 lg:p-14 xl:p-16">
            <RelatedProducts
              products={products}
              currentProductId={product.id}
              heading='Similar Products'
            />
          </div>
        )}
      </article>
    </AttributesProvider>
  );
};

export default Popup;
