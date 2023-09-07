import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/shared/tips.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private tipsService:TipsService) { }
  tipsData = {};

  ngOnInit() {
    this.getTipsData();
  }
  getTipsData(){
    this.tipsService.getTipsData().subscribe(res => {
      console.log(res)
      res.map(o => {
        this.tipsData[o.type] = o.text;
      })
    }); 
  }

}
