export interface Parcela {
  numeroParcela: number;
  dataVencimento: string;
  valor: number;
}

export interface TituloResumo {
  numeroTitulo: string;
  nomeDevedor: string;
  quantidadeParcelas: number;
  valorOriginal: number;
  diasEmAtraso: number;
  valorAtualizado: number;
}
