import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { SwaleMessage } from "../imports";
import { DestroyImg, UploadImg } from "../imports/Import";
const useUpDesImg = (token) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) return SwaleMessage("File not Exists", "error");
      if (file.size > 1024 * 1024)
        // 1mb
        return SwaleMessage("Size too large !", "error");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return SwaleMessage("File format is incorrect.", "error");
      let formData = new FormData();

      formData.append("file", file);

      setLoading(true);
      const res = await axios.post(UploadImg(), formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${token}`,
        },
      });

      setLoading(false);
      setImages(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        DestroyImg(),
        { public_id: images.public_id },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return { loading, handleUpload, handleDestroy, images, setImages };
};

export default useUpDesImg;
