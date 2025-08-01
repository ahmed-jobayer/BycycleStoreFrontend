import Loading from "@/components/shared/Loading";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import {  Card, Descriptions, Tag } from "antd";

const CustomerDashboardLandingpage = () => {
 
  // Get full user from Redux
  const user = useAppSelector(useCurrentUser);
  const userId = user?._id;

  console.log(user);

  const { data, isLoading, isError } = useGetUserByIdQuery(userId!, {
    skip: !userId,
  });

  console.log(data);

  // loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loading />
      </div> 
    );
  }

  // error state
  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500">Failed to load user data.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  w-full  mt-10 ">
      <Card
        className="w-full p-2! shadow-md! rounded  h-full !pt-8"
        title={
          <div className="relative ">
            <img className="w-full h-[30vh] object-cover rounded-2xl" src={data?.data?.profileCover? data?.data?.profileCover : "https://t3.ftcdn.net/jpg/09/27/94/24/360_F_927942465_j6MgO2enbUJ3IHfr2hn8ZxGfY1Dshi8p.jpg" } alt="" />
            <img  className="absolute w-20 rounded-full bottom-2 left-2" src={data?.data?.profileImage? data?.data?.profileImage : "data:image/png;base64,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"}/>
            
          
            {/* <div className="flex items-center gap-4">

            <Avatar size={48} icon={<UserOutlined />} />
            <div >
              <h2 className="text-xl font-bold m-0">{data?.data?.name}</h2>
              <p className="text-sm text-gray-500 m-0">{data?.data?.email}</p>
            </div>
            </div> */}
          </div>
        }
      >
        <Descriptions
          title="Profile Details"
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xxl: 1, xl: 1 }}
          className="mt-4"
        >
          <Descriptions.Item label="Name">{data?.data?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{data?.data?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={data?.data?.role === "admin" ? "purple" : "blue"}>
              {data?.data?.role.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag
              color={
                data?.data?.status === "active"
                  ? "green"
                  : data?.data?.status === "inactive"
                  ? "orange"
                  : "red"
              }
            >
              {data?.data?.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Password Change Required">
            <Tag color={data?.data?.needsPasswordChange ? "red" : "green"}>
              {data?.data?.needsPasswordChange ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          {data?.data?.passwordChangedAt && (
            <Descriptions.Item label="Last Password Change">
              {new Date(data?.data?.passwordChangedAt).toLocaleString()}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
};

export default CustomerDashboardLandingpage;
