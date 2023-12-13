import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../api/client';

@Injectable({
    providedIn : 'root'
})
export class ClientService {
    private basePath = 'clients';

    constructor(private db : AngularFireDatabase) { }

    getClients() : Observable<Client[]> {
        return this.db.list<Client>(this.basePath).snapshotChanges().pipe(
            map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
        )
    };

    getClient(key : string) : Observable<Client> {
        return this.db.object<Client>(`${this.basePath}/${key}`).snapshotChanges().pipe(
            map(c => ({key : c.payload.key, ...c.payload.val()}))
        )
    };

    createClient(value: Client) : any { 
        return this.db.list<Client>(this.basePath).push(value); 
    };

    updateClient(key : string, val : any) : Promise<void> {
        return this.db.object<Client>(`${this.basePath}/${key}`).update(val);
    };

    deleteClient(key : string) : Promise<void> {
        return this.db.object<Client>(`${this.basePath}/${key}`).remove();
    };
}