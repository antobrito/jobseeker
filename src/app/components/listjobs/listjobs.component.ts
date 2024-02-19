import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { JobsService } from 'src/app/services/jobs.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listjobs',
  templateUrl: './listjobs.component.html',
  styleUrls: ['./listjobs.component.css']
})
export class ListjobsComponent implements OnInit {

  jobsList: any[] =[];
   

  constructor(private _jobservice:JobsService,
              private toastr: ToastrService) { 
  }

    
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


  deleteJob(id: string)
  {

    this._jobservice.deleteJob(id).then(() => {

    console.log('Job deleted successfully ');
    this.toastr.success('Job was deleted sucessfully', 'Job Deletion!',
       {positionClass:'toast-center-center'}
     );

    }).catch ( error => {this.toastr.success('Job was deleted sucessfully', 'Job Deletion!',
    {positionClass:'toast-center-center'}); 
                      
     }) 

  } // end deleteJob


  }
