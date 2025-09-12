import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  setCartItems,
  selectCartTotal,
  selectCartLoading
} from '../../../features/cartSlice';
import {
  useRemoveItemMutation,
  useUpdateQuantityMutation,
  useGetCartQuery
} from "../../../Services/student/cartServices";
import { toast } from 'react-hot-toast';
import { X, Plus, Minus, Trash2, ShoppingBag, Loader } from 'lucide-react';
import { useEffect } from 'react';

export default function CartDrawer({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const loading = useSelector(selectCartLoading);
  const { user } = useSelector(state => state.auth);

  const { data: cartData, refetch } = useGetCartQuery(user?.id, {
    skip: !user || !isOpen
  });

  const [removeItem] = useRemoveItemMutation();
  const [updateQuantityApi] = useUpdateQuantityMutation();

  useEffect(() => {
    if (cartData && isOpen) {
      dispatch(setCartItems(cartData.items || []));
    }
  }, [cartData, isOpen, dispatch]);

  const handleRemove = async (courseId) => {
    try {
      if (user) {
        await removeItem({ userId: user.id, courseId }).unwrap();
        refetch();
      }
      toast.success('Item removed from cart');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const handleQuantityChange = async (id, newQuantity) => {
    try {
      if (user) {
        await updateQuantityApi({
          userId: user.id,
          courseId: id,
          quantity: newQuantity
        }).unwrap();
        refetch();
      }
    } catch {
      toast.error('Failed to update quantity');
    }
  };

  const handleClearAll = async () => {
    try {
      for (const item of items) {
        await removeItem({ userId: user.id, courseId: item._id }).unwrap();
      }
      refetch();
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 1000
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: '400px',
              maxWidth: '90%',
              background: '#fff',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column'
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
          >
            {/* Header */}
            <div style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
              <strong>Your Cart</strong>
              <div>
                {items.length > 0 && (
                  <button onClick={handleClearAll} disabled={loading} style={{ marginRight: '10px' }}>
                    Clear All
                  </button>
                )}
                <button onClick={onClose} aria-label="Close">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <ShoppingBag size={40} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item._id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '8px 0' }}>
                    <div style={{ width: '60px', height: '60px', marginRight: '10px', background: '#f5f5f5' }}>
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.title}</span>
                        <button onClick={() => handleRemove(item._id)} disabled={loading}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.9em', color: '#555' }}>₹{item.price}</div>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)} disabled={loading || item.quantity <= 1}>
                          <Minus size={12} />
                        </button>
                        <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)} disabled={loading}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Total:</strong>
                  <strong>₹{total}</strong>
                </div>
                <button
                  onClick={() => toast.success('Proceeding to checkout...')}
                  disabled={loading}
                  style={{ width: '100%', padding: '10px', marginBottom: '5px' }}
                >
                  Checkout ({items.length} items)
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}