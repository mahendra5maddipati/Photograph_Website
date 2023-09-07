import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/shared/contact.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactService,private formBuilder: FormBuilder) { }
  contactInfo = {};
  myGroup: FormGroup;

  ngOnInit() {
    this.getTipsData();
    this.myGroup = this.formBuilder.group({
      'name': this.formBuilder.control('',Validators.required),
      'email': this.formBuilder.control('',Validators.required),
      'subject': this.formBuilder.control('',Validators.required),
      'message': this.formBuilder.control('',Validators.required)
    });
  }

  get name() { return this.myGroup.get('name'); }
  get email() { return this.myGroup.get('email'); }
  get subject() { return this.myGroup.get('subject'); }
  get message() { return this.myGroup.get('message'); }



  getTipsData(){
    this.contactService.getContactInfo().subscribe(res => {
      console.log(res)
      res.map(o => {
        this.contactInfo[o.type] = o.details;
      })
      // debugger
    }); 
  }

  handleSubmit() {
    console.log("called++++++++++",this.myGroup.value);
    const data = this.myGroup.value;
    this.contactService.sendMessage(data).subscribe((resp=>{
      console.log("resp",resp);

    }),error=>{
      console.log("errr",error);
    })
    this.myGroup.reset();
    debugger
    // console.log(this.form.value);
  }

}
