import React, { useState, useRef, useEffect, useId } from 'react'

import { AccordionType } from '@/components/Accordion/Accordion.type'

const Accordion: React.FC<AccordionType> = ({ title, content, open, variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(open)
  const contentRef = useRef<HTMLDivElement>(null)
  const [maxHeight, setMaxHeight] = useState<string | number>('0px')

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight)
    } else {
      setMaxHeight('0px')
    }
  }, [isOpen])

  const toggleAccordion = () => setIsOpen(!isOpen)
  const reactId = useId()
  const panelId = `accordion-panel-${reactId}`
  const buttonId = `accordion-button-${reactId}`

  return (
    <div className={`w-full border-b border-border-subtle transition-colors duration-200 ${isOpen ? 'border-l-2 border-l-bc-primary bg-bc-primary/[0.04]' : ''} ${variant === 'faq' ? 'border-border-subtle/80' : ''}`}>
      {/* ETAPA SEO 08: pergunta como H3 (subordinada ao H2 da seção de FAQ)
          envolvendo o controle real <button>. Visual padronizado no DS. */}
      <h3 className="t-h4 text-text-primary">
        <button
          type="button"
          id={buttonId}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`bc-focus-ring group flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-4 py-4 text-left transition-colors duration-fast ease-bc hover:bg-surface-muted ${variant === 'faq' ? 'px-5 py-5 hover:bg-surface-card/70 sm:px-6' : ''}`}
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 t-h3-editorial font-normal text-bc-primary transition-[transform,color] duration-normal ease-bc ${isOpen ? 'rotate-45' : ''} ${variant === 'faq' ? 'text-bc-dark group-hover:text-bc-primary' : ''}`}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        ref={contentRef}
        className={`overflow-hidden transition-[max-height] duration-slow ease-bc motion-reduce:transition-none ${variant === 'faq' ? 'bg-surface-card/35' : ''}`}
        style={{ maxHeight }}
      >
        <p className={`px-4 pb-5 t-body leading-relaxed text-text-secondary ${variant === 'faq' ? 'max-w-[68ch] px-5 pb-6 sm:px-6' : ''}`}>{content}</p>
      </div>
    </div>
  )
}


export default Accordion
