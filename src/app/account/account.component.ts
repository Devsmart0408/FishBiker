import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../modal/changepassword.component';
@Component({
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  EmailAddress: any;
  FirstName: any;
  LastName: any;
  submitted = false;
  infoForm: FormGroup;
  tab_name = 'info';
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, public headerService: HeaderService, private route: ActivatedRoute, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.EmailAddress = this.headerService.curUser.EmailAddress
    this.FirstName = this.headerService.curUser.FirstName
    this.LastName = this.headerService.curUser.LastName

    this.infoForm = this.formBuilder.group({
      FirstName: [this.FirstName, Validators.required],
      LastName: [this.LastName, Validators.required],
    });
    
  }
  get f() { return this.infoForm.controls; }
  updateInfo() {
      let formdata = this.infoForm.value;
      this.submitted  = true;
      if(this.infoForm.invalid) {
        return;
      } else {
        let result = this.accountService.update_account(formdata.FirstName, formdata.LastName, this.headerService.curUser.Token);
        console.log(result);
      }
  }
  showPasswordModal () {
    const modalCharge = this.modalService.open(ChangePasswordComponent);
    modalCharge.result.then(product => {
      
    }, (reason) => {})
  } 
  setTab(name: string) {
    this.tab_name = name;
  }
}
