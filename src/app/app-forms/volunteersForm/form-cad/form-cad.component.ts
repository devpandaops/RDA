import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
import { VolunteersService } from 'src/app/adminUsers/volunteers/services/volunteers.service';
import { VoluntaryModel } from '../../../shared/entities/voluntary.model';
import { FormValidationControl } from '../../services/form-validation-control.service';
import { Validating } from '../../util/validacoes';
import { alertAnimation } from './../../../shared/services/alert-animation';
import { AlertService } from './../../../shared/services/alert.service';


@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.component.html',
  styleUrls: ['./form-cad.component.css', './../../app-forms.css'],
  providers: [VolunteersService],
  animations: [alertAnimation],
})
export class FormCadComponent implements OnInit, OnChanges {

  // Variávei de controle 


  servicoOferecidoOutrosControl:boolean = false;

  alertState = 'hide';

  public Voluntary: VoluntaryModel;
  public formulario: FormGroup; // formulario em questão

  alertSuccess = true;
  alertDanger: boolean;
  alertMessage: string;
  alertActivated: any;
  alertStyle: any;
  style: any;
  brandRadiosValidator: boolean = undefined;
  brandRadiosValidatorLocalDescanso: boolean = undefined;
  inputPasswordValidity: any;

  isCasaDescanso: boolean;

  imgFilePrincipalHaveFile: boolean;
  imgFileCasaDescansoPrincipalHaveFile: boolean;
  imgsCasaDescansoFileHaveFile: boolean;
  dadoCarregado: boolean = true 

