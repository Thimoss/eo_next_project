import { useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";
import { useRouter } from "nextjs-toploader/app";
import { Document } from "../types/Documents.type";
import { UserSession } from "../types/Session.type";

interface UseListUsersProps {
  accessToken?: string;
  session?: UserSession;
}

export interface SortByDataProps {
  value: string;
  label: string;
}

export const sortByList = [
  {
    value: "asc",
    label: "Abjad (A-Z)",
  },
  {
    value: "desc",
    label: "Abjad (Z-A)",
  },
  {
    value: "recent",
    label: "Terbaru",
  },
  {
    value: "least",
    label: "Paling Lama Diperbarui",
  },
];

type DocumentScope = "created" | "review" | "confirm";

export const useDashboard = ({ accessToken }: UseListUsersProps) => {
  const route = useRouter();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document>();

  const fetcher = async (url: string, scope: DocumentScope, limit: number) => {
    const api = new Api();
    api.url = url;
    api.auth = true;
    api.token = accessToken ?? "";
    api.method = "GET";
    api.body = {
      scope,
      sortBy: "recent",
      limit,
    };

    const response = await api.call();
    const statusCode = response?.statusCode ?? response?.meta?.code;
    if (!statusCode || !statusCode.toString().startsWith("2")) {
      const message =
        response?.message ||
        response?.meta?.message ||
        "Gagal memuat data dokumen.";
      throw new Error(message);
    }
    return response.data ?? [];
  };

  const {
    data: createdDocs,
    error: createdError,
    isLoading: isLoadingCreated,
    mutate: mutateCreated,
  } = useSWR(
    ["document/list", "created", 5],
    ([url, scope, limit]: [string, DocumentScope, number]) =>
      fetcher(url, scope, limit),
    {
      revalidateOnFocus: false,
    }
  );

  const {
    data: reviewDocs,
    error: reviewError,
    isLoading: isLoadingReview,
    mutate: mutateReview,
  } = useSWR(
    ["document/list", "review", 5],
    ([url, scope, limit]: [string, DocumentScope, number]) =>
      fetcher(url, scope, limit),
    {
      revalidateOnFocus: false,
    }
  );

  const {
    data: confirmDocs,
    error: confirmError,
    isLoading: isLoadingConfirm,
    mutate: mutateConfirm,
  } = useSWR(
    ["document/list", "confirm", 5],
    ([url, scope, limit]: [string, DocumentScope, number]) =>
      fetcher(url, scope, limit),
    {
      revalidateOnFocus: false,
    }
  );

  const handleEdit = async (document: Document) => {
    setSelectedDocument(document);
    setOpenEdit(true);
  };
  const handleDelete = async (document: Document) => {
    setSelectedDocument(document);
    setOpenDelete(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDetail = async (document: any) => {
    route.push(`/detail-documents/${document.slug}`);
  };

  return {
    createdDocs: createdDocs ?? [],
    reviewDocs: reviewDocs ?? [],
    confirmDocs: confirmDocs ?? [],
    error: createdError || reviewError || confirmError,
    isLoading: isLoadingCreated || isLoadingReview || isLoadingConfirm,
    mutateCreated,
    mutateReview,
    mutateConfirm,
    openCreate,
    setOpenCreate,
    handleDetail,
    selectedDocument,
    openEdit,
    setOpenEdit,
    openDelete,
    setOpenDelete,
    handleEdit,
    handleDelete,
  };
};
