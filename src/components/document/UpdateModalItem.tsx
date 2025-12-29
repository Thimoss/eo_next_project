import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Modal from "../global/Modal";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import formatRupiah from "../../../utils/formatRupiah";
import { ItemJobSection, JobSection } from "../../../types/Documents.type";
import { Item } from "../../../types/ItemsJob.type";
import { IoCreateOutline } from "react-icons/io5";

interface UpdateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataSearch: Item[];
  isLoadingSearch: boolean;
  handleSelectItem: (item: Item) => Promise<void>;
  handleShowList: () => Promise<void>;
  keyword: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openSearchDropDown: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateDetail: KeyedMutator<any>;
  setSelectedNewItemJob: React.Dispatch<
    React.SetStateAction<Item | null | undefined>
  >;
  setSelectedOldItemJob: React.Dispatch<
    React.SetStateAction<ItemJobSection | null | undefined>
  >;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  itemRef: React.RefObject<HTMLDivElement | null>;
  selectedJobSection: JobSection | null | undefined;
  selectedOldItemJob: ItemJobSection | null | undefined;
  selectedNewItemJob: Item | null | undefined;
  selectedIdItemJob: number | null | undefined;
  setSelectedIdItemJob: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
  accessToken?: string;
}

export default function UpdateModalItem({
  open,
  setOpen,
  dataSearch,
  isLoadingSearch,
  handleSelectItem,
  keyword,
  handleSearch,
  handleShowList,
  openSearchDropDown,
  mutateDetail,
  setSelectedNewItemJob,
  setKeyword,
  handleVolumeChange,
  volume,
  itemRef,
  selectedOldItemJob,
  selectedNewItemJob,
  setSelectedOldItemJob,
  selectedIdItemJob,
  setSelectedIdItemJob,
  selectedJobSection,
  accessToken,
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);

  const updateItem = async () => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `item-job-section/update/${selectedIdItemJob}`;
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "PATCH";
      api.type = "json";
      api.body = {
        name: selectedOldItemJob
          ? selectedOldItemJob.name
          : selectedNewItemJob?.name,
        volume: volume,
        minimumVolume: selectedOldItemJob
          ? selectedOldItemJob.minimumVolume
          : selectedNewItemJob?.minimum,
        materialPricePerUnit: selectedOldItemJob
          ? selectedOldItemJob.materialPricePerUnit
          : selectedNewItemJob?.materialPricePerUnit,
        feePricePerUnit: selectedOldItemJob
          ? selectedOldItemJob.feePricePerUnit
          : selectedNewItemJob?.feePricePerUnit,
        unit: selectedOldItemJob
          ? selectedOldItemJob.unit
          : selectedNewItemJob?.unit,
        information: selectedOldItemJob
          ? selectedOldItemJob.information
          : `${selectedNewItemJob?.sector?.category?.reference}, ${selectedNewItemJob?.categoryCode}.${selectedNewItemJob?.sectorNo}.${selectedNewItemJob?.no}`,
        jobSectionId: selectedJobSection?.id,
      };

      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setOpen(false);
        mutateDetail();
        setSelectedIdItemJob(null);
        setSelectedNewItemJob(null);
        setSelectedOldItemJob(null);
        setKeyword("");
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
      toast.error("Error creating document: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedIdItemJob(null);
    setSelectedNewItemJob(null);
    setSelectedOldItemJob(null);
  };

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
                Ganti pekerjaan atau perbarui volume.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              ref={itemRef}
              className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5"
            >
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
                <div className="relative w-full">
                  <input
                    type="text"
                    id="name"
                    autoComplete="false"
                    placeholder="Cari nama pekerjaan"
                    className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                    value={keyword}
                    onChange={(e) => handleSearch(e)}
                    onClick={handleShowList}
                  />
                  {openSearchDropDown && (
                    <div className="absolute z-10 mt-2 max-h-56 w-full overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                      {isLoadingSearch ? (
                        <div className="flex items-center justify-center w-full p-4 text-gray-700">
                          <CgSpinner className="h-4 w-4 animate-spin" />
                        </div>
                      ) : dataSearch.length === 0 ? (
                        <div className="text-center text-sm text-gray-600 font-semibold p-2">
                          Hasil pencarian tidak ditemukan.
                        </div>
                      ) : (
                        dataSearch.map((item) => (
                          <div
                            key={item.id}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectItem(item);
                            }}
                            className="rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.sector.category.name}, {item.sector.name},{" "}
                              {item.sector.category.code}.{item.sector.no}.
                              {item.no}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(selectedOldItemJob || selectedNewItemJob) && (
              <>
                <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="volume"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Volume
                      </label>
                      <span className="text-sm font-semibold text-primaryRed">
                        *
                      </span>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="volume"
                        min={0}
                        placeholder="Masukkan volume"
                        defaultValue={volume}
                        onChange={handleVolumeChange}
                        className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 text-sm text-gray-700 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Harga Satuan
                    </p>
                    <div className="mt-3 space-y-2 font-semibold">
                      <p>
                        Material:{" "}
                        {formatRupiah(
                          selectedOldItemJob
                            ? selectedOldItemJob.materialPricePerUnit
                            : selectedNewItemJob?.materialPricePerUnit
                        )}
                        /
                        {selectedOldItemJob
                          ? selectedOldItemJob.minimumVolume
                          : selectedNewItemJob?.minimum}{" "}
                        {selectedOldItemJob
                          ? selectedOldItemJob.unit
                          : selectedNewItemJob?.unit}
                      </p>
                      <p>
                        Jasa:{" "}
                        {formatRupiah(
                          selectedOldItemJob
                            ? selectedOldItemJob.feePricePerUnit
                            : selectedNewItemJob?.feePricePerUnit
                        )}
                        /
                        {selectedOldItemJob
                          ? selectedOldItemJob.minimumVolume
                          : selectedNewItemJob?.minimum}{" "}
                        {selectedOldItemJob
                          ? selectedOldItemJob.unit
                          : selectedNewItemJob?.unit}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                      Total Harga
                    </p>
                    <div className="mt-3 space-y-2 font-semibold">
                      <p>
                        Material:{" "}
                        {formatRupiah(
                          ((selectedOldItemJob
                            ? selectedOldItemJob.materialPricePerUnit
                            : selectedNewItemJob?.materialPricePerUnit ?? 0) /
                            (selectedOldItemJob
                              ? selectedOldItemJob.minimumVolume
                              : selectedNewItemJob?.minimum ?? 0)) *
                            volume
                        )}
                        /{volume}
                        {selectedOldItemJob
                          ? selectedOldItemJob.unit
                          : selectedNewItemJob?.unit}
                      </p>
                      <p>
                        Jasa:{" "}
                        {formatRupiah(
                          ((selectedOldItemJob
                            ? selectedOldItemJob.feePricePerUnit
                            : selectedNewItemJob?.feePricePerUnit ?? 0) /
                            (selectedOldItemJob
                              ? selectedOldItemJob.minimumVolume
                              : selectedNewItemJob?.minimum ?? 0)) *
                            volume
                        )}
                        /{volume}
                        {selectedOldItemJob
                          ? selectedOldItemJob.unit
                          : selectedNewItemJob?.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading || (!selectedNewItemJob && !selectedOldItemJob)}
                onClick={updateItem}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryBlue px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(0,110,182,0.9)] transition duration-200 hover:bg-primaryBlueDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <CgSpinner className="h-4 w-4 animate-spin" />}
                Perbarui
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
