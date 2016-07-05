var app = angular.module('juke', []);

app.controller('albumController', function($scope, $http, $log, $interval, $rootScope){
  var albumUrl = '/api/albums/2';


  var promiseForBody =  $http.get(albumUrl).then(function(response){ return response.data}).catch($log.error);

  promiseForBody
  .then(function(album){
    console.log(album)
    $scope.album = album;
    $scope.album.imageUrl = albumUrl +'/image';
    $scope.album.songs.forEach(function(song, i){
      if(!$scope.album.songs[i-1]) song.prev = $scope.album.songs[$scope.album.songs.length -1].id;
      else song.prev = $scope.album.songs[i-1].id;
      if(!$scope.album.songs[i+1]) song.next = $scope.album.songs[0].id
      else song.next = $scope.album.songs[i+1].id;
    })
   $rootScope.$broadcast('albumLoaded', $scope.album)
  })

  $scope.albumPlay = function(songId){
    $rootScope.$broadcast('albumPlayPause', songId)
  }

  $rootScope.$on('playerPaused', function(event, currentSong){
    console.log(currentSong)
    $scope.currentSong = currentSong
  })
  $rootScope.$on('playerPlayed', function(event, currentSong){
    $scope.currentSong = currentSong
    console.log('player played with ', currentSong)
  })

  $scope.getArtist = function(arr){
    var str = ''
    arr.forEach(function(obj){
      str += obj.name + ' '
    })
    return str;
  }
});
