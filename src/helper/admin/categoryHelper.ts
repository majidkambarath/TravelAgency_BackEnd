import categoryModel from "../../model/categoryModel";
import { categoryInterface } from "../../interface/category_interface";
export const categoryHelper = {
  categoryCreate: async (data: any): Promise<any> => {
    try {
      const categoryCreate = new categoryModel({
        packageCategory: data.packageCategory,
        file: data.path,
      });
      await categoryCreate.save();
      return categoryCreate;
    } catch (error) {
      console.log(error);
    }
  },
};
export const fetchHelper = {
  fetchCreate: async (): Promise<string[] | any> => {
    try {
      const categoryFetch = await categoryModel.find();
      return categoryFetch;
    } catch (error) {
      console.log(error);
    }
  },
};
