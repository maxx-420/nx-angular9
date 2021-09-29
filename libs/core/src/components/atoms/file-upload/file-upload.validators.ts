// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// file component validators

import { FormControl, ValidatorFn } from '@angular/forms';

export class FileValidator {
  private static fileValidation(
    validatorFn: (File) => null | object,
    type = null
  ): ValidatorFn {
    return (formControl: FormControl) => {
      if (!formControl.value) {
        return null;
      }

      const files: File[] = Array.from(formControl.value);

      return validatorFn(files);
    };
  }

  /**
   * fileMaxSize validator
   * @param maxSize maxSize
   */
  static fileMaxSize(maxSize: number): ValidatorFn {
    const validatorFn = (files: File[]) => {
      const maxSizeInBytes = maxSize;
      let totalSize = 0;
      for (const file of files) {
        totalSize = totalSize + file.size;
      }
      if (totalSize > maxSizeInBytes) {
        return {
          fileMaxSize: { requiredSize: maxSize, actualSize: totalSize },
        };
      }
      return null;
    };
    return FileValidator.fileValidation(validatorFn, 'size');
  }

  /**
   * extensions must not contain dot
   */
  static fileDuplicate(exitingFiles: Array<any>): ValidatorFn {
    const validatorFn = (files: File[]) => {
      if (exitingFiles.length === 0) {
        return null;
      }
      const invalidFiles = [];
      for (const file of files) {
        if (exitingFiles.indexOf(file.name) > -1) {
          invalidFiles.push(file.name);
        }
      }
      return invalidFiles.length ? { fileDuplicates: invalidFiles } : null;
    };
    return FileValidator.fileValidation(validatorFn);
  }

  /**
   * extensions must not contain dot
   */
  static fileExtensions(allowedExtensions: Array<string>): ValidatorFn {
    const validatorFn = (files: File[]) => {
      if (allowedExtensions.length === 0) {
        return null;
      }
      const invalidFiles = [];
      for (const file of files) {
        if (file instanceof File) {
          const ext = FileValidator.getExtension(file.name);
          if (allowedExtensions.indexOf('.' + ext) === -1) {
            invalidFiles.push(file.name);
          }
        }
      }
      return invalidFiles.length ? { fileExtension: invalidFiles } : null;
    };
    return FileValidator.fileValidation(validatorFn);
  }

  private static getExtension(filename: string): null | string {
    if (filename.indexOf('.') === -1) {
      return null;
    }
    return filename.split('.').pop();
  }
}
