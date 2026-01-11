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
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import React from 'react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// ✨ jsxConverters now only requires defaultConverters + paragraphClassName as extra
const jsxConverters = ({
  defaultConverters,
  paragraphClassName,
  h1ClassName,
  h2ClassName,
  h3ClassName
}: {
  defaultConverters: ReturnType<JSXConvertersFunction<NodeTypes>>
  paragraphClassName?: string
  h1ClassName?: string
  h2ClassName?: string
  h3ClassName?: string
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }: any) => {
    const Tag = node.tag as keyof JSX.IntrinsicElements

    const children = node.children.map((child: any, index: number) => {
      if (child.type === 'heading') {
        const inner = child.children.map((n: any, i: number) => {
          if (n.type === 'text') {
            return (
              <span
                key={i}
                className={cn(
                  n.format === 0 && 'font-faustina font-normal',
                  n.format === 1 && 'font-semibold',
                  n.format === 3 && 'font-faustina-italic font-semibold',
                )}
              >
                {n.text}
              </span>
            )
          }

          if (n.type === 'linebreak') {
            return <br key={i} />
          }

          return <React.Fragment key={i}>{nodesToJSX({ nodes: [n] })}</React.Fragment>
        })

        return <React.Fragment key={index}>{inner}</React.Fragment>
      }

      if (child.type === 'linebreak') {
        return <br key={index} />
      }

      return <React.Fragment key={index}>{nodesToJSX({ nodes: [child] })}</React.Fragment>
    })

    if (node.tag === 'h4') {
      return <Tag className="text-sm md:text-lg font-normal">{children}</Tag>
    }

    if (node.tag === 'h3') {
      return <Tag className={cn("text-xl md:text-2xl", h3ClassName)}>{children}</Tag>
    }

    if (node.tag === 'h2') {
      return (
        <Tag className={cn(h2ClassName || "section-title !mb-0 font-faustina font-normal")}>
          {children}
        </Tag>
      )
    }

    if (node.tag === 'h1') {
      // map over children and preserve text + formatting + linebreaks
      const children = node.children.map((child: any, index: number) => {
        if (child.type === 'text') {
          return (
            <span
              key={index}
              className={cn(
                child.format === 0 && 'font-faustina font-normal',
                child.format === 1 && 'font-faustina font-semibold',
                child.format === 2 && 'font-faustina-italic',
                child.format === 3 && 'font-faustina-italic font-semibold',
              )}
            >
              {child.text}
            </span>
          )
        }

        if (child.type === 'linebreak') {
          return <br key={index} />
        }

        // fallback for other node types (like links)
        return <React.Fragment key={index}>{nodesToJSX({ nodes: [child] })}</React.Fragment>
      })

      return <span className={h1ClassName}>{children}</span>
    }

    return <>{children}</>
  },
  paragraph: ({ node, nodesToJSX }: any) => {
    const children = node.children.map((child: any, index: number) => {
      // handle plain text with formatting (same logic as h1)
      if (child.type === 'text') {
        return (
          <span
            key={index}
            className={cn(
              child.format === 0 && 'font-faustina font-normal',
              child.format === 1 && 'font-faustina font-semibold',
              child.format === 2 && 'font-faustina-italic',
              child.format === 3 && 'font-faustina-italic font-semibold',
              paragraphClassName,
            )}
          >
            {child.text}
          </span>
        )
      }
      // handle italic/em nested tags (Slate usually calls them "em" or "italic")
      if (child.type === 'em' || child.type === 'italic') {
        return (
          <span key={index} className="font-faustina-italic">
            {nodesToJSX({ nodes: child.children })}
          </span>
        )
      }

      // handle line breaks
      if (child.type === 'linebreak' || child.type === 'lineBreak') {
        return <br key={index} />
      }

      // fallback for other elements (links, strong, etc.)
      return <React.Fragment key={index}>{nodesToJSX({ nodes: [child] })}</React.Fragment>
    })

    return <p className={cn('mt-0', paragraphClassName)}>{children}</p>
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
  h1ClassName?: string
  h2ClassName?: string
  h3ClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    paragraphClassName,
    h1ClassName,
    h2ClassName,
    h3ClassName,
    ...rest
  } = props

  // ✅ Wrapper to inject paragraphClassName dynamically
  const convertersWrapper = ({
    defaultConverters,
  }: {
    defaultConverters: ReturnType<JSXConvertersFunction<DefaultNodeTypes>>
  }) => jsxConverters({ defaultConverters, paragraphClassName, h1ClassName, h2ClassName, h3ClassName })

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
