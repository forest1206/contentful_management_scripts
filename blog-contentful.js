const sdk = require('contentful-management');
const fs = require('fs');
const spaceId = '<spaceId>';
const filePath = '/Users/ben/my-cute-cat.jpg';
const fileName = 'my-cute-cat';
const contentType = 'image/jpg';
const accessToken = '<accessToken>';

const sdkClient = sdk.createClient({
  spaceId: spaceId,
  accessToken: accessToken
});

sdkClient.getSpace(spaceId).then((space) => {
  console.log('uploading...');
  return space.createUpload({
    file: fs.readFileSync(filePath),
    contentType,
    fileName
  })
  .then((upload) => {
    console.log('creating asset...');
    return space.createAsset({
      fields: {
        title: {
          'en-US': fileName
        },
        file: {
          'en-US': {
            fileName: fileName,
            contentType: contentType,
            uploadFrom: {
              sys: {
                type: 'Link',
                linkType: 'Upload',
                id: upload.sys.id
              }
            }
          }
        }
      }
    })
    .then((asset) => {
      console.log('prcessing...');
      return asset.processForLocale('en-US', { processingCheckWait: 2000 });
    })
    .then((asset) => {
      console.log('publishing...');
      return asset.publish();
    })
    .then((asset) => {
      console.log(asset);
      return asset;
    })
  })
  .catch((err) => {
    console.log(err);
  });
});