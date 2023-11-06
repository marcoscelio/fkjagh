
import { httpDelete, httpPostFormData } from "../utils/httpUtils";

export class FileService {
  upload = async (data: any) => {
    try {
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data.file);
      }
      // formData.append("name", data.name);
      // formData.append("description", data.description);
      // formData.append("tags", data.tags);

      return await httpPostFormData(`file`, formData, {
        "Content-Type": "multipart/form-data",
      });
     
    } catch (error: any) {
      console.log(error);
      throw new Error("Error when calling file API");
    }
  };

  delete = async (id: string) => {
    try {
      return httpDelete(`file/${id}`, {});
    } catch (error: any) {
      console.log(error);
      throw new Error("Error when calling file API");
    }
  };
}
