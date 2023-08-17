import ErrorMessage from '@/components/ui/error-message';
import dynamic from 'next/dynamic';
import { useProducts } from '@/framework/product';


const SlidingProductCards = dynamic(
  () => import('@/components/categories/sliding-product-cards')
);
const MAP_PRODUCT_TO_GROUP: Record<string, any> = {
  recommended: SlidingProductCards,
};
interface ProductsProps {
  layout: string;
  variables: any;
  className?: string;
}
export default function RecommendedProducts({
  layout,
  className,
  variables,
}: ProductsProps) {
  const { products, isLoading, error } = useProducts(variables);

  if (error) return <ErrorMessage message={error.message} />;
  const Component = MAP_PRODUCT_TO_GROUP[layout];
  return (
    <Component
      notFound={!Boolean(products.length)}
      categories={products}
      loading={isLoading}
      className={className}
      variables={variables}
    />
  );
}
