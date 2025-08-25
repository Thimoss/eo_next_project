import useSWR from "swr";
import Api from "../service/Api";
import { useState } from "react";

interface UseDetailDocumentProps {
  slug: string;
}
export const UseDetailDocument = ({ slug }: UseDetailDocumentProps) => {
  const [openCreateSection, setOpenCreateSection] = useState(false);
  const [openDeleteSection, setOpenDeleteSection] = useState(false);
  const [openUpdateSection, setOpenUpdateSection] = useState(false);
  const [selectedJobSection, setSelectedJobSection] = useState();
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
      refreshInterval: 300,
    }
  );

  const handleCreateSection = async () => {
    setOpenCreateSection(true);
  };
  const handleUpdateSection = async (section) => {
    setSelectedJobSection(section);
    setOpenUpdateSection(true);
  };
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
  };
};
