import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-todo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-todo.component.html',
  styleUrl: './add-edit-todo.component.css'
})



export class AddEditTodoComponent implements OnInit {

  @Input() formType: string = '';
  @Input() todoData: any = '';
  submitted: boolean = false;
  activeModal = inject(NgbActiveModal);
  @Output() addTodo = new EventEmitter<any>();
  public todoForm!: FormGroup;
  autoGeneratId: number = Math.floor(Math.random() * 100000000) + 1;

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initForm();
    console.log('formType', this.formType);
    if(this.formType === 'edit'){
      this.patchTodoForm();
    }
    
  }

  private initForm() {
    this.todoForm = this.formBuilder.group({
      id: [this.autoGeneratId, Validators.required],
      todo: [null, Validators.required],
      status: [null, Validators.required],
      date: [null, Validators.required]
    });
  }

  get todoFormControl() {
    return this.todoForm.controls;
  }

  addedTodo() {
    // console.log('dorm', this.todoForm.value);
    if (this.todoForm.valid) {
      this.submitted = false;
      this.addTodo.emit(this.todoForm.value);
      this.activeModal.close('Close click')
    } else {
      this.submitted = true;
    }
  }

  patchTodoForm(){
    this.todoForm.patchValue({
      id: this.todoData.id,
      todo: this.todoData.todo,
      status: this.todoData.status,
      date: this.todoData.date,
    });
  }

}
