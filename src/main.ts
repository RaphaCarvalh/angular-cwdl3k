import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { CadastroService } from './cadastro.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: ` `,
})
export class App implements OnInit{
  f: FormGroup;
  form: any;
  formularioDeLogin: any;
  service: any;
  http: any;
  users: User[] = [];

  constructor(private cadastroService: CadastroService,    
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.f = this.fb.group({
    })
    this.listarUsers();
  }

  listarUsers() {
    this.cadastroService.getUser().subscribe(data => {
      if (!data) {
        alert('erro')
        return;
      }
      this.users = data;
    })
  }
  async criarUser() {
    if (this.f.valid) {
      const user: User = this.f.value;
      console.log(user);
      await this.cadastroService.criarUser(user).subscribe(resultado => {
        console.log(resultado);
      });
      alert('Cadastro successful')
      this.f.reset();
      this.listarUsers()
    }
  }
  
  async deletaEmail(user: User) {
    this.cadastroService.excluirUser(user.id).toPromise().then(() => {
      this.listarUsers()
      window.location.href = "/";
    }, err => {
      console.log(err)
    })    
  }

  onReset(): void {
    this.f.reset();
  }

  data = {
    password: '',
    password_confirm: '',
  };

  externalValidate() {
    
  }



  }
bootstrapApplication(App);
