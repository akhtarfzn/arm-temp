import { MinDateService } from './../utilities/min-date.service';
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppServicesService } from "./../services/app-services.service";
import { ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { IResponse } from "src/app/models/response.interface";
import { Router } from "@angular/router";
import { ModalComponent } from "./../reusable-components/modal/modal.component";
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { JobService } from '../services/job.service'
import { EnvVarService } from '../utilities/env-var.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
@Component({
  selector: "app-jd-form",
  templateUrl: "./jd-form.component.html",
  styleUrls: ["./jd-form.component.scss"],
})
export class JdFormComponent implements OnInit {
  constructor(
    private _service: AppServicesService,
    private router: Router,
    private modalService: NgbModal,
    private jobService: JobService,
    private minDateService:MinDateService,
    private _env: EnvVarService
  ) {}
  ngOnInit() {

    this._service.getAllEligibilityCriterias().subscribe((res: any) => {
      this.eligibilityCriterias = res.payload.data;

    });
    this._service.getAllLocations().subscribe((res: any) => {
      this.locations = res.payload.data;

    });
    this._service.getAllEmploymentTypes().subscribe((res: any) => {
      this.employmentTypes = res.payload.data;

    });
     this.minimumDate= this.minDateService.setMinimumDate();
  }

  jd : any = {};
  jdObj: any = {};

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  obj : any
  res: any;
  eligibilityCriteriaOptions: String;
  locationOptions: String;
  jobTypeOptions: String;
  jobListingForm: FormGroup;
  submitted = false;
  jdFormObject: any;
  data: any;
  formControl : any;
  jdForm: FormGroup;
  eligibilityCriterias: any;
  employmentTypes: any;
  locations: any;
  skillArray: any;
  currencyText: string;
  buttonName: string = "Select Currency"
  minimumDate:string;

  selectChangeHandlerEligibilityCriteria(event: any) {
    this.eligibilityCriteriaOptions = event.target.value;
  }
  currencyChange(event: any) {
    this.currencyText = event.target.text;
    this.buttonName = this.currencyText;
  }

  selectChangeHandlerLocation(event: any) {
    this.locationOptions = event.target.value;
  }

  selectChangeHandlerJobType(event: any) {
    this.jobTypeOptions = event.target.value;
  }
  
  get formControls() {
    console.log("reached formControls")
    return this.jobListingForm.controls;
  }

  error: any = { isError: false, errorMessage: "" };

  
  jbFormData(jd: any) {
    
    console.log(this.jdObj.jobTitle)
        
  }

}

  
    
  
      //   this.jobService.jdFormData(this.jdFormObject).subscribe((res: any) => {
      //     this.data = res.payload.data;
      //     const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
      //     modalRef.componentInstance.shouldConfirm = false;
      //     modalRef.componentInstance.success = res.success;
      //     modalRef.componentInstance.message = res.payload.message;
      //     modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      //       modalRef.close();
      //     });
      //     this.modalClose(true);
      //     if (res.status == 200) {
      //       let role = this._service.tokenDecoder().role;
      //       if (role === this._env.ADMIN) {
      //         this.router.navigate([
      //           `/admin/job-desc`,
      //         ]);
      //       } else if (role === this._env.SUPERUSER) {
      //         this.router.navigate([
      //           `/superuser/job-desc`,
      //         ]);
      //       }
      //     }    
      //   },
      //     (error: HttpErrorResponse) => {
            
      //       const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
      //       modalRef.componentInstance.shouldConfirm = false;
      //       modalRef.componentInstance.success = error.error.success;
      //       modalRef.componentInstance.message = error.error.message;
      //       modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      //         modalRef.close();
      //       });

      //       this.data = error.error.payload.data;

      //     }
      //   );
      // }
      //   modalClose(rerender: boolean): void {
      //     this.closeModal.emit(rerender);
      //   }
