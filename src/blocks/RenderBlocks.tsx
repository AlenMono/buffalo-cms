import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { CustomBlock } from '@/blocks/Custom/Component'
import { FormBlock } from '@/blocks/Form/Component'

const blockComponents: Partial<Record<Page['layout'][number]['blockType'], React.FC<any>>> = {
  customBlock: CustomBlock,
  formBlock: FormBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][number][]
  pageSlug?: string
}> = ({ blocks, pageSlug }) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Block = blockComponents[block.blockType]

        if (!Block) return null

        return (
          <div className="container my-8 xl:my-16 py-8" key={index}>
            <Block {...block} pageSlug={pageSlug} disableInnerContainer />
          </div>
        )
      })}
    </>
  )
}
