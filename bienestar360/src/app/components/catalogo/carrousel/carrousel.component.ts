import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.css'
})
export class CarrouselComponent   {
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    navigation: true,
    autoplay: {
      delay: 3000,
    },
    pagination: { clickable: true },
    loop: true
  };
}
