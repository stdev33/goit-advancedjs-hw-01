import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_PLAYBACK_TIME_KEY = 'videoplayer-current-time';
const playerTimeUpdateInterval = 1000;

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

trySetPlayerCurrentTime();

player.on('timeupdate', throttle(onPlayerTimeUpdate, playerTimeUpdateInterval));

function onPlayerTimeUpdate(data) {
  localStorage.setItem(LS_PLAYBACK_TIME_KEY, JSON.stringify(data.seconds));
}

function trySetPlayerCurrentTime() {
  const currentPlaybackTime = localStorage.getItem(LS_PLAYBACK_TIME_KEY);
  if (currentPlaybackTime) {
    const parsedPlaybackTime = Number(JSON.parse(currentPlaybackTime));

    player.getDuration().then(function (duration) {
      if (parsedPlaybackTime < duration) {
        player.setCurrentTime(parsedPlaybackTime).then(function (seconds) {
          console.log(
            `the actual time that the player seeked to: ${seconds} seconds`
          );

          player.play().catch(function (error) {
            console.log(`resume playback error: ${error}`);
          });
        });
      }
    });
  }
}
