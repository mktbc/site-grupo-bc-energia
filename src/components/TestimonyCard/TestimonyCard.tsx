import Image from '@/components/Image'

import { TestimonyCardProps } from './TestimonyCard.type'

const TestimonyCard = ({ customer, office, testimony, avatar }: TestimonyCardProps) => (
  <div className="flex flex-col gap-5 rounded-lg bg-gray-200/60 p-6 text-left">
    <div className="flex gap-4">
      {avatar && <Image src={avatar} alt="Cliente" width={80} height={80} />}
      <div className="leading-[1rem]">
        <p className="t-body-lg uppercase">{customer}</p>
        <span>{office}</span>
      </div>
    </div>
    <p className="italic text-gray-500">{testimony}</p>
    <Image
      className="-mt-4 self-end"
      src="/img/global/testimony-icon.svg"
      alt="Icone"
      width={43}
      height={35}
    />
  </div>
)

export default TestimonyCard
