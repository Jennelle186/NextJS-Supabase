import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center mt-8">
      <hr className="border-t-2 border-gray-300 my-4" />
      <p className="py-4 text-gray-600">
        &copy; {currentYear} Water Refilling Stations in Zamboanga City. All rights reserved.
      </p>
      <p className="py-2 text-gray-700">
        Created for{" "}
        <span className="font-black">
          MIT 202 Project
        </span>
      </p>
    </footer>
  );
};

export default Footer;
