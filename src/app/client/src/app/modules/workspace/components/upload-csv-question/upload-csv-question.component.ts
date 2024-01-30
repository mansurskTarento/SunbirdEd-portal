import { Component, OnInit } from '@angular/core';
import { CourseBatchService } from '@sunbird/learn';

@Component({
  selector: 'app-upload-csv-question',
  templateUrl: './upload-csv-question.component.html',
  styleUrls: ['./upload-csv-question.component.scss']
})
export class UploadCsvQuestionComponent implements OnInit {

  listOfFiles: any[] = [];
  fileList: File[] = [];

  constructor( private courseBatchService: CourseBatchService) { }

  ngOnInit(): void {
  }

 

  onFileChanged(event?: any) {
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      let selectedFile = event.target.files[i];

      if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
        this.fileList.push(selectedFile);
        // this.listOfFiles.push(selectedFile.name);

      }
    }
    this.uploadFiles();

  }
  uploadFiles() {
      const formData = new FormData();
      for (var i = 0; i < this.fileList.length; i++) {
        formData.append("file", this.fileList[i]);
      }
      console.log('formmmm',formData)
      this.addBulkCsv(formData)
    }

    addBulkCsv(data:any){
      this.courseBatchService.uploadCsvFile(data).subscribe((data)=>{
       console.log('dddd',data)
      })
    }

 

}
