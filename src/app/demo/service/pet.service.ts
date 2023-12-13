import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../api/pet.model';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    private basePath = "Pets"

    constructor(private db: AngularFireDatabase) { }

    createPet(pet: Pet): any{
        return this.db.list<Pet>(this.basePath).push(pet);
    }

    getPets(){
        return this.db.list<Pet>(this.basePath)
        .snapshotChanges().pipe(
            map(changes => 
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
        );
    }

    getPetId(key: string): Observable<Pet> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).valueChanges();
    }

    updatePet(key: string, value: any): Promise<void>{
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(value);
    }

    deletePet(key: string): Promise<void>{
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    }

}
