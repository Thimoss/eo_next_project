import useSWR from "swr";
import Api from "../service/Api";
import { useEffect, useRef, useState } from "react";
import { Item } from "../types/ItemsJob.type";
import { ItemJobSection, JobSection } from "../types/Documents.type";

interface UseDetailDocumentProps {
  slug: string;
}
export const UseDetailDocument = ({ slug }: UseDetailDocumentProps) => {
  const [openCreateSection, setOpenCreateSection] = useState(false);
  const [openDeleteSection, setOpenDeleteSection] = useState(false);
  const [openUpdateSection, setOpenUpdateSection] = useState(false);
  const [openCreateItem, setOpenCreateItem] = useState(false);
  const [openDeleteItem, setOpenDeleteItem] = useState(false);
  const [openUpdateItem, setOpenUpdateItem] = useState(false);
  const [selectedJobSection, setSelectedJobSection] =
    useState<JobSection | null>();
  const [selectedNewItemJob, setSelectedNewItemJob] = useState<Item | null>();
  const [selectedOldItemJob, setSelectedOldItemJob] =
    useState<ItemJobSection | null>();
  const [openSearchDropDown, setOpenSearchDropDown] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [selectedIdItemJob, setSelectedIdItemJob] = useState<number | null>();
  const itemRef = useRef<HTMLDivElement | null>(null);

  const fetcherDetail = async (url: string, slug: string) => {
    const api = new Api();
    api.url = url + slug;
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
  } = useSWR(
    ["document/detail/", slug],
    ([url, slug]) => fetcherDetail(url, slug),
    {
      revalidateOnFocus: false,
    }
  );

  const fetcherSearch = async (url: string, keyword: string) => {
    const api = new Api();
    api.url = url;
    api.method = "GET";
    api.body = {
      keyword: keyword,
    };

    const response = await api.call();

    if (!response.statusCode.toString().startsWith("2")) {
      throw new Error(response.meta.message);
    }
    return response.data;
  };

  const {
    data: dataSearch,
    error: errorSearch,
    isLoading: isLoadingSearch,
    mutate: mutateSearch,
  } = useSWR(
    ["item/search", keyword],
    ([url, keyword]) => fetcherSearch(url, keyword),
    {
      revalidateOnFocus: false,
    }
  );

  const handleCreateSection = async () => {
    setOpenCreateSection(true);
  };

  const handleUpdateSection = async (section: JobSection) => {
    setSelectedJobSection(section);
    setOpenUpdateSection(true);
  };
  const handleDeleteSection = async (section: JobSection) => {
    setSelectedJobSection(section);
    setOpenDeleteSection(true);
  };

  const handleCreateItemJob = async (section: JobSection) => {
    setSelectedJobSection(section);
    setSelectedNewItemJob(null);
    setOpenCreateItem(true);
  };

  const handleUpdateItemJob = async (
    item: ItemJobSection,
    section: JobSection
  ) => {
    setSelectedNewItemJob(null);
    setSelectedIdItemJob(item.id);
    setSelectedOldItemJob(item);
    setSelectedJobSection(section);
    setKeyword(item.name);
    setVolume(item.volume);
    setOpenUpdateItem(true);
  };

  const handleDeleteItemJob = async (item: ItemJobSection) => {
    setSelectedOldItemJob(item);
    setOpenDeleteItem(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSelectedNewItemJob(null);
    setSelectedOldItemJob(null);
  };

  const handleShowList = async () => {
    setOpenSearchDropDown(true);
  };
  const handleSelectItem = async (item: Item) => {
    setSelectedNewItemJob(null);
    setSelectedNewItemJob(item);
    setKeyword(item.name);
    setOpenSearchDropDown(false);
    setVolume(Number(item.minimum));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = e.target.value;
    setVolume(Number(newVolume));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setOpenSearchDropDown(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    document.addEventListener("mousedown", handleClickOutside);

    const dropdown = itemRef.current;
    if (dropdown) {
      dropdown.addEventListener("wheel", handleWheel);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      if (dropdown) {
        dropdown.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return {
    dataDetail,
    errorDetail,
    isLoadingDetail,
    mutateDetail,
    openCreateSection,
    setOpenCreateSection,
    openDeleteSection,
    setOpenDeleteSection,
    openUpdateSection,
    setOpenUpdateSection,
    handleCreateSection,
    handleUpdateSection,
    selectedJobSection,
    handleDeleteSection,
    openCreateItem,
    setOpenCreateItem,
    openDeleteItem,
    setOpenDeleteItem,
    openUpdateItem,
    setOpenUpdateItem,
    handleCreateItemJob,
    openSearchDropDown,
    setOpenSearchDropDown,
    dataSearch,
    errorSearch,
    isLoadingSearch,
    mutateSearch,
    handleSelectItem,
    keyword,
    handleSearch,
    handleShowList,
    selectedOldItemJob,
    selectedNewItemJob,
    setSelectedNewItemJob,
    setSelectedOldItemJob,
    setKeyword,
    handleVolumeChange,
    volume,
    itemRef,
    handleUpdateItemJob,
    selectedIdItemJob,
    setSelectedIdItemJob,
    handleDeleteItemJob,
  };
};
