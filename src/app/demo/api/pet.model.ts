export interface Pet {
    id?: string;
    key?: string;
    nome?: string;
    especie?: string;
    idade?: number;
    datanascimento?: Date;
    peso?: number;
    cor?: string;
    sexo?: Sexo; // Utilizando a enumeração Sexo
}

// Enumeração para o campo sexo
export enum Sexo {
    Masculino = 'Masculino',
    Feminino = 'Feminino',
    Outro = 'Outro',
}