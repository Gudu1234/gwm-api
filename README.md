# gwm-api

> Backend application of gwm-client project

<p>
  <a href="https://feathersjs.com/"><img src="https://drive.google.com/uc?export=view&id=1nc2O0Zwck5ffGrLYuIN0byELv6VUJ0ZM" alt="GWM" height="100%" width="100%"/></a>
</p>

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

### Database

MongoDB is used as the database for this project. To use your mongodb url you have to set it in you .env file in root directory of project.

### File Upload

Google Drive is used for uploading and storing the files. Add your own credentials file to the root directory and create a drive folder inside public.


## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Here we have used yarn package manager instead of npm.
3. Install your dependencies

    ```
    cd path/to/gwm-api
    yarn
    ```

4. To add dependencies
   
    ```
    yarn add <dependencyname>
    ```

5. Start your app in development environment

    ```
    yarn dev
    ```

5. Start your app in production environment

    ```
    yarn start
    ```

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

For more information on files upload, listing using google drive visit [developers.google.com/drive/api/v3](https://developers.google.com/drive/api/v3/about-sdk) 
