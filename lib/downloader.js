const fs = require("fs");
const path = require("path");
const request = require("request");
const slugify = require("slugify");

function download(uri, originalName, extension, twitterUsername) {
  return new Promise((resolve, reject) => {
    const safeName = slugify(originalName, { lower: true, strict: true });
    request.head(uri, function (err, res, body) {
      const twitterUsernamePath = `${"./"}/images/${twitterUsername}`;
      if (!fs.existsSync(twitterUsernamePath)) {
        fs.mkdirSync(twitterUsernamePath);
      }
      const filePath = path.resolve(
        twitterUsernamePath,
        `${safeName}.${extension}`
      );
      request(uri).pipe(fs.createWriteStream(filePath)).on("close", resolve);
    });
  });
}

module.exports = download;
