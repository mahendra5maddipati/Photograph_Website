import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/shared/about.service';
import {MediaService} from 'src/shared/media.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private aboutService: AboutService,private mediaService:MediaService) { }
  data = {};
  media = {};

  ngOnInit() {
    this.getValues();
    this.getMediaInfo();
  }

  getValues(){
    this.aboutService.getValue().subscribe((res)=>{
      console.log(res);
      this.data = res;
    },error => {
      console.log("err",error);
    }) 
  }
  getMediaInfo(){
    this.mediaService.getMediaInfo().subscribe((res)=>{
      res.map(o => {
        this.media[o.medium] = o.links;
      })
    },error => {
      console.log("err",error);
    })
  }

}
