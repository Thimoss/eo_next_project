import { useState } from "react";
import Api from "../service/Api";
import { UserSession } from "../types/Session.type";
import { toast } from "react-toastify";

interface UseProfileProps {
  accessToken: string;
  session: UserSession;
}

export const useProfile = ({ accessToken, session }: UseProfileProps) => {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [profileData, setProfileData] = useState({
    name: session?.name || "",
    email: session?.email || "",
    phoneNumber: session?.phoneNumber || "",
    position: session?.position || "",
  });

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPasswords({
      ...passwords,
      [field]: e.target.value,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const resetProfileData = (
    nextData: typeof profileData = {
      name: session?.name || "",
      email: session?.email || "",
      phoneNumber: session?.phoneNumber || "",
      position: session?.position || "",
    }
  ) => {
    setProfileData(nextData);
  };

  const updateProfile = async () => {
    setIsProfileLoading(true);

    const api = new Api();
    api.auth = true;
    api.token = accessToken;
    api.url = `users/update/${session.id}`;
    api.method = "PATCH";
    api.body = profileData;

    const res = await api.call();

    console.log(res);
    if (res.statusCode === 200) {
      toast.success(res.message);
      setIsEditing(false);
    } else {
      toast.error(res.message || "Terjadi kesalahan");
    }
    setIsProfileLoading(false);
  };

  const updatePassword = async () => {
    try {
      setIsPasswordLoading(true);

      const api = new Api();
      api.auth = true;
      api.token = accessToken;
      api.url = `users/change-password/${session.id}`;
      api.method = "PATCH";
      api.body = passwords;
      const response = await api.call();

      if (response.statusCode === 200) {
        toast.success("Kata sandi berhasil diperbarui.");
      } else {
        toast.error(response.message || "Gagal mengganti kata sandi.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
    setIsPasswordLoading(false);
  };

  return {
    isLoading: isProfileLoading || isPasswordLoading,
    isProfileLoading,
    isPasswordLoading,
    isEditing,
    setIsEditing,
    handleInputChange,
    profileData,
    resetProfileData,
    updateProfile,
    handlePasswordChange,
    updatePassword,
    passwords,
  };
};
