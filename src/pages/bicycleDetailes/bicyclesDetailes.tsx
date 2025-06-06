import CustomButton from "@/components/shared/CustomButton";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { Card, Col, Image, Row, Skeleton, Typography } from "antd";
import { useParams } from "react-router-dom";
import BicycleMaintenanceTips from "./BicycleMaintenanceTips";
import RelatedProducts from "./RelatedProducts";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/utils/types";
import { addProduct } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

const BicyclesDetailPage = () => {
  const { Title, Text } = Typography;
  const { id } = useParams(); // Get the product ID from the URL parameters
  const { data, isLoading, error } = useGetProductByIdQuery(id!);
  const productData = data?.data;
  const dispatch = useAppDispatch();

  // console.log(productData);

  if (isLoading) return <Skeleton active />;
  if (error) return <p className="text-red-500">Something went wrong!</p>;

  const handleAddToCart = (product: IProduct) => {
    console.log(product);
    dispatch(addProduct(product));
    toast.success("Item Added to The Cart");
  };

  return (
    <div className="mx-auto p-6 font-sans shadow-xl  rounded-4xl">
      {/* Product Image and Details Section */}
      <Row gutter={24}>
        {/* Left Column: Product Image */}
        <Col xs={24} sm={12} md={8}>
          <Image
            src={productData?.Img}
            alt={productData?.name}
            className="w-full rounded-xl shadow-lg"
          />
        </Col>

        {/* Right Column: Product Details */}
        <Col xs={24} sm={12} md={16}>
          <Card bordered={false} className="p-6 shadow-xl rounded-lg">
            <Title level={2} className="text-3xl font-semibold">
              {productData?.name}
            </Title>
            <Text className="font-medium text-lg">Brand: </Text>
            <Text>{productData?.brand}</Text>
            <p className="mt-2">{productData?.description}</p>
            <Row gutter={16} className="mt-4">
              <Col span={12}>
                <Text strong>Type:</Text> {productData?.type}
              </Col>
              <Col span={12}>
                <Text strong>Price:</Text> ${productData?.price}
              </Col>
            </Row>
            <Row gutter={16} className="mt-2">
              <Col span={12}>
                <Text strong>Stock:</Text>{" "}
                {productData?.inStock ? "Available" : "Out of Stock"}
              </Col>
              {/* <Col span={12}>
                <Text strong>Updated:</Text>{" "}
                {new Date(productData?.updatedAt as Date).toLocaleDateString()}
              </Col> */}
            </Row>

            <div className="mt-6">
              {/* Button Section for "Buy Now" */}
              {productData && (
                <div onClick={() => handleAddToCart(productData)}>
                  <CustomButton
                    textName={
                      <div className="flex gap-1 justify-content-center items-center">
                        <ShoppingCart />
                        Add to Cart
                      </div>
                    }
                    className="w-[90%] !py-2"
                  />
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Maintenance Tips Section */}
      <div className="mt-8">
        <BicycleMaintenanceTips />
      </div>
      <div className="my-2 mx-8 p-4">
        <RelatedProducts
          brand={productData?.brand as string}
          type={productData?.type as string}
          currentProductId={productData?._id as string}
        />
      </div>
    </div>
  );
};

export default BicyclesDetailPage;
