import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Input()
  isLoading: boolean;

  @Output()
  loginFormValues: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();

  public isPasswordVisible: boolean = false;
  public loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password: ['', [ Validators.required, Validators.minLength(3) ]]
    });
  }

  ngOnInit() { }

  signIn(): void {
    if (this.loginForm.invalid) { return }
    if (this.loginForm.valid) {
      this.loginFormValues.emit({ userData: this.loginForm.value });
      this.loginForm.controls['password'].reset();
    }
  }

  toggleVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}
