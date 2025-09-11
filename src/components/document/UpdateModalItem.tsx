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
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Update Item</span>
        <div className="flex flex-col gap-5">
          <div ref={itemRef} className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold">Name</span>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search job name"
                className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                value={keyword}
                onChange={(e) => handleSearch(e)}
                onClick={handleShowList}
              />
              {openSearchDropDown && (
                <div className="bg-white rounded-md p-2 w-full drop-shadow-md absolute max-h-56 overflow-hidden overflow-y-scroll scroll-smooth z-10">
                  {isLoadingSearch ? (
                    <div className="flex items-center justify-center w-full p-4 text-black">
                      <CgSpinner className="animate-spin w-4 h-4" />
                    </div>
                  ) : dataSearch.length === 0 ? (
                    <div className="text-center text-xs font-semibold p-2">
                      No results found.
                    </div>
                  ) : (
                    dataSearch.map((item) => (
                      <div
                        key={item.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectItem(item);
                        }}
                        className="text-xs flex flex-col gap-1 p-2 rounded-md hover:bg-gray-200"
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
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-semibold">Volume</span>
                <div className="relative w-full">
                  <input
                    type="number"
                    min={0}
                    placeholder="Input Volume"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <div className="text-xs font-semibold flex flex-col gap-2">
                  <p>
                    Material Price:{" "}
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
                    Fee Price:{" "}
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
                <div className="text-xs font-semibold flex flex-col gap-2">
                  <p>
                    Total Material Price:{" "}
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
                    Total Fee Price:{" "}
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
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white duration-300 bg-primaryRed disabled:bg-primaryRedLighter hover:bg-primaryRedDarker cursor-pointer flex items-center justify-between"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || (!selectedNewItemJob && !selectedOldItemJob)}
              onClick={updateItem}
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
        </div>
      </div>
    </Modal>
  );
}
