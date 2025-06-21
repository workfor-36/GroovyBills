import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useEffect, useRef } from "react";

const CashierModal = ({isOpen, closeModal}) => {
   const modalRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

   // Close modal if clicked outside the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 w-full h-screen flex items-center justify-center">
      <div ref={modalRef} className="w-[90%] max-w-sm md:max-w-md lg:max-w-md h-72 p-5 bg-teal-950 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg justify-center">
        <h1 className="text-lg md:text-xl font-semibold text-white">Welcome Back <br /></h1>
          <h1 className="text-lg md:text-xl font-semibold text-white">to the Cash Counter !!</h1>

        <div className="w-80 flex flex-col gap-3">
          <div className="w-full h-10 flex items-center gap-2 bg-teal-800 p-2 rounded-xl">
            <MdAlternateEmail/>
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full h-10 flex items-center gap-2 bg-teal-800 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between gap-16 mt-4 w-full text-white h-12">
          <button className="flex-1 p-2 bg-cyan-900 rounded-xl hover:bg-cyan-950 text-sm md:text-base cursor-pointer">
            Login
          </button>
          <button
            className="flex-1 p-2 bg-cyan-900 rounded-xl hover:bg-cyan-950 text-sm md:text-base cursor-pointer"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashierModal;