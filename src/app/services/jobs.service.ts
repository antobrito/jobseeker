import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { collection, query, where } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private firestone: AngularFirestore) { 

  }

  /*********************************************************** */
   addJob(job:any):Promise<any>
   {
      return this.firestone.collection('jobs').add(job);
   }
  /*********************************************************** */
  getJobfltro(value: string)
  {

    return this.firestone.collection('jobs').doc(value).get();
  }

   getJobsSnap():Observable<any>
   {
        return this.firestone.collection('jobs',ref => ref.orderBy('dateCreation','desc')).snapshotChanges();
   }
  /*********************************************************** */
   deleteJob(id:string):Promise<any>
   {
      return this.firestone.collection('jobs').doc(id).delete();
   }
  /*********************************************************** */
   getJobId(id: string): Observable<any> {


       
      return this.firestone.collection('jobs').doc(id).snapshotChanges();


   }
   /*********************************************************** */

   updateJobId(id: string, data:any): Promise<any>
   {

     return this.firestone.collection('jobs').doc(id).update(data);


   }


}
