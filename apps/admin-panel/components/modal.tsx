import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import Overlay from './overlay';
import { GrClose } from 'react-icons/gr';
export function Modal({
  modal,
  setModal,
  children,
  height = 'default',
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  height?: 'full' | 'default';
}) {
  return (
    <AnimatePresence>
      {modal && (
        <div>
          <Overlay />

          <div
            className={`fixed ${
              height === 'full' ? 'inset-10 h-[90vh]' : 'inset-40'
            }   overflow-hidden z-40`}
          >
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
              className="h-full z-50 overflow-auto rounded-lg bg-gray-50 dark:bg-gray-900  dark:text-white text-black"
            >
              <div className="flex justify-end p-3 ">
                <GrClose
                  className="w-5 h-5 cursor-pointer "
                  onClick={() => setModal(false)}
                />
              </div>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
