import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/index';
import { Component,  Input, EventEmitter, Output , OnDestroy, Inject, ViewChild} from '@angular/core';
import {ICaraouselData} from '../../interfaces/caraouselData';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';
import { IInteractEventObject, IInteractEventEdata, IImpressionEventInput } from '@sunbird/telemetry';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/platform-browser';
/**
 * This display a a section
 */
@Component({
  selector: 'app-page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.scss']
})
export class PageSectionComponent implements OnInit, OnDestroy {
  inviewLogs = [];
  cardIntractEdata: IInteractEventEdata;

  @ViewChild('slickModal') slickModal;
  /**
  * section is used to render ICaraouselData value on the view
  */
  @Input() section: ICaraouselData;

  @Input() cardType: string;

  /**
  * section is used to render ICaraouselData value on the view
  */
  @Output() playEvent = new EventEmitter<any>();
  /**
  * section is used to render ICaraouselData value on the view
  */
  @Output() visits = new EventEmitter<any>();

  @Output() viewAll = new EventEmitter<any>();
  private resourceDataSubscription: Subscription;

  /**
  * This is slider setting
  */
 slideConfig = {
  'slidesToShow': 4,
  'slidesToScroll': 4,
  'responsive': [
    {
      'breakpoint': 2800,
      'settings': {
        'slidesToShow': 6,
        'slidesToScroll': 6
      }
    },
    {
      'breakpoint': 2200,
      'settings': {
        'slidesToShow': 5,
        'slidesToScroll': 5
      }
    },
    {
      'breakpoint': 2000,
      'settings': {
        'slidesToShow': 4,
        'slidesToScroll': 4
      }
    },
    {
      'breakpoint': 1600,
      'settings': {
        'slidesToShow': 3.5,
        'slidesToScroll': 3
      }
    },
    {
      'breakpoint': 1200,
      'settings': {
        'slidesToShow': 3,
        'slidesToScroll': 3
      }
    },
    {
      'breakpoint': 900,
      'settings': {
        'slidesToShow': 2.5,
        'slidesToScroll': 2
      }
    },
    {
      'breakpoint': 750,
      'settings': {
        'slidesToShow': 2,
        'slidesToScroll': 2
      }
    },
    {
      'breakpoint': 660,
      'settings': {
        'slidesToShow': 1.75,
        'slidesToScroll': 1
      }
    },
    {
      'breakpoint': 530,
      'settings': {
        'slidesToShow': 1.25,
        'slidesToScroll': 1
      }
    },
    {
      'breakpoint': 450,
      'settings': {
        'slidesToShow': 1,
        'slidesToScroll': 1
      }
    }
  ],
  infinite: false,
  rtl: false
};
  /**The previous or next value of the button clicked
   * to generate interact telemetry data */
  btnArrow: string;
  pageid: string;
  constructor(public activatedRoute: ActivatedRoute, public resourceService: ResourceService,
    @Inject(DOCUMENT) private _document: any) {
    this.resourceService = resourceService;
  }
  playContent(event) {
    event.section = this.section.name;
    this.playEvent.emit(event);
  }
  ngOnInit() {
    this.resourceDataSubscription = this.resourceService.languageSelected$
      .subscribe(item => {
        if (this.section.name !== 'My Courses') {
          this.selectedLanguageTranslation(item.value);
        }
      }
      );
    const id = _.get(this.activatedRoute, 'snapshot.data.telemetry.env');
    this.pageid = _.get(this.activatedRoute, 'snapshot.data.telemetry.pageid');
    if (id && this.pageid) {
      this.cardIntractEdata = {
        id: this.cardType === 'batch-card' ? 'batch-card' : 'content-card',
        type: 'click',
        pageid: this.pageid
      };
    }
    this.addSlideConfig();
  }
  selectedLanguageTranslation(data) {
    const display = JSON.parse(this.section['display']);
    if (_.has(display.name, data) && !_.isEmpty(display.name[data])) {
      this.section.name = display.name[data];
    } else {
      this.section.name = display.name['en'];
    }
    this.addSlideConfig();
  }
  /**
   * get inview  Data
  */
  inview(event) {
    const visitsLength = this.inviewLogs.length;
    const visits = [];
    _.forEach(event.inview, (inview, key) => {
      const content = _.find(this.inviewLogs, (eachContent) => {
        if (inview.data.metaData.courseId) {
          return eachContent.metaData.courseId === inview.data.metaData.courseId;
        } else if (inview.data.metaData.identifier) {
          return eachContent.metaData.identifier === inview.data.metaData.identifier;
        }
      });
      if (content === undefined) {
        inview.data.section = this.section.name;
        this.inviewLogs.push(inview.data);
        visits.push(inview.data);
      }
    });
    if (visits.length > 0) {
      this.visits.emit(visits);
    }
  }
  /**
   * get inviewChange
  */
  inviewChange(contentList, event) {
    const visits = [];
    const slideData = contentList;
    _.forEach(slideData, (slide, key) => {
      const content = _.find(this.inviewLogs, (eachContent) => {
        if (slide.metaData.courseId) {
          return eachContent.metaData.courseId === slide.metaData.courseId;
        } else if (slide.metaData.identifier) {
          return eachContent.metaData.identifier === slide.metaData.identifier;
        }
      });
      if (content === undefined) {
        slide.section = this.section.name;
        this.inviewLogs.push(slide);
        visits.push(slide);
      }
    });
    if (visits.length > 0) {
      this.visits.emit(visits);
    }
  }
  checkSlide(event) {
    if (event.currentSlide < event.nextSlide) {
      this.btnArrow = 'next-button';
    } else if (event.currentSlide > event.nextSlide) {
      this.btnArrow = 'prev-button';
    }
  }
  addSlideConfig() {
    this.resourceService.languageSelected$
        .subscribe(item => {
          if (item.value === 'ur') {
            this.slideConfig['rtl'] = true;
          } else {
            this.slideConfig['rtl'] = false;
          }
          if (this.slickModal) {
            this.slickModal.unslick();
            this.slickModal.initSlick(this.slideConfig);
          }
    });
  }
  navigateToViewAll(section) {
    this.viewAll.emit(section);
  }
  ngOnDestroy() {
    if (this.resourceDataSubscription) {
      this.resourceDataSubscription.unsubscribe();
    }
  }
}
