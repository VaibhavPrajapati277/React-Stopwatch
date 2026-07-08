import { useContext, useState } from "react";
import Bottom from "./Bottom";
import Footer from "./Footer";
import Login from "./Login";

import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/Cartcontext";
import Cart from "../pages/Cart";

function Header({ scrollToSection, categoryRefs, categories }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const handleSearch = () => {
    const formattedSearch =
      search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();

    const selectedRef = categoryRefs[formattedSearch];

    if (selectedRef) {
      scrollToSection(selectedRef);

      setShowSearch(false);

      setSearch("");
    } else {
      alert("Category not found");
    }
  };
  const { num } = useContext(CartContext);
  const { data } = useContext(CartContext);
  const { increaseQty, decreaseQty } = useContext(CartContext);

  // console.log(data);

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,

    0,
  );

  const handleclick = () => {
    if (data.length > 0) {
      navigate("/checkout");
    } else {
      window.alert("Your Cart is empty.");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="font-bold text-blue-500">MyShop</div>

          <div className="flex items-center justify-center gap-5 md:hidden">
            {/* Search */}
            <button onClick={() => setShowSearch(!showSearch)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>  

            {/* Login */}
            <button onClick={() => navigate("/login")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {/* Menu */}
            <button className="flex items-center justify-center w-8 h-8 text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
          <nav className=" hidden md:flex justify-start space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link to ="/contactus" className="hover:text-blue-600 transition">
              Contact Us
            </Link> 
            <Link to ="/aboutus" className="hover:text-blue-600 transition">
              About Us
            </Link> 
            <Link to ="/support" className="hover:text-blue-600 transition">
              Support
            </Link> 
          </nav>

          <div className="hidden md:flex gap-4 flex items-center">
            {/* Searchbar */}
            <div className="flex items-center gap-2 transition-all duration-300">
              {/* Search Input */}
              {showSearch && (
                <div className="relative w-52 md:w-64 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSearch(value);

                      const filtered = categories.filter((item) =>
                        item.categoryName
                          .toLowerCase()
                          .includes(value.toLowerCase()),
                      );

                      setFilteredCategories(filtered);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    className="
                                                        w-full
                                                        px-4
                                                        py-2
                                                        border
                                                        rounded-lg
                                                        focus:outline-none
                                                        focus:ring-2
                                                        focus:ring-blue-500
                                                    "
                  />

                  {/* Suggestions */}
                  {search && filteredCategories.length > 0 && (
                    <div
                      className="
                                                        absolute
                                                        top-full
                                                        left-0
                                                        w-full
                                                        bg-white
                                                        border
                                                        rounded-lg
                                                        mt-1
                                                        shadow-lg
                                                        z-50
                                                    "
                    >
                      {filteredCategories.map((item) => (
                        <p
                          key={item.id}
                          onClick={() => {
                            scrollToSection(categoryRefs[item.categoryName]);

                            setSearch("");

                            setShowSearch(false);
                          }}
                          className="
                                            p-2
                                            hover:bg-gray-100
                                            cursor-pointer
                                        "
                        >
                          {item.categoryName}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Search Icon */}
              {!showSearch && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="
        px-4
        py-2
        border
        rounded-lg
        cursor-pointer
    "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              )}

              {/* Close Button */}
              {showSearch && (
                <button
                  onClick={() => {
                    setShowSearch(false);

                    setSearch("");
                  }}
                  className="
                                                px-5
                                                py-2
                                                border
                                                rounded-lg
                                                cursor-pointer
                                            "
                >
                  ✕
                </button>
              )}
            </div>
            <div className="relative">
              {/* cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="px-4 py-2 border  rounded-lg text-black-500 cursor-pointer  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {data.length}
              </span>
            </div>
            {cartOpen && (
              <div
                className=" fixed inset-0 bg-black/40 z-40"
                onClick={() => setCartOpen(false)}
              />
            )}

            {/* Drawer */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                cartOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button
                  className="cursor-pointer"
                  onClick={() => setCartOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto h-[75%]">
                {data.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <Cart />
                )}
              </div>

              {/* <div className="absolute bottom-0 w-full p-4 border-t">
                                <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
                                    Checkout
                                </button>
                            </div> */}

              <div className="absolute bottom-0 w-full p-4 border-t bg-white">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">Total</span>

                  <span className="font-bold text-blue-600">₹{totalPrice}</span>
                </div>

                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                  onClick={handleclick}
                >
                  Checkout
                </button>
              </div>
            </div>

            {/* login button */}
            <button
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition cursor-pointer"
              type="button"
              onClick={() => navigate("/login")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>

            {/* <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="text-black bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                            Toggle modal
                        </button> */}
          </div>
        </div>
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value;

                  setSearch(value);

                  const filtered = categories.filter((item) =>
                    item.categoryName
                      .toLowerCase()
                      .includes(value.toLowerCase()),
                  );

                  setFilteredCategories(filtered);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearch("");
                }}
                className="px-4 py-2 border rounded-lg"
              >
                ✕
              </button>
            </div>

            {search && filteredCategories.length > 0 && (
              <div className="bg-white border rounded-lg mt-1 shadow-lg">
                {filteredCategories.map((item) => (
                  <p
                    key={item.id}
                    onClick={() => {
                      scrollToSection(categoryRefs[item.categoryName]);
                      setSearch("");
                      setShowSearch(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.categoryName}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {menuOpen && (
          <nav className="flex flex-col items-center  mr-4px text-gray-700 font-medium px-6 py-2 space-y-4 ">
            {/* <Link to ="#" className="hover:text-blue-600 transition">Home</Link>  */}
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to ="contactus" className="hover:text-blue-600 transition">
              Contact Us
            </Link>
            <Link to ="aboutus" className="hover:text-blue-600 transition">
              About Us
            </Link>
            <Link to ="support" className="hover:text-blue-600 transition">
              Support
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
