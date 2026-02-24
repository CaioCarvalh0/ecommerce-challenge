export interface Product {
  id: number;
  nome: string;
  descricao: string;
  precoReais: number;
  estoque: number;
  imagem?: string | null;
}