import Link from "next/link";

const Header = () => {
  return (
    <header className="text-gray-600 body-font border border-b border-blue-100">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="ml-3 text-xl font-semibold">Stock Management</span>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center"></nav>
      </div>
    </header>
  );
};

export default Header;
