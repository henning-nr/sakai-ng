import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pet } from '../../../../demo/api/pet';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PetService } from '../../../../demo/service/pet.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit, OnDestroy {

    petDialog: boolean = false;

    deletePetDialog: boolean = false;

    deletePetsDialog: boolean = false;

    petSubscribe: Pet;

    pets: Pet[] = [];

    pet: Pet = {};

    selectedPets: Pet[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: PetService, private messageService: MessageService) { }

    ngOnInit() {

        this.productService.getPets().subscribe(data => {
            this.pets = data;
        });
        // console.log(this.productService.getPets())

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.pet = {};
        this.submitted = false;
        this.petDialog = true;
    }

    deleteSelectedPets() {
        console.log(this.selectedPets)
        this.deletePetsDialog = true;
    }

    editPet(pet: Pet) {
        this.pet = { ...pet };
        this.petDialog = true;
    }

    deletePet(pet: Pet) {
        this.deletePetDialog = true;
        this.pet = { ...pet };
        console.log("Deletando " + this.pet.key);
    }


    confirmDeleteSelected() {
        console.log("confirmDeleteSelected")
        this.deletePetsDialog = false;
        this.pets = this.pets.filter(val => !this.selectedPets.includes(val));
        for(let i = 0; i++; i < this.selectedPets.length){
            const key = this.selectedPets[i].key;
            this.productService.deletePet(key);
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        console.log(this.pets)
        this.selectedPets = [];
    }

    confirmDelete() {
        console.log("confirmDelete")
        this.productService.deletePet(this.pet.key);
        this.deletePetDialog = false;
        this.pets = this.pets.filter(val => val.id !== this.pet.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.pet = {};
        console.log(this.pets)
    }

    hideDialog() {
        this.petDialog = false;
        this.submitted = false;
    }

    savePet() {
        this.submitted = true;

        if (this.pet.name?.trim()) {
            if (this.pet.id) {
                console.log("alterado")
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus.value ? this.pet.inventoryStatus.value : this.pet.inventoryStatus;
                // this.pets[this.findIndexById(this.pet.id)] = this.pet;
                this.productService.updatePet(this.pet.key, this.pet);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Updated', life: 3000 });
            } else {
                console.log("inserido")
                this.pet.id = this.createId();
                this.pet.code = this.createId();
                this.productService.createPet(this.pet);
                // @ts-ignore
                this.pet.inventoryStatus = this.pet.inventoryStatus ? this.pet.inventoryStatus.value : 'INSTOCK';
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Pet Created', life: 3000 });
            }

            this.pets = [...this.pets];
            this.petDialog = false;
            this.pet = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.pets.length; i++) {
            if (this.pets[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnDestroy(){
        this.pets = []
        this.selectedPets = []
    }
}
