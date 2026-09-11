import {
  checklistItemStyles,
  checklistItemIconStyles,
  checklistItemTitleStyles
} from './ChecklistItem.style'
import { ChecklistItemProps } from './ChecklistItem.type'

const ChecklistItem = ({
  title,
  description,
  box,
  color = 'teal',
  align = 'start',
  uppercase
}: ChecklistItemProps) => (
  <div className={checklistItemStyles({ box, align })}>
    <div className={checklistItemIconStyles({ box, color })}>✔</div>
    <div className="flex flex-col gap-2">
      <h3 className={checklistItemTitleStyles({ box, uppercase })}>{title}</h3>
      {description && <p className="t-body-lg">{description}</p>}
    </div>
  </div>
)

export default ChecklistItem
