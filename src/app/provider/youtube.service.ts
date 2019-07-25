import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private static YOUTUBE_KEY ='AIzaSyC8RK2EYC-nyiUielaLeHxHOu_UhztxF6c';

  constructor(private http:HttpService) { }



  getVideosByPlaylistId(playlistId: string){
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUVeMw72tepFl1Zt5fvf9QKQ&key='+YoutubeService.YOUTUBE_KEY)
  }
}
