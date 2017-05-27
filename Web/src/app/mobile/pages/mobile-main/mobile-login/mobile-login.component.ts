import { Component, OnInit,HostBinding } from '@angular/core';
import { auth, initializeApp } from 'firebase';
import { UserService } from '../../../service/user/user.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../service/firebase/firebase.service';
import { AngularFire, FirebaseListObservable ,AuthProviders,AuthMethods} from 'angularfire2';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { MobileFooterComponent } from '../mobile-footer/mobile-footer.component';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css'],
})

export class MobileLoginComponent implements OnInit {
  email: any;
  password: any;
  error: string;
  title:string = "כניסה";


  constructor(private router:Router,
    public userServ:UserService,
    public af:AngularFire,
    public userService:UserService,
    public firebaseService: FirebaseService) { 
      this.error = '';
  }

  public signIn(){
    if(this.email == '' || this.password == '')
      return;
    this.af.auth.login({
      email: this.email, 
      password:this.password
    }).then((succsess)=>{
      localStorage.setItem('userAndPassword', JSON.stringify({email: this.email, password: this.password}));
      this.firebaseService.initUser('mobile_main');
    }).catch((error)=>{
      console.log(error.message);
      this.error = 'אנא נסה שנית';
    });
  
    
  };

  ngOnInit() {
    if(localStorage.getItem('userAndPassword'))
    {
      let obj = JSON.parse(localStorage.getItem('userAndPassword'));
      this.email = obj.email;
      this.password = obj.password;
    }
    if(LocalStorageService.loadUser()){//if not empty
      
    }
  }

}
