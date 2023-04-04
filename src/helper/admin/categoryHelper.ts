import categoryModel from "../../model/categoryModel";
import { categoryInterface } from "../../interface/category_interface";
export const categoryHelper = {
  categoryCreate: async (
    data: string
  ): Promise<categoryInterface | undefined> => {
    try {
      const categoryCreate = new categoryModel({ packageCategory: data });
      await categoryCreate.save();
      return categoryCreate;
    } catch (error) {
      console.log(error);
    }
  },
};
export const fetchHelper = {
    fetchCreate: async():Promise<string[]|any>=>{
      try {
        const categoryFetch = await categoryModel.find()
        return categoryFetch
      } catch (error) {
        console.log(error);
        
      }
    } 
}