  constructor(
    private voluntaryService: VolunteersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formValidationControl: FormValidationControl,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {

  }

  
  public toggle(view?: string): void {
    this.alertState = this.alertService.toggle(view);
  }


  ngOnInit(): void {
    this.Voluntary = this.route.snapshot.data.voluntary; // recebe os dados capturados do guard e guarda na variável voluntary


    this.formulario = this.formBuilder.group(
      {
        _id: this.Voluntary._id,
        typeUser: 'VOLUNTARY',
        nome: [
          this.Voluntary.nome,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        CPF: [this.Voluntary.CPF],
        dataNascimento: [this.Voluntary.dataNascimento,/* [Validators.required]*/],
        sexo: [this.Voluntary.sexo, [Validators.required]],

        endereco: this.formBuilder.group({
          rua: [this.Voluntary.endereco.rua],
          numero: [this.Voluntary.endereco.numero],
          bairro: [this.Voluntary.endereco.bairro],
          cidade: [this.Voluntary.endereco.cidade],
          complemento: [this.Voluntary.endereco.complemento],
          uf: [this.Voluntary.endereco.uf],
          CEP: [this.Voluntary.endereco.CEP],
        }),

        profissao: [this.Voluntary.profissao, [Validators.required]],
        telefone: [this.Voluntary.telefone, [Validators.required]],
        telefoneFx: [this.Voluntary.telefoneFx],
        EstadoCivil: [this.Voluntary.estadoCivil],
        imgFilePrincipal: [null, [Validating.requiredFileTypeImg]],
        email: [this.Voluntary.email, [Validators.required, Validators.email]],
        password: [null],
        password2: [null],
        nomeIg: [this.Voluntary.nomeIg, /*[Validators.required]*/],
        pastor: [this.Voluntary.pastor, /*[Validators.required]*/],

        typeVoluntary: this.formBuilder.group({
          chekbox1Profissao: [this.Voluntary.typeVoluntary.chekbox1Profissao],
          chekbox2Intercessor: [
            this.Voluntary.typeVoluntary.chekbox2Intercessor,
          ],
          chekbox3Cuidador: [this.Voluntary.typeVoluntary.chekbox3Cuidador],
          chekbox4CasaDescanso: [
            this.Voluntary.typeVoluntary.chekbox4CasaDescanso,
          ],
        }),

        chekbox5Aconselhamento: [this.Voluntary.chekbox5Aconselhamento],
          aconselhamentoBiblico: this.formBuilder.group({
          seuMinistrioNaIgreja:[this.Voluntary.aconselhamentoBiblico.seuMinistrioNaIgreja],
          cursoAconselhamentoBiblico:[this.Voluntary.aconselhamentoBiblico.cursoAconselhamentoBiblico],
          ondeCursou:[this.Voluntary.aconselhamentoBiblico.ondeCursou ],
          anoDeConclusaoCurso:[this.Voluntary.aconselhamentoBiblico.anoDeConclusaoCurso],
          experienciaAconselhamentoBiblico:[this.Voluntary.aconselhamentoBiblico.experienciaAconselhamentoBiblico],
        }),
        voluntarioProfissao: this.formBuilder.group({
          especialidade: [this.Voluntary.voluntarioProfissao.especialidade],
          dicasEspecialidade: [this.Voluntary.voluntarioProfissao.dicasEspecialidade],
          servicoOferecido: [this.Voluntary.voluntarioProfissao.servicoOferecido],
          servicoOferecidoOutros: [this.Voluntary.voluntarioProfissao.servicoOferecidoOutros],
        }),
        voluntarioIntercessor: this.formBuilder.group({
          ministerioNaIgreja: [this.Voluntary.voluntarioIntercessor.ministerioNaIgreja],
          habilidadesWhatsapp: [this.Voluntary.voluntarioIntercessor.habilidadesWhatsapp],
        }),
        imgsCasaDescansoFile: [null, [Validating.requiredFileTypeImg]],
        // imgsCasaDescansoFile: [null,  this.isCasaDescanso? Validators.required, requiredFileTypeImg():''],
        imgFileCasaDescansoPrincipal: [null, [Validating.requiredFileTypeImg]],
        // imgFileCasaDescansoPrincipal: [null,  this.isCasaDescanso? [Validators.required, requiredFileTypeImg()]: ''],
        dataCad: [this.Voluntary.dataCad],
        status: [this.Voluntary.status],

        localDescanso: this.formBuilder.group({
          typeLocalDescanso: this.formBuilder.group({
            casaDePraia: [
              this.Voluntary.localDescanso.typeLocalDescanso.casaDePraia,
            ],
            casaDeCampo: [
              this.Voluntary.localDescanso.typeLocalDescanso.casaDeCampo,
            ],
            pousada: [this.Voluntary.localDescanso.typeLocalDescanso.pousada],
            hotel: [this.Voluntary.localDescanso.typeLocalDescanso.hotel],
            outros: [this.Voluntary.localDescanso.typeLocalDescanso.outros],
          }),

          nomeLocalDescanso: [this.Voluntary.localDescanso.nomeLocalDescanso],
          CNPJLocalDescanso: [this.Voluntary.localDescanso.CNPJLocalDescanso],
          enderecoLocalDescanso: this.formBuilder.group({
            ruaLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .ruaLocalDescanso,
            ],
            numeroLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .numeroLocalDescanso,
            ],
            complementoLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .complementoLocalDescanso,
            ],
            CEPLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .CEPLocalDescanso,
            ],
            bairroLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .bairroLocalDescanso,
            ],
            cidadeLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .cidadeLocalDescanso,
            ],
            ufLocalDescanso: [
              this.Voluntary.localDescanso.enderecoLocalDescanso
                .ufLocalDescanso,
            ],
          }),

          estaraDisponivel: this.formBuilder.group({
            duranteTodoAno: [this.Voluntary.localDescanso.estaraDisponivel.duranteTodoAno],
            exetoFinaisDeSemana: [this.Voluntary.localDescanso.estaraDisponivel.exetoFinaisDeSemana],
            exetoFeriadosProlongadosComemorativos: [this.Voluntary.localDescanso.estaraDisponivel.exetoFeriadosProlongadosComemorativos],
            baixaTemporada: [this.Voluntary.localDescanso.estaraDisponivel.baixaTemporada],
            outrasDisponibilidades: [this.Voluntary.localDescanso.estaraDisponivel.outrasDisponibilidades],
            outrasDisponibilidadesDescrito: [this.Voluntary.localDescanso.estaraDisponivel.outrasDisponibilidadesDescrito]
          }),
          maximoDiariaPg: [this.Voluntary.localDescanso.maximoDiariaPg], // tipo moeda
          maximoHospedesPorVez: [
            this.Voluntary.localDescanso.maximoHospedesPorVez,
          ], // number
          qtFamiliaMes: [this.Voluntary.localDescanso.qtFamiliaMes], // number
          custoHospedagem: [this.Voluntary.localDescanso.custoHospedagem], // switch
          valorHospedagem: [this.Voluntary.localDescanso.valorHospedagem], // if custoHospedagem
          alimentacao: [this.Voluntary.localDescanso.alimentacao], // switch

          valorRefeicoes: [this.Voluntary.localDescanso.valorRefeicoes], // if alimentacao
          qtQuartos: [this.Voluntary.localDescanso.qtQuartos], // number
          qtSuites: [this.Voluntary.localDescanso.qtSuites], // number
          qtCamasCasal: [this.Voluntary.localDescanso.qtCamasCasal], // number
          qtCamasSolteiro: [this.Voluntary.localDescanso.qtCamasSolteiro], // number
          camaDescrito: [this.Voluntary.localDescanso.camaDescrito], // number
          servicosDisponibilizados: this.formBuilder.group({

            quarto: this.formBuilder.group({
              roupaCama: [this.Voluntary.localDescanso.servicosDisponibilizados.quarto.roupaCama],
              travesseiros: [this.Voluntary.localDescanso.servicosDisponibilizados.quarto.travesseiros],
              outrosQuarto: [this.Voluntary.localDescanso.servicosDisponibilizados.quarto.outrosQuarto],
            }),
            cozinha: this.formBuilder.group({
              geladeira: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.geladeira],
              fogao: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.fogao],
              microOndas: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.microOndas],
              mesaJantar: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.mesaJantar],
              itensBasicos: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.itensBasicos],
              utensiliosBasicos: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.utensiliosBasicos],
              outrosCozinha: [this.Voluntary.localDescanso.servicosDisponibilizados.cozinha.outrosCozinha],
            }),
            banheiros: this.formBuilder.group({
              roupaBanho: [this.Voluntary.localDescanso.servicosDisponibilizados.banheiros.roupaBanho],
              itensBasicosHigiene: [this.Voluntary.localDescanso.servicosDisponibilizados.banheiros.itensBasicosHigiene],
              itensBasicosBeleza: [this.Voluntary.localDescanso.servicosDisponibilizados.banheiros.itensBasicosBeleza],
              outrosBanheiro: [this.Voluntary.localDescanso.servicosDisponibilizados.banheiros.outrosBanheiro],
            }),
            salaEstar: this.formBuilder.group({
              TV: [this.Voluntary.localDescanso.servicosDisponibilizados.salaEstar.TV],
              internet: [this.Voluntary.localDescanso.servicosDisponibilizados.salaEstar.internet],
              sofa: [this.Voluntary.localDescanso.servicosDisponibilizados.salaEstar.sofa],
              outrosSalaEstar: [this.Voluntary.localDescanso.servicosDisponibilizados.salaEstar.outrosSalaEstar],
            }),
            areaExterna: this.formBuilder.group({
              garagem: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.garagem],
              piscina: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.piscina],
              churasqueira: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.churasqueira],
              quadra: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.quadra],
              jogos: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.jogos],
              restaurantes: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.restaurantes],
              outrosareaExeterna: [this.Voluntary.localDescanso.servicosDisponibilizados.areaExterna.outrosareaExeterna],
            }),
            outrosServicosOferecidos: [this.Voluntary.localDescanso.servicosDisponibilizados.outrosServicosOferecidos],
            outrosServicosOferecidosDescrito: [this.Voluntary.localDescanso.servicosDisponibilizados.outrosServicosOferecidosDescrito]

          }),
        }),
      },
      {
        validator: [
          Validating.conditionallyRequired,
          Validating.equalPasswords,
        ],
      } as AbstractControlOptions
    );

     }


  async onSubmit(): Promise<void> {
    this.cleanValidationsIFLocalDescanso(); // limpa validações se local descanso false
    this.cleanValidationsIF_id(); // limpa validações se _id contido
    this.findAllErrors();
    // this.findAllValid();

    this.findErrors(this.formulario);
    this.findErrors(this.endereco);
    this.findErrors(this.typeVoluntary);
    this.findErrors(this.localDescanso);
    this.findErrors(this.typeLocalDescanso);
    this.findErrors(this.enderecoLocalDescanso);
    this.findErrors(this.servicosDisponibilizados);

    this.findValid(this.formulario);
    this.findValid(this.endereco);
    this.findValid(this.typeVoluntary);
    this.findValid(this.localDescanso);
    this.findValid(this.typeLocalDescanso);
    this.findValid(this.enderecoLocalDescanso);
    this.findValid(this.servicosDisponibilizados);

    // função executada no clicar do botão principal
    if (this.formulario.valid) {
      // só entra neste if se passar por todas as validações
      if (!this.Voluntary._id) {
        // só entra neste if se não tiver id, pq se tiver id se trata de uma atualização de cadastro
        this.salveVoluntaryCTRL(); // função que cria um novo voluntário nas bases de dados
      } else {
        this.UpdateVoluntaryCTRL(this.formulario.value); // função que atualiza os dados de uma base existente
      }
    } else {
      // se não passar pelas validações
      this.activAlert('danger', 'Atenção, preencha os campos obrigatórios');
      console.log('formulario invalido');
      console.log('valid do formulario ::::', this.formulario.valid);

      this.formulario.markAllAsTouched();
      this.formulario.markAsPristine();

    }
  }

  // atualiza os dados dos voluntarios

  public UpdateVoluntaryCTRL(VoluntaryDataFormUpdated: VoluntaryModel): void {
    this.dadoCarregado= false
    let idVoluntario = this.route.snapshot.params["id"];
    this.voluntaryService.updateVolunteerID(VoluntaryDataFormUpdated, idVoluntario).subscribe({
      next:(voluntary) => {
        this.dadoCarregado= true
        this.activAlert(
          'success',
          `Os dados do ${this.formulario.value.nome} foram alterados com sucesso`
        );

        console.log(
          `Os dados do ${this.Voluntary.nome} foram alterados com sucesso`
        );
      },
      error:(error) => {
        this.dadoCarregado= true
        console.log('Console do Erro',JSON.stringify(error));
        console.log(error.StatusCode)
        if (error.StatusCode == 413) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: ALGUMAS DAS IMAGENS ENVIADAS ESTÁ  EXCEDENDO O TAMANHO PERMITIDO, REVEJA `
          );
        }
        if (error.StatusCode === 400) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: VOCÊ ESTÁ ADICIONANDO QUANTIDADE DE IMAGENS MAIOR DO QUE APERMITIDA, REVEJA `
          );
        }

        console.error(
          `Os dados do ${this.Voluntary.nome} não puderam ser alterados: => Relatório: ${error}`
        );
      }}
    );
  }
  public salveVoluntaryCTRL(): void {
    this.dadoCarregado= false
    if (this.formulario !== undefined) {
      this.settingRegistrationDate();
      this.addingStatusToVolunteer();
      this.voluntaryService.saveVolunteer(this.formulario.value)
      .subscribe({
        next:(voluntary) => {
          this.dadoCarregado= true
          this.activAlert(
            'success',
            `os dados de ${this.formulario.value.nome} foram cadastrados com sucesso!`
          ),
            console.log(
              `Os dados do ${this.Voluntary.nome} foram salvos com sucesso`
            );
          this.formulario.reset(); // reseta formulário
          this.resetImg();
        },
        error: (error) => {   
        this.dadoCarregado= true
        console.log('Console do Erro',JSON.stringify(error));
        console.log(error.StatusCode)
        if (error.StatusCode == 413) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: ALGUMAS DAS IMAGENS ENVIADAS ESTÁ  EXCEDENDO O TAMANHO PERMITIDO, REVEJA `
          );
        }
        if (error.StatusCode === 400) {
          this.activAlert(
            'danger',
            `Os dados do ${this.formulario.value.nome} não puderam ser alterados :: VOCÊ ESTÁ ADICIONANDO QUANTIDADE DE IMAGENS MAIOR DO QUE APERMITIDA, REVEJA `
          );
        }

        console.error(
          `Os dados do ${this.Voluntary.nome} não puderam ser alterados: => Relatório: ${error}`
        );
      }}
      );
    }
  }

  // FUNÇÕES DE CONTROLES DE ALERTS

  public activAlert(typeAlert: string, mensagem: string): void {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      // fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }
  // FUNÇÃO DE ESTILIZAÇÃO DE ALERTS
  public typeStyle(): {} {
    const alertStyle = this.alertService.style('');
    return {
      success: alertStyle === 'success',
      warning: alertStyle === 'warning',
      information: alertStyle === 'information',
      danger: alertStyle === 'danger',
    };
  }

  // FUNÇÕES DE VALIDAÇÃO DE FORMULÁRIO

  // função compara se o valor inserido este neste input password2 é igual ao inserido no input password

  onFileSelect(event, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files as File;
   
      this.formulario.get(field).setValue(file);
      this.imgFilePrincipalHaveFile = field === 'imgFilePrincipal' ? true : undefined;
      this.imgFileCasaDescansoPrincipalHaveFile = field === 'imgFileCasaDescansoPrincipal' ? true : undefined;
      this.imgsCasaDescansoFileHaveFile = field === 'imgsCasaDescansoFile' ? true : undefined;
    } else {
      this.imgFilePrincipalHaveFile = field === 'imgFilePrincipal' ? false : undefined;
      this.imgFileCasaDescansoPrincipalHaveFile = field === 'imgFileCasaDescansoPrincipal' ? false : undefined;
      this.imgsCasaDescansoFileHaveFile = field === 'imgsCasaDescansoFile' ? false : undefined;
    }
  }

  settingRegistrationDate(): void {
    const data = new Date();
    const dataCad = `${data.getDate()}/${data.getMonth() + 1
      }/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }
  addingStatusToVolunteer(): void {
    const VoluntaryActive = 'ATIVO';
    this.formulario.controls.status.setValue(VoluntaryActive);
  }

  findErrors(formulario): void {
    Object.keys(formulario.controls).forEach((key) => {
      const controlErrors: ValidationErrors = formulario.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(`Key control: ${key}, keyError: ${keyError} ${controlErrors[keyError]}`);
        });
      }
      if (controlErrors instanceof FormGroup) {
        this.findValid(key);
      }

    });
  }
  findAllErrors(): void {
    this.findErrors(this.formulario);
    this.findErrors(this.endereco);
    this.findErrors(this.typeVoluntary);
    this.findErrors(this.localDescanso);
    this.findErrors(this.typeLocalDescanso);
    this.findErrors(this.enderecoLocalDescanso);
    this.findErrors(this.servicosDisponibilizados);
    if (this.imgsCasaDescansoFile.errors) {
      console.log(`Erro imgsCasaDescansoFile ERROR ::: ${this.imgsCasaDescansoFile.errors}`);

    }
  }
  findAllValid(): void {
    this.findValid(this.formulario);
    this.findValid(this.endereco);
    this.findValid(this.typeVoluntary);
    this.findValid(this.localDescanso);
    this.findValid(this.typeLocalDescanso);
    this.findValid(this.enderecoLocalDescanso);
    this.findValid(this.servicosDisponibilizados);

  }

  findValid(formulario: any): void {
    Object.keys(formulario.controls).forEach((key) => {
      const controlValid = formulario.get(key).valid;
      if (!controlValid) {
        console.log(`Key : ${key} keyValid: ${controlValid}`
        );
      }
      if (controlValid instanceof FormGroup) {
        this.findValid(key);
      }
    });
  }

  applyCss(campo: string): {} {
    return this.formValidationControl.showValidations(campo, this.formulario);
  }
  applyCssGroup(campo: string): {} {
    return this.formValidationControl.showValidationsGroup(campo, this.formulario);
  }

  resetImg(): void {
    this.imgFileCasaDescansoPrincipal.reset();
    this.imgFileCasaDescansoPrincipal.setValue(null);
    this.imgFilePrincipal.reset();
    this.imgFilePrincipal.setValue(null);
    this.imgsCasaDescansoFile.reset();
    this.imgsCasaDescansoFile.setValue(null);
  }
  cleanValidationsIFLocalDescanso(): void {
    if (!this.chekbox4CasaDescanso.value) {
      Validating.cleanRequired(this.imgsCasaDescansoFile);
      Validating.cleanRequired(this.imgFileCasaDescansoPrincipal);
      Validating.cleanRequired(this.enderecoLocalDescanso);
      Validating.cleanRequired(this.localDescanso);
      Validating.cleanRequired(this.estaraDisponivel);
    }
  }
  cleanValidationsIF_id(): void {
    if (this.Voluntary._id) {
      Validating.cleanRequired(this.localDescanso);
      Validating.cleanRequired(this.localDescanso);
      Validating.cleanRequired(this.servicosDisponibilizados);
      Validating.cleanRequired(this.imgsCasaDescansoFile);
      this.imgsCasaDescansoFile.setErrors(null);
      Validating.cleanRequired(this.imgFileCasaDescansoPrincipal);
    }
  }
  // quando o cliente clica para atualizar ou cadastrar um voluntário a aplicação chama o guard para

  // ______________________________________GET_________________________________________

  get _id(): AbstractControl {
    return this.formulario.get('_id');
  }
  get nome(): AbstractControl {
    return this.formulario.get('nome');
  }
  get dataNascimento(): AbstractControl {
    return this.formulario.get('dataNascimento');
  }
  get sexo(): AbstractControl {
    return this.formulario.get('sexo');
  }

  get endereco(): AbstractControl {
    return this.formulario.get('endereco');
  }

  get rua(): AbstractControl {
    return this.formulario.get(['endereco', 'rua']);
  }
  get numero(): AbstractControl {
    return this.formulario.get(['endereco', 'numero']);
  }
  get bairro(): AbstractControl {
    return this.formulario.get(['endereco', 'bairro']);
  }
  get cidade(): AbstractControl {
    return this.formulario.get(['endereco', 'cidade']);
  }
  get complemento(): AbstractControl {
    return this.formulario.get(['endereco', 'complemento']);
  }
  get uf(): AbstractControl {
    return this.formulario.get(['endereco', 'uf']);
  }
  get CEP(): AbstractControl {
    return this.formulario.get(['endereco', 'CEP']);
  }
  get profissao(): AbstractControl {
    return this.formulario.get('profissao');
  }
  get telefone(): AbstractControl {
    return this.formulario.get('telefone');
  }
  get telefoneFx(): AbstractControl {
    return this.formulario.get('telefoneFx');
  }
  get EstadoCivil(): AbstractControl {
    return this.formulario.get('EstadoCivil');
  }
  get imgFilePrincipal(): AbstractControl {
    return this.formulario.get('imgFilePrincipal');
  }
  get email(): AbstractControl {
    return this.formulario.get('email');
  }
  get password(): AbstractControl {
    return this.formulario.get('password');
  }
  get password2(): AbstractControl {
    return this.formulario.get('password2');
  }
  get nomeIg(): AbstractControl {
    return this.formulario.get('nomeIg');
  }
  get pastor(): AbstractControl {
    return this.formulario.get('pastor');
  }

  get typeVoluntary(): AbstractControl {
    return this.formulario.get('typeVoluntary');
  }
  get chekbox1Profissao(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox1Profissao']);
  }
  get chekbox2Intercessor(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox2Intercessor']);
  }
  get chekbox3Cuidador(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox3Cuidador']);
  }
  get chekbox4CasaDescanso(): AbstractControl {
    return this.formulario.get(['typeVoluntary', 'chekbox4CasaDescanso']);
  }
  get chekbox5Aconselhamento(): AbstractControl {
    return this.formulario.get('chekbox5Aconselhamento');
  }
  get aconselhamentoBiblico(): AbstractControl {
    return this.formulario.get('aconselhamentoBiblico');
  }
  get seuMinistrioNaIgreja(): AbstractControl {
    return this.formulario.get(['aconselhamentoBiblico', 'seuMinistrioNaIgreja']);
  }
  get cursoAconselhamentoBiblico(): AbstractControl {
    return this.formulario.get(['aconselhamentoBiblico', 'cursoAconselhamentoBiblico']);
  }
  get ondeCursou(): AbstractControl {
    return this.formulario.get(['aconselhamentoBiblico', 'ondeCursou']);
  }
  get anoDeConclusaoCurso(): AbstractControl {
    return this.formulario.get(['aconselhamentoBiblico', 'anoDeConclusaoCurso']);
  }
  get experienciaAconselhamentoBiblico(): AbstractControl {
    return this.formulario.get(['aconselhamentoBiblico', 'experienciaAconselhamentoBiblico']);
  }
  get voluntarioProfissao(): AbstractControl {
    return this.formulario.get('voluntarioProfissao');
  }
  get especialidade(): AbstractControl {
    return this.formulario.get(['voluntarioProfissao', 'especialidade']);
  }
  get dicasEspecialidade(): AbstractControl {
    return this.formulario.get(['voluntarioProfissao', 'dicasEspecialidade']);
  }
  get servicoOferecido(): AbstractControl {
    return this.formulario.get(['voluntarioProfissao', 'servicoOferecido']);
  }
  get voluntarioIntercessor(): AbstractControl {
    return this.formulario.get('voluntarioIntercessor');
  }
  get ministerioNaIgreja(): AbstractControl {
    return this.formulario.get(['voluntarioIntercessor', 'ministerioNaIgreja']);
  }
  get habilidadesWhatsapp(): AbstractControl {
    return this.formulario.get(['voluntarioIntercessor', 'habilidadesWhatsapp']);
  }
  get imgsCasaDescansoFile(): AbstractControl {
    return this.formulario.get('imgsCasaDescansoFile');
  }
  get imgFileCasaDescansoPrincipal(): AbstractControl {
    return this.formulario.get('imgFileCasaDescansoPrincipal');
  }
  get dataCad(): AbstractControl {
    return this.formulario.get('dataCad');
  }
  get status(): AbstractControl {
    return this.formulario.get('status');
  }
  get localDescanso(): AbstractControl {
    return this.formulario.get('localDescanso');
  }

  get typeLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'typeLocalDescanso']);
  }
  get casaDePraia(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'casaDePraia',
    ]);
  }
  get casaDeCampo(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'casaDeCampo',
    ]);
  }
  get pousada(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'pousada',
    ]);
  }
  get hotel(): AbstractControl {
    return this.formulario.get(['localDescanso', 'typeLocalDescanso', 'hotel']);
  }
  get outros(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'typeLocalDescanso',
      'outros',
    ]);
  }
  get nomeLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'nomeLocalDescanso']);
  }
  get CNPJLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'CNPJLocalDescanso']);
  }
  get enderecoLocalDescanso(): AbstractControl {
    return this.formulario.get(['localDescanso', 'enderecoLocalDescanso']);
  }

  get ruaLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'ruaLocalDescanso',
    ]);
  }
  get numeroLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'numeroLocalDescanso',
    ]);
  }
  get complementoLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'complementoLocalDescanso',
    ]);
  }
  get CEPLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'CEPLocalDescanso',
    ]);
  }
  get bairroLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'bairroLocalDescanso',
    ]);
  }
  get cidadeLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'cidadeLocalDescanso',
    ]);
  }
  get ufLocalDescanso(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'enderecoLocalDescanso',
      'ufLocalDescanso',
    ]);
  }
  get estaraDisponivel(): AbstractControl {
    return this.formulario.get(['localDescanso', 'estaraDisponivel']);
  }
  get duranteTodoAno(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'duranteTodoAno',
    ]);
  }
  get exetoFinaisDeSemana(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'exetoFinaisDeSemana',
    ]);
  }
  get exetoFeriadosProlongadosComemorativos(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'exetoFeriadosProlongadosComemorativos',
    ]);
  }
  get baixaTemporada(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'baixaTemporada',
    ]);
  }
  get outrasDisponibilidades(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'outrasDisponibilidades',
    ]);
  }
  get outrasDisponibilidadesDescrito(): AbstractControl {
    return this.formulario.get([
      'localDescanso',
      'estaraDisponivel',
      'outrasDisponibilidadesDescrito',
    ]);
  }


  get maximoDiariaPg(): AbstractControl {
    return this.formulario.get(['localDescanso', 'maximoDiariaPg']);
  }
  get maximoHospedesPorVez(): AbstractControl {
    return this.formulario.get(['localDescanso', 'maximoHospedesPorVez']);
  }
  get qtFamiliaMes(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtFamiliaMes']);
  }
  get custoHospedagem(): AbstractControl {
    return this.formulario.get(['localDescanso', 'custoHospedagem']);
  }
  get valorHospedagem(): AbstractControl {
    return this.formulario.get(['localDescanso', 'valorHospedagem']);
  }
  get alimentacao(): AbstractControl {
    return this.formulario.get(['localDescanso', 'alimentacao']);
  }

  get valorRefeicoes(): AbstractControl {
    return this.formulario.get(['localDescanso', 'valorRefeicoes']);
  }

  get qtQuartos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtQuartos']);
  }
  get qtSuites(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtSuites']);
  }
  get qtCamasCasal(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtCamasCasal']);
  }
  get qtCamasSolteiro(): AbstractControl {
    return this.formulario.get(['localDescanso', 'qtCamasSolteiro']);
  }
  get servicosDisponibilizados(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados']);
  }
  get quarto(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'quarto']);
  }
  get roupaCama(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'quarto', 'roupaCama']);
  }
  get travesseiros(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'quarto', 'travesseiros']);
  }
  get outrosQuarto(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'quarto', 'outrosQuarto']);
  }

  get cozinha(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha']);
  }
  get geladeira(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'geladeira']);
  }
  get fogao(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'fogao']);
  }
  get microOndas(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'microOndas']);
  }
  get mesaJantar(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'mesaJantar']);
  }
  get itensBasicos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'itensBasicos']);
  }
  get utensiliosBasicos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'utensiliosBasicos']);
  }
  get outrosCozinha(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'cozinha', 'outrosCozinha']);
  }

  get banheiros(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'banheiros']);
  }
  get roupaBanho(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'banheiros', 'roupaBanho']);
  }
  get itensBasicosHigiene(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'banheiros', 'itensBasicosHigiene']);
  }
  get itensBasicosBeleza(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'banheiros', 'itensBasicosBeleza']);
  }
  get outrosBanheiro(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'banheiros', 'outrosBanheiro']);
  }

  get salaEstar(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'salaEstar']);
  }
  get TV(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'salaEstar', 'TV']);
  }
  get internet(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'salaEstar', 'internet']);
  }
  get sofa(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'salaEstar', 'sofa']);
  }
  get outrosSalaEstar(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'salaEstar', 'outrosSalaEstar']);
  }

  get areaExterna(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna']);
  }
  get garagem(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'garagem']);
  }
  get piscina(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'piscina']);
  }
  get churasqueira(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'churasqueira']);
  }
  get quadra(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'quadra']);
  }
  get jogos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'jogos']);
  }
  get restaurantes(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'restaurantes']);
  }
  get outrosareaExeterna(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'areaExterna', 'outrosareaExeterna']);
  }

  get outrosServicosOferecidos(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'outrosServicosOferecidos']);
  }
  get outrosServicosOferecidosDescrito(): AbstractControl {
    return this.formulario.get(['localDescanso', 'servicosDisponibilizados', 'outrosServicosOferecidosDescrito']);
  }

}
