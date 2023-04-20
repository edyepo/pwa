import {  Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiRestService } from 'src/app/service/api-rest-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pwa';
  public readonly VAPID_PUBLIC_KEY = 'BB9hb9rbykyRF41RAtVIiMqiSAjdF4YlCS-BZgn_Sp29Bu5YGvwBkPIvT-qp-jAd1CqT4lsQr0AcXFC9LJj5lrc';
  options:any
  audio = new Audio()
  constructor(private readonly swPush: SwPush,
    private readonly apiRest: ApiRestService
    ){
    this.subscribeToNotifications();  
    this.audio.src = 'assets/sound/tonollamada.mp3'
    
 }

 public subscribeToNotifications(){
 
  this.swPush.requestSubscription( {
    serverPublicKey: this.VAPID_PUBLIC_KEY
  }).then(sub=>{    
    console.log("333333");
    console.log(sub);
    
    console.log("44444");
   const val = (JSON.stringify(sub));

   
    
    const token = JSON.parse(JSON.stringify(sub))
    console.log("555555");
    console.log(token);
    console.log('********** OJO *********', token);
   
    ////////////////
    this.apiRest.saveToken(token).subscribe((res: Object)=>{
      console.log("////////////////");
      
      console.log(res);
      
    }, (err)=>{
      console.log("ERR", err);
      
    });
   }).catch(err => console.log('UPS :( ', err))

   this.swPush.messages.subscribe((res)=>{
    this.audio.play()
    console.log("escuchando mensaje");
    this.sonar()
    console.log(res);
    
   })

   this.swPush.notificationClicks.subscribe(({action, notification})=>{
    this.audio.pause();
    console.log("mmmmmmmmmmm");
    
    window.open(notification.data.url)
   })
   this.swPush.isEnabled.valueOf()
 }
 public sonar(){
  this.audio.play()
 }
}
 