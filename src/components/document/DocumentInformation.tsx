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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function DocumentInformation({
  job,
  location,
  base,
  slug,
  mutate,
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
        <div className="flex flex-col gap-1 text-xs w-full">
          <span className="font-semibold underline">OWNER ESTIMATE (OE)</span>
          <div className="font-medium flex gap-2 pt-2">
            <span>PEKERJAAN</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${editMode && "border-b"} `}
                {...register("job")}
              />
            ) : (
              <div>{job || "-"}</div>
            )}
          </div>
          <div className="font-medium flex gap-2">
            <span>LOKASI</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${editMode && "border-b"} `}
                {...register("location")}
              />
            ) : (
              <div>{location || "-"}</div>
            )}
          </div>
          <div className="font-medium flex gap-2">
            <span>DASAR</span>
            <span>:</span>
            {editMode ? (
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 w-full ${editMode && "border-b"} `}
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
              className="flex w-full items-center justify-center gap-2 text-white bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
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
              className="flex w-full items-center justify-center gap-2 text-white bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <span className="text-xs font-semibold">Batal</span>
            </button>
          </>
        ) : (
          <>
            {/* Edit */}
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="flex w-full items-center justify-center gap-2 text-white bg-primaryGreen hover:bg-primaryGreenDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
            >
              <span className="text-xs font-semibold">Perbarui</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
