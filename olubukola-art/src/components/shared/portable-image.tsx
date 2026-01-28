import { urlFor } from "@/utils/sanity";
import { Image } from "@mantine/core";

interface PortableImageProps {
  value: any;
}

export function PortableImage({ value }: PortableImageProps) {
  if (!value?.asset?._ref) {
    return value;
  }
  return (
    <>
      <div className='flex flex-col justify-center'>
        <Image
          alt={value.alt || "Image"}
          loading='lazy'
          src={`${urlFor(value)}`}
          height={value?.imageHeight}
          width={value?.imageWidth}
          fit='contain'
          className='!py-6'
        />
        {value.alt && (
          <i className='flex justify-center text-center text-gray-600'>
            {value.alt}
          </i>
        )}
      </div>
    </>
  );
}
