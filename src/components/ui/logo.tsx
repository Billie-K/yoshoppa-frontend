import { Image } from '@/components/ui/image';
import cn from 'classnames';
import Link from '@/components/ui/link';
import { logoPlaceholder } from '@/lib/placeholders';
import { useSettings } from '@/framework/settings';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  ...props
}) => {
  const {
    settings: { logo, siteTitle },
  } = useSettings();
  return (
    <Link href="/" className={cn('inline-flex', className)} {...props}>
      <span className="relative h-14 w-32 overflow-hidden md:w-40">
        {/* <Image
          src={logo?.original ?? logoPlaceholder}
          alt={siteTitle || 'YoShoppa'}
          layout="fill"
          objectFit="contain"
          loading="eager"
        /> */}
        <span className="font-semibold text-2xl">YoShoppa</span>
      </span>
    </Link>
  );
};

export default Logo;
