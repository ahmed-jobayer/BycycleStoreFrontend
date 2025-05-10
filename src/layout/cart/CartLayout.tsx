import ResponsiveNavbar from "@/components/home/ResponsiveNavbar";
import Footer from "@/components/shared/Footer";
import Cart from "@/pages/cart/Cart";


const CartLayout = () => {
    return (
        <div className="w-full space-y-16">
        <ResponsiveNavbar />
      <div className="container mx-auto min-h-[65vh] space-y-6 sm:space-y-8 lg:space-y-12 px-2 ">
        <Cart />
      </div> 
      <Footer />
    </div>
    );
};

export default CartLayout;