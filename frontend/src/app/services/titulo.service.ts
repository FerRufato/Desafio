import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TituloService {
  private apiUrl = 'http://localhost:5291/api/titulos';

  constructor(private http: HttpClient) {}

  incluir(titulo: any): Observable<any> {
    return this.http.post(this.apiUrl, titulo);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  excluir(numeroTitulo: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${numeroTitulo}`);
  }

  atualizar(titulo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${titulo.numeroTitulo}`, titulo);
  }

  buscarPorNumero(numeroTitulo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${numeroTitulo}`);
  }
}
