import axios from 'axios'
import { baseUrl } from '../components/constant'

console.log(baseUrl);

const axiosInstance = axios.create({
    
});

axiosInstance.defaults.baseURL = baseUrl;


const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }
    return headers;

}

  
export const adminRegistration = (data, userType) => {
    const url = '/admin-register'
    return axiosInstance.post(url, { ...data, userType });
  };

export const Login = (data) => {
    return axiosInstance.post('/login', data, {
        headers: getHeaders()
    });
}

export const bannerInfo=() =>{
    return axiosInstance.get('/get-banner',{
        headers:getHeaders()
    });
}
export const bannerPost = (data) => {
    return axiosInstance.post('/upload-banner', data, {
        headers: getHeaders()
    });
}
export const noificationInfo=() =>{
    return axiosInstance.get('/get-notification',{
        headers:getHeaders()
    });
}
export const notificationPost = (data) => {
    return axiosInstance.post('/upload-notification', data, {
        headers: getHeaders()
    });
}


export const loanInfo=() =>{
    return axiosInstance.get('/loan-offers-info',{
        headers:getHeaders()
    });
}

export const addLoanoffer = (data) => {
    return axiosInstance.post('/add-loan-offer', data, {
        headers: getHeaders()
    });
}
export const deleteLoanoffer = (id) => {
    return axiosInstance.delete(`/delete-loanoffer/${id}`, {
        headers: getHeaders()
    });
}
export const updateLoanInfo = (id,data) => {
    console.log("data",data)
    return axiosInstance.post(`/update-loanoffer/${id}`,data, {
        headers: getHeaders()
    });
}

export const adminInfo=() =>{
    return axiosInstance.get('/admin-info',{
        headers:getHeaders()
    });
}
export const addNewAdmin = (data) => {
    return axiosInstance.post('/new-admin', data, {
        headers: getHeaders()
    });
}
export const deleteAdmin = (id) => {
    return axiosInstance.delete(`/delete-admin/${id}`, {
        headers: getHeaders()
    });
}
export const updateAdminInfo = (id,data) => {
    return axiosInstance.post(`/update-admin-info/${id}`,data, {
        headers: getHeaders()
    });
}
export const getAdminInfo = async(id) => {
    return axiosInstance.get(`/admin-infoo/${id}`, {
        headers: getHeaders()
    });
}

export const getBannerInfo = () => {
    return axiosInstance.get('/get-banner', {
      headers: getHeaders(),
    });
  };
  
  export const uploadBanner = (data) => {
    return axiosInstance.post('/upload-banner', data, {
      headers: getHeaders(),
    });
  };

  export const getNotificationInfo = () => {
    return axiosInstance.get('/get-notification', {
      headers: getHeaders(),
    });
  };
  
  export const uploadNotification = (data) => {
    return axiosInstance.post('/upload-notification', data, {
      headers: getHeaders(),
    });
  };
  
  export const deleteBanner = (id) => {
    return axiosInstance.delete(`/delete-banner/${id}`, {
        headers: getHeaders()
    });
}
export const deleteNotification = (id) => {
    return axiosInstance.delete(`/delete-notification/${id}`, {
        headers: getHeaders()
    });
}
export const getMainBannerInfo = () => {
    return axiosInstance.get('/get-main-banner', {
      headers: getHeaders(),
    });
  };
  
  export const uploadMainBanner = (data) => {
    return axiosInstance.post('/upload-main-banner', data, {
      headers: getHeaders(),
    });
  };

  export const userInfo=() =>{
    return axiosInstance.get('/user-info',{
        headers:getHeaders()
    });
}
export const addNewUser = (data) => {
    return axiosInstance.post('/add-new-user', data, {
        headers: getHeaders()
    });
}
export const deleteUser = (id) => {
    return axiosInstance.delete(`/delete-user/${id}`, {
        headers: getHeaders()
    });
}

export const updateUserInfo = (id,data) => {
    return axiosInstance.post(`/update-user-info/${id}`,data, {
        headers: getHeaders()
    });
}

export const updateBanner = (id,data) => {
    return axiosInstance.post(`/update-banner/${id}`,data, {
        headers: getHeaders()
    });
}
export const updateNotification = (id,data) => {
    return axiosInstance.post(`/update-notification/${id}`,data, {
        headers: getHeaders()
    });
}