import { useSelector } from "react-redux";
import {
  useGetRazorpayConfigQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation
} from "../Services/paymentServices/paymentServices";
import { loadRazorpay } from "../utils/loadRazorpay";



const CourseCard = ({ course }) => {
  const { name, description, duration, instructor, price, _id: courseId } = course;

  const { data: razorpayConfig, isLoading, isError } = useGetRazorpayConfigQuery();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const {user}=useSelector(state=>state.auth)
  console.log(user)

  const onBuy = async () => {
    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded || !razorpayConfig) {
        alert("Unable to load Razorpay or config missing");
        return;
      }

      // 🔥 Hit your backend controller to create the order
      const userId = user.id; // Replace with actual logged-in user ID
      const {order} = await createOrder({ courseId, userId }).unwrap();
      console.log(order,"order")

      const options = {
        key: razorpayConfig.keyId,
        amount: order.amount, // from backend
        currency: "INR",
        name,
        description,
        order_id: order.id, // 👈 required for Razorpay
        handler: async function (response) {
          console.log("Payment successful:", response);
          await verifyPayment({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            courseId,
            userId
          })},
        prefill: {
          name: user.name,
          email: user.mail
        },
        theme: {
          // color: "#3399cc"
          color:"#062838ff"
        }
      };
     

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{name}</h5>
        <p className="card-text">{description}</p>
        <ul className="list-unstyled mb-3">
          <li><strong>Instructor:</strong> {instructor}</li>
          <li><strong>Duration:</strong> {duration}</li>
          <li><strong>Price:</strong> ₹{price}</li>
        </ul>
        <div className="d-grid">
          <button className="btn btn-success btn-lg" onClick={()=>{onBuy(courseId)}} disabled={isLoading || isError}>
            🛒 Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;