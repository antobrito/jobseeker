import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  
  jobsListFiltered: any[] =[];
  
  tempArray:any[] = [];


  constructor(private _jobservice:JobsService) { }

  ngOnInit(): void {
    this.getJobs();
    this.jobsList =  this.jobsListFiltered;
   
  }


  getJobs() {

    this._jobservice.getJobsSnap().subscribe(data=> {
     
       data.forEach((element:any) => 
       {

        this.jobsListFiltered.push({
                        id:element.payload.doc.id,
                        ...element.payload.doc.data()
                        })  
           
       });
          console.log(this.jobsList);
     });
       //console.log(element.payload.doc.id);
       //console.log(element.payload.doc.data());
     } //end getJobs


     FindCategory(event:any)
     {
 
      if(event.target.value == "AllJobs")
      {
      this.jobsList =[];
       this.jobsListFiltered = [];
       this.getJobs();  
       this.jobsList =  this.jobsListFiltered;
      }
      else{

        this.jobsList = [];
        this.getJobs();  
          if (event.target.checked)
          {
           // console.log("target value "  + event.target.value)
            this.tempArray = [];
            this.tempArray = this.jobsListFiltered.filter((e:any)=> e.category == event.target.value);
            this.jobsListFiltered = [];
            console.log("temp array  " + this.tempArray)
            this.jobsList = [];
            this.tempArray.forEach(item => {

              this.jobsList.push(item);
              console.log(item.id, item.category);
            });


     

           


          
          }
        }
     }


     }
    



