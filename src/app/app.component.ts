import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  ngOnInit(){
const observer={
  next: (value:any) => console.log("next",value),
  error: (value:any) => console.log("error",value),
  complete:()=> console.log("completed!!")
}

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

  
  
}
