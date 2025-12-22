import { Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();
  const showButton = scroll.y > 100; // Show after scrolling 100px

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition='slide-up' mounted={showButton}>
        {(transitionStyles) => (
          <button
            onClick={() => scrollTo({ y: 0 })}
            className='bg-black p-3 md:p-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg'
            style={{ ...transitionStyles }}
            aria-label='Scroll to top'
          >
            <IconArrowUp size={24} className='md:size-7.5 text-white' />
          </button>
        )}
      </Transition>
    </Affix>
  );
}
