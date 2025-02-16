export type LoginCredentials = {
  username: string;
  password: string;
  role?: string;
};

export type AuthContextType = {
  user:LoginCredentials | null;
  login: (user:LoginCredentials) => void;
  logout: () => void;
}
