import { useEffect, useRef, useState, type ChangeEvent } from "react";
import useSWR from "swr";
import Api from "../service/Api";
import { UserSession } from "../types/Session.type";

interface UseUserSearchProps {
  accessToken?: string;
  pageSize?: number;
}

export const useUserSearch = ({
  accessToken,
  pageSize = 10,
}: UseUserSearchProps) => {
  const [keyword, setKeyword] = useState("");
  const [openSearchDropDown, setOpenSearchDropDown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSession | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  const fetcherSearch = async (url: string, name: string, pageSize: number) => {
    const api = new Api();
    api.url = url;
    api.auth = true;
    api.token = accessToken ?? "";
    api.method = "GET";
    api.body = {
      name,
      page: 1,
      pageSize,
    };

    const response = await api.call();
    if (!response.statusCode?.toString().startsWith("2")) {
      throw new Error(response.meta?.message || "Gagal memuat data pengguna.");
    }

    const list = response.data?.list ?? response.data ?? [];
    return Array.isArray(list) ? list : [];
  };

  const {
    data: dataSearch,
    error: errorSearch,
    isLoading: isLoadingSearch,
  } = useSWR(
    ["users/list", keyword, pageSize],
    ([url, name, size]) => fetcherSearch(url, name, size),
    {
      revalidateOnFocus: false,
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSelectedUser(null);
  };

  const handleShowList = async () => {
    setOpenSearchDropDown(true);
  };

  const handleSelectUser = async (user: UserSession) => {
    setSelectedUser(user);
    setKeyword(user.name);
    setOpenSearchDropDown(false);
  };

  const clearSelection = () => {
    setSelectedUser(null);
    setKeyword("");
    setOpenSearchDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setOpenSearchDropDown(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };

    document.addEventListener("mousedown", handleClickOutside);

    const dropdown = userRef.current;
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
    dataSearch: dataSearch ?? [],
    errorSearch,
    isLoadingSearch,
    keyword,
    setKeyword,
    openSearchDropDown,
    setOpenSearchDropDown,
    handleSearch,
    handleShowList,
    handleSelectUser,
    selectedUser,
    setSelectedUser,
    userRef,
    clearSelection,
  };
};
