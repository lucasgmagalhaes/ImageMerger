/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-spread */
import mergeImages from "merge-images";
import { fileList } from "./utils";
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { Folder } from "./types";
import { cache } from "./cache";

const folders = new Array<Folder>();

function init() {

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

  function _generate(folderIndex: number, folders: Folder[], ...gotFiles: string[]) {
    if (gotFiles.length == folders.length) {
      mergeImages(gotFiles).then(appendGeneratedImg);
      return;
    }

    for (let index = 0; index < folders[folderIndex].files?.length; index++) {
      _generate(folderIndex + 1, folders, ...gotFiles, folders[folderIndex].files[index]);
    }
  }

  const generated: string[] = [];

  function appendGeneratedImg(b64: string) {
    const div = getGeneratedFilesContainer();
    generated.push(b64);
    const img = createImg(b64);
    div.append(img);
  }

  function download() {
    const zip = new JSZip();
    generated.forEach((g, i) => {
      const baseFile = g.split(';base64,')[1];
      console.log(baseFile);
      zip.file(`generated${i}.png`, baseFile, { base64: true });
    });
    zip.generateAsync({ type: "blob" })
      .then(content => {
        console.log(content);
        saveAs(content, "generatedFiles.zip");
      });
  }

  const generatorButton = document.getElementById("generator") as HTMLButtonElement;
  const filePicker = document.getElementById("filepicker");
  const downloadButton = document.getElementById("downloader") as HTMLButtonElement;;

  generatorButton.addEventListener("click", () => {
    const _folders = cache.getFolders();
    _generate(0, _folders);
  });

  downloadButton.addEventListener("click", () => download());

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
    cache.setFolders(folders);
    addLoadedFiles(urls);
  }, false);
}

init();
