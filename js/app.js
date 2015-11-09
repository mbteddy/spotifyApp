var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])
var artists;

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.showTheForm = true;
  $scope.savedSongs = [];
  $scope.back = false;
  $scope.getSongs = function(source) {
    $scope.showTheForm = false;
    $http.get(baseUrl + source).success(function(response){
      data = $scope.tracks = response.tracks.items
      console.log(data)
    })
  }


  $scope.save = function(artistID, image, song) {
    var songSave = {id:artistID, cover:image, tune:song}
    console.log(songSave)
    $scope.savedSongs.push(songSave)
    $scope.back = false
    $scope.getArtists(artistID, image, song)
  }


  $scope.getArtists = function(artistID, image, song) {
    $http.get('https://api.spotify.com/v1/artists/' + artistID + '/related-artists').success(function(response){
      data = $scope.artists = response.artists
      console.log(data)
      var rand = Math.floor((Math.random() * 20));
      console.log(rand)
      console.log(data[rand].name)
      $scope.getSongs(data[rand].name)
    })
    console.log($scope.savedSongs)
  }


  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

  // $scope.artists = function() {
  //   if () 
  // }

})


// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
