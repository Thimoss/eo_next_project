import { useState } from "react";
import Api from "../service/Api";
import { UserSession } from "../types/Session.type";
import { toast } from "react-toastify";

interface UseProfileProps {
  accessToken: string;
  session: UserSession;
}

export const useProfile = ({ accessToken, session }: UseProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: session?.name || "",
    email: session?.email || "",
    phoneNumber: session?.phoneNumber || "",
  });

  // Fungsi untuk mengubah nilai state profileData saat input diubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setProfileData({
      ...profileData,
      [field]: e.target.value,
    });
  };

  const updateProfile = async () => {
    setIsLoading(true);

    const api = new Api();
    api.auth = true;
    api.token = accessToken;
    api.url = `users/update/${session.id}`;
    api.method = "PATCH";
    api.body = profileData;

    console.log(api.body);

    const res = await api.call();

    console.log(res);
    if (res.statusCode === 200) {
      toast.success(res.message);
      setIsEditing(false);
    } else {
      toast.error(res.message || "Terjadi kesalahan");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    isEditing,
    setIsEditing,
    handleInputChange,
    profileData,
    updateProfile,
  };
};
