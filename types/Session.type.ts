export type UserSession = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ProfileResponse = {
  statusCode: number;
  message: string;
  data: UserSession;
};

export type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type SavedSession = {
  user: UserSession;
  accessToken: string;
  iat: number;
  exp: number;
};
