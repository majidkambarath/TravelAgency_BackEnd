import { File } from "buffer";
import { RequestHandler } from "express";

import {
  packageIdFetch,
  activityIdFetch,
  createCollection,
  fetchHelper,
  editCollectionHelper,
  updateCollectionHelper,
} from "../../helper/admin/destinHelper";
import mongoose from "mongoose";
import activityModel from "../../model/activityModel";
import categoryModel from "../../model/categoryModel";

export const add_destina: RequestHandler = async (req, res) => {
  try {
    let {
      title,
      descrption,
      price,
      guests,
      packageCategory,
      activity,
      priceCategory,
      day,
      night,
      Hotels,
      Flight,
      Sightseeing,
      Meals,
      Transfers,
      Highlights,
    } = req.body;
    const imgArray: string[] = [];
    const multiImg: any = req.files;
    multiImg.map((el: any) => {
      const em = el.path;
      imgArray.push(em);
    });
    console.log(req.body);
    let { Included1, Included2, Included3, Included4, Included5 } = req.body;
    const Included = [Included1, Included2, Included3, Included4, Included5];
    let { Excluded1, Excluded2, Excluded3, Excluded4, Excluded5 } = req.body;
    const Excluded = [Excluded1, Excluded2, Excluded3, Excluded4, Excluded5];
    const packageID = await packageIdFetch.packageId(packageCategory);
    const activityID = await activityIdFetch.activityId(activity);
    const data = {
      title,
      descrption,
      price,
      guests,
      priceCategory,
      day,
      night,
      Hotels,
      Flight,
      Sightseeing,
      Meals,
      Transfers,
      activityID,
      packageID,
      imgArray,
      Included,
      Excluded,
      Highlights,
    };
    const createCollections = await createCollection.destinCollection(data);
    res.json({ success: true }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const fetchDestin: RequestHandler = async (req, res) => {
  try {
    const fetch = await fetchHelper.destinData();
    res.json({ success: true, fetch }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const edit_Collection: RequestHandler = async (req, res) => {
  try {
    const Id = req.query.id as string;
    const DestinQuery = await editCollectionHelper(Id);
    const activity = DestinQuery?.activity;
    const packages = DestinQuery?.packageCategory;
    const activityID = new mongoose.Types.ObjectId(activity);
    const packageID = new mongoose.Types.ObjectId(packages);
    const fetchActicvitID = await activityModel.findOne({ _id: activityID });
    const fetchPackageID = await categoryModel.findOne({ _id: packageID });
    const data = {
      activityy: fetchActicvitID?.activtiy,
      packagee: fetchPackageID?.packageCategory,
    };

    res.json({ success: true, DestinQuery, data }).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const updateCollection: RequestHandler = async (req, res) => {
  try {
    let { Included1, Included2, Included3, Included4, Included5 } = req.body;
    const Included = [Included1, Included2, Included3, Included4, Included5];
    let { Excluded1, Excluded2, Excluded3, Excluded4, Excluded5 } = req.body;
    const Excluded = [Excluded1, Excluded2, Excluded3, Excluded4, Excluded5];
    const imgArray: string[] = [];
    const multiImg: any = req.files;
    multiImg.map((el: any) => {
      const em = el.path;
      imgArray.push(em);
    });
    let title = req.body.title;
    let descrptionn = req.body.descrption;
    let Highlights = req.body.Highlights;
    let price = req.body.price;
    let packageCategory = req.body.packageCategory;
    let activity = req.body.activity;
    let priceCategory = req.body.priceCategory;
    let guests = req.body.guests;
    let Id = req.body._id
    
    let { day, night } = req.body;
    const data = {
      Id,
      title,
      descrptionn,
      price,
      guests,
      priceCategory,
      day,
      night,
      packageCategory,
      activity,
      imgArray,
      Included,
      Excluded,
      Highlights,
    };
     const updateCollection = await updateCollectionHelper(data)
     res.json({ success: true}).status(200);
     console.log(updateCollection);
     
  } catch (error) {}
};
