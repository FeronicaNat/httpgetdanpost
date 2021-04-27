import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private http:HttpClient, private loadCtrl:LoadingController,private toastCtrl:ToastController,public pindahtab: NavController,public route:ActivatedRoute,public router:Router) {}

  dataPOST=[];
  loading;
  post:any={}
  dataarray=[];

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
    this.http.get("https://reqres.in/api/users?page=2").subscribe((res:any)=>{
      console.log(res);
      this.dataPOST=res;
      if(this.loading){
        this.loading.dismiss(); //buat nutup loader jngn lupa dipanggil kalo ws isa nampilin data sg dipingini
      }
    });
  }

  // submit(){
  //   this.http.post("https://reqres.in/api/users?page=2",this.post).subscribe((res:any)=>{
  //     console.log(res);
  //     // this.dataarray=res as string[];
  //     // console.log(this.dataarray);

  //     this.toastCtrl.create({
  //       duration:3000,
  //       message:"ID for new item is "+res.id
  //     }).then(l=>l.present())
  //   });
  // }

  pindahpage(){
    this.router.navigate(["tabs/tab3"]);
  }

}
