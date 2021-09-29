// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
const webfont = require("webfont").default;
const path = require("path");
const fs = require("fs");
const fontName = "symphony-icons";
const dest = path.resolve(__dirname, "./../src/assets/fonts/font-formats/");
const destTemplate = path.resolve(
  __dirname,
  `./../src/scss/typography/_font-icons.scss`
);
const variablesDest = path.resolve(
  __dirname,
  `./../src/scss/typography/_icons-variables.scss`
);
const buildVersionStamp = new Date().getTime();

/**
 * Method to delete all files in a directory | Its a sync operation
 * @param {string} directoryPath - directory path under which all files need to be deleted
 * @output null
 */
const emptyFontFilesDirectory = (function (directoryPath) {
  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlinkSync(path.join(directoryPath, file), (error) => {
          error
            ? console.log(`ERROR deleting file ${file} :: ${error}.`)
            : console.log(`File ${file} was deleted successfully`);
        });
      }
    });
  } catch (err) {
    console.log("Error in files delete operation");
  }
})(path.resolve(dest)); // Calling before invoking webfont method as webfont .then is getting called twice sometimes with partial result set

webfont({
  fontName: fontName,
  template: "scss",
  templateClassName: "symphony-icons",
  templateFontPath: "/scs/assets/fonts/font-formats/",
  normalize: true,
  startUnicode: 0xe300,
  files: path.resolve(__dirname, "./icon-images/*.svg"),
  dest: dest,
  destTemplate: destTemplate,
})
  .then((result) => {
    return Promise.all(
      Object.keys(result).map((type) => {
        if (
          type === "config" ||
          type === "usedBuildInTemplate" ||
          type === "glyphsData"
        ) {
          return null;
        }

        let content = result[type];
        let file = null;

        if (type !== "template") {
          //Making font file Name versioning with timestamp with each build to avoid caching like symphony-icons.1603105442305.woff
          file = path.resolve(
            path.join(dest, `${fontName}.${buildVersionStamp}.${type}`)
          );
        } else {
          const variables = content.substring(0,content.indexOf("@font-face"));
          const variablesFile = path.resolve(variablesDest);
          fs.writeFile(variablesFile, variables, (error) =>
            error
              ? console.log(`ERROR writing in file ${variablesFile} :: ${error}.`)
              : console.log(`File ${variablesFile} written successfully`)
          );
          const replacePattern = `/${fontName}`;
          const replacerRegEx = new RegExp(replacePattern, "g");
          //Replacing all occurence of dynamic font file Names in _font-icons.scss file
          content = content.replace(
            replacerRegEx,
            `/${fontName}.${buildVersionStamp}`
          );
          file = path.resolve(destTemplate);
        }

        return fs.writeFile(file, content, (error) =>
          error
            ? console.log(`ERROR writing in file ${file} :: ${error}.`)
            : console.log(`File ${file} written successfully`)
        );
      })
    );
  })
  .catch((error) => {
    console.log(error);
    throw error;
  });
