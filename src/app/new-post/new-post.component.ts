import { Component, OnInit, Inject, ElementRef, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { ImageUploadService } from '../imageUpload.service';
import {ImageProperties, FileProperties, Idomainlist, IcategoryList, IFunctionalAreas} from './../app.interface';
import { MatSnackBar } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {BusinesslogicService} from '../businesslogic.service';
import { Subscription } from 'rxjs';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {SharedService} from '../shared.service';
@Component({
  selector: 'km-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewPostComponent implements OnInit, OnDestroy {
  @ViewChild('domainsInput') domainsInput: ElementRef<HTMLInputElement>;
  @ViewChild('funtionalareasInput') funtionalareasInput: ElementRef<HTMLInputElement>;

  domainslist: Idomainlist[] ;
  filteredDomains: Idomainlist[];
  respectivefunctionalareas: IFunctionalAreas[];
  filteredfunctionalareas: IFunctionalAreas[];
  selectedDomainsList = [];
  selectedFunctionalareasList = [];
  categoriesList: IcategoryList[] ;
  fileobject: ImageProperties[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  domains: any;
  functionalareas: any;
  showandhide = false;
  count = 0;
  file: any;
  newPostForm: FormGroup;
  selectedDomainsIds = [];
  imageData: File;
  selectedFunctionalareasIds = [] ;
  domainSubscription: Subscription;
  categoriesSubscription: Subscription;
  functionalSubscription: Subscription;
  imageobject: ImageProperties = { imageName: null, imageType: null, Image: null};

  functionalareaswithdomains = [{domainname: 'Advances Analytics',
                      respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'BI Reporting', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'Data Management', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'Data Analytics', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'Due Diligence', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'Financial planning & Analysis', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'location Analytics', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'machine learning', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'marketing/customer Analytics', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'operations Analytics', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'optimization', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'people performance Analytics', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'predictive modeling', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'programming', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']},
  {domainname: 'strategy and consulting', respectivefunctinalareas: ['Functionalareas1', 'Functionalareas2', 'Functionalareas3']}];
  constructor(public dialogRef: MatDialogRef<NewPostComponent>, @Inject(MAT_DIALOG_DATA) public datatoedit: any,
   public imageuploadservice: ImageUploadService,
    public snackBar: MatSnackBar, private formBuilder: FormBuilder, public businesslogic: BusinesslogicService,
    public sharedservice: SharedService) { }

  ngOnInit() {
    this.domainSubscription = this.businesslogic.get('post/getDomainList').subscribe((result: any) => {
      this.domainslist = result;
      this.filteredDomains = this.domainslist;
      });
      this.categoriesSubscription = this.businesslogic.get('post/getCategoryList').subscribe((result: any) => {

        this.categoriesList = result.filter(item => item.categoryId !== 1);
        });
        this.functionalSubscription = this.businesslogic.get('post/getFunctionalAreaList').subscribe((result: any) => {
          this.respectivefunctionalareas = result;
          this.filteredfunctionalareas = this.respectivefunctionalareas;
          });
          console.log(this.datatoedit);
          if(this.datatoedit == null) {
            this.newPostForm = this.formBuilder.group({
              subject: [null, Validators.required],
              body: [ null, Validators.required],
              domains: [[]],
              categoryId: [null, Validators.required],
              functionalareas: [[]],
              imageData: [[]],
              infoConfidentialChecked: [null, Validators.required]
            });
          } else {
            this.newPostForm = this.formBuilder.group({
              subject: [this.datatoedit.subject ? this.datatoedit.subject : null, Validators.required],
              body: [this.datatoedit.body ? this.datatoedit.body : null, Validators.required],
              domains: [this.datatoedit.domains ? this.datatoedit.domains : []],
              categoryId: [this.datatoedit.categoryId[0]._id ? this.datatoedit.categoryId[0]._id : null, Validators.required],
              functionalareas: [this.datatoedit.functionalareas ? this.datatoedit.functionalareas : []],
              imageData: [[]],
              infoConfidentialChecked: [this.datatoedit.infoConfidentialChecked ? this.datatoedit.infoConfidentialChecked : null,
                 Validators.required],
              postId: [this.datatoedit.postId ? this.datatoedit.postId : null, Validators.required],
              createdById: [this.datatoedit.createdById],
              updatedById: this.sharedservice.login_user_details.user_id,
              createdDate: [this.datatoedit.createdDate],
              updatedDate: [this.datatoedit.updatedDate],
              likes: [this.datatoedit.likes],
              replies: [this.datatoedit.replies],
              followers: [this.datatoedit.followers]
            });
            this.selectedFunctionalareasList = this.datatoedit.functionalareaIds;
            this.selectedDomainsList = this.datatoedit.domainIds;
          }
  
  }
  get f() { return this.newPostForm.controls; }
  closeDailog (): void {
    this.dialogRef.close('closedwithoutsaving');
  }
  filterDomainoptions(textentered) {
    this.filteredDomains = this.domainslist.filter(option =>
                           option.domainName.toLocaleLowerCase().includes(textentered.toLocaleLowerCase()));
  }
  filterfunctionalareasoption(textentered) {
    this.filteredfunctionalareas = this.respectivefunctionalareas.filter(option =>
                                    option.functionalAreaName.toLocaleLowerCase().includes(textentered.toLocaleLowerCase()));
  }
  selectedDomains(event: MatAutocompleteSelectedEvent): void {
    this.selectedDomainsList.push({'domainId': event.option.value, 'domainName': event.option.viewValue});
    this.selectedDomainsIds.push(event.option.value);
    this.domainsInput.nativeElement.value = '';
  }
  selectedFunctionalareaMethod(event: MatAutocompleteSelectedEvent): void {
    this.selectedFunctionalareasList.push({'functionalAreaId': event.option.value, 'functionalAreaName': event.option.viewValue});
    this.selectedFunctionalareasIds.push(event.option.value);
    this.funtionalareasInput.nativeElement.value = '';

  }
  Savenewpost() {
        // stop here if form is invalid
        if (this.newPostForm.invalid || !this.newPostForm.value.infoConfidentialChecked) {
            return;
        }
    this.newPostForm.value.functionalareas = this.selectedFunctionalareasIds;
    this.newPostForm.value.domains = this.selectedDomainsIds;
    this.newPostForm.value.imageData = this.imageData;
    this.businesslogic.post('post/addorupdatepost', this.newPostForm.value).subscribe((response: any) => {
    
      const formdata: FormData = new FormData();

      formdata.append('file', this.imageData);
      this.businesslogic.post('post/uploadimages', formdata).subscribe((response: any) => {
           this.dialogRef.close('success');
         });
    });

  }
  showfunctionalareaslist() {
this.showandhide = !this.showandhide;
  }
  removeDomainFromSelectedList(item: string): void {
      const index = this.selectedDomainsList.indexOf(item);
      if (index >= 0) {
        this.selectedDomainsList.splice(index, 1);
      }
  }
  removeFunctionalAreaFromSelectedList(item: string): void {
    const index = this.selectedFunctionalareasList.indexOf(item);
    if (index >= 0) {
      this.selectedFunctionalareasList.splice(index, 1);
    }
}
  openInput() {
    document.getElementById('upload').click();
  }

  onFileChange(evt) {
    this.imageData = evt.target.files[0];
  }
//     this.count = 0;
//     this.fileobject = [];
//     const files = evt.target.files;
//     if (files.length + this.fileobject.length  > 1) {
//       this.snackBar.open('max of 5 images can be uploaded', '', { duration: 3000, panelClass: ['warningMessage']  });
//     } else {
//   for (let i = 0; i < files.length; i++) {
//     if (files[i].type.indexOf('image') === -1) {
//       this.snackBar.open('Accepts only images', '', { duration: 3000, panelClass: ['warningMessage']  });
//       this.count = 1;
//       break;
//     } else if (files[i].size > 1000000) {
//       this.count = 1;
//       // this.onlyimagewarning = null;
//       this.snackBar.open(files[i].name + ' ' + 'exceeds size limit', '', { duration: 3000, panelClass: ['warningMessage'] });
//          break;
//     }
// }
// if (this.count === 0) {
//   // this.uploaded_filename = files[0].name;
//     if (files) {
//       for (let i = 0; i < files.length; i++) {
//         this.file = files[i];
//         const reader = new FileReader();
//         reader.onload = this._handleReaderLoaded.bind(this, files.length, i, files[i]);
//         reader.readAsBinaryString(this.file);
//       }
//     }
//   }

//   }

// _handleReaderLoaded(lengthoffiles, ivalue, filevalue, readerEvt) {

//   const binaryString = readerEvt.target.result;
//   this.fileobject.push({
//     'imageName': filevalue.name, 'imageType': filevalue.type, 'Image': btoa(binaryString),

//   });
//   if (ivalue + 1 === lengthoffiles) {
 
//     this.imageobject = this.fileobject[0];
//     console.log(this.fileobject);
//   }
  
// }
ngOnDestroy(): void {
this.functionalSubscription.unsubscribe();
  this.domainSubscription.unsubscribe();
  this.categoriesSubscription.unsubscribe();
}

}
