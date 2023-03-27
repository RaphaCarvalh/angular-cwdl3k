import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private baseUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) { }
  
  
//Criando novo
  
criarUser(user: User): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}`, user);
}

//Pegando tudo
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

//  //Excluir 
//  excluirUser(id: number): Observable<any> {
//   return this.http.delete<any>(`${this.baseUrl}/user/${id}`);
// }
excluirUser(id: number | string){
  return this.http.delete(`${this.baseUrl}/${id}`)
}

}
