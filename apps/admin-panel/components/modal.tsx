import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import Overlay from './overlay';
export function Modal({
  modal,
  setModal,
  children,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {modal && (
        <div className="">
          <Overlay />
          <div className="fixed flex h-full overflow-y-scroll w-full  z-40  items-center justify-center top-0 left-0">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -50,
                opacity: 0,
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="rounded-lg bg-gray-50 dark:bg-gray-900  z-50     dark:text-white text-black"
            >
              {children}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
              onClick={() => setModal((modal) => !modal)}
              className="bg-transparent fixed h-full w-full flex items-center justify-center top-0 left-0"
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
