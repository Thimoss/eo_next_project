import ExcelJS from "exceljs";
import { Document } from "../types/Documents.type";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const handleExport = async (dataDetail: Document) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Me";
  workbook.lastModifiedBy = "Her";
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { width: 10 },
    { width: 10 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 20 },
    { width: 20 },
    { width: 20 },
    { width: 50 },
  ];

  worksheet.addRow([]);

  //========== OE ==========//
  const titleRow = worksheet.addRow(["OWNER ESTIMATE (OE)"]);
  titleRow.font = { bold: true, size: 12 };
  worksheet.mergeCells(titleRow.number, 1, titleRow.number, 3);

  const jobRow = worksheet.addRow(["PEKERJAAN", "", `: ${dataDetail.job}`]);
  jobRow.font = { bold: true, size: 12 };
  worksheet.mergeCells(jobRow.number, 1, jobRow.number, 2);

  const locationRow = worksheet.addRow([
    "LOKASI",
    "",
    `: ${dataDetail.location}`,
  ]);
  locationRow.font = { bold: true, size: 12 };
  worksheet.mergeCells(locationRow.number, 1, locationRow.number, 2);

  const baseRow = worksheet.addRow(["DASAR", "", `: ${dataDetail.base}`]);
  baseRow.font = { bold: true, size: 12 };
  worksheet.mergeCells(baseRow.number, 1, baseRow.number, 2);

  worksheet.addRow([]);

  const headers: string[] = [
    "No",
    "Uraian Pekerjaan",
    "",
    "",
    "Volume",
    "Material (IDR)",
    "Jasa (IDR)",
    "Total Material (IDR)",
    "Total Jasa (IDR)",
    "Informasi",
  ];

  const headerRow = worksheet.addRow(headers);
  worksheet.mergeCells(headerRow.number, 2, headerRow.number, 4);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  dataDetail.jobSections.forEach((jobSection, sectionIndex) => {
    const row = [
      String.fromCharCode(65 + sectionIndex),
      jobSection.name,
      "",
      "",
      "",
      "",
      "",
      jobSection.totalMaterialPrice,
      jobSection.totalFeePrice,
      "",
    ];
    const jobSectionRow = worksheet.addRow(row);
    worksheet.mergeCells(jobSectionRow.number, 2, jobSectionRow.number, 4);
    jobSectionRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    jobSectionRow.getCell(1).alignment = { horizontal: "center" };

    jobSection.itemJobSections.forEach((item, itemIndex) => {
      const itemRow = [
        itemIndex + 1,
        item.name,
        "",
        "",
        `${item.volume} ${item.unit}`,
        item.materialPricePerUnit,
        item.feePricePerUnit,
        item.totalMaterialPrice,
        item.totalFeePrice,
        item.information,
      ];
      const itemRowAdded = worksheet.addRow(itemRow);
      worksheet.mergeCells(itemRowAdded.number, 2, itemRowAdded.number, 4);

      itemRowAdded.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      itemRowAdded.getCell(1).alignment = { horizontal: "center" };
      itemRowAdded.getCell(5).alignment = { horizontal: "center" };
    });
  });

  const rekapitulasi = ["", "Rekapitulasi"];
  const rekapitulasiRow = worksheet.addRow(rekapitulasi);
  worksheet.mergeCells(rekapitulasiRow.number, 2, rekapitulasiRow.number, 10);
  rekapitulasiRow.getCell(2).font = { bold: true };
  rekapitulasiRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  dataDetail.jobSections.forEach((jobSection, sectionIndex) => {
    const row = [
      String.fromCharCode(65 + sectionIndex),
      jobSection.name,
      "",
      "",
      "",
      "",
      "",
      jobSection.totalMaterialPrice,
      jobSection.totalFeePrice,
      "",
    ];
    const jobSectionRow = worksheet.addRow(row);
    worksheet.mergeCells(jobSectionRow.number, 2, jobSectionRow.number, 7);

    jobSectionRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "BFBFBF" },
      };
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    jobSectionRow.getCell(1).alignment = { horizontal: "center" };
  });

  const blank = ["", ""];
  const blankRow = worksheet.addRow(blank);
  worksheet.mergeCells(blankRow.number, 2, blankRow.number, 10);
  blankRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  const totalMaterialAndFee = [
    "",
    "TOTAL MATERIAL / JASA",
    "",
    "",
    "",
    "",
    "",
    dataDetail.totalMaterialPrice,
    dataDetail.totalFeePrice,
    "",
  ];
  const totalMaterialAndFeeRow = worksheet.addRow(totalMaterialAndFee);
  worksheet.mergeCells(
    totalMaterialAndFeeRow.number,
    2,
    totalMaterialAndFeeRow.number,
    7
  );
  totalMaterialAndFeeRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.font = { bold: true };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  const totalMaterialPlusFee = [
    "",
    "TOTAL MATERIAL + JASA",
    "",
    "",
    "",
    "",
    "",
    "",
    dataDetail.totalMaterialAndFee,
    "",
  ];
  const totalMaterialPlusFeeRow = worksheet.addRow(totalMaterialPlusFee);
  worksheet.mergeCells(
    totalMaterialPlusFeeRow.number,
    2,
    totalMaterialPlusFeeRow.number,
    7
  );
  totalMaterialPlusFeeRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.font = { bold: true };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // rounding
  // const rounding = ["", "PEMBULATAN", "", "", "", "", "Rp. #####", ""];
  // const roundingRow = worksheet.addRow(rounding);
  // roundingRow.eachCell((cell) => {
  //   cell.fill = {
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "BFBFBF" },
  //   };
  //   cell.font = { bold: true };
  //   cell.border = {
  //     top: { style: "thin" },
  //     left: { style: "thin" },
  //     bottom: { style: "thin" },
  //     right: { style: "thin" },
  //   };
  // });

  // benefitsAndRisks
  const benefitsAndRisks = [
    "",
    "K&R (KEUNTUNGAN & RISIKO) ",
    "",
    "",
    `${dataDetail.percentageBenefitsAndRisks} %`,
    "",
    "",
    "",
    dataDetail.totalBenefitsAndRisks,
    "",
  ];
  const benefitsAndRisksRow = worksheet.addRow(benefitsAndRisks);
  worksheet.mergeCells(
    benefitsAndRisksRow.number,
    2,
    benefitsAndRisksRow.number,
    4
  );
  benefitsAndRisksRow.getCell(5).alignment = { horizontal: "center" };

  benefitsAndRisksRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.font = { bold: true };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  const totalMaterialFee = [
    "",
    "TOTAL MATERIAL + JASA + K&R",
    "",
    "",
    "",
    "",
    "",
    dataDetail.totalPrice,
    "",
    "",
  ];
  const totalMaterialFeeRow = worksheet.addRow(totalMaterialFee);
  worksheet.mergeCells(
    totalMaterialFeeRow.number,
    2,
    totalMaterialFeeRow.number,
    4
  );
  worksheet.mergeCells(
    totalMaterialFeeRow.number,
    8,
    totalMaterialFeeRow.number,
    9
  );
  totalMaterialFeeRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.font = { bold: true };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  const spelledOut = ["", "TERBILANG", "", "", "", "", "", "", "", ""];
  const spelledOutRow = worksheet.addRow(spelledOut);
  worksheet.mergeCells(spelledOutRow.number, 2, spelledOutRow.number, 4);
  worksheet.mergeCells(spelledOutRow.number, 8, spelledOutRow.number, 9);
  spelledOutRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BFBFBF" },
    };
    cell.font = { bold: true };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  worksheet.addRow([]);
  worksheet.addRow([]);

  //========== RECAP ==========//
  const recapTitleRow = worksheet.addRow([
    "REKAPITULASI OWNER ESTIMATE",
    "",
    "",
    "",
    "",
    "",
  ]);
  worksheet.mergeCells(recapTitleRow.number, 1, recapTitleRow.number, 3);
  recapTitleRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        top: { style: "medium" },
        right: { style: "medium" },
      };
    } else {
      cell.border = {
        top: { style: "medium" },
      };
    }
  });

  const recapJobRow = worksheet.addRow([
    "PEKERJAAN",
    "",
    `: ${dataDetail.job}`,
    "",
    "",
    "",
  ]);
  worksheet.mergeCells(recapJobRow.number, 1, recapJobRow.number, 2);
  recapJobRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const recapLocationRow = worksheet.addRow([
    "LOKASI",
    "",
    `: ${dataDetail.location}`,
    "",
    "",
    "",
  ]);
  worksheet.mergeCells(recapLocationRow.number, 1, recapLocationRow.number, 2);
  recapLocationRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const recapBaseRow = worksheet.addRow([
    "DASAR",
    "",
    `: ${dataDetail.base}`,
    "",
    "",
    "",
  ]);
  worksheet.mergeCells(recapBaseRow.number, 1, recapBaseRow.number, 2);
  recapBaseRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const budgetItemRow = worksheet.addRow([
    "MATA ANGGARAN",
    "",
    `: `,
    "",
    "",
    "",
  ]);
  worksheet.mergeCells(budgetItemRow.number, 1, budgetItemRow.number, 2);
  budgetItemRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const percentileRow = worksheet.addRow(["PERCENTILE", "", `: `, "", "", ""]);
  worksheet.mergeCells(percentileRow.number, 1, percentileRow.number, 2);
  percentileRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const blankRowRecap = worksheet.addRow([]);
  worksheet.mergeCells(blankRowRecap.number, 1, blankRowRecap.number, 6);
  blankRowRecap.eachCell((cell, colIndex) => {
    cell.font = { bold: true, size: 12 };
    cell.alignment = { horizontal: "left" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
      };
    }
    if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
      };
    }
  });

  const recapHeaders: string[] = [
    "No",
    "Uraian Pekerjaan",
    "",
    "",
    "Total Material (IDR)",
    "Total Jasa (IDR)",
  ];

  const recapHeaderRow = worksheet.addRow(recapHeaders);
  worksheet.mergeCells(recapHeaderRow.number, 2, recapHeaderRow.number, 4);
  recapHeaderRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });

  dataDetail.jobSections.forEach((jobSection, sectionIndex) => {
    const row = [
      sectionIndex + 1,
      jobSection.name,
      "",
      "",
      jobSection.totalMaterialPrice,
      jobSection.totalFeePrice,
    ];
    const jobSectionRow = worksheet.addRow(row);
    worksheet.mergeCells(jobSectionRow.number, 2, jobSectionRow.number, 4);
    jobSectionRow.eachCell((cell, colIndex) => {
      cell.font = { bold: true };
      if (colIndex === 1) {
        cell.border = {
          left: { style: "medium" },
          top: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      } else if (colIndex === 6) {
        cell.border = {
          right: { style: "medium" },
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
        };
      } else {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      }
    });
    jobSectionRow.getCell(1).alignment = { horizontal: "center" };
  });

  const firstSectionIndex = 1; // Nomor pertama (1)
  const lastSectionIndex =
    dataDetail.jobSections.length > 0 ? dataDetail.jobSections.length : 0;

  const totalMaterialAndFeeRecap = [
    lastSectionIndex > 0
      ? `Total ${firstSectionIndex} s/d ${lastSectionIndex}`
      : "Total 0", // Tampilkan Total 0 jika tidak ada data
    "",
    "",
    "",
    dataDetail.totalMaterialPrice,
    dataDetail.totalFeePrice,
    ,
  ];
  const totalMaterialAndFeeRecapRow = worksheet.addRow(
    totalMaterialAndFeeRecap
  );
  worksheet.mergeCells(
    totalMaterialAndFeeRecapRow.number,
    1,
    totalMaterialAndFeeRecapRow.number,
    4
  );
  totalMaterialAndFeeRecapRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "right" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
        top: { style: "thin" },
        right: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else if (colIndex === 4) {
      cell.border = {
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });

  const totalMaterialFeeRecap = [
    "Total Material & Jasa",
    "",
    "",
    "",
    dataDetail.totalMaterialAndFee,
    "",
  ];
  const totalMaterialFeeRecapRow = worksheet.addRow(totalMaterialFeeRecap);
  worksheet.mergeCells(
    totalMaterialFeeRecapRow.number,
    1,
    totalMaterialFeeRecapRow.number,
    4
  );
  worksheet.mergeCells(
    totalMaterialFeeRecapRow.number,
    5,
    totalMaterialFeeRecapRow.number,
    6
  );
  totalMaterialFeeRecapRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "right" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
        top: { style: "thin" },
        right: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else if (colIndex === 4) {
      cell.border = {
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });

  const benefitsAndRisksRecap = [
    `Keuntungan & Risiko ${dataDetail.percentageBenefitsAndRisks}%`,
    "",
    "",
    "",
    dataDetail.totalBenefitsAndRisks,
    "",
  ];
  const benefitsAndRisksRecapRow = worksheet.addRow(benefitsAndRisksRecap);
  worksheet.mergeCells(
    benefitsAndRisksRecapRow.number,
    1,
    benefitsAndRisksRecapRow.number,
    4
  );
  worksheet.mergeCells(
    benefitsAndRisksRecapRow.number,
    5,
    benefitsAndRisksRecapRow.number,
    6
  );
  benefitsAndRisksRecapRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "right" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
        top: { style: "thin" },
        right: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else if (colIndex === 4) {
      cell.border = {
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });
  const totalPriceRecap = ["TOTAL", "", "", "", dataDetail.totalPrice, ""];
  const totalPriceRecapRow = worksheet.addRow(totalPriceRecap);
  worksheet.mergeCells(
    totalPriceRecapRow.number,
    1,
    totalPriceRecapRow.number,
    4
  );
  worksheet.mergeCells(
    totalPriceRecapRow.number,
    5,
    totalPriceRecapRow.number,
    6
  );
  totalPriceRecapRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "right" };
    if (colIndex === 1) {
      cell.border = {
        left: { style: "medium" },
        top: { style: "thin" },
        right: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        right: { style: "medium" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else if (colIndex === 4) {
      cell.border = {
        right: { style: "thin" },
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    }
  });

  const spelledOutRecap = ["Terbilang", ": "];
  const spelledOutRecapRow = worksheet.addRow(spelledOutRecap);
  worksheet.mergeCells(
    spelledOutRecapRow.number,
    2,
    spelledOutRecapRow.number,
    6
  );

  spelledOutRecapRow.eachCell((cell, colIndex) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "left" };

    if (colIndex === 1) {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "medium" },
        left: { style: "thin" },
      };
    } else if (colIndex === 6) {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    } else {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "medium" },
      };
    }
  });

  const today = new Date();
  const formattedDate = format(today, "d MMMM yyyy", { locale: id });
  const locationDate = [
    `${dataDetail.recapitulationLocation}, ${formattedDate}`,
  ];
  const locationDateRow = worksheet.addRow(locationDate);
  worksheet.mergeCells(locationDateRow.number, 1, locationDateRow.number, 3);

  locationDateRow.font = {
    size: 12,
  };
  worksheet.addRow([]);

  const titleSign = [
    "Disiapkan oleh,",
    "",
    "",
    "Diperiksa oleh,",
    "Disahkan oleh,",
    "",
  ];
  const titleSignRow = worksheet.addRow(titleSign);
  worksheet.mergeCells(titleSignRow.number, 1, titleSignRow.number, 2);
  worksheet.mergeCells(titleSignRow.number, 5, titleSignRow.number, 6);

  const position = [
    dataDetail.preparedByPosition,
    "",
    "",
    dataDetail.checkedByPosition,
    dataDetail.confirmedByPosition,
    "",
  ];
  const positionRow = worksheet.addRow(position);
  worksheet.mergeCells(positionRow.number, 1, positionRow.number, 2);
  worksheet.mergeCells(positionRow.number, 5, positionRow.number, 6);
  positionRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "left" };
  });

  worksheet.addRow([]);
  worksheet.addRow([]);

  const name = [
    dataDetail.preparedByName,
    "",
    "",
    dataDetail.checkedByName,
    dataDetail.confirmedByName,
    "",
  ];
  const nameRow = worksheet.addRow(name);
  worksheet.mergeCells(nameRow.number, 1, nameRow.number, 2);
  worksheet.mergeCells(nameRow.number, 5, nameRow.number, 6);
  nameRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "left" };
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${dataDetail.name}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
};
