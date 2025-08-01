/* eslint-disable @typescript-eslint/no-unused-vars */
// import image
import cycle from "../../assets/images/img/bicycle.jpg";

import { Card, Flex, Skeleton } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import CustomButton from "./CustomButton";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/utils/types";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export interface ItemData {
  map?(arg0: (d: ItemData) => JSX.Element): import("react").ReactNode;
  name: string;
  Img?: string;
  brand: string;
  price: number;
  type: string;
  description: string;
  quantity: number;
  inStock: boolean;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ItemsCardProps {
  data: ItemData;
  isPending: boolean;
}

const ItemsCard: React.FC<ItemsCardProps> = ({ data, isPending }) => {
  // loading state
  const [loading, _setLoading] = useState<boolean>(isPending);
  const dispatch = useAppDispatch();

  // destructure items
  const {
    // brand,
    // description,
    // inStock,
    name,
    // quantity,
    Img,
    // type,
    // updatedAt,
    _id,
    price,
    // createdAt,
  } = data;

  const handleAddToCart = (product: IProduct) => {
    dispatch(addProduct(product));
    toast.success("Item Added to The Cart");
  };

  // button for card
  const actions: React.ReactNode[] = [
    <>
      <CustomButton
        className="w-[90%] !py-2 transition-transform duration-300"
        handleAnything={(e) => {
          e.preventDefault(); //  Prevent <Link> default nav
          e.stopPropagation(); //  Prevents the Link from triggering / event bubbling
          handleAddToCart(data);
          // navigate(`/checkout/${_id}`);
        }}
        textName={
          <div className="flex gap-1 justify-content-center items-center ">
            <ShoppingCart />
            Add to Cart
          </div>
        }
      />
    </>,
  ];

  return (
    <Flex gap="middle" align="start" vertical className="shadow-xl rounded-2xl">
      {/* <Switch
          checked={!loading}
          onChange={(checked) => setLoading(!checked)}
        /> */}

      {loading ? (
        <div className="w-full p-6">
          <Skeleton active avatar paragraph={{ rows: 4 }} />
        </div>
      ) : (
        <Link to={`/bicycles/${_id}`} className=" w-full">
          <Card
            loading={loading}
            actions={actions}
            style={{ minWidth: 200 }}
            className="w-full "
          >
            {!Img ? (
              <img alt="Bicycle" src={cycle} className="mb-6 w-full  " />
            ) : (
              <img
                alt="Bicycle"
                src={Img}
                className="mb-6 w-full h-40 object-cover hover:scale-110 transition-transform duration-500"
              />
            )}

            <Card.Meta
              className=""
              // avatar={
              //   <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              // }
              title={name}
              description={
                <div className="space-y-2">
                  {/* <p className="mb-2 min-h-20 font-semibold">{description}</p> */}
                  {/* <p className="flex justify-between">
                    <span className="font-medium">Brand:</span>
                    <span className="font-serif">{brand}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="font-serif">{type}</span>
                  </p> */}
                  <p className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-serif">${price}</span>
                  </p>
                  {/* <p className="flex justify-between">
                    <span className="font-medium">Quantity:</span>
                    <span className="font-serif">{quantity}</span>
                  </p> */}
                  {/* <p className="flex justify-between">
                    <span className="font-medium">In Stock:</span>
                    <span className="font-serif">{inStock ? "Yes" : "No"}</span>
                  </p> */}
                </div>
              }
            />
          </Card>
        </Link>
      )}
    </Flex>
  );
};

export default ItemsCard;
