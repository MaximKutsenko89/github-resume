export const ROUTER = {
  HOME: "/",
  RESUME: (userName: string) => `/resume/${userName}`,
  USER_NOT_FOUND: "/user-not-found",
};

export const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;
