import { Component, Input, OnInit } from '@angular/core';
import { AudioContentUrl } from '../../../provider/content/audio-content.service';
import { AudioPlayerService } from '../../../provider/audio-player.service';

@Component({
  selector: 'ath-article-audio-reader',
  templateUrl: './article-audio-reader.component.html',
  styleUrls: ['./article-audio-reader.component.scss']
})
export class ArticleAudioReaderComponent implements OnInit {

  @Input() audioContentUrl: AudioContentUrl;
  playerState: 'playing' | 'stop' | 'paused' = 'stop';

  constructor(private readonly audioPlayer: AudioPlayerService) { }

  ngOnInit(): void {
  }


  playAudio() {
    this.audioPlayer.playAudio(this.audioContentUrl.url);
    this.playerState = 'playing';
  }

  pauseAudio() {
    this.audioPlayer.pauseAudio();
    this.playerState = 'paused';
  }

  resumeAudio() {
    this.audioPlayer.resumeAudio();
    this.playerState = 'playing';
  }


}
