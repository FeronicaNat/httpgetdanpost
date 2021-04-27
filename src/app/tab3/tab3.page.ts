import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private http:HttpClient, private loadCtrl:LoadingController,private toastCtrl:ToastController,public pindahtab: NavController,public route:ActivatedRoute,public router:Router,public alertCtrl:AlertController) {}

  post:any={};
  idku;

  async presentConfirm() {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: 'Do you want to delete this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.delete();
          }
        }
      ]
    });
    (await alert).present();
  }

  add(){
    this.http.post("https://reqres.in/api/users",this.post).subscribe((res:any)=>{
      console.log(res);
      this.idku=res.id;
      this.toastCtrl.create({
        duration:3000,
        message:"Name: "+res.name+"<br>Job: "+res.job
      }).then(l=>l.present())
    });
  }

  edit(){
    
    this.http.put("https://reqres.in/api/users/"+this.idku,this.post).subscribe((res:any)=>{
      console.log(res);
      this.toastCtrl.create({
        duration:3000,
        message:"Id baru: "+this.idku+"<br> Nama baru: "+res.name+"<br> Job baru: "+res.job
      }).then(l=>l.present())
    });
  }

  delete(){
    
    this.http.delete("https://reqres.in/api/users",this.post).subscribe((res:any)=>{
      console.log(res);
      this.toastCtrl.create({
        duration:3000,
        message:"Delete success"
      }).then(l=>l.present())
    });
  }


}
