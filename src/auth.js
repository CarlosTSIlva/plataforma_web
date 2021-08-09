export const isAuthenticated = () => {
  const isLogged = !!localStorage.getItem("crcl-web-token");
  return true;
};
