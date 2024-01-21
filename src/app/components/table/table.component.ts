import { Component, OnInit, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEditTodoComponent } from '../add-edit-todo/add-edit-todo.component';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FontAwesomeModule, AddEditTodoComponent, NgbAlertModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  private modalService = inject(NgbModal);
  showAddedSuccessAlert: boolean = false;
  showdeletedSuccessAlert: boolean = false;
  showAddedUpdatedAlert: boolean = false;
  selectedTodoId: string = '';
  todoList: any = [];


  ngOnInit(): void {
    let data: any = JSON.parse(localStorage.getItem('todo-list') || '[]');
    if(data){
      this.todoList = data;
    }
  }


  // formType should be add or edit
  open(formType: string, data: any = '') {
    const modalRef = this.modalService.open(AddEditTodoComponent);
    modalRef.componentInstance.formType = formType;
    modalRef.componentInstance.todoData = data;
    // When Todo added
    modalRef.componentInstance["addTodo"].subscribe((event: any) => {
      if (formType === 'edit') {
        let editTodoIndex = this.todoList.findIndex((todo: any) => { return todo.id === event.id });
        this.todoList[editTodoIndex] = event;
        localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        this.showAddedUpdatedAlert = true;
        setTimeout(() => {
          this.showAddedUpdatedAlert = false;
        }, 2000);
      } else {
        this.todoList.push(event);
        // console.log(event);
        localStorage.setItem('todo-list', JSON.stringify(this.todoList));
        this.showAddedSuccessAlert = true;
        setTimeout(() => {
          this.showAddedSuccessAlert = false;
        }, 2000);
      }
    });
  };


  deletTodo(id: any) {
    this.selectedTodoId = id;
    const modalRef = this.modalService.open(DeleteModalComponent);
    // modalRef.componentInstance.name = 'World';
    // When Todo Delete
    modalRef.componentInstance["deletedTodo"].subscribe((event: any) => {
      // console.log(event);
      if (event) {
        let deleteTtodoIndex = this.todoList.findIndex((todo: any) => { return todo.id === this.selectedTodoId });
        this.todoList.splice(deleteTtodoIndex, 1);
        this.showdeletedSuccessAlert = true;
        setTimeout(() => {
          this.showdeletedSuccessAlert = false;
        }, 2000);
      }
    });
  };


  addedTodo(e: any) {
    console.log('e', e);
  }

}
