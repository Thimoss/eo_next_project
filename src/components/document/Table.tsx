import React from "react";
import { IoAdd } from "react-icons/io5";

export default function Table() {
  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-center text-black text-xs" align="center">
          <thead className="text-xs text-white uppercase bg-primaryBlue">
            <tr>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                No
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Job Description
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Volume
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Unit Price
              </th>
              <th scope="col" colSpan={2} className="px-2 py-1.5">
                Total Price
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Information
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-1.5">
                Action
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Fee
              </th>
              <th scope="col" className="px-2 py-1.5">
                Material
              </th>
              <th scope="col" className="px-2 py-1.5">
                Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Job Section 1 */}
            <tr className="bg-blue-100 border-b border-gray-200 font-semibold ">
              <td className="px-6 py-3">I</td>
              <td className="px-6 py-3">Job Description 1</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              {/* Total Material Price for all item Job Section */}
              <td className="px-6 py-3">55000</td>
              {/* Total Fee Price for all item Job Section */}
              <td className="px-6 py-3">11000</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* Item 1 Job Section 1 */}
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">Job Description 1 Item 1</td>
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">10000</td>
              <td className="px-6 py-3">5000</td>
              <td className="px-6 py-3">10000</td>
              <td className="px-6 py-3">5000</td>
              <td className="px-6 py-3">Information item 1</td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* Item 2 Job Section 1 */}
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3">2</td>
              <td className="px-6 py-3">Job Description 1 Item 2</td>
              <td className="px-6 py-3">3</td>
              <td className="px-6 py-3">15000</td>
              <td className="px-6 py-3">2000</td>
              <td className="px-6 py-3">45000</td>
              <td className="px-6 py-3">6000</td>
              <td className="px-6 py-3">Information item 2</td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex justify-center">
                <button className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold">Add Item</span>
                </button>
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* Job Section 2 */}
            <tr className="bg-blue-100 border-b border-gray-200 font-semibold ">
              <td className="px-6 py-3">II</td>
              <td className="px-6 py-3">Job Description 2</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              {/* Total Material Price for all item Job Section */}
              <td className="px-6 py-3">100000</td>
              {/* Total Fee Price for all item Job Section */}
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* Item 1 Job Section 1 */}
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">Job Description 1 Item 1</td>
              <td className="px-6 py-3">2</td>
              <td className="px-6 py-3">25000</td>
              <td className="px-6 py-3">17500</td>
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3">25000</td>
              <td className="px-6 py-3">Information item 1</td>
              <td className="px-6 py-3"></td>
            </tr>
            {/* Item 2 Job Section 2 */}
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3">2</td>
              <td className="px-6 py-3">Job Description 2 Item 2</td>
              <td className="px-6 py-3">1</td>
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3">25000</td>
              <td className="px-6 py-3">50000</td>
              <td className="px-6 py-3">25000</td>
              <td className="px-6 py-3">Information item 2</td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex justify-center">
                <button className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold">Add Item</span>
                </button>
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
            <tr className="bg-blue-100 border-b border-gray-200 font-semibold ">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex justify-center">
                <button className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md">
                  <div className="w-4 h-4">
                    <IoAdd className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold">Add Job Section</span>
                </button>
              </td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
