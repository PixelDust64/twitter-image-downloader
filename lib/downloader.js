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
      const imagePath = path.resolve(
        twitterUsernamePath,
        `${safeName}.${extension}`
      );
      const txtPath = path.resolve(
        twitterUsernamePath,
        `${safeName}.txt`
      );

      // Download da imagem
      request(uri).pipe(fs.createWriteStream(imagePath)).on("close", () => {
        // Após o download da imagem, criar o arquivo TXT
        const txtContent = `by ${twitterUsername}, `;
        fs.writeFileSync(txtPath, txtContent, { flag: 'a' }); // 'a' para adicionar ao arquivo se já existir
        resolve();
      });
    });
  });
}

module.exports = download;
