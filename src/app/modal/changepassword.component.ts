import {
  Component,
  OnInit
} from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";


import { HeaderService } from '../services/header.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
@Component({
  templateUrl: "./changepassword.component.html"
})

export class ChangePasswordComponent implements OnInit {
  
  NewPassword: any;
  CurrentPassword: any;
  RetypePassword: any;
  submitted = false;
  passwordForm: FormGroup;
  is_same: any;
  constructor(private accountService: AccountService, private formBuilder: FormBuilder, public headerService: HeaderService, public changepasswordModal: NgbActiveModal, private modalService: NgbModal) { 
  }
  ngOnInit() { 
    this.is_same = true;
    this.passwordForm = this.formBuilder.group({
      NewPassword: ['', Validators.required],
      CurrentPassword: ['', Validators.required],
      RetypePassword: ['', Validators.required],
    }, {validator: this.checkPasswords});
  }
  checkPasswords (group: FormGroup) {
    let pass = group.get('NewPassword').value;
    let confirmPass = group.get('RetypePassword').value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  get f() { return this.passwordForm.controls; }
  submit() {
      let formdata = this.passwordForm.value;
      this.is_same = formdata.NewPassword === formdata.RetypePassword;
      console.log(this.is_same)
      this.submitted  = true;
      if(this.passwordForm.invalid || !this.is_same) {
        return;
      } else {
        this.accountService.update_password(formdata.CurrentPassword, formdata.NewPassword, this.headerService.curUser.Token);
      }
  }
}
