import { useRef } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/lib/locals';
import { ArrowPrevIcon } from '@/components/icons/arrow-prev';
import { ArrowNextIcon } from '@/components/icons/arrow-next';
import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import { productPlaceholder } from '@/lib/placeholders';
import { Image } from '@/components/ui/image';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { PlusIcon } from '@/components/icons/plus-icon';
import { AddToCart } from '@/components/products/add-to-cart/add-to-cart';
import usePrice from '@/lib/use-price';

interface CategoryItemProps {
  item: any;
  className?: string;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ item, className }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const { name, image, quantity, min_price, max_price, product_type } =
    item ?? {};
  const { price, basePrice, discount } = usePrice({
    amount: item.sale_price ? item.sale_price : item.price!,
    baseAmount: item.price,
  });
  const { price: minPrice } = usePrice({
    amount: min_price,
  });
  const { price: maxPrice } = usePrice({
    amount: max_price,
  });

  const { pathname, query } = router;
  const selectedQueries = query.category;

  const { openModal } = useModalAction();

  function handleProductQuickView() {
    return openModal('PRODUCT_DETAILS', item.slug);
  };

  return (
    <article
    className={cn(
      'product-card cart-type-argon rounded bg-light overflow-hidden transition-all duration-200 hover:shadow-downfall-lg hover:shadow-green-400/20 transform hover:-translate-y-0.5 h-full mb-2 sm:mb-5',
      className
    )}
      role="button"
      onClick={handleProductQuickView}
    >
      <div className="relative flex items-center justify-center w-auto h-48 sm:h-52">
        <span className="sr-only">{t('text-product-image')}</span>
        <Image
          src={image?.original ?? productPlaceholder}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="product-image"
        />

        {discount && (
          <div className="absolute top-3 ltr:left-3 rtl:right-3 md:top-[22px] ltr:md:left-4 rtl:md:right-4 rounded text-xs leading-6 font-semibold px-1.5 sm:px-2 md:px-2.5 bg-accent text-light">
            {discount}
          </div>
        )}

        <div className="absolute top-3 ltr:right-3 rtl:left-3 md:top-4 ltr:md:right-4 rtl:md:left-4">
          {product_type.toLowerCase() === 'variable' ? (
            <>
              {Number(quantity) > 0 && (
                <button
                  onClick={handleProductQuickView}
                  className="flex items-center justify-center text-sm transition-colors border rounded w-7 h-7 md:w-9 md:h-9 text-heading bg-light border-border-200 hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
                >
                  <PlusIcon className="w-5 h-5 stroke-2" />
                </button>
              )}
            </>
          ) : (
            <>
              {Number(quantity) > 0 && (
                <AddToCart variant="argon" data={item} />
              )}
            </>
          )}

          {Number(quantity) <= 0 && (
            <div className="px-2 py-1 text-xs bg-red-500 rounded text-light">
              {t('text-out-stock')}
            </div>
          )}
        </div>
      </div>
      {/* End of product image */}

      <header className="px-3 pb-3 md:px-6 md:pb-3">
        {product_type.toLowerCase() === 'variable' ? (
          <div className="mb-2">
            <span className="text-sm font-semibold md:text-base text-heading">
              {item?.minPrice}
            </span>
            <span> - </span>
            <span className="text-sm font-semibold md:text-base text-heading">
              {maxPrice}
            </span>
          </div>
        ) : (
          <div className="flex items-center mb-2">
            <span className="text-sm font-semibold md:text-base text-heading">
              {price}
            </span>
            {basePrice && (
              <del className="text-xs md:text-sm text-body ltr:ml-2 rtl:mr-2">
                {basePrice}
              </del>
            )}
          </div>
        )}
        {/* End of product price */}

        <h3 className="text-xs md:text-sm text-body">{name}</h3>
        {/* End of product title */}
      </header>
    </article>
  );
};

function SolidBoxedProduct({ items }: any) {
  const { t } = useTranslation('common');
  const { isRTL } = useIsRTL();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const breakpoints = {
    320: {
      slidesPerView: 2,
    },

    440: {
      slidesPerView: 3,
    },

    620: {
      slidesPerView: 4,
    },

    820: {
      slidesPerView: 5,
    },

    1100: {
      slidesPerView: 6,
    },

    1280: {
      slidesPerView: 7,
    },
  };

  return (
    <div className="relative">
      <Swiper
        id="category-card-menu"
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current!, // Assert non-null
          nextEl: nextRef.current!, // Assert non-null
          disabledClass: 'swiper-button-disabled',
          hiddenClass: 'swiper-button-hidden',
        }}
        breakpoints={breakpoints}
        slidesPerView={7}
        spaceBetween={10}
      >
        {items?.map((category: any, idx: number) => (
          <SwiperSlide key={idx}>
            <CategoryItem item={category} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={prevRef}
        className="category-slider-prev  w-8 h-8 flex items-center justify-center text-heading bg-light shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer ltr:-left-3 rtl:-right-3 ltr:lg:-left-4 focus:outline-none"
      >
        <span className="sr-only">{t('text-previous')}</span>
        {isRTL ? <ArrowNextIcon /> : <ArrowPrevIcon />}
      </div>
      <div
        ref={nextRef}
        className="category-slider-next w-8 h-8 flex items-center justify-center text-heading bg-light shadow-300 outline-none rounded-full absolute top-1/2 -mt-4 z-10 cursor-pointer ltr:-right-3 rtl:-left-3 ltr:lg:-right-4 rtl:lg:-left-4 focus:outline-none"
      >
        <span className="sr-only">{t('text-next')}</span>
        {isRTL ? <ArrowPrevIcon /> : <ArrowNextIcon />}
      </div>
    </div>
  );
}

export default SolidBoxedProduct;
