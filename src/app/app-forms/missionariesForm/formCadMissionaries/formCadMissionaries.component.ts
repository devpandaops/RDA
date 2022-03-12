import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MissionariesService } from 'src/app/services/missionaries.service';
import { MissionaryModel } from 'src/app/shared/entities/missionary.model';
import {
  alertAnimation,
  AlertService,
} from 'src/app/shared/services/alert.service';
import { FormValidationControl } from '../../services/form-validation-control.service';
import { Validating } from '../../util/validacoes';

@Component({
  selector: 'app-formCadMissionaries',
  templateUrl: './formCadMissionaries.component.html',
  styleUrls: ['./formCadMissionaries.component.css', './../../app-forms.css'],
  providers: [MissionariesService],
  animations: [alertAnimation],
})
export class FormCadMissionariesComponent implements OnInit {
  alertState: string = 'hide';
  public Missionary: MissionaryModel;
  formulario: FormGroup;
  dadoCarregado: boolean = true;
  style: any;
  imgFilePrincipalHaveFile: boolean;

  constructor(
    private missionariesService: MissionariesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private formValidationControl: FormValidationControl
  ) {}

  public toggle(view?: string): void {
    this.alertState = this.alertService.toggle(view);
  }

  ngOnInit() {
    this.Missionary = this.route.snapshot.data.missinary;


    this.formulario = this.formBuilder.group(
      {
        _id: this.Missionary._id,
        typeUser: 'MISSIONARY',
        nome: [
          this.Missionary.nome,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        cpf: this.Missionary.cpf,
        dataNascimento: [this.Missionary.dataNascimento, [Validators.required]],
        endereco: this.formBuilder.group({
          rua: [this.Missionary.endereco.rua],
          numero: [this.Missionary.endereco.numero],
          bairro: [this.Missionary.endereco.bairro],
          cidade: [this.Missionary.endereco.cidade],
          complemento: [this.Missionary.endereco.complemento],
          uf: [this.Missionary.endereco.uf],
          CEP: [this.Missionary.endereco.CEP],
        }),

        telefone: [this.Missionary.telefone, [Validators.required]],
        igreja: this.Missionary.igreja,
        pastor: this.Missionary.pastor,
        email: [this.Missionary.email, [Validators.required, Validators.email]],
        regiao: this.Missionary.regiao,
        projeto: this.Missionary.projeto,
        vinculo: this.Missionary.vinculo,
        password: null,
        password2: null,
        dataCad: this.Missionary.dataCad,
        status: this.Missionary.status,
        sexo: this.Missionary.sexo,
        imgFilePrincipal: [null, [Validating.requiredFileTypeImg]],
      },
      {
        validator: [
          Validating.equalPasswords,
        ],
      } as AbstractControlOptions
    );
  }

  async onSubmit(): Promise<void> {
    // funcção executada no clicar do botão principal
    if (this.formulario.valid) {
      if (!this.Missionary._id) {
        this.salveMyssionaryCTRL();
      } else {
        this.UpdateMissionaryCTRL(this.formulario.value);
      }
    } else {
      this.activAlert('danger', 'Atenção, preencha os campos obrigatórios');
      console.log('formulario invalido');
      console.log('valid do formulario ::::', this.formulario.valid);

      this.formulario.markAllAsTouched();
      this.formulario.markAsPristine();
    }
  }
  public UpdateMissionaryCTRL(VoluntaryDataFormUpdated: MissionaryModel): void {
    this.dadoCarregado = false;
    let idMissionary = this.route.snapshot.params['id'];
    this.missionariesService
      .updateMissionariesID(VoluntaryDataFormUpdated, idMissionary)
      .subscribe({
        next: (missionary) => {
          this.dadoCarregado = true;
          this.activAlert(
            'success',
            `Os dados do ${this.formulario.value.nome} foram alterados com sucesso`
          );

          console.log(
            `Os dados do ${this.Missionary.nome} foram alterados com sucesso`
          );
        },
        error: (error) => {
          this.dadoCarregado = true;
          console.log('Console do Erro', JSON.stringify(error));
          console.log(error.StatusCode);
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
            `Os dados do ${this.Missionary.nome} não puderam ser alterados: => Relatório: ${error}`
          );
        },
      });
  }

  public salveMyssionaryCTRL(): void {
    this.dadoCarregado = false;
    if (this.formulario !== undefined) {
      this.settingRegistrationDate();
      this.addingStatusToMissionaries();
      this.missionariesService
        .saveMissionaries(this.formulario.value)
        .subscribe({
          next: (missionary) => {
            this.dadoCarregado = true;
            this.activAlert(
              'success',
              `os dados de ${this.formulario.value.nome} foram cadastrados com sucesso!`
            ),
              console.log(
                `Os dados do ${this.Missionary.nome} foram salvos com sucesso`
              );
            this.formulario.reset(); // reseta formulário
            this.resetImg();
          },
          error: (error) => {
            this.dadoCarregado = true;
            console.log('Console do Erro', JSON.stringify(error));
            console.log(error.StatusCode);
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
              `Os dados do ${this.Missionary.nome} não puderam ser alterados: => Relatório: ${error}`
            );
          },
        });
    }
  }

  settingRegistrationDate(): void {
    const data = new Date();
    const dataCad = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
    this.formulario.controls.dataCad.setValue(dataCad);
  }

  addingStatusToMissionaries(): void {
    const MissionaryActive = 'ATIVO';
    this.formulario.controls.status.setValue(MissionaryActive);
  }

  public activAlert(typeAlert: string, mensagem: string): void {
    (this.alertState = this.alertService.toggle('show')),
      this.alertService.content(mensagem),
      (this.style = this.alertService.style(typeAlert));

    setTimeout(() => {
      // fecha o alert após 15 segundos
      this.toggle('hide');
    }, 15000);
  }
  private resetImg(): void {
    this.imgFilePrincipal.reset();
    this.imgFilePrincipal.setValue(null);
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

  applyCss(campo: string): {} {
    return this.formValidationControl.showValidations(campo, this.formulario);
  }
  applyCssGroup(campo: string): {} {
    return this.formValidationControl.showValidationsGroup(
      campo,
      this.formulario
    );
  }

  onFileSelect(event, field: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files as File;

      this.formulario.get(field).setValue(file);
      this.imgFilePrincipalHaveFile =
        field === 'imgFilePrincipal' ? true : undefined;
    } else {
      this.imgFilePrincipalHaveFile =
        field === 'imgFilePrincipal' ? false : undefined;
    }
  }

  get _id(): AbstractControl {
    return this.formulario.get('_id');
  }
  get imgFilePrincipal(): AbstractControl {
    return this.formulario.get('imgFilePrincipal');
  }
  get nome(): AbstractControl {
    return this.formulario.get('nome');
  }
  get cpf(): AbstractControl {
    return this.formulario.get('cpf');
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
  get vinvulo(): AbstractControl {
    return this.formulario.get('vinculo');
  }
  get telefone(): AbstractControl {
    return this.formulario.get('telefone');
  }
  get projeto(): AbstractControl {
    return this.formulario.get('projeto');
  }
  get email(): AbstractControl {
    return this.formulario.get('email');
  }
  get regiao(): AbstractControl {
    return this.formulario.get('regiao');
  }
  get password(): AbstractControl {
    return this.formulario.get('password');
  }
  get password2(): AbstractControl {
    return this.formulario.get('password2');
  }
  
  get igreja(): AbstractControl {
     return this.formulario.get('igreja');
   }
   get pastor(): AbstractControl {
      return this.formulario.get('pastor');
    }
}
