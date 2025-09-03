// features/payments/usePaymentFlow.js
import { loadRazorpay } from '../../utils/loadRazorpay';
import { useCreateOrderMutation, useGetRazorpayConfigQuery, useVerifyPaymentMutation } from '../Services/paymentServices/paymentServices';

export function usePaymentFlow() {
  const { data: config } = useGetRazorpayConfigQuery();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const startPayment = async ({ courseId, user }) => {
    await loadRazorpay();
    if (!config?.keyId) throw new Error('Razorpay key not loaded');

    const { order } = await createOrder({ courseId, userId: user?._id }).unwrap();

    return new Promise((resolve, reject) => {
      const rzp = new window.Razorpay({
        key: config.keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Your App Name',
        description: 'Course purchase',
        order_id: order.id,
        prefill: { name: user?.name, email: user?.email, contact: user?.phone },
        notes: order.notes,
        theme: { color: '#1f6feb' },
        handler: async (response) => {
          try {
            const result = await verifyPayment(response).unwrap();
            if (result.success) resolve(result);
            else reject(new Error('Verification failed'));
          } catch (err) {
            reject(err);
          }
        }
      });
      rzp.open();
    });
  };

  return { startPayment };
}
