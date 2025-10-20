import React, { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <h3 className="text-xl font-bold text-gray-100">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-gray-400 hover:bg-gray-500/20 transition-colors"
                >
                  <Icon name="close" className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
