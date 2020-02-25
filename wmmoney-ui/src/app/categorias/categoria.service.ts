import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
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

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: CategoriaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.categoriasUrl}`, { search: params })
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
    return this.http.get(`${this.categoriasUrl}/listar`)
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(categoria: Categoria): Promise<Categoria> {
    return this.http.post(this.categoriasUrl, JSON.stringify(categoria))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(categoria: Categoria): Promise<Categoria> {
    return this.http.put(`${this.categoriasUrl}/${categoria.codigo}`,
        JSON.stringify(categoria))
      .toPromise()
      .then(response => response.json() as Categoria);
  }

  buscarPorCodigo(codigo: number): Promise<Categoria> {
    return this.http.get(`${this.categoriasUrl}/${codigo}`)
      .toPromise()
      .then(response => response.json() as Categoria);
  }

}
