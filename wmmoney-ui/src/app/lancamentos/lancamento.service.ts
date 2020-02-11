import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response.json().content)
  }

}
