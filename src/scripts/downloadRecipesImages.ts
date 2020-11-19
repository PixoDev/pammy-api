import { PammyRecipeDoc } from "@interfaces/recipe";
import { RecipeModel } from "@models/recipe.model";
import { createWriteStream } from "fs";
const appRoot = require("app-root-path");
import request from "request";

export const downloadRecipesImages = async () => {
  const recipesDocs: PammyRecipeDoc[] = await RecipeModel.find().exec();

  const downloadAll: {
    doc: PammyRecipeDoc;
    download: Promise<unknown>;
    recName: string;
  }[] = [];

  recipesDocs.forEach((rec, i) => {
    const recName = `rec_${rec._id}_${rec.name
      .replace(/ /g, "_")
      .toLowerCase()}.jpg`;
    downloadAll.push({
      recName: recName,
      doc: rec,
      download: downloadImage(
        rec.image,
        appRoot + "/src/assets/recipes/" + recName
      ),
    });
  });

  const mergedActions: Promise<void>[] = [];

  downloadAll.forEach(da => {
    const doAction = async () => {
      try {
        await da.download;
        da.doc.image = da.recName;
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
