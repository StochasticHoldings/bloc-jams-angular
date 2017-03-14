(function() {
         function SongPlayer($rootScope, Fixtures) {
            var SongPlayer = {};

            SongPlayer.currentVolume = 80;


            SongPlayer.setVolume = function(value){
              console.log("FLAG ONE")
              window.foo = currentBuzzObject;
              currentBuzzObject.setVolume(value);
            }








            //var SongPlayer.currentAlbum = Fixtures.getAlbum();
            SongPlayer.currentAlbum = null
            /**
             * @desc Buzz object audio file
             * @type {Object}
             */
            var currentBuzzObject = null;

            /**
             * @function setSong
             * @desc Stops currently playing song and loads new audio file as currentBuzzObject
             * @param {Object} song
             */
            var setSong = function(song) {
                if (currentBuzzObject) {
                    stopSong();
                }
                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });
                currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
          });
      });

                var getSongIndex = function(song) {
                    return SongPlayer.currentAlbum.songs.indexOf(song);
                };

                SongPlayer.currentSong = song;
            };

            /**
             *@function playSong
             * @desc Private function that helps play song with less code
             * @param {Object} song
             */
            function playSong(song) {
                currentBuzzObject.play();
                song.playing = true;
            }
            SongPlayer.currentSong = null;
            /**
           * @desc Current playback time (in seconds) of currently playing song
           * @type {Number}
           */
SongPlayer.currentTime = null;
            SongPlayer.play = function(song) {
                song = song || SongPlayer.currentSong;
                console.log(song, 'song')
                if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
                } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
            };
            SongPlayer.pause = function(song) {
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
            };
            SongPlayer.previous = function() {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex--;
                if (currentSongIndex < 0) {
                    stopSong();
                } else {
                    var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };
            SongPlayer.next = function() {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex++;
                if (currentSongIndex < 0) {
                    stopSong();
                } else {
                    var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };

            /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
 SongPlayer.setCurrentTime = function(time) {
     if (currentBuzzObject) {
         currentBuzzObject.setTime(time);
     }
 };

            function stopSong() {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            };
            return SongPlayer;
        }

        // Needs documentation here , I implemented this for assignment 8 -services 3


    //shift-command-P - pull up beautify package and then enter
    //command-shift-D to duplicate
    // ctrl-command-down-or-up-to-drag-code-up-and-down
    // 8 -services 3
    //command-D = finds multiple instances as you continue to press it


    angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
