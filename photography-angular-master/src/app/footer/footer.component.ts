import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/shared/about.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private aboutService: AboutService) { }
  aboutInfo = {};
  subEmail = '';

  ngOnInit() {
    this.getAboutInfo();
  }
  getAboutInfo(){
    this.aboutService.getAboutInfo().subscribe(res => {
      console.log(res)
      res.map(o => {
        this.aboutInfo[o.type] = o.text;
      })
      this.aboutService.setValue(this.aboutInfo);
    }); 
  }

  subscribeEmail(){
    if(this.subEmail == '') return
    const data = {
      email:this.subEmail
    }
    this.aboutService.sendSubscribeMail(data).subscribe((resp)=>{
      this.subEmail = '';
    })
  }



}
