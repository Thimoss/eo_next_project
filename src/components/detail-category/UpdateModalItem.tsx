import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { Sector } from "../../../types/Sectors.type";
import { toast } from "react-toastify";
import Api from "../../../service/Api";
import { Item } from "../../../types/Items.type";

interface FormData {
  name: string;
  no: string;
  source?: string;
  minimum?: number;
  unit?: string;
  materialPricePerUnit?: number;
  feePricePerUnit?: number;
  singleItem: boolean;
  sectorId: number;
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
      reset({
        no: selectedItem?.no || "",
        name: selectedItem?.name || "",
        source: selectedItem?.source || "",
        minimum: selectedItem?.minimum || 0,
        unit: selectedItem?.unit || "",
        materialPricePerUnit: selectedItem?.materialPricePerUnit || 0,
        feePricePerUnit: selectedItem?.feePricePerUnit || 0,
        sectorId: selectedSector?.id ?? 0,
        singleItem: selectedItem?.singleItem,
      });
    }
  }, [selectedItem, reset, selectedSector?.id]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `item/update/${selectedItem?.id}`;
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        no: data.no,
        name: data.name,
        source: data.source,
        sectorId: selectedSector?.id,
        singleItem: data.singleItem,
        ...(data.singleItem && {
          minimum: data.minimum
            ? parseInt(data.minimum.toString(), 10)
            : undefined,
          unit: data.unit ?? undefined,
          materialPricePerUnit: data.materialPricePerUnit
            ? parseFloat(data.materialPricePerUnit.toString())
            : undefined,
          feePricePerUnit: data.feePricePerUnit
            ? parseFloat(data.feePricePerUnit.toString())
            : undefined,
        }),
        ...(!data.singleItem && {
          minimum: null,
          unit: null,
          materialPricePerUnit: null,
          feePricePerUnit: null,
        }),
      };
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
      setValue("materialPricePerUnit", undefined);
      setValue("feePricePerUnit", undefined);
    }
  }, [singleItem, setValue]);

  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Perbarui pekerjaan {selectedSector?.name}
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Pekerjaan
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              id="name"
              placeholder="Masukkan nama pekerjaan"
              {...register("name", { required: "Nama pekerjaan diperlukan" })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <label
                htmlFor="no"
                className="block text-sm font-medium text-gray-600"
              >
                Nomor Pekerjaan
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              id="no"
              placeholder="Masukkan nomor pekerjaan"
              {...register("no", { required: "Nomor pekerjaan diperlukan" })}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.no && (
              <p className="text-sm text-red-500">{errors.no.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-600"
            >
              Sumber
            </label>
            <input
              type="text"
              id="source"
              placeholder="Masukkan sumber"
              {...register("source")}
              className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
            />
            {errors.source && (
              <p className="text-sm text-red-500">{errors.source.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="singleItem"
              {...register("singleItem")}
              checked={singleItem}
              onChange={() => setSingleItem(!singleItem)}
            />
            <label
              htmlFor="singleItem"
              className="text-sm text-gray-700 font-semibold"
            >
              Single Item
            </label>
          </div>

          {singleItem && (
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="minimum"
                    className="block text-sm font-medium text-gray-600"
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
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
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
                    className="block text-sm font-medium text-gray-600"
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
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="materialPricePerUnit"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Harga Material per Unit
                  </label>
                  <span className="text-sm font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  id="materialPricePerUnit"
                  placeholder="Masukkan harga material per unit"
                  {...register("materialPricePerUnit", {
                    required: "Harga material per unit diperlukan",
                  })}
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="feePricePerUnit"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Harga Jasa per Unit
                  </label>
                  <span className="text-sm font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  id="feePricePerUnit"
                  placeholder="Masukkan harga jasa per unit"
                  {...register("feePricePerUnit", {
                    required: "Harga jasa per unit diperlukan",
                  })}
                  className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                />
              </div>
            </div>
          )}

          <div
            className="flex gap-5 justify-end
                "
          >
            <button
              onClick={handleCancel}
              type="button"
              className="text-sm px-4 py-2 bg-primaryRed text-white font-bold rounded-md hover:bg-primaryRedDarker disabled:bg-primaryRedLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              Batal
            </button>
            <button
              disabled={loading}
              type="submit"
              className="text-sm px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker disabled:bg-primaryGreenLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Perbarui
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
