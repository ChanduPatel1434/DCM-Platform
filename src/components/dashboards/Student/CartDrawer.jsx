import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  setCartItems,
  selectCartTotal,
} from '../../../features/cartSlice';
import { useGetCartQuery } from "../../../Services/student/cartServices";
import { useCartHandlers } from './Cart/cartHandlers';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useCheckoutHandler } from "../../../features/paymentFlow";


export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const { user } = useSelector(state => state.auth);

  const { data: cartData, refetch } = useGetCartQuery(user?.id, {
    skip: !user || !isOpen
  });

  const {
    handleRemoveFromCart,
    handleClearCart,
    removeStatus,
    clearStatus
  } = useCartHandlers();

  const loading = removeStatus.isLoading || clearStatus.isLoading;

  useEffect(() => {
    if (cartData && isOpen) {
      dispatch(setCartItems(cartData.items || []));
    }
  }, [cartData, isOpen, dispatch]);

  const handleRemove = async (courseId) => {
    if (!user?.id) return;
    await handleRemoveFromCart({ userId: user.id, courseId });
    refetch();
  };

  const handleClearAll = async () => {
    if (!user?.id) return;
    await handleClearCart(user.id);
    refetch();
  };
  
  const { handleCheckout } = useCheckoutHandler();

  const handleBuyNow = async () => {
    const courseIds = items.map(item => item._id);
    const { success } = await handleCheckout({ courseIds, user });

    if (success) {
      await handleClearCart(user.id); 
      refetch();
      onClose(); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="cart-overlay"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="cart-drawer"
          >
            {/* Header */}
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={20} style={{ marginRight: '10px' }} />
                <strong>Your Shopping Cart</strong>
                {items.length > 0 && (
                  <span className="cart-count-badge">{items.length}</span>
                )}
              </div>
              <div className="cart-header-actions">
                {items.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    disabled={loading}
                    className="clear-all-btn"
                  >
                    Clear All
                  </button>
                )}
                <button onClick={onClose} className="close-btn" aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="cart-items-container">
              {items.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={60} className="empty-cart-icon" />
                  <p>Your cart is empty</p>
                  <p className="empty-cart-subtext">Start shopping to add items!</p>
                  <button onClick={onClose} className="continue-shopping-btn">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-image">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} />
                      ) : (
                        <div className="image-placeholder">
                          <ShoppingBag size={20} />
                        </div>
                      )}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-header">
                        <span className="cart-item-title">{item.name}</span>
                        <button
                          onClick={() => handleRemove(item._id)}
                          disabled={loading}
                          className="remove-item-btn"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="cart-item-price">₹{item.price}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">₹{total}</span>
                </div>
                <button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="checkout-btn"
                >
                  <span>Proceed to Checkout</span>
                  <span className="item-count">({items.length} items)</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}