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
  const [currentDate, setCurrentDate] = useState("");

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

  useEffect(() => {
    const today = new Date();

    // Format tanggal dalam bentuk dd MMMM yyyy
    const formattedDate = `${today.getDate()} ${today.toLocaleString("id-ID", {
      month: "long",
    })} ${today.getFullYear()}`;

    setCurrentDate(formattedDate);
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        {editMode ? (
          <div className="flex items-center gap-5">
            <button
              disabled={loading}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="text-white text-sm bg-primaryBlue disabled:bg-primaryBlueLighter hover:bg-primaryBlueDarker transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 justify-center rounded-md px-4 py-2 shadow-sm font-semibold"
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
              className="text-white text-sm bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 justify-center rounded-md px-4 py-2 shadow-sm font-semibold"
            >
              Batal
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="text-white text-sm bg-primaryGreen disabled:bg-primaryGreenLighter hover:bg-primaryGreenDarker transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 justify-center rounded-md px-4 py-2 shadow-sm font-semibold"
          >
            Perbarui
          </button>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-sm text-gray-700 flex flex-col gap-5"
      >
        <div className="flex items-end">
          <input
            readOnly={!editMode}
            type="text"
            className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
            {...register("recapitulationLocation")}
            placeholder="Lokasi"
          />
          , {currentDate}
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-0.5">
              <p>Disiapkan oleh,</p>
              <p className="font-semibold">
                <input
                  readOnly={!editMode}
                  type="text"
                  className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
                  {...register("preparedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
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
                  className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
                  {...register("checkedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
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
                  className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
                  {...register("confirmedByPosition")}
                  placeholder="Jabatan"
                />
              </p>
            </div>

            <p className="font-semibold">
              <input
                readOnly={!editMode}
                type="text"
                className={`focus:outline-0 border-b-[0.5px] border-b-gray-400`}
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
