angular.module('dataSource4D',[]).
    factory('$http4D', ['$http',function($http){
    
    cleanXml = function(data) {
        data = data.replace(/[\s]+</g, "<");
        data = data.replace(/>[\s]+</g, "><");
        data = data.replace(/>[\s]+$/g, ">");
        return data;
    };
     
    var x2js = new X2JS();
    
    x2js.escapeMode(true);
    
    xml2json = function(data) {
        data = cleanXml(data);
        var json = x2js.xml_str2json( data );
        return json;
        };
        
    json2xml = function(data) {
        var xml = x2js.json2xml_str( data );
        //var xml_plus = '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>'+xml;
        return xml;
        };
        
       return {
         get: function(url,callback){
                //url : string, callback : function(data)
                $http({
                method: 'GET', 
                url: url,
                headers: {'Accept': 'application/xml'},
                transformResponse: xml2json                
                }).
                success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    console.log("http4D.get Request failed " + status);
                });
            },            
         post: function(url,data,callback){ 
                //url : string, data : {data.params, data.data}, callback : function(data)
                $http({
                method: 'POST', 
                url: url,
                params: data.params || null,
                data: data.data, 
                headers: {'Accept': 'application/xml','Content-Type': 'application/xml'},
                transformResponse: xml2json,
                transformRequest:json2xml                
                }).
                success(function(data, status, headers, config) {
                    callback(data);
                }).
                error(function(data, status, headers, config) {
                    console.log("http4D.post Request failed " + status);
                });
         }
         // put: function(url,data,callback) etc ...
       };
    }]);