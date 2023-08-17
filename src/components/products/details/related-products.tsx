import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { classNames } from 'react-select/dist/declarations/src/utils';
import ProductCard from '../cards/card';
interface Props {
  products: any;
  currentProductId: any;
  gridClassName?: string;
  heading: string;
}

const RelatedProducts = ({
  products,
  currentProductId,
  gridClassName,
  heading
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <>
      <h2 className="text-lg text-heading tracking-tight font-semibold mb-6">
        {heading}
      </h2>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4',
          gridClassName
        )}
      >
        {products?.map((item: any, idx: number) => {
          if (currentProductId === item.id) {
            return null;
          }
          return (
            <ProductCard 
              product={item} 
              key={idx} 
              shop={item?.shop?.name} />
          );
        })}
      </div>
    </>
  );
};
// <motion.div key={idx}>
{
  /* {renderProductCard(
    item,
    "!shadow-none border border-border-200 hover:!border-border-200 border-opacity-70"
  )} */
}
// </motion.div>

export default RelatedProducts;
