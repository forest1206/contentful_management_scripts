## [Contentful](http://www.contentful.com) space management script

## 🧐 What's inside?

- Retrieve all contentTypes of space and save as json
- Upload local dir to contentful media

## Useful Links

- [JavaScript Library for Contentful's Content Management API](https://github.com/contentful/contentful-management.js/)
- [contentful-management.js API Document](https://contentful.github.io/contentful-management.js/contentful-management/3.3.4/)
- [Complete reference guide to the Management SDK](https://www.contentful.com/developers/docs/php/tutorials/management-sdk-reference-guide/)

## 🚀 Quick start

1.  **Insall Dependencies.**

    ```shell
    npm i
    ```

2.  **Create a .env by copying .env.example and update with your space credentials.**

    ```shell
    CONTENTFUL_SPACE_ID=
    CONTENTFUL_ACCESS_TOKEN=
    CONTENTFUL_MANAGEMENT_TOKEN=

    ```

3.  **Start script.**

    Get all space contentTypes and save as json

    ```shell
    npm run get-types

    ```

    Create a upload dir and copy files.  
    Run command to upload files to space.

    ```shell
    npm run upload

    ```
