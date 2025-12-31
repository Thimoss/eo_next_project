import React, { useEffect, useRef, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { Sector } from "../../../types/Sectors.type";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { Item } from "../../../types/Items.type";
import { IoCreateOutline } from "react-icons/io5";

interface FormData {
  name: string;
  no: string;
  source?: string;
  minimum?: number;
  unit?: string;
  singleItem: boolean;
  sectorId: number;
  listOffer?: { materialPricePerUnit: number; feePricePerUnit: number }[];
}

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSector: Sector | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  selectedItem: Item | null | undefined;
}

export default function UpdateModalItem({
  open,
  setOpen,
  mutate,
  selectedSector,
  selectedItem,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [singleItem, setSingleItem] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [offers, setOffers] = useState([
    { materialPricePerUnit: 0, feePricePerUnit: 0 },
  ]);

  const addOffer = () => {
    setOffers([...offers, { materialPricePerUnit: 0, feePricePerUnit: 0 }]);
  };

  // Remove an offer (only if more than 1)
  const removeOffer = (index: number) => {
    if (offers.length > 1) {
      const newOffers = offers.filter((_, idx) => idx !== index);
      setOffers(newOffers);
    }
  };

  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<FormData>({});

  useEffect(() => {
    // Reset form jika selectedCategory berubah
    if (selectedItem) {
      setSingleItem(!!selectedItem.singleItem);
      reset({
        no: selectedItem?.no || "",
        name: selectedItem?.name || "",
        source: selectedItem?.source || "",
        minimum: selectedItem?.minimum || 0,
        unit: selectedItem?.unit || "",
        sectorId: selectedSector?.id ?? 0,
        singleItem: selectedItem?.singleItem,
      });
    }
  }, [selectedItem, reset, selectedSector?.id]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (selectedSector?.id !== undefined) {
        formData.append("no", data.no);
        formData.append("name", data.name);
        formData.append("source", data.source || "");
        formData.append("sectorId", selectedSector?.id.toString());
        formData.append("singleItem", data.singleItem.toString());

        if (data.singleItem === true) {
          formData.append("unit", data.unit || "");
          formData.append("minimum", data.minimum?.toString() || "1");
          if (
            data.listOffer &&
            Array.isArray(data.listOffer) &&
            data.listOffer.length > 0
          ) {
            let totalMaterialPricePerUnit = 0;
            let totalFeePricePerUnit = 0;
            const offerCount = data.listOffer.length;

            data.listOffer.forEach((offer) => {
              const materialPrice = parseFloat(
                offer.materialPricePerUnit?.toString() || "0"
              );
              const feePrice = parseFloat(
                offer.feePricePerUnit?.toString() || "0"
              );

              totalMaterialPricePerUnit += materialPrice;
              totalFeePricePerUnit += feePrice;
            });

            const averageMaterialPricePerUnit =
              totalMaterialPricePerUnit / offerCount;
            const averageFeePricePerUnit = totalFeePricePerUnit / offerCount;

            formData.append(
              "materialPricePerUnit",
              averageMaterialPricePerUnit.toFixed(2)
            );
            formData.append(
              "feePricePerUnit",
              averageFeePricePerUnit.toFixed(2)
            );
          } else {
            toast.error("Please add at least one offer with pricing.");
            setLoading(false);
            return;
          }

          if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
            const file = fileInputRef.current.files[0];

            if (file.type !== "application/pdf") {
              toast.error("Only PDF files are allowed.");
              setLoading(false);
              return;
            }
            if (file.size > 1 * 1024 * 1024) {
              toast.error("File size must be less than 1MB.");
              setLoading(false);
              return;
            }

            formData.append("file", file);
          } else {
            toast.error("File is required for single item.");
            setLoading(false);
            return;
          }
        }
      } else {
        toast.error("Sector ID is required.");
        setLoading(false);
        return;
      }

      const api = new Api();
      api.url = `item/update/${selectedItem?.id}`;
      api.method = "PATCH";
      api.type = "multipart";
      api.body = formData;

      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setOpen(false);
        mutate();
        reset();
      } else {
        if (response.message && Array.isArray(response.message)) {
          response.message.forEach((error: string) => {
            toast.error(error);
          });
        } else {
          toast.error(response.message);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Error creating category: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    setValue("singleItem", singleItem);
    if (!singleItem) {
      setValue("minimum", undefined);
      setValue("unit", undefined);
    }
  }, [singleItem, setValue]);

  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryBlue via-primaryGreen to-primaryBlueLighter" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryBlue/10 text-primaryBlue">
              <IoCreateOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Perbarui Pekerjaan
              </h2>
              <p className="text-xs text-gray-500">
                Sesuaikan detail pekerjaan untuk sektor{" "}
                {selectedSector?.name}.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nama Pekerjaan
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Masukkan nama pekerjaan"
                    {...register("name", {
                      required: "Nama pekerjaan diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nomor Pekerjaan
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <input
                    type="text"
                    id="no"
                    placeholder="Masukkan nomor pekerjaan"
                    {...register("no", {
                      required: "Nomor pekerjaan diperlukan",
                    })}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.no && (
                    <p className="text-sm text-red-500">{errors.no.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label
                    htmlFor="source"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sumber
                  </label>
                  <input
                    type="text"
                    id="source"
                    placeholder="Masukkan sumber"
                    {...register("source")}
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  />
                  {errors.source && (
                    <p className="text-sm text-red-500">
                      {errors.source.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Tipe Pekerjaan
                  </p>
                  <p className="text-xs text-gray-500">
                    Aktifkan single item jika butuh harga per unit.
                  </p>
                </div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    id="singleItem"
                    {...register("singleItem")}
                    checked={singleItem}
                    onChange={() => setSingleItem(!singleItem)}
                    className="h-4 w-4 rounded border-gray-300 text-primaryBlue focus:ring-primaryBlue/30"
                  />
                  Single Item
                </label>
              </div>
            </div>

            {singleItem && (
              <>
                <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="minimum"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Minimum
                        </label>
                        <span className="text-sm font-semibold text-primaryRed">
                          *
                        </span>
                      </div>
                      <input
                        type="number"
                        id="minimum"
                        placeholder="Masukkan jumlah minimum"
                        {...register("minimum", {
                          required: "Jumlah minimum diperlukan",
                        })}
                        className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      />
                      {errors.minimum && (
                        <p className="text-sm text-red-500">
                          {errors.minimum.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="unit"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Unit
                        </label>
                        <span className="text-sm font-semibold text-primaryRed">
                          *
                        </span>
                      </div>
                      <input
                        type="text"
                        id="unit"
                        placeholder="Masukkan unit"
                        {...register("unit", { required: "Unit diperlukan" })}
                        className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      />
                      {errors.unit && (
                        <p className="text-sm text-red-500">
                          {errors.unit.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Daftar Penawaran
                      </p>
                      <p className="text-xs text-gray-500">
                        Isi harga material dan jasa per unit.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addOffer}
                      className="inline-flex items-center justify-center rounded-full border border-primaryBlue/20 bg-white px-3 py-1 text-xs font-semibold text-primaryBlue transition duration-200 hover:border-primaryBlue/40 hover:bg-primaryBlue/5"
                    >
                      Tambah Penawaran
                    </button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {offers.map((_, index: number) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-gray-200/70 bg-white p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-gray-700">
                            Penawaran {index + 1}
                          </p>
                          {offers.length > 1 && index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeOffer(index)}
                              className="text-xs font-semibold text-primaryRed transition duration-150 hover:text-primaryRedDarker"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                        <div className="mt-3 grid gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`materialPricePerUnit${index}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Harga Material per Unit
                              </label>
                              <span className="text-sm font-semibold text-primaryRed">
                                *
                              </span>
                            </div>
                            <input
                              type="number"
                              id={`materialPricePerUnit${index}`}
                              placeholder="Masukkan harga material per unit"
                              {...register(
                                `listOffer.${index}.materialPricePerUnit`,
                                {
                                  required:
                                    "Harga material per unit diperlukan",
                                }
                              )}
                              className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                            />
                            {errors.listOffer?.[index]
                              ?.materialPricePerUnit && (
                              <p className="text-sm text-red-500">
                                {
                                  errors.listOffer[index]
                                    .materialPricePerUnit?.message
                                }
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <label
                                htmlFor={`feePricePerUnit${index}`}
                                className="block text-sm font-medium text-gray-700"
                              >
                                Harga Jasa per Unit
                              </label>
                              <span className="text-sm font-semibold text-primaryRed">
                                *
                              </span>
                            </div>
                            <input
                              type="number"
                              id={`feePricePerUnit${index}`}
                              placeholder="Masukkan harga jasa per unit"
                              {...register(
                                `listOffer.${index}.feePricePerUnit`,
                                {
                                  required: "Harga jasa per unit diperlukan",
                                }
                              )}
                              className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                            />
                            {errors.listOffer?.[index]?.feePricePerUnit && (
                              <p className="text-sm text-red-500">
                                {errors.listOffer[index].feePricePerUnit?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dokumen
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Unggah file PDF, maksimal 1MB.
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="application/pdf"
                    className="mt-3 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30 file:mr-4 file:rounded-full file:border-0 file:bg-primaryBlue/10 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primaryBlue hover:file:bg-primaryBlue/20"
                  />
                </div>
              </>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={handleCancel}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
                Perbarui
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
