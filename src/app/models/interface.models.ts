

export interface Sala {
    id?: string; //Também para compartilhamento
    codigo: string;
}

export interface Jogador {
    id?: string;
    nome: string;
    pontuacao: number;
    cor: string; //Tailwind
    sala: Sala;
}

export interface HistoricoPontuacao {
    id?: string;
    pontuacao: number;
    jogador: Jogador;
    'index'?: number;
}



