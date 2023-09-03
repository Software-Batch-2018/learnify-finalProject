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
            className="bg-transparent z-30 fixed  w-full  flex items-center justify-center top-0 left-0"
          />
          <div className="fixed inset-40  overflow-hidden z-40">
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
              className="max-h-full z-50 overflow-auto rounded-lg bg-gray-50 dark:bg-gray-900       dark:text-white text-black"
            >
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
