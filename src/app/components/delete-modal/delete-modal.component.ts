import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})



export class DeleteModalComponent {

  activeModal = inject(NgbActiveModal);
  @Output() deletedTodo = new EventEmitter<any>();

  deleteTodo() {
    this.deletedTodo.emit(true);
    this.activeModal.close('Close click')
  }

}
