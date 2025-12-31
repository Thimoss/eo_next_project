import React, { useState } from "react";
import Modal from "../global/Modal";
import { useForm } from "react-hook-form";
import Api from "../../../service/Api";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { CgSpinner } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useUserSearch } from "../../../hooks/UserSearch";
import { UserSession } from "../../../types/Session.type";

interface FormData {
  name: string;
}
interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken?: string;
  session?: UserSession | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: KeyedMutator<any>;
}

export default function CreateModal({
  open,
  setOpen,
  mutate,
  accessToken,
  session,
}: CreateModalProps) {
  const [loading, setLoading] = useState(false);
  const [checkedByError, setCheckedByError] = useState<string | null>(null);
  const [confirmedByError, setConfirmedByError] = useState<string | null>(null);
  const checkedUserSearch = useUserSearch({ accessToken });
  const confirmedUserSearch = useUserSearch({ accessToken });
  const creatorId = session?.id;
  const {
    // control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const checkedUser = checkedUserSearch.selectedUser;
    const confirmedUser = confirmedUserSearch.selectedUser;
    let hasError = false;

    setCheckedByError(null);
    setConfirmedByError(null);

    if (!checkedUser) {
      setCheckedByError("Pemeriksa wajib dipilih.");
      hasError = true;
    }

    if (!confirmedUser) {
      setConfirmedByError("Pengesah wajib dipilih.");
      hasError = true;
    }

    if (checkedUser && confirmedUser && checkedUser.id === confirmedUser.id) {
      const message = "Pemeriksa dan pengesah harus berbeda.";
      setCheckedByError(message);
      setConfirmedByError(message);
      hasError = true;
    }

    if (creatorId) {
      if (checkedUser?.id === creatorId) {
        setCheckedByError("Pemeriksa tidak boleh sama dengan creator.");
        hasError = true;
      }

      if (confirmedUser?.id === creatorId) {
        setConfirmedByError("Pengesah tidak boleh sama dengan creator.");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    try {
      setLoading(true);

      const api = new Api();
      api.url = "document/create";
      api.auth = true;
      api.token = accessToken ?? "";
      api.method = "POST";
      api.type = "json";
      api.body = {
        name: data.name,
        checkedById: checkedUser?.id,
        confirmedById: confirmedUser?.id,
      };

      const response = await api.call();

      if (response.statusCode === 200) {
        toast.success(response.message);
        setOpen(false);
        mutate();
        reset();
        checkedUserSearch.clearSelection();
        confirmedUserSearch.clearSelection();
        setCheckedByError(null);
        setConfirmedByError(null);
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
    reset();
    setOpen(false);
    clearErrors();
    checkedUserSearch.clearSelection();
    confirmedUserSearch.clearSelection();
    setCheckedByError(null);
    setConfirmedByError(null);
  };

  const handleCheckedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedByError(null);
    checkedUserSearch.handleSearch(e);
  };

  const handleConfirmedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmedByError(null);
    confirmedUserSearch.handleSearch(e);
  };

  const handleShowCheckedList = async () => {
    confirmedUserSearch.setOpenSearchDropDown(false);
    await checkedUserSearch.handleShowList();
  };

  const handleShowConfirmedList = async () => {
    checkedUserSearch.setOpenSearchDropDown(false);
    await confirmedUserSearch.handleShowList();
  };

  const handleSelectCheckedUser = async (user: UserSession) => {
    setCheckedByError(null);
    await checkedUserSearch.handleSelectUser(user);
  };

  const handleSelectConfirmedUser = async (user: UserSession) => {
    setConfirmedByError(null);
    await confirmedUserSearch.handleSelectUser(user);
  };
  return (
    <Modal onClose={handleCancel} open={open}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-primaryGreen via-primaryBlue to-primaryGreenLighter" />
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primaryGreen/10 text-primaryGreen">
              <IoDocumentTextOutline className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Tambah Dokumen
              </h2>
              <p className="text-xs text-gray-500">
                Buat dokumen baru untuk mulai mengisi data.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Dokumen
                  </label>
                  <span className="text-sm font-medium text-primaryRed">*</span>
                </div>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Nama dokumen diperlukan" })}
                  className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                  placeholder="Masukkan nama dokumen"
                />
                {errors.name && (
                  <p className="text-sm text-primaryRed">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div
                ref={checkedUserSearch.userRef}
                className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="checkedById"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Diperiksa oleh
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="checkedById"
                      autoComplete="off"
                      placeholder="Cari nama pemeriksa"
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      value={checkedUserSearch.keyword}
                      onChange={handleCheckedSearch}
                      onClick={handleShowCheckedList}
                    />
                    {checkedUserSearch.openSearchDropDown && (
                      <div className="absolute z-10 mt-2 max-h-56 w-full overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                        {checkedUserSearch.isLoadingSearch ? (
                          <div className="flex w-full items-center justify-center p-4 text-gray-700">
                            <CgSpinner className="h-4 w-4 animate-spin" />
                          </div>
                        ) : checkedUserSearch.dataSearch.length === 0 ? (
                          <div className="p-2 text-center text-sm font-semibold text-gray-600">
                            Hasil pencarian tidak ditemukan.
                          </div>
                        ) : (
                          checkedUserSearch.dataSearch.map((user) => (
                            <div
                              key={user.id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectCheckedUser(user);
                              }}
                              className="rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <p className="font-semibold">{user.name}</p>
                              {user.email && (
                                <p className="text-xs text-gray-500">
                                  {user.email}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  {checkedByError && (
                    <p className="text-sm text-primaryRed">{checkedByError}</p>
                  )}
                </div>
              </div>

              <div
                ref={confirmedUserSearch.userRef}
                className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="confirmedById"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disahkan oleh
                    </label>
                    <span className="text-sm font-semibold text-primaryRed">
                      *
                    </span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="confirmedById"
                      autoComplete="off"
                      placeholder="Cari nama pengesah"
                      className="text-sm block w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 shadow-sm focus:border-primaryBlue focus:outline-none focus:ring-2 focus:ring-primaryBlue/30"
                      value={confirmedUserSearch.keyword}
                      onChange={handleConfirmedSearch}
                      onClick={handleShowConfirmedList}
                    />
                    {confirmedUserSearch.openSearchDropDown && (
                      <div className="absolute z-10 mt-2 max-h-56 w-full overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                        {confirmedUserSearch.isLoadingSearch ? (
                          <div className="flex w-full items-center justify-center p-4 text-gray-700">
                            <CgSpinner className="h-4 w-4 animate-spin" />
                          </div>
                        ) : confirmedUserSearch.dataSearch.length === 0 ? (
                          <div className="p-2 text-center text-sm font-semibold text-gray-600">
                            Hasil pencarian tidak ditemukan.
                          </div>
                        ) : (
                          confirmedUserSearch.dataSearch.map((user) => (
                            <div
                              key={user.id}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectConfirmedUser(user);
                              }}
                              className="rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <p className="font-semibold">{user.name}</p>
                              {user.email && (
                                <p className="text-xs text-gray-500">
                                  {user.email}
                                </p>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  {confirmedByError && (
                    <p className="text-sm text-primaryRed">
                      {confirmedByError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={handleCancel}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primaryGreen px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-20px_rgba(176,203,31,0.9)] transition duration-200 hover:bg-primaryGreenDarker disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && (
                  <CgSpinner className="h-4 w-4 animate-spin" />
                )}
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
