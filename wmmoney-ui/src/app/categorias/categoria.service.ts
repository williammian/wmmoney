import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Categoria } from './../core/model';

export class CategoriaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: Http) { }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.categoriasUrl}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const categorias = responseJson.content;

        const resultado = {
          categorias,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    return this.http.get(`${this.categoriasUrl}/listar`, { headers })
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    return this.http.delete(`${this.categoriasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.categoriasUrl, JSON.stringify(categoria), { headers })
      .toPromise()
      .then(response => response.json());
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.categoriasUrl}/${categoria.codigo}`,
        JSON.stringify(categoria), { headers })
      .toPromise()
      .then(response => response.json() as Categoria);
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5Ad21tb25leS5jb206YWRtaW4=');

    return this.http.get(`${this.categoriasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => response.json() as Categoria);
  }

}
