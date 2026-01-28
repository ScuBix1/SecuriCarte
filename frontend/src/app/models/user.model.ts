export type CurrentUserType = {
  loggedIn: boolean;
  user: {
    id: string;
    email?: string;
  };
};
