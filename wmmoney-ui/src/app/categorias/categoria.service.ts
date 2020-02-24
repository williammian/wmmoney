import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    return this.http.get(`${this.categoriasUrl}/listar`, { headers })
      .toPromise()
      .then(response => response.json());
  }

}
