import { OnInit } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryPlayConfig } from '../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/timer';
export declare class GalleryPlayerComponent implements OnInit {
    gallery: Gallery;
    progress$: Observable<boolean>;
    config: GalleryPlayConfig;
    constructor(gallery: Gallery);
    ngOnInit(): void;
}
