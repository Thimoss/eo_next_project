import { useState } from "react";

export const useDetailCategories = () => {
  const [openCreateSector, setOpenCreateSector] = useState(false);
  const [openUpdateSector, setOpenUpdateSector] = useState(false);
  const [openDeleteSector, setOpenDeleteSector] = useState(false);
  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [selectedSector, setSelectedSector] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const handleEditSector = async (sector: any) => {
    // setSelectedCategory(category);
    setOpenUpdateSector(true);
  };
  const handleDeletetSector = async (sector: any) => {
    // setSelectedCategory(category);
    setOpenDeleteSector(true);
  };

  const handleEditItem = async (item: any) => {
    // setSelectedCategory(category);
    setOpenUpdateItem(true);
  };
  const handleDeleteItem = async (item: any) => {
    // setSelectedCategory(category);
    setOpenDeleteItem(true);
  };
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
    handleDeletetSector,
    handleEditItem,
    handleDeleteItem,
  };
};
