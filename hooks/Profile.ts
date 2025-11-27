/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const updateProfile = async () => {
    setIsLoading(false);

    const api = new Api();
    api.auth = true;
    api.token = accessToken;
    api.url = `update/${session.id}`;
    api.body = {};
    const res = await api.call();
    if (res.statusCode === 200) {
      toast.success(res.message);
    }
  };
  return {};
};
