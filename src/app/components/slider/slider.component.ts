import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie } from '../../models/movie';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  //this is how we define an animation for the slides
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent implements OnInit {

  //used to get the input what to show on the slides
  @Input() items: Movie[] = [];

  @Input() isBanner: boolean = false;
  //used to count the current slide
  currentSlideIndex: number = 0;

  //for the size of the cover image
  readonly imageSizes = IMAGES_SIZES;

  ngOnInit(): void {
    if(!this.isBanner) 
    {
      //set a timer every 5 seconds
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }
  }
}
