var app = angular.module('testAngularJS', ['dataSource4D']);

    
    app.controller('jsonXML', function($scope,$http4D){
    
    
    var x2js = new X2JS();
    $scope.listeTypDocUrl = '/listeTypDoc';
    
    setData = function(data) {
        $scope.json = JSON.stringify(data);
        $scope.TypDoc = data.listeTypDoc.TypDoc;
        $scope.TypDocSel = $scope.TypDoc[0];
    };
    returnData = function(data) {
        $scope.json = JSON.stringify(data);
    };
    
    $scope.listeTypDoc = function() {
        $http4D.get($scope.listeTypDocUrl,setData);
    };
    
    
    $scope.Post4D = function() {
        var data = JSON.parse($scope.json);
        var params = {toto : 'tyty'};
        var myObject = {data : data};
        $http4D.post('/Post4D',myObject,returnData);
    };

        
    $scope.convert2json=function(){
            $scope.json = JSON.stringify(x2js.xml_str2json($scope.xml)); 
        };
        
    $scope.convert2XML=function(){
            $scope.xml = x2js.json2xml_str(JSON.parse($scope.json))
        };
            
    $scope.clearAll=function(){
           $scope.json = $scope.xml = ''; 
        };

    $http4D.get($scope.listeTypDocUrl,setData);
    
    })