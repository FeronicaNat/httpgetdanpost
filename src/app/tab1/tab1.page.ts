import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http:HttpClient, private loadCtrl:LoadingController,private toastCtrl:ToastController) {}

  dataPOST=[];
  loading;
  post:any={}

  ionViewDidEnter(){
    this.getDataPost();
  }

  
  public async loaderPresent():Promise<any>{
    this.loading= await this.loadCtrl.create({
      message:"LOADING",
      backdropDismiss:true

    });
    await this.loading.present();
    return this.loading;
  }

  async getDataPost(){
    this.loading= await this.loaderPresent();
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((res:any)=>{
      console.log(res);
      this.dataPOST=res;
      if(this.loading){
        this.loading.dismiss(); //buat nutup loader jngn lupa dipanggil kalo ws isa nampilin data sg dipingini
      }
    });
  }

  submit(){
    this.http.post("https://jsonplaceholder.typicode.com/posts",this.post).subscribe((res:any)=>{
      console.log(res);
      this.toastCtrl.create({
        duration:3000,
        message:"ID for new item is "+res.id
      }).then(l=>l.present())
    });
  }


}
