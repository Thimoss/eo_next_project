import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Modal from "../global/Modal";
import { Item } from "../../../types/ItemsJob.type";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import formatRupiah from "../../../utils/formatRupiah";
import { JobSection } from "../../../types/Documents.type";

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataSearch: Item[];
  isLoadingSearch: boolean;
  handleSelectItem: (item: Item) => Promise<void>;
  handleShowList: () => Promise<void>;
  keyword: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openSearchDropDown: boolean;
  selectedNewItemJob: Item | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateDetail: KeyedMutator<any>;
  setSelectedNewItemJob: React.Dispatch<
    React.SetStateAction<Item | null | undefined>
  >;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  itemRef: React.RefObject<HTMLDivElement | null>;
  selectedJobSection: JobSection | null | undefined;
  accessToken?: string;
}

export default function CreateModalItem({
  open,
  setOpen,
  dataSearch,
  isLoadingSearch,
  handleSelectItem,
  keyword,
  handleSearch,
  handleShowList,
  openSearchDropDown,
  selectedNewItemJob,
  mutateDetail,
  setSelectedNewItemJob,
  setKeyword,
  handleVolumeChange,
  volume,
  itemRef,
  selectedJobSection,
  accessToken,
}: CreateModalProps) {
  const [loading, setLoading] = useState(false);

  const createItem = async () => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = "item-job-section/create";
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "POST";
      api.type = "json";
      api.body = {
        name: selectedNewItemJob?.name,
        volume: volume,
        minimumVolume: selectedNewItemJob?.minimum,
        materialPricePerUnit: selectedNewItemJob?.materialPricePerUnit,
        feePricePerUnit: selectedNewItemJob?.feePricePerUnit,
        unit: selectedNewItemJob?.unit,
        information: `${selectedNewItemJob?.sector.category.reference}, ${selectedNewItemJob?.categoryCode}.${selectedNewItemJob?.sectorNo}.${selectedNewItemJob?.no}`,
        jobSectionId: selectedJobSection?.id,
      };
      const response = await api.call();
      if (response.statusCode === 200) {
        toast.success(response.message);
        setOpen(false);
        mutateDetail();
        setSelectedNewItemJob(null);
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
    setSelectedNewItemJob(null);
  };

  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-6">
        <span className="text-xl text-gray-700 font-bold text-left">
          Tambah Pekerjaan
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
                autoComplete="false"
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

          {selectedNewItemJob && (
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
                    {formatRupiah(selectedNewItemJob.materialPricePerUnit)}/
                    {selectedNewItemJob.minimum} {selectedNewItemJob.unit}
                  </p>
                  <p>
                    Harga Jasa:{" "}
                    {formatRupiah(selectedNewItemJob.feePricePerUnit)}/
                    {selectedNewItemJob.minimum} {selectedNewItemJob.unit}
                  </p>
                </div>
                <div className="text-sm text-gray-700 font-semibold flex flex-col gap-2">
                  <p>
                    Total Harga Material:{" "}
                    {formatRupiah(
                      (selectedNewItemJob.materialPricePerUnit /
                        selectedNewItemJob.minimum) *
                        volume
                    )}
                    /{volume} {selectedNewItemJob.unit}
                  </p>
                  <p>
                    Total Harga Jasa:{" "}
                    {formatRupiah(
                      (selectedNewItemJob.feePricePerUnit /
                        selectedNewItemJob.minimum) *
                        volume
                    )}
                    /{volume} {selectedNewItemJob.unit}
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
              onClick={createItem}
              type="submit"
              disabled={loading || !selectedNewItemJob}
              className="text-sm px-4 py-2 bg-primaryGreen text-white font-bold rounded-md hover:bg-primaryGreenDarker disabled:bg-primaryGreenLighter transition duration-300 ease-in-out cursor-pointer flex items-center gap-2 shadow-sm"
            >
              {loading && (
                <div>
                  <CgSpinner className="w-3 h-3 text-center animate-spin" />
                </div>
              )}
              Tambah
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
