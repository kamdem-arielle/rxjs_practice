import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subscriber, fromEvent, map, of, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit
{

  constructor(private renderer:Renderer2){

  }
  ngAfterViewInit(): void {
    const scrollbar = document.querySelector(".scroll")
    this.progress.subscribe((data)=>{
      console.log(data)
      this.renderer.setStyle(scrollbar,"width",`${data}%`)
    })
  }


  ngOnInit(){
  const observer={
  next: (value:any) => console.log("next",value),
  error: (value:any) => console.log("error",value),
  complete:()=> console.log("completed!!")
}

const number = of(1,2,3)
number.pipe(
  map((data)=>{
    return data*2
  }),
  take(1)
).subscribe(
  (data)=>{
    console.log(data)
  },
  ()=>{console.log("completed")}
)
    const observable=Observable.create((subscriber:any)=>{
      subscriber.next("hello")
      subscriber.next("world")
      let count =0
      const id = setInterval(()=>{
        subscriber.next(count)
        count++
        if (count>5) {
          subscriber.complete()
        }
      },1000)

      
    })


  observable.subscribe(observer)

  }



   scroll = fromEvent(document,"scroll")
   progress=this.scroll.pipe(
    map((data:any)=>{
     console.log(data)
      return this.calculateScrollPercent(data.target.documentElement)
    })
   )
  
 calculateScrollPercent(elem:any) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    }= elem
    return (scrollTop/(scrollHeight - clientHeight))* 100

  }
  
}
