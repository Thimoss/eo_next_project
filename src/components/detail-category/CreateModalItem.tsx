import React, { useEffect, useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { Sector } from "../../../types/Sectors.type";

interface FormData {
  name: string;
  no: string;
  source?: string;
  minimum?: number;
  unit?: string;
  materialPricePerUnit?: number;
  feePerUnit?: number;
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

  const onSubmit = async (data: FormData) => {};

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
      setValue("feePerUnit", undefined);
    }
  }, [singleItem, setValue]);

  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">
          Add Item for {selectedSector?.name}
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Name</span>
            <input
              type="text"
              placeholder="Input item name"
              {...register("name", { required: "Name is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Number</span>
            <input
              type="text"
              placeholder="Input item number"
              {...register("no", { required: "Number is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.no && (
              <p className="text-xs text-red-500">{errors.no.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Source</span>
            <input
              type="text"
              placeholder="Input item source"
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
                <span className="text-xs font-semibold">Minimum</span>
                <input
                  type="number"
                  placeholder="Input minimum quantity"
                  {...register("minimum", { required: "Minimum is required" })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
                {errors.minimum && (
                  <p className="text-xs text-red-500">
                    {errors.minimum.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-semibold">Unit</span>
                <input
                  type="text"
                  placeholder="Input unit"
                  {...register("unit", { required: "Unit is required" })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-semibold">
                  Material Price Per Unit
                </span>
                <input
                  type="number"
                  placeholder="Input material price per unit"
                  {...register("materialPricePerUnit", {
                    required: "Material price is required",
                  })}
                  className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-semibold">Fee Per Unit</span>
                <input
                  type="number"
                  placeholder="Input fee per unit"
                  {...register("feePerUnit", {
                    required: "Fee per unit is required",
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
              className="px-3 py-1.5 rounded-md border-black border text-xs font-semibold text-black duration-300 hover:bg-gray-300 bg-white"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-3 py-1.5 rounded-md border-black border text-xs text-white font-semibold duration-300 hover:bg-gray-700 bg-black flex items-center gap-2 transition-all"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
// try {
//   setLoading(true);
//   const api = new Api();
//   api.url = "category/create";
//   api.method = "POST";
//   api.type = "json";
//   api.body = {
//     name: data.name,
//     code: data.code,
//     reference: data.reference,
//     location: data.location,
//   };
//   const response = await api.call();
//   if (response.statusCode === 200) {
//     toast.success(response.message);
//     setOpen(false);
//     mutate();
//     reset();
//   } else {
//     if (response.message && Array.isArray(response.message)) {
//       response.message.forEach((error: string) => {
//         toast.error(error);
//       });
//     } else {
//       toast.error(response.message);
//     }
//   }
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// } catch (error: any) {
//   toast.error("Error creating category: " + error.message);
// } finally {
//   setLoading(false);
// }
