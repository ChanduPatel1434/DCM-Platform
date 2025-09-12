import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CartDrawer from './CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCartQuery } from '../../../Services/student/cartServices';

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(state => state.auth);

  const { data: cartData } = useGetCartQuery(user?.id, {
    skip: !user,
    pollingInterval: 30000
  });

  const itemCount = cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 400, damping: 20 }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative">
      <motion.button
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(true)}
        aria-label="Shopping cart"
        className="relative p-3 bg-white shadow-md rounded-full border border-gray-200 hover:border-primary transition-all duration-200"
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: itemCount > 0 ? 1.05 : 1 }}
          transition={{ repeat: itemCount > 0 ? Infinity : 0, repeatType: 'reverse', duration: 0.6 }}
        >
          <ShoppingCart size={22} className="text-gray-700" />
        </motion.div>

        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center shadow-lg ring-2 ring-white"
            >
              {itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}