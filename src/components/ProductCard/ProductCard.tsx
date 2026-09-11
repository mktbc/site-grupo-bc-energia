import { ButtonLink } from '@/components'
import Image from '@/components/Image'

import { ProductCardProps } from './ProductCard.type'

const ProductCard = ({
  img,
  icon,
  iconSize,
  title,
  description,
  btnText = 'Conhecer a solução',
  url,
  target
}: ProductCardProps) => (
  <div
    data-cta-location="solution_section"
    className="group flex h-full flex-col overflow-hidden rounded-[10px] bg-teal-600/95 text-center transition-colors duration-200"
  >
    <div
      style={{
        backgroundImage: `url(${img})`
      }}
      className="flex h-60 justify-center bg-[length:100%_100%] bg-center transition-[background-size] duration-300 ease-bc group-hover:bg-[length:103%_103%] motion-reduce:transition-none"
    >
      {icon && (
        <Image
          src={`${icon}`}
          alt=""
          width={iconSize?.length ? iconSize[0] : 0}
          height={iconSize?.length ? iconSize[1] : 0}
        />
      )}
    </div>
    <div className="flex flex-col gap-6 px-12 pb-12 pt-8 text-white">
      <h3 className="m-auto w-full t-h3-editorial lg:w-3/4">{title}</h3>
      <p>{description}</p>
      {url && (
        <ButtonLink href={url} variant="primary" target={target || '_self'} data-cta-name={btnText}>
          {btnText}
        </ButtonLink>
      )}
    </div>
  </div>
)

export default ProductCard
