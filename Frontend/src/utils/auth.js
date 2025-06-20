export const isAdminLoggedIn = () => {
  return localStorage.getItem("role") === "admin";
};
