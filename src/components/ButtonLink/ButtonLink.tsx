import { buttonStyles, buttonWrapperStyles } from '@/components/Button/Button.style'
import Image from '@/components/Image'
import Link from '@/components/Link'

import { ButtonLinkProps } from './ButtonLink.type'

const ButtonLink = ({
  children,
  block,
  href,
  variant,
  outline,
  center,
  size = 'md',
  rounded,
  icon,
  ...rest
}: ButtonLinkProps) => (
  <div className={buttonWrapperStyles({ center })}>
    <Link
      {...rest}
      href={href}
      className={`${buttonStyles({ block, variant, outline, size, rounded })} ${rest.className ?? ''}`}
    >
      {icon ? (
        <span className="flex flex-row justify-center gap-3">
          <Image src={icon} alt="Icone" width={25} height={25} />
          <span>{children}</span>
        </span>
      ) : (
        <>{children}</>
      )}
    </Link>
  </div>
)

export default ButtonLink
