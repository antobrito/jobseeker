import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { JobsService } from 'src/app/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-insertupdatejob',
  templateUrl: './insertupdatejob.component.html',
  styleUrls: ['./insertupdatejob.component.css']
})
export class InsertupdatejobComponent implements OnInit {


   
 FrmcreateJob: FormGroup;
 submitted = false;
 loading = false;
 id:string | null;
 title = 'Add Job';

  // City Names
  Categories: any = ['Front End', 'Back End', 'Full Stack']
  default = 'Front End'



  constructor(private fb:FormBuilder,
              private _jobService:JobsService,
              private router:Router,
              private toastr: ToastrService,
              private aRoute:ActivatedRoute) { 
     this.FrmcreateJob = this.fb.group({
      jobid: ['',Validators.required],
      jobname: ['',Validators.required],
      category:[ '',Validators.required],
      desc: ['',Validators.required],
      salary: ['',Validators.required]

     })
     this.id = this.aRoute.snapshot.paramMap.get('id');
     console.log(this.id);
  }


  /*********************************************************** */
  addEditJob(){
    this.submitted = true;

    if (this.FrmcreateJob.invalid)
    {
      return;
    }
  
    if (this.id===null)  
    {
      this.addJob();

    } else{

      this.editJob(this.id);

    }

  } // addEditjob
  
  /*********************************************************** */
  addJob(){
  //objeto que enviare a firebase
  const jobData: any = {
    jobid: this.FrmcreateJob.value.jobid,
    jobname: this.FrmcreateJob.value.jobname,
    category: this.FrmcreateJob.value.category,
    desc: this.FrmcreateJob.value.desc,
    salary: this.FrmcreateJob.value.salary,
    dateCreation:new Date(),
    dateUpdated: new Date()
  }

  this._jobService.addJob(jobData).then(()=> 
  {
  this.loading = true; 
   this.toastr.success('Job was added sucessfully', 'JOb Registration!',
     {positionClass:'toast-center-center'}
   );
   this.loading = false;
   this.router.navigate(['/listjobs'])

  }).catch(error=>
          {
             console.log(error);
             this.loading = false;
             this.toastr.success('Error Inserting the job', 'JOb ERROR!',
             {positionClass:'toast-center-center'});
          })

  //console.log(this.FrmcreateJob);
  //console.log(jobData);
  
  }

  /*********************************************************** */

   editJob(id:string ) {
      this.loading = true;

      const jobData: any = {
        jobid: this.FrmcreateJob.value.jobid,
        jobname: this.FrmcreateJob.value.jobname,
        category: this.FrmcreateJob.value.category,
        desc: this.FrmcreateJob.value.desc,
        salary: this.FrmcreateJob.value.salary,
        dateUpdated: new Date()
      }
      this._jobService.updateJobId(id, jobData).then(() =>
      {
        this.loading = false;
        this.toastr.success('Job updated', 'Job Edition',
             {positionClass:'toast-center-center'})

      }).catch(error=>
        {
           console.log(error);
           this.loading = false;
           this.toastr.success('Error Updating the job', 'Job ERROR!',
           {positionClass:'toast-center-center'});
        })
        this.loading = false;
        this.router.navigate(['/listjobs'])
   };

  /*********************************************************** */
  isEdit(){
  
    if (this.id != null) {
      this.title = 'Edit Job';
      this._jobService.getJobId(this.id).subscribe(data => {
          console.log(data.payload.data()['jobid']);
          this.loading = true;
          //assign to my form the values
          this.FrmcreateJob.setValue ({
            jobid: data.payload.data()['jobid'],
            jobname: data.payload.data()['jobname'],
            category: data.payload.data()['category'],
            desc: data.payload.data()['desc'],
            salary: data.payload.data()['salary'],
         
          })
          this.loading = false;
        });



    }
  } 

  ngOnInit(): void {

    this.isEdit();

  };
  

 
 


}
