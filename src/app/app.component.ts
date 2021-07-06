import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ZoomInstant from '@zoom/videosdk';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'zoom';

   constructor() { }

   public client: any;
   public stream: any;

   @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

   ngOnInit(): void {
      let topic = 'topic';
      let userName = 'Neil Steyn';
      let passCode = 'pass';
      let signature = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfa2V5IjoiVVJxTlRnQ0JnVGJHNFRyWElXYTduOE9xc1IwRXczWlN0RDQ1IiwiaWF0IjoxNjI1NTczNzYwLCJleHAiOjE2MjU1ODA5NjAsInRwYyI6InRvcGljIiwicHdkIjoicGFzcyJ9.npw0EbQ2FhjvUpR3hUXDm6ynQg37P4fF0ngwL0z33Zs';

      this.client = ZoomInstant.createClient(); //or ZoomVideo.createClient();ng 
      this.client.init('en-US', 'https://neilsteyn.github.io/zoom-libss/').then((initSuccess: any) => {  //NS: for some reason there must be an extra s at the end for dev mode.

         const stream = this.stream = this.client.getMediaStream();

         /** SETUP EVENT LISTENERS **/
         //ref: https://marketplace.zoom.us/docs/sdk/video/web/reference
         //ref: https://marketplacefront.zoom.us/sdk/custom/web/modules.html

         this.client.on('user-add', async (payload: any) => { });
         this.client.on('user-remove', async (payload: any) => { });
         this.client.on('user-updated', async (payload: any) => { });
         this.client.on('user-update', async (payload: any) => { });
         this.client.on('connection-change', async (payload: any) => { });
         this.client.on('media-sdk-change', async (payload: any) => { });
         this.client.on('passively-stop-share', async (payload: any) => { });
         this.client.on('video-active-change', async (payload: any) => { });
         this.client.on('video-capturing-change', async (payload: any) => { });
         this.client.on('video-dimension-change', async (payload: any) => { });
         this.client.on('audio-active-speaker', async (payload: any) => { });
         this.client.on('audio-unmute-consent', async (payload: any) => { });
         this.client.on('auto-play-audio-failed', async (payload: any) => { });
         this.client.on('current-audio-change', async (payload: any) => { });
         this.client.on('device-change', async (payload: any) => { });
         this.client.on('active-share-change', async (payload: any) => { });
         this.client.on('share-content-change', async (payload: any) => { });
         this.client.on('share-content-dimension-change', async (payload: any) => { });
         this.client.on('share-privilege-change', async (payload: any) => { });
         this.client.on('peer-share-state-change', async (payload: any) => { });
         this.client.on('chat-privilege-change', async (payload: any) => { });
         this.client.on('chat-received-message', async (payload: any) => { });
         this.client.on('peer-video-state-change', async (payload: any) => {
            console.log('peer-video-state-change', payload);
            if (payload.action === 'Start') {
               console.log(document.querySelector('.canvas-zvsdk'));
               await stream.renderVideo(document.querySelector('.canvas-zvsdk'), payload.userId, 350, 350, 0, 0, 1);
            } else if (payload.action === 'Stop') {
               // await stream.stopRenderVideo(document.querySelector('canvas-zvsdk'));
            }
         });

         this.client.join(topic, signature, userName, passCode).then((data: any) => {
            stream.startVideo().then(() => {});
            
            /*
            stream.startVideo().then(()=>{
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: { width: 1280, height: 720 }
                }).then((stream:any)=>{
                    this.loading = false;
                    this.video.nativeElement.srcObject = stream;
                }).catch((getUserMediaError:any)=>{
                    console.log(getUserMediaError);
                });

            }).catch((e:any)=>{
                console.log(e);
            });
            */
         }).catch((joinError: any) => {
            console.error('Join error', joinError);
         });

      }).catch((initError: any) => {
         console.log('initError', initError);
      });
   }

}

