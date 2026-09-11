import Image from '@/components/Image'

import { CardIconContentProps } from './CardIconContent.type'

const CardIconContent = ({ title, description, icon }: CardIconContentProps) => (
  <div className="flex flex-col gap-4 rounded-lg border-b-8 border-teal-600 bg-gray-200 p-12 text-center">
    {icon && <Image className="mx-auto" src={icon} alt="Grupo BC Energia" width={64} height={46} />}
    <h3 className="t-h4 uppercase text-teal-900">{title}</h3>
    <p>{description}</p>
  </div>
)

export default CardIconContent
