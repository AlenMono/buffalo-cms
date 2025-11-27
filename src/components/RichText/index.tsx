import type { JSX } from 'react'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import React from 'react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// ✨ jsxConverters now only requires defaultConverters + paragraphClassName as extra
const jsxConverters = (
  defaultConverters: ReturnType<JSXConvertersFunction<NodeTypes>>,
  paragraphClassName?: string,
) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }: any) => {
    const Tag = node.tag as keyof JSX.IntrinsicElements
    const children = node.children.map((child: any, index: number) =>
      child.type === 'lineBreak' ? (
        <br key={index} />
      ) : (
        <React.Fragment key={index}>{nodesToJSX({ nodes: [child] })}</React.Fragment>
      ),
    )

    if (node.tag === 'h4') {
      return (
        <Tag className="text-lg font-normal">
          {children}
        </Tag>
      )
    }

    if (node.tag === 'h2') {
      return (
        <Tag className="!text-[36px] leading-[44px] xl:!text-[44px] xl:leading-[52px] !mb-0 font-faustina font-normal">
          {children}
        </Tag>
      )
    }
    if (node.tag === 'h1') {
      return (
        <Tag className="text-4xl leading-[44px] xl:text-[56px] xl:leading-[64px] font-semibold text-text-primary font-faustina-italic">
          {children}
        </Tag>
      )
    }
    return <Tag>{children}</Tag>
  },
  paragraph: ({ node, nodesToJSX }: any) => {
    const children = node.children.map((child: any, index: number) =>
      child.type === 'lineBreak' ? (
        <br key={index} />
      ) : (
        <React.Fragment key={index}>{nodesToJSX({ nodes: [child] })}</React.Fragment>
      ),
    )
    return <p className={cn('m-0', paragraphClassName)}>{children}</p>
  },
  blocks: {
    banner: ({ node }: any) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }: any) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }: any) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }: any) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  paragraphClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, paragraphClassName, ...rest } = props

  // ✅ Wrapper to inject paragraphClassName dynamically
  const convertersWrapper = ({
    defaultConverters,
  }: {
    defaultConverters: ReturnType<JSXConvertersFunction<DefaultNodeTypes>>
  }) => jsxConverters(defaultConverters, paragraphClassName)

  return (
    <ConvertRichText
      converters={convertersWrapper}
      className={cn(
        'payload-richtext',
        {
          'max-w-none': !enableGutter,
          'prose md:prose-md max-w-none': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
