import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/shared/about.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private aboutService: AboutService) { }
  data = {};

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    this.aboutService.getValue().subscribe((res)=>{
      console.log(res);
      this.data = res;
      
    },error => {
      console.log("err",error);
    }) 
  }
  

  
       
  

}
