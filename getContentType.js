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

async function getContentTypes() {
  try {
    const space = await sdkClient.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);
    const contentTypes = await environment.getContentTypes();
    const json = JSON.stringify(contentTypes);
    console.log("getContentTypes:res", contentTypes);

    let callback = () => {};
    fs.writeFile("contentTypes.json", json, "utf8", callback);
  } catch (error) {
    console.log("getContentTypes:error", error);
  }
}

getContentTypes();
