import { VoluntaryModel } from 'src/app/shared/entities/voluntary.model';
import { serialize } from 'object-to-formdata';
import { Options } from 'selenium-webdriver';
import { MissionaryModel } from 'src/app/shared/entities/missionary.model';

export function toFormDataMissionary<T>(formValue: MissionaryModel):FormData{
  const formData = new FormData();

  if (formValue.imgFilePrincipal != null) {
    formData.append(
      'imgFilePrincipal',
      formValue.imgFilePrincipal[0],
      formValue.imgFilePrincipal.name
    );
  }

  const formulario = formValue;
  delete formulario._id;
  delete formulario.imgFilePrincipal;

  const options = {
    indices: false,
    nullsAsUndefineds: false,
    booleansAsIntegers: false,
    allowEmptyArrays: false,
  };

  const formData2 = serialize(formulario, options, formData);

  return formData2;

}

export function toFormDataVoluntary<T>(formValue: VoluntaryModel): FormData {
  const formData = new FormData();

  if (formValue.imgFilePrincipal != null) {
    formData.append(
      'imgFilePrincipal',
      formValue.imgFilePrincipal[0],
      formValue.imgFilePrincipal.name
    );
  }
  if (formValue.imgsCasaDescansoFile != null) {
    Object.keys(formValue.imgsCasaDescansoFile).forEach((element, index) => {
      formData.append(
        'imgsCasaDescansoFile',
        formValue.imgsCasaDescansoFile[index],
        formValue.imgsCasaDescansoFile.name
      );
    });

    
  }

  if (formValue.imgFileCasaDescansoPrincipal != null) {
    formData.append(
      'imgFileCasaDescansoPrincipal',
      formValue.imgFileCasaDescansoPrincipal[0],
      formValue.imgFileCasaDescansoPrincipal.name
    );
  }

  const formulario = formValue;
  delete formulario._id;
  delete formulario.imgFileCasaDescansoPrincipal;
  delete formulario.imgFilePrincipal;
  delete formulario.imgsCasaDescansoFile;

  const options = {
    indices: false,
    nullsAsUndefineds: false,
    booleansAsIntegers: false,
    allowEmptyArrays: false,
  };

  const formData2 = serialize(formulario, options, formData);

  return formData2;
}
