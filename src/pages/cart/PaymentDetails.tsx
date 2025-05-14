/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "@/components/shared/CustomButton";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import {
  CartProduct,
  orderedProductsSelector,
  orderSelector,
  resetCart,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const currencyFormatter = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(value);

const PaymentDetails = () => {
  //* redux
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(orderedProductsSelector);
  const order = useAppSelector(orderSelector);
  const [userId, setUserId] = useState("");
  const axiosCommon = useAxiosCommon()

  //* user info
  useEffect(() => {
    const localUser = localStorage.getItem("userData");
    if (localUser) {
      const user = JSON.parse(localUser);
      setUserId(user?._id);
    }
  }, []);

  //* router
  const navigate = useNavigate();

  const subTotal = cart.products.reduce(
    (total: number, product: CartProduct) =>
      total + product.price * product.orderQuantity,
    0
  );

  const shippingCost = !cart.city ? 0 : cart.city === "Dhaka" ? 50 : 100;
  const grandTotal = subTotal + shippingCost;

  //* order handle
  const handleOrder = async () => {
    //* toast id
    const orderLoading = toast.loading("Order is in process");

    try {
      if (!userId) {
        navigate("/login");
        throw new Error("Please login first.");
      }
      if (!cart.city) {
        throw new Error("City is missing");
      }
      if (!cart.shippingAddress) {
        throw new Error("Shipping address is missing");
      }
      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }

      //* submit type match
      const orderData = {
        ...order,
        user: userId as string,
        totalPrice: grandTotal as number,
        paymentStatus: 'UNPAID',
        shippingStatus: 'PENDING'

      };

      console.log(orderData);

      //* Perform order submission logic (e.g., sending data to an API)
      const response = await axiosCommon.post(
        `/api/orders/create-order`,
        orderData,
      );
      console.log(response);

      console.log(response.data.success);

      if (response.data.success) {
        toast.success(response.data.message, { id: orderLoading });
        //? Once the order is placed, reset the cart
        dispatch(resetCart());
        // toast.success("Order placed successfully!");
        window.location.replace(response.data.data.GatewayPageURL);
      }

      // if (!res.success) {
      //   toast.error(res.message, { id: orderLoading });
      // }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };


  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>

      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>

      <CustomButton
        textName="Order Now"
        handleAnything={handleOrder}
        className="w-full font-semibold py-1!"
        // disabled={isOrderDisabled}
      />
    </div>
  );
};

export default PaymentDetails;
