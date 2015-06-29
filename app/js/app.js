var app= angular.module('evaluator', ['ui.bootstrap', 'ngResource']); 

//retrieves data from the restful service 
app.factory('UserFactory', function($resource){
  return $resource('http://localhost:8080/ValidateService/webapi/json/getFile', {},{
    get:{
       method:'GET',
       params: {}, 
       isArray: false
     }
  })
});

 
app.controller('uploadController',["$scope","UserFactory", "$http", function($scope, UserFactory, $http){
  $scope.showInput = function($fileContent){
    $scope.inputContent = $fileContent; 
  }
  $scope.showSchema= function($fileContents){
    $scope.schemaContent = $fileContents; 
  };
  $scope.inputFile; 
  $scope.schemaFile; 
  $scope.inputName ="";
  $scope.direction; 
  //sends the multipart form to the server, and receives the text data and puts into the text area 
  $scope.submit = function() {
    var formData = new FormData();
    formData.append("schemaFile", $scope.schemaFile);
    formData.append("inputFile", $scope.inputFile);
    formData.append("direction", $scope.direction);
    $http({
       url: "http://localhost:8080/ValidateService/webapi/runSchema/byFileName",
       data: formData,
       method: 'POST',
       transformResponse: function(data){
         //$scope.textArea = data;
         return data;
       }, 
       headers : {'Content-Type' : undefined},
     }).success(function (data, status, headers, config) {
        //alert("success - status(" + status + ")");
        $scope.textArea = data;
     }).error(function (data, status, headers, config) {
        //alert("error - status(" + status + ")");
        alert("Validation Failed!"); 
        $scope.textArea = data; 
     });
   }
}]);


//loads the input file from the user's local file system and displays the file's contents onto the screen 
app.directive('onReadFile', function ($parse, $window) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
       var fn = $parse(attrs.onReadFile);    
       element.on('change', function(onChangeEvent) {
         var reader = new FileReader();       
	 reader.onload = function(onLoadEvent) {
           scope.$apply(function(){
           fn( scope,{$fileContent: onLoadEvent.target.result}); 
           //fn(scope, {inputFile: onLoadEvent.target.files[0]}); 
           }); 
       };       
       var fileName = onChangeEvent.target.files[0].name; 
       if(fileName.search("txt") >= 0 || fileName.search("xml") >=0){
          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
          scope.inputFile = onChangeEvent.target.files[0]; 
          console.log((onChangeEvent.target).files[0].name); 
       } else {
         $window.alert("Need txt or xml file!");  
       }
       });
     }
  };
});

//loads the schema file from user's local file system and displays file's contents onto the screen  
app.directive('onReadSchema', function ($parse, $window) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
       var fn = $parse(attrs.onReadSchema);
       element.on('change', function(onChangeEvent) {
         var reader = new FileReader();
         reader.onload = function(onLoadEvent) {
           scope.$apply(function() {
           fn(scope, {$fileContents:onLoadEvent.target.result});
           });
         };
         var fileName = onChangeEvent.target.files[0].name;
         if(fileName.search("xsd") >= 0){ 
           reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
           scope.schemaFile = onChangeEvent.target.files[0]; 
           console.log((onChangeEvent.target).files[0].name);
         } else {
          $window.alert("Need an xsd file!"); 
         } 
       });
     }
  };
}); 



//upload both files to the server wrapped in a form. 
app.directive('sendFile',function($http){
  return{
    restrict: 'A',
    scope: false, 
    link:function(scope, element, attrs){
      element.on('click', function(onClickEvent){
        console.log(scope.inputFile);
        console.log(scope.schemaFile);
        var formData = new FormData();
        formData.append("schemaFile", scope.schemaFile);
        formData.append("inputFile", scope.inputFile);
        formData.append("direction", "text to xml"); 
        $http.post("http://localhost:8080/ValidateService/webapi/runSchema/byFileName", formData, {
          transformRequest: angular.identity, 
          withCredentials: true, 
          headers: {'Content-type':undefined} 
        });
        $http.post('http://localhost:8080/ValidateService/webapi/runSchema/byFileName').success(function(data){
    $scope.textArea = data; 
  }); 
      });
      
    }
  };


});

//creates file from text on the text area box and saves file onto user's local file system 
app.directive('downloadFile', function($compile, $window){
  return{
    restrict:'AE',  
    scope: false, 
    link: function(scope, element, attrs){
      element.on('click', function(onClickEvent) {
        console.log(scope.textArea);
        var data = new Blob([scope.textArea], {type: 'text/plain'}); 
        console.log(data); 
        var textFile = $window.URL.createObjectURL(data); 
        console.log(textFile); 
        console.log("Input: " + scope.inputName); 
        angular.element(document.querySelector('#add_link')).append($compile(
          '<a id=new_elem download="' + scope.inputName + '"'  + 'href="' + textFile + '">' + '</a>')(scope));
        //$window.location.href = textFile;
        var elem = document.querySelector('#new_elem'); 
        elem.click();   
     });  
       
      
      
     }
 
  }

});




