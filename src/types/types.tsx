export type LoginCredentials = {
  username: string;
  password: string;
  role?: string;
};

export type AuthContextType = {
  user: LoginCredentials | null;
  authLoading: boolean;
  login: (user: LoginCredentials) => void;
  logout: () => void;
};

export type Course = {
  id: string | null;
  description: string;
  title: string;
  lectures: Lecture[];
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
  order:number
};
