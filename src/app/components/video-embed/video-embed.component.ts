import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {

  @Input() site: string = "YouTube";
  @Input() key: string | null = null;

  videoUrl: SafeResourceUrl = "";

  constructor(private sanitizer: DomSanitizer) {  //used to make a src http safe (for the template link to video play)

  }

  ngOnInit(): void {
    switch(this.site) {
      case 'YouTube':
        this.videoUrl = this.getSafeUrl('https://www.youtube.com/embed/' + this.key);
        break;
      case 'Vimeo':
        this.videoUrl = this.getSafeUrl('https://vimeo.com/' + this.key);
        break;
    }
    
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
