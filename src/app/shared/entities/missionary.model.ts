export interface MissionaryModel {
  _id: string; //
  nome: string;//
  cpf: string;//
  dataNascimento: string;//
  endereco: {//
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
    CEP: string;
  };
  telefone:string;//
  igreja:string;
  pastor:string;
  email: string;//
  regiao: string;//
  projeto: string;//
  vinculo: string;//
  typeUser: string;
  password: string;
  dataCad: string;
  status: string;
  sexo: string;//
  imgFilePrincipal:File;
  urlsImage: {
    urlImgPrincipal: string;
  };
}