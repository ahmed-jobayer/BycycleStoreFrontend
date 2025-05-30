import CustomButton from "@/components/shared/CustomButton";
import Loading from "@/components/shared/Loading";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Flex, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/api/authApi";
import { setUser, TUserFromToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { StepBack } from "lucide-react";

const Login = () => {
  // useLogin mutation hook
  const [login, { isLoading }] = useLoginMutation();

  // navigation
  const navigate = useNavigate();

  // useAppDispatch hook
  const dispatch = useAppDispatch();

  // loading effect state
  const [redirecting, setRedirecting] = useState(false);

  // onFinish function for submitting the form
  const onFinish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    // console.log("Received values of form: ", values);

    const toastId = toast.loading("Logging in...");

    const userInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token);

      if (user) {
        dispatch(
          setUser({
            user: res?.data as TUserFromToken,
            token: res?.token,
          })
        );

        // Persist token based on "remember me"
        if (values.remember) {
          localStorage.setItem("authToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.data));
        } else {
          sessionStorage.setItem("authToken", res.token);
          sessionStorage.setItem("userData", JSON.stringify(res.data));
        }

        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });

        navigate("/");
      } else {
        toast.error("Failed to verify", { id: toastId });
        return <Navigate to="/login" replace={true} />;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.log('error',error)
      toast.error(`${error?.data?.message || "Something went wrong!"}`, {
        id: toastId,
      });
      return <Navigate to="/login" replace={true} />;
    }
  };

  // Check if the user is already logged in when the component is mounted
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token); // You can verify if the token is valid here
      if (user) {
        setRedirecting(true); // Trigger Loading state

        // Delay the navigation by 1 second (1000 ms)
        const timeout = setTimeout(() => {
          toast.info("You are already logged in!");
          // If the token is valid, redirect to home
          navigate("/");
        }, 1000);

        // Optional: clear timeout if the component unmounts before it completes
        return () => clearTimeout(timeout);
      }
    }
  }, [navigate]); // Empty dependency array to run once when the component is mounted

  const [form] = Form.useForm();

  // loading
  if (redirecting) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 border rounded shadow-md border-green shadow-gdarkGreen">
        <Form
          form={form}
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <div className="flex justify-center gap-4 mb-4">
            <CustomButton
              className="!py-1"
              textName="Admin"
              handleAnything={() => {
                form.setFieldsValue({
                  email: "jbadmin@gmail.com",
                  password: "123456",
                });
              }}
            />
            <CustomButton
              className="!py-1"
              textName="Customer"
              handleAnything={() => {
                form.setFieldsValue({
                  email: "user@example.com",
                  password: "123456",
                });
              }}
            />
          </div>

          {/* email */}
          <label>Email</label>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} type="email" placeholder="Email" />
          </Form.Item>

          {/* password */}
          <label>Password</label>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* remember me and forget password */}
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">Forgot password</Link>
            </Flex>
          </Form.Item>

          {/* login button */}
          <Form.Item>
            <CustomButton
              type="submit"
              className="w-full !py-1.5 !bg-green !text-black"
              textName={
                isLoading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Log in"
                )
              }
            />
            <p className="text-center mt-2">
              Don&apos;t have an account?{" "}
              <Link to="/register">Register now!</Link>
            </p>
          </Form.Item>
        </Form>
        <Link to="/" className="flex justify-center">
          <CustomButton
            textName={
              <div className="flex gap-1 justify-content-center items-center ">
                <StepBack />
                Back to Home
              </div>
            }
            className="!py-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default Login;
