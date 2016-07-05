var app = angular.module('juke', []);

app.controller('mainCtrl', function($scope, $http, $log){
  $scope.test = 'testtest tests';


})

app.controller('displayController', function($scope, $http, $log){
  var albumUrl = '/api/albums/2'
  var promiseForBody =  $http.get(albumUrl).then(function(response){ return response.data}).catch($log.error);
  promiseForBody
  .then(function(album){
    console.log(album)
    $scope.fakeAlbum = album
    $scope.fakeAlbum.imageUrl = albumUrl +'/image'
  })
  // $scope.fakeAlbum = {
  //   name: 'Abbey Road',
  //   imageUrl: 'http://fillmurray.com/300/300',
  //   songs: [{
  //     name: 'Romeo & Juliette',
  //     artists: [{name: 'Bill'}],
  //     genres: ['Smooth', 'Funk'],
  //     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  //   }, {
  //     name: 'White Rabbit',
  //     artists: [{name: 'Bill'}, {name: 'Bob'}],
  //     genres: ['Fantasy', 'Sci-fi'],
  //     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  //   }, {
  //     name: 'Lucy in the Sky with Diamonds',
  //     artists: [{name: 'Bob'}],
  //     genres: ['Space'],
  //     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
  //   }]
  // };
  $scope.getArtist = function(arr){
    var str = ''
    arr.forEach(function(obj){
      str += obj.name + ' '
    })
    return str;
  }
});
