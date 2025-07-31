"use client";
import DocumentInformation from "@/components/document/DocumentInformation";
import Master from "@/components/global/Master";
import React, { useState } from "react";

const dummyData = [
  { id: 1, jobDescription: "Design a New Website", materialUnitPrice: 25 },
  { id: 2, jobDescription: "Develop Mobile App", materialUnitPrice: 28 },
  {
    id: 3,
    jobDescription: "SEO Optimization for Website",
    materialUnitPrice: 35,
  },
  { id: 4, jobDescription: "Create Marketing Campaign", materialUnitPrice: 40 },
  {
    id: 5,
    jobDescription: "Write Technical Documentation",
    materialUnitPrice: 30,
  },
  {
    id: 6,
    jobDescription: "Install Network Infrastructure",
    materialUnitPrice: 20,
  },
  {
    id: 7,
    jobDescription: "Create Graphic Design for Ad",
    materialUnitPrice: 27,
  },
  {
    id: 8,
    jobDescription: "Develop E-Commerce Platform",
    materialUnitPrice: 32,
  },
  {
    id: 9,
    jobDescription: "Brand Strategy Development",
    materialUnitPrice: 22,
  },
  {
    id: 10,
    jobDescription: "Create Social Media Content",
    materialUnitPrice: 31,
  },
  {
    id: 11,
    jobDescription: "System Integration for Client",
    materialUnitPrice: 29,
  },
  {
    id: 12,
    jobDescription: "Cloud Computing Solutions",
    materialUnitPrice: 34,
  },
  {
    id: 13,
    jobDescription: "Data Security Implementation",
    materialUnitPrice: 36,
  },
  {
    id: 14,
    jobDescription: "Web Application Development",
    materialUnitPrice: 28,
  },
  {
    id: 15,
    jobDescription: "AI and Machine Learning Integration",
    materialUnitPrice: 41,
  },
  {
    id: 16,
    jobDescription: "Design Virtual Reality System",
    materialUnitPrice: 38,
  },
  {
    id: 17,
    jobDescription: "Blockchain Development for Security",
    materialUnitPrice: 27,
  },
  {
    id: 18,
    jobDescription: "Mobile App Performance Optimization",
    materialUnitPrice: 39,
  },
  {
    id: 19,
    jobDescription: "Implement Business Intelligence Solutions",
    materialUnitPrice: 33,
  },
  {
    id: 20,
    jobDescription: "Develop Custom CRM System",
    materialUnitPrice: 25,
  },
];

export default function Document() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) {
      // Filter results based on query
      const filteredResults = dummyData.filter((item) =>
        item.jobDescription.toLowerCase().includes(newQuery.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };
  return (
    <Master>
      <div>
        {/* Document Information */}
        <DocumentInformation />
        {/* Data Table */}

        <table
          className="w-full text-center text-black text-xs "
          align="center"
        >
          <thead className="text-xs text-black uppercase bg-white">
            <tr>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                No
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                Job description
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                Volume
              </th>
              <th scope="col" colSpan={2} className="px-6 py-3">
                UNIT PRICE
              </th>
              <th scope="col" colSpan={2} className="px-6 py-3">
                TOTAL PRICE
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                INFORMATION
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3">
                MATERIAL
              </th>
              <th scope="col" className="px-6 py-3">
                SERVICE
              </th>
              <th scope="col" className="px-6 py-3">
                MATERIAL
              </th>
              <th scope="col" className="px-6 py-3">
                SERVICE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border">
              <td className="border px-2"></td>
              <td className="border relative">
                <input
                  type="text"
                  className="w-full border-none outline-none"
                  onChange={handleChange}
                />
                {/* Search results */}
                {query.length > 2 && (
                  <div className="bg-white shadow-sm absolute w-full max-h-40 overflow-auto">
                    {results.map((result, index) => (
                      <div key={index} className="p-2 hover:bg-gray-100">
                        {result.jobDescription}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full border-none outline-none"
                />
              </td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full border-none outline-none"
                />
              </td>
              <td className="border px-2">
                <input
                  type="number"
                  className="w-full border-none outline-none"
                />
              </td>
              <td className="border px-2"></td>
              <td className="border px-2"></td>
              <td className="border px-2">
                <input
                  type="text"
                  className="w-full border-none outline-none"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Master>
  );
}
