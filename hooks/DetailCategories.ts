import { useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";
import { Sector } from "../types/Sectors.type";
import { Item } from "../types/Items.type";

interface UseDetailCategoriesProps {
  id: string;
}

export const useDetailCategories = ({ id }: UseDetailCategoriesProps) => {
  const [openCreateSector, setOpenCreateSector] = useState(false);
  const [openUpdateSector, setOpenUpdateSector] = useState(false);
  const [openDeleteSector, setOpenDeleteSector] = useState(false);
  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [selectedSector, setSelectedSector] = useState<Sector | null>();
  const [selectedItem, setSelectedItem] = useState<Item | null>();

  const handleEditSector = async (sector: Sector) => {
    setSelectedSector(sector);
    setOpenUpdateSector(true);
  };
  const handleDeleteSector = async (sector: Sector) => {
    setSelectedSector(sector);
    setOpenDeleteSector(true);
  };

  const handleCreateItem = async (sector: Sector) => {
    setSelectedSector(sector);
    setOpenCreateItem(true);
  };
  const handleEditItem = (item: Item) => {
    setSelectedItem(item);
    setOpenUpdateItem(true);
  };
  const handleDeleteItem = async (item: Item) => {
    setSelectedItem(item);
    setOpenDeleteItem(true);
  };

  const fetcherDetail = async (url: string, id: string) => {
    const api = new Api();
    api.url = url + id;
    api.method = "GET";

    const response = await api.call();

    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const {
    data: dataDetail,
    error: errorDetail,
    isLoading: isLoadingDetail,
    mutate: mutateDetail,
  } = useSWR(["category/detail/", id], ([url, id]) => fetcherDetail(url, id), {
    revalidateOnFocus: false,
    // refreshInterval: 0,
  });

  return {
    openCreateSector,
    setOpenCreateSector,
    openUpdateSector,
    setOpenUpdateSector,
    openDeleteSector,
    setOpenDeleteSector,
    openCreateItem,
    setOpenCreateItem,
    openUpdateItem,
    setOpenUpdateItem,
    openDeleteItem,
    setOpenDeleteItem,
    selectedSector,
    setSelectedSector,
    selectedItem,
    setSelectedItem,
    handleEditSector,
    handleDeleteSector,
    handleEditItem,
    handleDeleteItem,
    dataDetail,
    errorDetail,
    isLoadingDetail,
    mutateDetail,
    handleCreateItem,
  };
};
