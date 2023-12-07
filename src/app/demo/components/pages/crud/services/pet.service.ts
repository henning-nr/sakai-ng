
import { Injectable } from '@angular/core';
import { Pet } from '../model/pet.model';
import { lastValueFrom, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable(
    { providedIn: 'root' }
)
export class PetService {

    private dbPath = 'pets';

    constructor(private db: AngularFireDatabase) { }

    getAll() {
        return this.db.list<Pet>(this.dbPath).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
            )
        );
    }

    create(pet: Pet): any {
        return this.db.list<Pet>(this.dbPath).push(pet);
    }

    update(key: string, value: any): Promise<void> {
        return this.db.list<Pet>(this.dbPath).update(key, value);
    }

    delete(key: string): Promise<void> {
        return this.db.list<Pet>(this.dbPath).remove(key);
    }

}
