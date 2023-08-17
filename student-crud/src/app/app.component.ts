import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './services/student.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

interface Student {
  id:number,
  name:string,
  grade:string,
  address:string,
  rollno:number,
  status:string
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;
  displayedColumns: string[] = [];
  title = 'Angular App';
  studentForm : FormGroup;
  studentList: Student[] = [];


  constructor(private _dialog:MatDialog,private _studentService: StudentService, private _fb:FormBuilder ){
    this.studentForm =this._fb.group({
      name:'',
      grade:'',
      address:'',
      rollno:'',
      status:''

    })
  }
  studentsToUpdate = {
    id:0,
    name:'',
    grade:'',
    address:'',
    rollno:'',
    status:''
}

  ngOnInit(): void {
      this.getStudentList();
  }

  onFormSubmit() {
    if(this.studentForm.valid){
       this._studentService.addStudent(this.studentForm.value).subscribe({
        next: (val: any) =>{
          alert('Student added successfully');
          this.getStudentList();
        },
        error:(err:any)=>{
          console.log(err)
        }
       })
    }
    this.myForm.reset();
  }
  
  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next:(res) => {
        console.log(res);
        this.studentList = res;
      },
      error: console.log
    })
  }

  deleteStudent(id: number){
    this._studentService.deleteStudent(id).subscribe({
      next:(res) => {
        alert("Student Deleted")
        this.getStudentList();
      },
      error: console.log
    })
  }

  showModal = false;
  toggleModal(){
    this.getStudentList();
    this.showModal = !this.showModal;
  }


  edit(student:any){
    this.showModal = true;
    this.studentsToUpdate = student
  }
  updateStudent(){
    this._studentService.editStudent(this.studentsToUpdate.id,this.studentsToUpdate).subscribe({
      next:(res)=>{
        alert("Updated");
        this.showModal = false
        this.getStudentList();
      },
      error : console.log
    })
  }
}
