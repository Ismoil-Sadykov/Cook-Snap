import axios from 'axios';

const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => error
)

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 401) {
      const res = await refreshFun()

      if (res) {
        axiosRequest(error.config)
      }  
      else {
        localStorage.clear()
        window.location.pathname = "/guest"
      }
    }
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


const refreshFun = async () => {
  const refresh = localStorage.getItem('refresh')
  try {
    const { data } = await axios.post("/api/users/token/refresh/", {refresh: refresh})
    localStorage.setItem("access", data.access)
    return data.access
  } catch (error) {
    console.error(error)
  }
}

export default axiosRequest;
