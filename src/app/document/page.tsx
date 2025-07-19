"use client";
import DocumentInformation from "@/components/document/DocumentInformation";
import Master from "@/components/global/Master";
import React, { useState } from "react";

export default function Document() {
  const [rows, setRows] = useState([
    {
      jobDescription: "",
      volume: "",
      unitMaterial: "",
      unitService: "",
      info: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        jobDescription: "",
        volume: "",
        unitMaterial: "",
        unitService: "",
        info: "",
      },
    ]);
  };

  const calculateTotal = (volume, unit) => {
    const v = parseFloat(volume);
    const u = parseFloat(unit);
    return isNaN(v) || isNaN(u) ? "" : (v * u).toFixed(2);
  };
  return (
    <Master>
      <div>
        {/* Document Information */}
        <DocumentInformation />
        {/* Data Table */}
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table
            className="w-full text-center text-black text-xs "
            align="center"
          >
            <thead className="text-xs text-black uppercase bg-white">
              {" "}
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
              {rows.map((row, index) => (
                <tr key={index} className="bg-white border">
                  <td className="border px-2">{index + 1}</td>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={row.jobDescription}
                      onChange={(e) =>
                        handleChange(index, "jobDescription", e.target.value)
                      }
                      className="w-full border-none outline-none"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="number"
                      value={row.volume}
                      onChange={(e) =>
                        handleChange(index, "volume", e.target.value)
                      }
                      className="w-full border-none outline-none"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="number"
                      value={row.unitMaterial}
                      onChange={(e) =>
                        handleChange(index, "unitMaterial", e.target.value)
                      }
                      className="w-full border-none outline-none"
                    />
                  </td>
                  <td className="border px-2">
                    <input
                      type="number"
                      value={row.unitService}
                      onChange={(e) =>
                        handleChange(index, "unitService", e.target.value)
                      }
                      className="w-full border-none outline-none"
                    />
                  </td>
                  <td className="border px-2">
                    {calculateTotal(row.volume, row.unitMaterial)}
                  </td>
                  <td className="border px-2">
                    {calculateTotal(row.volume, row.unitService)}
                  </td>
                  <td className="border px-2">
                    <input
                      type="text"
                      value={row.info}
                      onChange={(e) =>
                        handleChange(index, "info", e.target.value)
                      }
                      className="w-full border-none outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
        {/* Add Row Button */}
        <div className="text-right">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            + Add Row
          </button>
        </div>
      </div>
    </Master>
  );
}
