import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { Sector } from "../../../types/Sectors.type";
import { toast } from "react-toastify";
import Api from "../../../service/Api";

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

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSector: Sector | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function CreateModalItem({
  open,
  setOpen,
  mutate,
  selectedSector,
}: CreateModalProps) {
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
  } = useForm<FormData>({
    defaultValues: {
      sectorId: selectedSector?.id ?? 0,
      singleItem: true, // Default to true
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = "item/create";
      api.method = "POST";
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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">
          Tambah pekerjaan untuk {selectedSector?.name}
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nama Pekerjaan</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nama pekerjaan"
              {...register("name", { required: "Nama pekerjaan diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Nomor Pekerjaan</span>
              <span className="text-md font-semibold text-primaryRed">*</span>
            </div>
            <input
              type="text"
              placeholder="Masukkan nomor pekerjaan"
              {...register("no", { required: "Nomor pekerjaan diperlukan" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.no && (
              <p className="text-xs text-red-500">{errors.no.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Sumber</span>
            <input
              type="text"
              placeholder="Masukkan sumber"
              {...register("source")}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.source && (
              <p className="text-xs text-red-500">{errors.source.message}</p>
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
            <label htmlFor="singleItem" className="text-xs font-semibold">
              Single Item
            </label>
          </div>

          {singleItem && (
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Minimum</span>
                  <span className="text-md font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="Masukkan jumlah minimum"
                  {...register("minimum", {
                    required: "Jumlah minimum diperlukan",
                  })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
                {errors.minimum && (
                  <p className="text-xs text-red-500">
                    {errors.minimum.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">Unit</span>
                  <span className="text-md font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Masukkan unit"
                  {...register("unit", { required: "Unit diperlukan" })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    Harga Material per Unit
                  </span>
                  <span className="text-md font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="Masukkan harga material per unit"
                  {...register("materialPricePerUnit", {
                    required: "Harga material per unit diperlukan",
                  })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">
                    Harga Jasa per Unit
                  </span>
                  <span className="text-md font-semibold text-primaryRed">
                    *
                  </span>
                </div>
                <input
                  type="number"
                  placeholder="Masukkan harga jasa per unit"
                  {...register("feePricePerUnit", {
                    required: "Harga jasa per unit diperlukan",
                  })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
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
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer flex items-center justify-between"
            >
              Batal
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-3 py-1.5 rounded-md text-xs text-white font-semibold duration-300 bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker flex items-center gap-2 transition-all cursor-pointer"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Tambah
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
