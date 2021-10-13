const sdk = require("contentful-management");
const fs = require("fs");

try {
  require("dotenv").config();
} catch (error) {
  console.log(`Failed to load .env`);
}

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = "master";
const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

let clientConfig = {
  //   spaceId: spaceId,
  accessToken: accessToken,
};

if (process.env.HTTPS_PROXY) {
  const url = new URL(process.env.HTTPS_PROXY);
  clientConfig.proxy = {
    protocol: url.protocol,
    host: url.hostname,
    port: url.port,
  };
}
const sdkClient = sdk.createClient(clientConfig);

async function uploadFile(environment, filePath, fileName, contentType) {
  try {
    console.log("uploadFile", environment, filePath, fileName, contentType);

    const upload = await environment.createUpload({
      file: fs.readFileSync(filePath),
      contentType,
      fileName,
    });
    console.log("createUpload-->", upload);

    const asset = await environment.createAsset({
      fields: {
        title: {
          "en-US": fileName,
        },
        file: {
          "en-US": {
            fileName: fileName,
            contentType: contentType,
            uploadFrom: {
              sys: {
                type: "Link",
                linkType: "Upload",
                id: upload.sys.id,
              },
            },
          },
        },
      },
    });
    console.log("createAsset-->", upload);

    await asset.processForLocale("en-US", { processingCheckWait: 2000 });
    // await asset.publish();
    return asset;
  } catch (error) {
    console.log("uploadFile->error", error);
  }
}

async function uploadDir(folder) {
  try {
    const space = await sdkClient.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    const promises = [];

    fs.readdirSync(folder).forEach(async (file) => {
      console.log(file);
      const filePath = `./images/${file}`;
      const fileName = file.split(".")[0];
      const contentType = `image/${file.split(".")[1]}`;
      console.log("uploadDir->file", filePath, fileName, contentType);

      promises.push(uploadFile(environment, filePath, fileName, contentType));
    });
    const array = await Promise.all(promises);

    console.log("all files uploaded successfully...");
    console.log("uploadDir->success", array);
  } catch (error) {
    console.log("uploadDir->error", error);
  }
}

const dir = "./upload";

uploadDir(dir);
