import CustomButton from "@/components/shared/CustomButton";
import Address from "./Address";
import CartProducts from "./CartProducts";
import PaymentDetails from "./PaymentDetails";
import { useAppDispatch } from "@/redux/hooks";
import { resetCart } from "@/redux/features/cart/cartSlice";



const Cart = () => {
    const dispatch = useAppDispatch();

    const handleClearCart = () => {
      dispatch(resetCart());
    };
  
    return (
      <div className=" flex flex-col lg:grid grid-cols-12 gap-8 my-5 container mx-auto">
        <CartProducts />
        <Address />
        <PaymentDetails />
        {/* Optional: Add a "Clear Cart" button */}
        <div className="col-span-12 flex justify-center items-center mt-5">
          <CustomButton
            textName="Clear Cart"
            handleAnything={handleClearCart}
            className="w-[90%] text-xl font-semibold py-2!"
          />
        </div>
      </div>
    );
};

export default Cart;