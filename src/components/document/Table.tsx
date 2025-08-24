import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";

interface TableProps {
  handleCreateSection: () => Promise<void>;
}

export default function Table({ handleCreateSection }: TableProps) {
  const [jobSections, setJobSections] = useState([]);

  // Handler to add a new item to a specific job section
  const handleAddItem = (jobSectionId) => {
    // Get data for the new item (simulate a form input or prompt)
    const itemName = prompt("Enter job item name:");
    const materialPrice = parseFloat(
      prompt("Enter material price per volume:")
    );
    const feePrice = parseFloat(prompt("Enter fee per volume:"));
    const volume = parseInt(prompt("Enter volume:"));
    const info = prompt("Enter item information:");

    const newItem = {
      id: Date.now(), // Unique ID based on timestamp
      description: itemName,
      volume: volume,
      materialPrice: materialPrice,
      feePrice: feePrice,
      info: info,
    };

    // Update the job section with the new item and recalculate total prices
    setJobSections((prevState) =>
      prevState.map((section) => {
        if (section.id === jobSectionId) {
          // Recalculate total prices
          const updatedItems = [...section.items, newItem];
          const newTotalMaterialPrice = updatedItems.reduce(
            (acc, item) => acc + item.materialPrice * item.volume,
            0
          );
          const newTotalFeePrice = updatedItems.reduce(
            (acc, item) => acc + item.feePrice * item.volume,
            0
          );

          return {
            ...section,
            items: updatedItems,
            totalMaterialPrice: newTotalMaterialPrice,
            totalFeePrice: newTotalFeePrice,
          };
        }
        return section;
      })
    );
  };

  // Handler to add a new job section
  // const handleAddJobSection = () => {
  //   const jobSectionName = prompt("Enter job section name:");

  //   const newJobSection = {
  //     id: Date.now(),
  //     description: jobSectionName,
  //     totalMaterialPrice: 0,
  //     totalFeePrice: 0,
  //     items: [],
  //   };

  //   setJobSections((prevState) => [...prevState, newJobSection]);
  // };

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
            {jobSections.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-3">
                  No job sections available. Add a job section to start.
                </td>
              </tr>
            ) : (
              jobSections.map((jobSection, index) => (
                <React.Fragment key={jobSection.id}>
                  <tr className="bg-blue-100 border-b border-gray-200 font-semibold">
                    <td className="px-6 py-3">
                      {String.fromCharCode(65 + index)}
                    </td>
                    <td className="px-6 py-3">{jobSection.description}</td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-1.5"></td>
                    <td className="px-6 py-3">
                      {jobSection.totalMaterialPrice}
                    </td>
                    <td className="px-6 py-3">{jobSection.totalFeePrice}</td>
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3"></td>
                  </tr>
                  {jobSection.items.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
                    >
                      <td className="px-6 py-3">{idx + 1}</td>
                      {/* Use idx to display the correct item number */}
                      <td className="px-6 py-3">{item.description}</td>
                      <td className="px-6 py-3">{item.volume}</td>
                      <td className="px-6 py-3">{item.materialPrice}</td>
                      <td className="px-6 py-3">{item.feePrice}</td>
                      <td className="px-6 py-3">
                        {item.materialPrice * item.volume}
                      </td>
                      <td className="px-6 py-3">
                        {item.feePrice * item.volume}
                      </td>
                      <td className="px-6 py-3">{item.info}</td>
                      <td className="px-6 py-3"></td>
                    </tr>
                  ))}
                  <tr className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200">
                    <td className="px-6 py-3"></td>
                    <td className="px-6 py-3 flex justify-center">
                      <button
                        className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
                        onClick={() => handleAddItem(jobSection.id)}
                      >
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
                </React.Fragment>
              ))
            )}
            <tr className="bg-blue-100 border-b border-gray-200 font-semibold">
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3 flex justify-center">
                <button
                  className="flex items-center gap-2 text-white bg-primaryBlue hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
                  onClick={handleCreateSection}
                >
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
