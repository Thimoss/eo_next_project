import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Modal from "../global/Modal";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import formatRupiah from "../../../utils/formatRupiah";
import { ItemJobSection, JobSection } from "../../../types/Documents.type";
import { Item } from "../../../types/ItemsJob.type";

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
}: UpdateModalProps) {
  const [loading, setLoading] = useState(false);

  const updateItem = async () => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = `item-job-section/update/${selectedIdItemJob}`;
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

      console.log(api.body);
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
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Perbarui Pekerjaan
        </span>
        <div className="flex flex-col gap-6">
          <div ref={itemRef} className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Nama Pekerjaan
              </label>
              <span className="text-sm font-semibold text-primaryRed">*</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                placeholder="Cari nama pekerjaan"
                className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                value={keyword}
                onChange={(e) => handleSearch(e)}
                onClick={handleShowList}
              />
              {openSearchDropDown && (
                <div className="bg-white rounded-md p-2 w-full drop-shadow-md absolute max-h-56 overflow-hidden overflow-y-scroll scroll-smooth z-10">
                  {isLoadingSearch ? (
                    <div className="flex items-center justify-center w-full p-4 text-gray-700">
                      <CgSpinner className="animate-spin w-4 h-4" />
                    </div>
                  ) : dataSearch.length === 0 ? (
                    <div className="text-center text-sm text-gray-700 font-semibold p-2">
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
                        className="text-sm text-gray-700 flex flex-col gap-1 p-2 rounded-md hover:bg-gray-200"
                      >
                        <p className="font-semibold">{item.name}</p>
                        <div>
                          <p>
                            {item.sector.category.name}, {item.sector.name},{" "}
                            {item.sector.category.code}.{item.sector.no}.
                            {item.no}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {(selectedOldItemJob || selectedNewItemJob) && (
            <>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="volume"
                    className="block text-sm font-medium text-gray-600"
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
                    className="text-sm block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue text-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <div className="text-sm text-gray-700 font-semibold flex flex-col gap-2">
                  <p>
                    Harga Material:{" "}
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
                    Harga Jasa:{" "}
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
                <div className="text-sm text-gray-700 font-semibold flex flex-col gap-2">
                  <p>
                    Total Harga Material:{" "}
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
                    Total Harga Jasa:{" "}
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
            </>
          )}

          <div
            className="flex gap-5 justify-end
                "
          >
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm px-4 py-2 bg-primaryRed text-white font-bold rounded-md hover:bg-primaryRedDarker disabled:bg-primaryRedLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || (!selectedNewItemJob && !selectedOldItemJob)}
              onClick={updateItem}
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
        </div>
      </div>
    </Modal>
  );
}
