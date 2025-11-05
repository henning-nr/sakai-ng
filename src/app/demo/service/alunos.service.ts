import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from '../api/alunos';

@Injectable()
export class AlunosService {

    constructor(private http: HttpClient) {
    }
    baseUrl = 'https://ancient-troll-v9499vw6vvj2rxq-3000.app.github.dev/';


    // GET DA API
    getAlunos() {
        return this.http.get<any>(this.baseUrl + 'alunos')
            .toPromise()
            .then(res => {
                return res as Aluno[]
            })
    }

    // POST DA API
    addAluno(aluno: Aluno) {
        return this.http.post<any>(this.baseUrl + 'alunos', aluno)
            .toPromise()
            .then(res => {
                console.log('aluno adicionado', res);
                return res as Aluno
            })
    }

     // DELETE DA API
    deleteAluno(id: any) {
        return this.http.delete<any>(this.baseUrl + 'alunos'+ '/' + id)
            .toPromise()
            .then(res => {
                return res as Aluno[]
            })
    }

    // PUT DA API
    updateAluno(aluno: Aluno) {
        return this.http.put<any>(this.baseUrl + 'alunos' + '/' + aluno.id, aluno)
            .toPromise()
            .then(res => {
                return res as Aluno
            })
    }

}
