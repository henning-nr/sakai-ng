import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pet } from '../api/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private basePath = 'products';

  constructor(private db: AngularFireDatabase) {}

  createPet(pet: Pet): Promise<any> {
    return this.db.list<Pet>(this.basePath).push(pet).key;
  }

  getPets(): Observable<Pet[]> {
    return this.db
      .list<Pet>(this.basePath)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getPetById(key: string): Observable<Pet> {
    return this.db.object<Pet>(`${this.basePath}/${key}`).valueChanges();
  }

  async updatePet(key: string, value: any): Promise<void> {
    try {
      await this.db.object<Pet>(`${this.basePath}/${key}`).update(value);
    } catch (error) {
      console.error('Erro ao atualizar o pet:', error);
      throw error; // lança o erro novamente para que o chamador possa lidar com ele
    }
  }

  async deletePet(key: string): Promise<void> {
    try {
      await this.db.object<Pet>(`${this.basePath}/${key}`).remove();
    } catch (error) {
      console.error('Erro ao excluir o pet:', error);
      throw error; // lança o erro novamente para que o chamador possa lidar com ele
    }
  }
}
