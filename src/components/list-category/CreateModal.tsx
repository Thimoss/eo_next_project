import React, { useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  name: string;
  code: string;
  reference: string;
  location: string;
}
interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function CreateModal({
  open,
  setOpen,
  mutate,
}: CreateModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const api = new Api();
      api.url = "category/create";
      api.method = "POST";
      api.type = "json";
      api.body = {
        name: data.name,
        code: data.code,
        reference: data.reference,
        location: data.location,
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
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Add Category</span>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Name</span>
            <input
              type="text"
              placeholder="Input category name"
              {...register("name", { required: "Name is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.name && (
              <p className="text-xs text-primaryRed">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Code</span>
            <input
              type="text"
              placeholder="Input category code"
              {...register("code", { required: "Code is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.code && (
              <p className="text-xs text-primaryRed">{errors.code.message}</p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Reference</span>
            <input
              type="text"
              placeholder="Input category reference"
              {...register("reference", { required: "Reference is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
          </div>
          {errors.reference && (
            <p className="text-xs text-primaryRed">
              {errors.reference.message}
            </p>
          )}
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Location</span>
            <input
              type="text"
              placeholder="Input category location"
              {...register("location", { required: "Location is required" })}
              className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
            />
            {errors.location && (
              <p className="text-xs text-primaryRed">
                {errors.location.message}
              </p>
            )}
          </div>
          <div
            className="flex gap-5 justify-end
          "
          >
            <button
              onClick={handleCancel}
              type="button"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer flex items-center justify-between"
            >
              Cancel
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
              Create
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
