import { CognitoUserSession } from "amazon-cognito-identity-js";

export type LoginCredentials = {
  username: string;
  password: string;
  role?: string;
};

export type AuthContextType = {
  user: CognitoUserSession | null;
  authLoading: boolean;
  login: (user: LoginCredentials) => void;
  signUp: (user: LoginCredentials) => void;
  logout: () => void;
};

export type Course = {
  id: string | null;
  description: string;
  title: string;
  lectures: Lecture[];
  category: string;
};

export type Lecture = {
  id: string | null;
  title: string;
  description: string;
  sections?: Section[];
  order: number;
};

export type Section = {
  id: string | null;
  lectureId?: string;
  title: string;
  description: string;
  content?: {
    path?: string;
    type?: string;
  };
  order: number;
};
