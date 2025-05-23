import { Modal } from "antd";
import img from "../../assets/images/img/doodle.svg";
import CustomButton from "../shared/CustomButton";
import { toast } from "sonner";

//  interface for contact modal
interface ContactUsProps {
  modal2Open: boolean;
  setModal2Open: React.Dispatch<React.SetStateAction<boolean>>;
}

// handle submit
const handleClick = (
    e: React.FormEvent<HTMLFormElement>,
    setModal2Open: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
  e.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement)?.value;
  const email = (document.getElementById("email") as HTMLInputElement)?.value;
  const message = (document.getElementById("message") as HTMLTextAreaElement)
    ?.value;

  if (!name) {
    toast.error("Please fill in required name field.");
    return;
  }
  if (!email) {
    toast.error("Please fill in required email field.");
    return;
  }
  if (!message) {
    toast.error("Please fill in required message field.");
    return;
  }

  toast.success("Message sent!");
  setModal2Open(false);
};

const ContactUs: React.FC<ContactUsProps> = ({ modal2Open, setModal2Open }) => {
  return (
    <div>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title="Hi! Nice to know your thoughts!"
        centered
        open={modal2Open}
        footer={null} // Remove default footer
        onCancel={() => setModal2Open(false)}
        width={1000} // Optional: Adjust modal width to fit form
      >
        <div className="grid grid-cols-1 gap-8 px-4 py-6 mx-auto rounded-lg md:grid-cols-2 md:px-6 lg:px-8 xl:px-10 dark:bg-gray-100 dark:text-gray-800">
          {/* Left Side */}
          <div className="flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold leading-tight lg:text-5xl">
                Let's talk!
              </h2>
              <div className="dark:text-gray-600">
                Any kind of related query? Let us know!
              </div>
            </div>
            <img src={img} alt="Doodle" className="p-6 h-40 md:h-52 lg:h-64" />{" "}
            {/* ✅ Responsive height */}
          </div>

          {/* Right Side - Form */}
          <form noValidate className="space-y-6" onSubmit={(e) => handleClick(e, setModal2Open)}>
            <div>
              <label htmlFor="name" className="text-sm">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder=""
                required
                className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600" // focus ring
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600" // focus ring
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm">
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                required
                className="w-full p-3 rounded bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600" // focus ring
              ></textarea>
            </div>

            {/* handle function & api needed for work */}
            <CustomButton
              textName="Send Message"
              className="w-full p-3 text-sm font-bold tracking-wide uppercase"
              type="submit"
            />
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUs;
