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
}: CreateModalProps) {
  const [loading, setLoading] = useState(false);

  const createItem = async () => {
    try {
      setLoading(true);
      const api = new Api();
      api.url = "item-job-section/create";
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
  };

  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <div className="flex flex-col gap-5">
        <span className="text-sm font-bold text-left">Add Item</span>
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

          {selectedNewItemJob && (
            <>
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs font-semibold">Volume</span>
                <div className="relative w-full">
                  <input
                    type="number"
                    min={0}
                    placeholder="Input Volume"
                    defaultValue={volume}
                    onChange={handleVolumeChange}
                    className="text-xs px-3 bg-gray-200 rounded-md py-1 border border-gray-300 focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-5">
                <div className="text-xs font-semibold flex flex-col gap-2">
                  <p>
                    Material Price:{" "}
                    {formatRupiah(selectedNewItemJob.materialPricePerUnit)}/
                    {selectedNewItemJob.minimum} {selectedNewItemJob.unit}
                  </p>
                  <p>
                    Fee Price:{" "}
                    {formatRupiah(selectedNewItemJob.feePricePerUnit)}/
                    {selectedNewItemJob.minimum} {selectedNewItemJob.unit}
                  </p>
                </div>
                <div className="text-xs font-semibold flex flex-col gap-2">
                  <p>
                    Total Material Price:{" "}
                    {formatRupiah(
                      (selectedNewItemJob.materialPricePerUnit /
                        selectedNewItemJob.minimum) *
                        volume
                    )}
                    /{volume} KG
                  </p>
                  <p>
                    Total Fee Price:{" "}
                    {formatRupiah(
                      (selectedNewItemJob.feePricePerUnit /
                        selectedNewItemJob.minimum) *
                        volume
                    )}
                    /{volume} KG
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
              disabled={loading || !selectedNewItemJob}
              onClick={createItem}
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
