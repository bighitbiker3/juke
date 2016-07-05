var app = angular.module('juke', []);

app.controller('mainController', function($scope, $http, $log, $interval){
  var albumUrl = '/api/albums/2'
  $scope.currentSong = {
    id: null,
    playing: null,
    song: null
  }
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
  })

  var audio = document.createElement('audio');

  //play nxt song on song end
  audio.addEventListener('ended', function(){
    playNextSong($scope.currentSong.song.next)
  })

  audio.addEventListener('timeupdate', function(){
    $interval(function(){
      $scope.progress = Math.floor(100 * audio.currentTime / audio.duration);
    },1000)
  })


  $scope.toggleSong = function(songId) {
    // If current song is playing
    if($scope.currentSong.playing){
      audio.pause();
      $scope.currentSong.playing = false;
      return;
    }

    // If we are playing from the footer
    if(!songId){
      audio.play();
      $scope.currentSong.playing = true;
      return;
    }

    // If we are playing from the playlist
    loadAndPlay(songId)
  }
  function loadAndPlay(songId){
    $scope.currentSong.id = songId;
    $scope.currentSong.playing = true;
    $scope.album.songs.forEach(function(song){
      if(song.id === songId){
        $scope.currentSong.song = song;
      }
    })
    audio.src = '/api/songs/' + songId + '/audio';
    console.log(audio.src);
    audio.load();
    audio.play();
    console.log("Current Song is:", $scope.currentSong);
  }

  $scope.playNextSong = function(songId){
    loadAndPlay(songId)
  }
  $scope.playPrevSong = function(songId){
    loadAndPlay(songId)
  }

  $scope.getArtist = function(arr){
    var str = ''
    arr.forEach(function(obj){
      str += obj.name + ' '
    })
    return str;
  }
});
