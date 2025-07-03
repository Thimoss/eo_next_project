import DocumentCard from "@/components/dashboard/DocumentCard";
import Master from "@/components/global/Master";
import { IoChevronDown, IoSearch } from "react-icons/io5";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Home() {
  return (
    <Master>
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-5 w-full max-w-xs 
          "
          >
            <input
              type="text"
              placeholder="Search Document..."
              className="focus:outline-none text-xs w-full bg-white py-1.5 px-3 rounded-md drop-shadow-md h-full"
            />

            <button className="flex items-center gap-2 text-white bg-black hover:bg-gray-700 duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md drop-shadow-md">
              <div className="w-4 h-4">
                <IoSearch className="w-full h-full" />
              </div>
              <span>Search</span>
            </button>
          </div>
          <div className="bg-white rounded-md drop-shadow-md px-3 py-1.5 flex items-center gap-2">
            <span className="text-xs">Sort By</span>
            <div className="w-4 h-4">
              <IoChevronDown className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-10">
          {data.map((item) => (
            <DocumentCard item={item} key={item} />
          ))}
        </div>
      </div>
    </Master>
  );
}
