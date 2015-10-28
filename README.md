# Text Schema Validator
This project was developed in 2 parts, ValidatorFrontend implemented using AngularJS framework for rapid frontend development, and ValidatorRESTService implmented using Jersey framework.  ValidatorRESTService contains the integrated project.

## Getting Started
Download ValidatorRESTService

### ValidatorRESTService
Running the project requires source code and Tomcat.

#### Building the project
We used Apache Maven for building the project and produing .war file.  Please see link below for more information on Maven.
https://maven.apache.org

#### Web Server
We used Apache Tomcat for hosting the RESTful server.  Please see link below for installation and launch instructions.
http://tomcat.apache.org

######## Directory Layout

```
pom.xml             --> project object model, required for Maven build
src.main.java/      --> project java source files
  com.workday.jersey/ --> Jersey source files
    authorizationService.java   --> REST api for authentication through Active Directory
    textSchemaService.java      --> REST api for test schema validation services 
    TransformationProcess.java  --> Text/XML transformation provider
    TextSchemaUtil.hava         --> adaptors for TextSchemaProcessor methods
    Credential.java             --> data structure for user login credentials
    PrettyPrintXML.java         --> XML formatter
    testResponse.java           --> REST api for testing CORS connections with AngularJS frontend
  resources/          --> Jersey default folder
  webapp/             --> Jersey default folder for webapp files
      css/                  --> stylesheets
      components/           --> all app specific modules
      bower_components/     --> dependencies install through bower
      resourceJS/           --> other dependencies
      images/               --> GUI images
      services/             --> angularJS services
        services.js           --> service that interacts with RESTful server
      js/                   --> main application module
        app.js                --> app definition
        mainCtrl.js           --> control component that processes user command
        directives.js         --> upload chosen input files and download displayed data in view 
        modalCtrl.js          --> controller for instruction modal view
      index.html            --> app layout file (the view of the app)
    WEB-INF/            --> webapp configuration files
      web.xml             --> deployment descriptor required by Tomcat
target/             --> houses the output from the build
```
-----------------------------------------------------------------------------------------------------------------------

### ValidatorFrontend
This is only the frontend portion implemented using AngularJS, no longer needed for lauching the application.

#### Run the Application
We have preconfigured the project with a simple development web server.  The simplest way to start
this server is to open a terminal window, navigate to the project folder, and run the following command:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.


#### Directory Layout

```
app/                 --> all of the source files for the application
  css/                  --> stylesheets
  components/           --> all app specific modules
  bower_components/     --> dependencies install through bower
  resourceJS/           --> other dependencies
  images/               --> GUI images
  services/             --> angularJS services
    services.js           --> service that interacts with RESTful server
  js/                   --> main application module
    app.js                --> app definition
    mainCtrl.js           --> control component that processes user command
    directives.js         --> upload chosen input files and download displayed data in view 
    modalCtrl.js          --> controller for instruction modal view
  index.html            --> app layout file (the view of the app)
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  lib/                --> mock RESTful server
    httpbackend.js        --> mock backend
    httprequest.js        --> mock http request function
    httpresponse.js       --> mock http request function
    javascriptbuilder.js  --> mock http backend controller logic
  testFiles/          --> input files for tests
  protractor.conf.js    --> Protractor config file
  testFrontend.js         --> GUI behavior scenarios to be run by Protractor
  testMockHttp.js         --> communicating with backend scenario to be run by Protractor
```

#### Testing
To run the protractor tests, navigate to e2d-tests folder and execute the following command:
```
protractor protractor.conf.js
```
