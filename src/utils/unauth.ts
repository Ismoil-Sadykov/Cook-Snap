import toast from "react-hot-toast";

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    toast.success("Вы вышли из аккаунта");
    window.location.href = "/authorization"; 
  }
};
