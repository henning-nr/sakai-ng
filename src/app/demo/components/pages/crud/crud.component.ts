import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '../../../api/client';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientService } from '../../../service/client.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit, OnDestroy {

    clientDialog: boolean = false;

    deleteClientDialog: boolean = false;

    deleteClientsDialog: boolean = false;

    clientSubscribe: Client;

    clients: Client[] = [];

    client: Client = {};

    selectedClients: Client[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    sexo: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private clientService: ClientService, private messageService: MessageService) { }

    ngOnInit() {

        this.clientService.getClients().subscribe(data => {
            this.clients = data;
        });
        // console.log(this.clientService.getPets())

        this.cols = [
            { field: 'nome', header: 'Nome' },
            { field: 'rua', header: 'Rua' },
            { field: 'bairro', header: 'Bairro' },
            { field: 'numero', header: 'Numero' },
            { field: 'cidade', header: 'Cidade' },
            { field: 'cep', header: 'CEP' },
            { field: 'estado', header: 'Estado' },
            { field: 'telefone', header: 'Telefone' },
            { field: 'cpf', header: 'CPF' },
            { field: 'sexos', header: 'Sexo' },
        ];

        this.sexo = [
            { label: 'MASCULINO', value: 'masculino' },
            { label: 'FEMININO', value: 'feminino' },
            { label: 'OUTRO', value: 'outro' },
        ];
    }

    openNew() {
        this.client = {};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        console.log(this.selectedClients)
        this.deleteClientsDialog = true;
    }

    editClient(client: Client) {
        this.client = { ...client };
        this.clientDialog = true;
    }

    deleteClient(client: Client) {
        this.deleteClientDialog = true;
        this.client = { ...client };
        console.log("Deletando " + this.client.key);
    }


    confirmDeleteSelected() {
        console.log("confirmDeleteSelected");
        this.deleteClientsDialog = false;
        this.clients = this.clients.filter(val => !this.selectedClients.includes(val));
        for(let i = 0; i < this.selectedClients.length; i++){
            const key = this.selectedClients[i].key;
            this.clientService.deleteClient(key);
        }
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Clients Deleted', life: 3000 });
        console.log(this.clients)
        this.selectedClients = [];
    }

    confirmDelete() {
        console.log("confirmDelete")
        this.clientService.deleteClient(this.client.key);
        this.deleteClientDialog = false;
        this.clients = this.clients.filter(val => val.key !== this.client.key);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.client = {};
        console.log(this.clients)
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    saveClient() {
        this.submitted = true;

        if (this.client.nome?.trim()) {
            if (this.client.id) {
                console.log("alterado")
                // @ts-ignore
                this.client.sexo = this.client.sexo.value ? this.client.sexo.value : this.client.sexo;
                this.clientService.updateClient(this.client.key, this.client);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
            } else {
                console.log("inserido")
                this.client.id = this.createId();
                this.clientService.createClient(this.client);   
                console.log("this.client", this.client);
                // @ts-ignore
                this.client.sexo = this.client.sexo ? this.client.sexo.value : 'OUTRO';
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
            }

            this.clients = [...this.clients];
            this.clientDialog = false;
            this.client = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.clients.length; i++) {
            if (this.clients[i].key === id) {
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
        this.clients = []
        this.selectedClients = []
    }
}
