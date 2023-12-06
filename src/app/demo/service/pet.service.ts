import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../api/pet';

@Injectable({
    providedIn : 'root'
})
export class PetService {
    private basePath = 'products';

    constructor(private db : AngularFireDatabase) { }

    getPets() : Observable<Pet[]> {
        return this.db.list<Pet>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
        )
    };

    getPet(key : string) : Observable<Pet> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).snapshotChanges().pipe(
            map(c => ({key : c.payload.key, ...c.payload.val()}))
        )
    };

    createPet(value: Pet) : any { 
        return this.db.list<Pet>(this.basePath).push(value); 
    };

    updatePet(key : string, val : any) : Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).update(val);
    };

    deletePet(key : string) : Promise<void> {
        return this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    };
}