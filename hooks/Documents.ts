import useSWR from "swr";
import Api from "../service/Api";

interface UseDetailDocumentProps {
  slug: string;
}
export const UseDetailDocument = ({ slug }: UseDetailDocumentProps) => {
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
      // refreshInterval: 0,
    }
  );
  return { dataDetail, errorDetail, isLoadingDetail, mutateDetail };
};
