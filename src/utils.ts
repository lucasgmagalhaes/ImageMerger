/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-namespace */

export namespace fileList {
  export function filter(files: FileList, fn: (file: File) => boolean) {
    const filesToReturn = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (fn(file)) {
        filesToReturn.push(file);
      }
    }
    return filesToReturn;
  }

  export function map<U>(files: FileList, fn: (file: File) => U) {
    const filesToReturn: U[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      filesToReturn.push(fn(file));
    }
    return filesToReturn;
  }
}

