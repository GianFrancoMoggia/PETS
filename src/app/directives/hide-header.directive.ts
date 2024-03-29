import { Directive,OnInit,Input, Renderer2,HostListener} from '@angular/core';
import {DomController} from '@ionic/angular';
@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit{
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight=44;
  constructor(private renderer: Renderer2, private domContrl: DomController) { 

  }
  ngOnInit(){
    this.toolbar=this.toolbar.el;
    this.domContrl.read(()=>{
      this.toolbarHeight=this.toolbar.clientHeight;
    });
  }

  @HostListener('ionscroll',['$event']) onContentScroll($event){
    const scrollTop= $event.detail.scrollTop;
    console.log(scrollTop);
    let newPosition= (scrollTop/5);

    if(newPosition<-this.toolbarHeight){
      newPosition =-this.toolbarHeight;
    }

    let newOpacity = 1- (newPosition/ -this.toolbarHeight);

    this.domContrl.write(()=>{
      this.renderer.setStyle(this.toolbar, 'top', `${newPosition}px`);
      this.renderer.setStyle(this.toolbar, 'opacity', newOpacity);
    })
  }
}
