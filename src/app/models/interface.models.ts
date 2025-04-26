

export interface Sala {
    id?: string; //Também para compartilhamento
    codigo: string;
}

export interface Jogador {
    id?: string;
    nome: string;
    pontuacao: number;
    cor: string; //Hexadecimal
    sala: Sala;
}

