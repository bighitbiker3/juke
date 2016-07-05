app.controller('playerController', function($scope, $http, $log, $interval, $rootScope){
  var audio = document.createElement('audio');

  $scope.currentSong = {
    id: null,
    playing: null,
    song: null
  }
  $rootScope.$on('albumLoaded', function(event, album){
    $scope.album = album
  })
  //play nxt song on song end
  audio.addEventListener('ended', function(){
    playNextSong($scope.currentSong.song.next)
  })

  audio.addEventListener('timeupdate', function(){
    $interval(function(){
      $scope.progress = 100 * audio.currentTime / audio.duration;
    },10)
  })

  $rootScope.$on('albumPlayPause', function(event, songId){
    $scope.toggleSong(songId)
  })

  $scope.toggleSong = function(songId) {
    // If current song is playing

    if($scope.currentSong.playing){
      audio.pause();
      $scope.currentSong.playing = false;
      $rootScope.$broadcast('playerPaused', $scope.currentSong)
      return;
    }

    // If we are playing from the footer
    if(!songId){
      audio.play();
      $scope.currentSong.playing = true;
      $rootScope.$broadcast('playerPlayed', $scope.currentSong)
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
    $rootScope.$broadcast('playerPlayed', $scope.currentSong)
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


});
