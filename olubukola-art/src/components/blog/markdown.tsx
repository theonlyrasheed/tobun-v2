import { PortableImage } from "@/components/shared/portable-image";
import { Link } from "@tanstack/react-router";

export const Markdown = {
  block: {
    normal: ({ children }: any) => <p className='py-2'>{children}</p>,
    h1: ({ children }: any) => (
      <h1 className='my-6 text-4xl  font-bold md:text-5xl'>{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className='my-6 text-3xl  font-semibold md:text-4xl'>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className='my-6 text-2xl  font-semibold md:text-3xl'>{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className='my-6 text-xl font-semibold md:text-2xl'>{children}</h4>
    ),
    h5: ({ children }: any) => (
      <h5 className='my-6 text-lg  font-semibold md:text-xl'>{children}</h5>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className='my-2 border-l-4 border-primary-5 pl-2 italic'>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className='my-4 list-disc pl-7'>{children}</ul>
    ),
    number: ({ children }: any) => <ol className='my-4 pl-7'>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className='my-2 pl-1'>{children}</li>,
    number: ({ children }: any) => (
      <li className='my-1.5 list-decimal pl-1'>{children}</li>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const href: string | undefined = value?.href;
      if (!href) return children;

      const isExternal =
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#");

      return isExternal ? (
        <a
          href={href}
          className='text-decoration-underline text-primary-5'
          target={href.startsWith("http") || href.startsWith("//") ? "_blank" : undefined}
          rel={
            href.startsWith("http") || href.startsWith("//")
              ? "noreferrer noopener"
              : undefined
          }
        >
          {children}
        </a>
      ) : (
        <Link to={href} className='text-decoration-underline text-primary-5'>
          {children}
        </Link>
      );
    },
  },
  strong: ({ children }: any) => (
    <strong className='font-semibold'>{children}</strong>
  ),
  emphasis: ({ children }: any) => <em className='font-italic'>{children}</em>,
  code: ({ children }: any) => (
    <span className='rounded-md bg-gray-300 bg-opacity-15 px-1 py-2 font-mono text-sm font-bold leading-normal'>
      {children}
    </span>
  ),

  types: {
    // code: ({ value }) => <CopyableCodeBlock>{value}</CopyableCodeBlock>,
    image: ({ value }: any) => <PortableImage value={value} />,
  },
};
