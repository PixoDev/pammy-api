import { PammyIngredientDoc } from "@interfaces/ingredient";
import { IngredientModel } from "@models/ingredient.model";
import { createWriteStream } from "fs";
const appRoot = require("app-root-path");
import request from "request";

export const downloadIngredientImages = async () => {
  const ingredientDocs = await IngredientModel.find().exec();

  const downloadAll: {
    doc: PammyIngredientDoc;
    download: Promise<unknown>;
    ingName: string;
  }[] = [];

  ingredientDocs.forEach((ing, i) => {
    const ingName = "ing_" + ing._id + ".jpg";
    downloadAll.push({
      ingName: ingName,
      doc: ing,
      download: downloadImage(
        ing.image,
        appRoot + "/src/assets/ingredients/" + ingName
      ),
    });
  });

  const mergedActions: Promise<void>[] = [];

  downloadAll.forEach(da => {
    const doAction = async () => {
      try {
        await da.download;
        da.doc.image = da.ingName;
        await da.doc.save();
      } catch (e) {
        console.log("IMAGE FAILED", da.doc.name, e);
      }
    };
    mergedActions.push(doAction());
  });

  await Promise.all(downloadAll.map(d => d.download));
};

export const downloadImage = (uri: string, destination: string) => {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err: any, res: any, body: any) {
      if (err) reject(err);
      console.log("content-type:", res.headers["content-type"]);
      console.log("content-length:", res.headers["content-length"]);

      request(uri)
        .pipe(createWriteStream(destination))
        .on("close", () => resolve());
    });
  });
};
