import axios from "axios";

export const getProducts = (categoriess, sort) => {
  return `/api/product/getAll?${categoriess}&${sort}`;
};
export const getProfiles = () => {
  return "/api/auth/profile";
};
export const getAllUser = () => {
  return "/api/auth/getAllUser";
};
export const getAllAdmin = () => {
  return "/api/auth/getAllAdmin";
};
export const AddToCart = () => {
  return "/api/auth/addcart";
};
export const TranSuccess = () => {
  return "/api/payment/payments";
};
export const CheckCountInStockAPi = () => {
  return "/api/payment/countinstock";
};
export const UploadImg = () => {
  return "/api/uploadImageUser";
};
export const DestroyImg = () => {
  return "/api/destroyImageUser";
};
export const AddProduct = () => {
  return "/api/product/create";
};
export const UpdateProduct = (id) => {
  return `/api/product/update/${id}`;
};
export const UpdateUser = (id) => {
  return `/api/auth/updateUserAdmin/${id}`;
};
export const updateUserAdmin = (id) => {
  return `/api/auth/updateUserAdmin/${id}`;
};
export const deleteUserAdmin = (id, token) => {
  return axios.delete(`/api/auth/deleteUserAdmin/${id}`, {
    headers: { Authorization: ` ${token}` },
  });
};
export const deleteProduct = (id, token) => {
  return axios.delete(`/api/product/delete/${id}`, {
    headers: { Authorization: ` ${token}` },
  });
};
