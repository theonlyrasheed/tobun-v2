import * as React from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Text, Box } from '@mantine/core'
import { urlFor } from '@/sanity/client'

/* ── Press / editorial components ─────────────────────────────── */
export const pressComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Text
        component='p'
        style={{ margin: '0 0 1.35em', fontSize: 'clamp(1.08rem, 1.35vw, 1.22rem)', lineHeight: 1.75, color: 'var(--ink)' }}
      >
        {children}
      </Text>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className='art-quote'
        style={{ margin: 'clamp(34px, 4vw, 52px) 0', padding: 0, textAlign: 'center' }}
      >
        <Text
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-.01em',
            fontSize: 'clamp(1.5rem,3vw,2.3rem)',
            lineHeight: 1.22,
            color: 'var(--ink)',
            margin: 0,
            textWrap: 'balance',
          }}
        >
          {children}
        </Text>
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className='art-fig' style={{ margin: 'clamp(30px,4vw,48px) 0' }}>
        <Box
          className='img'
          style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface)', aspectRatio: '3/2' }}
        >
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            loading='lazy'
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>
        {value.alt && (
          <figcaption
            style={{
              marginTop: '12px',
              fontFamily: 'var(--mono)',
              fontSize: '.68rem',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}
          >
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
}

/* ── Legal / prose components ─────────────────────────────────── */
export const legalComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className='prv-section-title'>{children}</h2>,
    h3: ({ children }) => <h3 className='prv-section-title' style={{ fontSize: '1.08rem' }}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '3px solid var(--sand-line)',
          margin: '0 0 1.1em',
          paddingLeft: '1.2em',
          color: 'var(--ink-soft)',
          fontStyle: 'italic',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        style={{ color: 'var(--indigo)' }}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

/* ── Default renderer (press/editorial) ───────────────────────── */
export function PortableTextRenderer({ value }: { value: any[] }) {
  return <PortableText value={value} components={pressComponents} />
}
