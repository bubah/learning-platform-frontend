export type LoginCredentials = {
  username: string;
  password: string;
  role?: string;
};

export type AuthContextType = {
  user:LoginCredentials | null;
  authLoading: boolean;
  login: (user:LoginCredentials) => void;
  logout: () => void;
}
