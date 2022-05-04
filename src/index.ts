/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-spread */
import mergeImages from "merge-images";
import { fileList } from "./utils";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

interface Folder {
  folderName: string
  files: string[];
}

const folders = new Array<Folder>();

function compare(a: Folder, b: Folder) {
  if (a.folderName < b.folderName) {
    return -1;
  }
  if (a.folderName > b.folderName) {
    return 1;
  }
  return 0;
}

function init() {

  const filePicker = document.getElementById("filepicker");
  filePicker?.addEventListener("change", function (event) {
    const files = (event.target as HTMLInputElement)?.files;

    if (!files) {
      return;
    }

    /**
     * First I get all folders
     * As path will be like "img/folder/img.png" and "img/folder2/img.png"
     * I only need the second element of the array.
     */
    let foldersName = fileList.map(files, (file => getFolderName(file)));

    foldersName = foldersName.filter(function (elem, pos) {
      return foldersName.indexOf(elem) == pos;
    });

    foldersName.sort().forEach(f => folders.push({
      folderName: f,
      files: []
    }))

    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const folderName = getFolderName(file);
      const folder = folders.find(f => f.folderName == folderName);

      if (!folder) {
        throw new Error("Folder not found for " + folderName);
      }

      const url = URL.createObjectURL(file);
      urls.push(url);
      folder.files.push(url);
    }

    console.log(folders);
    addLoadedFiles(urls);
  }, false);
}

function getFolderName(file: File) {
  return file.webkitRelativePath.split("/")[1];
}

function addLoadedFiles(urls: string[]) {
  const div = getLoadFilesContainer();
  div.append(...urls.map(u => createImg(u)));
}

function createImg(src: string) {
  const img = document.createElement("img");
  img.classList.add("loaded-img");
  img.src = src;
  return img;
}

function getLoadFilesContainer() {
  return document.querySelector(".loaded-img-container") as HTMLDivElement;
}

function getGeneratedFilesContainer() {
  return document.querySelector(".generated-img-container") as HTMLDivElement;
}

export function _generate(folderIndex: number, ...gotFiles: string[]) {
  if (gotFiles.length == folders.length) {
    mergeImages(gotFiles).then(appendGeneratedImg);
    return;
  }

  for (let index = 0; index < folders[folderIndex].files.length; index++) {
    _generate(folderIndex + 1, ...gotFiles, folders[folderIndex].files[index]);
  }
}

const generated: string[] = [];

function appendGeneratedImg(b64: string) {
  const div = getGeneratedFilesContainer();
  generated.push(b64);
  const img = createImg(b64);
  div.append(img);
}

function loadAsArrayBuffer(url: string, callback: (response: any, url: any) => void) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "arraybuffer";
  xhr.onerror = function () {console.log(xhr) };
  xhr.onload = function () {
    if (xhr.status === 200) { callback(xhr.response, url) }
    else {console.log(xhr) }
  };
  xhr.send();
}

function getFilename(url: string) {
  return url.substr(url.lastIndexOf("/") + 1)
}

function download() {
  const zip = new JSZip();
  generated.forEach((g, i) => {
    loadAsArrayBuffer(g, (buffer, url) => {
      const filename = getFilename(url);
      zip.file(filename, buffer);
    });
  });
  zip.generateAsync({ type: "blob" })
    .then(content => {
      saveAs(content, "generatedFiles.zip");
    });
}


const _window = window as any;

_window.generate = () => {
  _generate(0);
}

_window.download = download;

init();
