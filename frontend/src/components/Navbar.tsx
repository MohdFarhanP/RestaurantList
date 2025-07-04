import SearchBar from "./SearchBar";
import { GoPlusCircle } from "react-icons/go";

interface NavbarProp {
  onAddClick: () => void;
}
const Navbar = ({ onAddClick }: NavbarProp) => {
  return (
    <div className="fixed top-0 right-10 left-10 ">
      <div className="navbar flex-wrap md:flex-nowrap rounded-md justify-between bg-base-100 shadow-sm p-4 w-full">
        <a className="btn btn-ghost text-xl">Restaurant List</a>
        <div className="flex flex-wrap md:flex-nowrap w-full md:w-auto items-center gap-4 mt-2 md:mt-0 justify-end">
          <SearchBar onSearch={() => ""} />
          <button
            onClick={onAddClick}
            className="flex items-center gap-1 whitespace-nowrap rounded-full bg-amber-100 px-4 py-2 font-semibold"
          >
            <GoPlusCircle />
            Create Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
