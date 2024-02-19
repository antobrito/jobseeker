import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

type Carcontent = {
  title:string;
  description:string;
};



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  jobsList: any[] =[];
  
   

   typeCategory = ''
  constructor(private _jobservice:JobsService) { }

  ngOnInit(): void {
    this.getJobs();

  }


  getJobs() {

    this._jobservice.getJobsSnap().subscribe(data=> {
       this.jobsList = [];
       data.forEach((element:any) => 
       {
       
       this.jobsList.push({
                       id:element.payload.doc.id,
                       ...element.payload.doc.data()
                       })
       });
          console.log(this.jobsList);
     });
       //console.log(element.payload.doc.id);
       //console.log(element.payload.doc.data());
     } //end getJobs

     FindCategory(cat:string): any[] {

      if (cat == null )
         return this.jobsList
      else
         return this.jobsList.filter(p => p.category = cat);
    }


     changeJobs(){

        

     }


}
