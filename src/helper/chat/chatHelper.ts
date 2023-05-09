import chatModel from "../../model/chatModel";
import mongoose from "mongoose";
export const conversationsHelper = async (
  id: string,
  message: string,
  sender: string
): Promise<any> => {
  try {
    const userId = new mongoose.Types.ObjectId(id);
    const userCollection = await chatModel.findOne({ user: userId });
    if (!userCollection) {
      const chatMessage = new chatModel({
        user: userId,
        conversation: [
          {
            message: message,
            sender: sender,
            time: new Date(),
          },
        ],
      });

      const result = await chatMessage.save();
      return result;
    } else {
      const update = {
        $push: {
          conversation: {
            message: message,
            sender: sender,
            time: new Date(),
          },
        },
      };

      const options = { new: true }; // Return the updated document

      const result = await chatModel.findOneAndUpdate(
        { user: userId },
        update,
        options
      );
      return result;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save chat message");
  }
};

export const chatUserLisitHelper = async (): Promise<any> => {
  try {
    const result = await chatModel.aggregate([
      {
        $lookup: {
          from: "users", // The collection to join
          localField: "user", // The field in this collection to match
          foreignField: "_id", // The field in the "users" collection to match
          as: "userDetails", // The name of the field to add to the output documents
        },
      },
      {
        $group: {
          _id: "$user", // Group by the user field
          name: { $first: "$userDetails.name" }, // Get the name of the user
          profile: { $first: "$userDetails.profile" }, // Get the profile of the user
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: 1,
          profile: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.log(error);
  }
};


export const messageHelperApi = async(id:string):Promise<any>=>{
  try {
    const userId = new mongoose.Types.ObjectId(id);
    const result = await chatModel.findOne({user:userId})
    // const result = await chatModel.aggregate([
    //   {
    //      $match :{
    //       user: userId
    //      }
    //   },
    //   {
    //     $lookup: {
    //       from: "users", // The collection to join
    //       localField: "user", // The field in this collection to match
    //       foreignField: "_id", // The field in the "users" collection to match
    //       as: "userDetails", // The name of the field to add to the output documents
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id", // group by the chatModel id
    //       userId: { $first: "$user" }, // get the userId
    //       name: { $first: "$userDetails.name" }, // get the user name
    //       profile: { $first: "$userDetails.profile" }, // get the user profile
    //       sender: { $first: "$conversation.sender" }, // get the sender
    //       message: { $first: "$conversation.message" }, // get the message
    //       time: { $first: "$conversation.time" }, // get the time
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       userId: 1,
    //       name: 1,
    //       profile: 1,
    //       sender: 1,
    //       message: 1,
    //       time: 1,
    //     },
    //   },
    // ]);
 
    
    return result 
  } catch (error) {
    console.log(error);
    
  }
}