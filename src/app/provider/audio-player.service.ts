import { Injectable } from '@angular/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio?: MediaObject;

  constructor(private readonly media: Media) { }

  public playAudio(mediaUrl: string) {
    this.releaseAudioPlayer();
    this.audio = this.media.create(mediaUrl);

    console.log("Starting to play " + mediaUrl);
    this.audio.play();
  }

  public resumeAudio() {
    if (!this.audio) {
      console.warn('No audio currently paused')
      return;
    }
    console.log("Resume playing ");
    this.audio.play()
  }


  public pauseAudio() {
    console.log("Playing paused")
    this.audio.pause();
  }


  private releaseAudioPlayer(): void {
    if (!this.audio) {
      return;
    }

    this.audio.pause();
    this.audio.release();
  }
}
