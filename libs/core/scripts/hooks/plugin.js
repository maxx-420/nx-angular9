// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
const fs = require("fs");

let destPath = "";

exports.default = {
  config(cfg) {
    destPath = (cfg.output && cfg.output.path) || "";
    return cfg;
  },
  post(options) {
    // read all js files in destination folder and save that as object to json file
    if (destPath) {
      const dir = fs.readdirSync(destPath);
      const files = dir.filter((file) => file.endsWith(".js"));
      let jsonObj = {};
      jsonObj = files.reduce((res, file) => {
        const fileName = file.split(".")[0];
        let keyName = fileName;
        if (fileName.match(/-es2015|-es5/gi)) {
          keyName = fileName.replace(/-es2015|-es5/gi, "");
          if (!res[keyName]) {
            res[keyName] = {};
          }
          const propName = fileName.split("-")[fileName.split("-").length - 1];
          res[keyName][propName] = file;
        } else {
          res[keyName] = file;
        }
        return res;
      }, {});
      var jsonContent = JSON.stringify(jsonObj);
      try {
        fs.writeFileSync(destPath + "/scripts.json", jsonContent, "utf8");
        console.log("**********************");
        console.log(
          "\x1b[32m%s\x1b[0m",
          `JSON Object added to file ${destPath}/scripts.json`
        );
        console.log("**********************");
      } catch (err) {
        console.error("An error occured while writing JSON Object to File.");
      }
    }
  },
};
