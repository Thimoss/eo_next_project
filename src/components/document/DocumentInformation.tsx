import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  job: string;
  location: string;
  base: string;
}

interface DocumentInfformationProps {
  job: string;
  location: string;
  base: string;
  slug: string;
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DocumentInformation({
  job,
  location,
  base,
  slug,
  mutate,
  accessToken,
}: DocumentInfformationProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm<FormData>({});

  useEffect(() => {
    if (editMode) {
      if (job || location || base) {
        reset({
          job: job,
          location: location,
          base: base,
        });
      }
    }
    if (job || location || base) {
      reset({
        job: job,
        location: location,
        base: base,
      });
    }
  }, [editMode, job, location, base, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/general-info/${slug}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        job: data.job,
        location: data.location,
        base: data.base,
      };
      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setEditMode(false);
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
      toast.error("Error updating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    reset();
  };

  return (
    <div className="flex justify-between gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-1/2"
      >
        <div className="flex flex-col gap-1 text-sm text-gray-700 w-full">
          <span className="font-semibold underline">OWNER ESTIMATE (OE)</span>
          <div className="font-semibold flex gap-2 pt-2">
            <span>PEKERJAAN</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${
                  editMode && "border-b border-b-gray-400"
                } `}
                {...register("job")}
              />
            ) : (
              <div>{job || "-"}</div>
            )}
          </div>
          <div className="font-semibold flex gap-2">
            <span>LOKASI</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${
                  editMode && "border-b-[0.5px] border-b-gray-400"
                } `}
                {...register("location")}
              />
            ) : (
              <div>{location || "-"}</div>
            )}
          </div>
          <div className="font-semibold flex gap-2">
            <span>DASAR</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${
                  editMode && "border-b-[0.5px] border-b-gray-400"
                } `}
                {...register("base")}
              />
            ) : (
              <div>{base || "-"}</div>
            )}
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-5 justify-end ">
        {editMode ? (
          <>
            {/* Save */}
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 text-sm bg-primaryBlue text-white font-bold rounded-md hover:bg-primaryBlueDarker disabled:bg-primaryBlueLighter transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
              onClick={handleSubmit(onSubmit)} // Trigger form submission manually
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Simpan
            </button>
            {/* Cancel */}
            <button
              type="button"
              disabled={loading}
              onClick={handleCancel}
              className="px-4 py-2 text-sm bg-primaryRed text-white font-bold rounded-md hover:bg-primaryRedDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
            >
              Batal
            </button>
          </>
        ) : (
          <>
            {/* Edit */}
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="px-4 py-2 text-sm bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer items-center justify-center flex gap-2 shadow-sm"
            >
              Perbarui
            </button>
          </>
        )}
      </div>
    </div>
  );
}
