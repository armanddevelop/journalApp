export const fileUpload = async (file) => {
  const urlCloudDinary =
    "https://api.cloudinary.com/v1_1/armanddevcloud/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-jornal");
  formData.append("file", file);
  try {
    const response = await fetch(urlCloudDinary, {
      method: "POST",
      body: formData,
    });
    console.log("esto vale response ", response);
    if (response.status === 200) {
      const respCloud = await response.json();
      return respCloud.secure_url;
    } else {
      throw await response.json();
    }
  } catch (error) {
    console.log("shit happend trying to upload image ", error);
    throw error;
  }
};
