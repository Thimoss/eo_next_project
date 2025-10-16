import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

interface FormData {
  recapitulationLocation: string;
  preparedByName: string;
  preparedByPosition: string;
  checkedByName: string;
  checkedByPosition: string;
  confirmedByName: string;
  confirmedByPosition: string;
}

interface DocumentApprovalProps {
  recapitulationLocation: string;
  preparedByName: string;
  preparedByPosition: string;
  checkedByName: string;
  checkedByPosition: string;
  confirmedByName: string;
  confirmedByPosition: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
  slug: string;
}

export default function DocumentApproval({
  recapitulationLocation,
  preparedByName,
  preparedByPosition,
  checkedByName,
  checkedByPosition,
  confirmedByName,
  confirmedByPosition,
  mutate,
  slug,
}: DocumentApprovalProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm<FormData>({});
  useEffect(() => {
    if (editMode) {
      if (
        recapitulationLocation ||
        preparedByName ||
        preparedByPosition ||
        checkedByName ||
        checkedByPosition ||
        confirmedByName ||
        confirmedByPosition
      ) {
        reset({
          recapitulationLocation: recapitulationLocation,
          preparedByName: preparedByName,
          preparedByPosition: preparedByPosition,
          checkedByName: checkedByName,
          checkedByPosition: checkedByPosition,
          confirmedByName: confirmedByName,
          confirmedByPosition: confirmedByPosition,
        });
      }
    }
    if (
      recapitulationLocation ||
      preparedByName ||
      preparedByPosition ||
      checkedByName ||
      checkedByPosition ||
      confirmedByName ||
      confirmedByPosition
    ) {
      reset({
        recapitulationLocation: recapitulationLocation,
        preparedByName: preparedByName,
        preparedByPosition: preparedByPosition,
        checkedByName: checkedByName,
        checkedByPosition: checkedByPosition,
        confirmedByName: confirmedByName,
        confirmedByPosition: confirmedByPosition,
      });
    }
  }, [
    checkedByName,
    checkedByPosition,
    confirmedByName,
    confirmedByPosition,
    editMode,
    preparedByName,
    preparedByPosition,
    recapitulationLocation,
    reset,
  ]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `document/update/approval/${slug}`;
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        recapitulationLocation: data.recapitulationLocation,
        preparedByName: data.preparedByName,
        preparedByPosition: data.preparedByPosition,
        checkedByName: data.checkedByName,
        checkedByPosition: data.checkedByPosition,
        confirmedByName: data.confirmedByName,
        confirmedByPosition: data.confirmedByPosition,
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
    <div>
      <div className="flex justify-end">
        {editMode ? (
          <div className="flex items-center gap-5">
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
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="flex items-center justify-center gap-2 text-white bg-primaryGreen hover:bg-primaryGreenDarker duration-300 cursor-pointer font-medium text-xs px-3 py-1.5 rounded-md"
          >
            <span className="text-xs font-semibold">Perbarui</span>
          </button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-xs flex flex-col gap-5"
      >
        <div className="flex items-end">
          <input
            readOnly={!editMode}
            type="text"
            className={`focus:outline-0 border-b`}
            {...register("recapitulationLocation")}
            placeholder="Lokasi"
          />
          , 1 Agustus 2025
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-0.5">
              <p>Disiapkan oleh,</p>
              <p className="font-semibold">
                <input
                  readOnly={!editMode}
                  type="text"
                  className={`focus:outline-0 border-b`}
                  {...register("preparedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b`}
                {...register("preparedByName")}
                placeholder="Nama"
              />
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-0.5">
              <p>Diperiksa oleh,</p>
              <p className="font-semibold">
                <input
                  readOnly={!editMode}
                  type="text"
                  className={`focus:outline-0 border-b`}
                  {...register("checkedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b`}
                {...register("checkedByName")}
                placeholder="Nama"
              />
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-0.5">
              <p>Disahkah oleh,</p>
              <p className="font-semibold">
                <input
                  readOnly={!editMode}
                  type="text"
                  className={`focus:outline-0 border-b`}
                  {...register("confirmedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b`}
                {...register("confirmedByName")}
                placeholder="Nama"
              />
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
