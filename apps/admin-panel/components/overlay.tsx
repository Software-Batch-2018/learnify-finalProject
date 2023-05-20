import React from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { m } from 'framer-motion';

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.PropsWithoutRef<HTMLMotionProps<'div'>>
>((props, ref) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ref}
      {...props}
      className="fixed inset-0 z-10 bg-gray-900/70"
    />
  );
});

Overlay.displayName = 'Dialog Overlay';
export default Overlay;
