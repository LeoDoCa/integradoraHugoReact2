import React from "react";
//import { uploadFile } from "../../../config/utils/firebaseConnection";
import { useState } from "react";
import { app } from "../../../config/utils/firebaseConnection";

function FileUpload() {
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState("");

  const archivoHandler = async (e) => {
    const archivo = e.target.files[0];
    setFile(archivo);
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("Archivo subido correctamente", archivo.name);
    const enlace = await archivoPath.getDownloadURL();
    setArchivoUrl(enlace);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor, selecciona un archivo");
      return;
    }

    try {
      const nombreArchivo = e.target.nombre.value;
      if (!nombreArchivo) {
        setMessage("Por favor, nombra tu archivo");
        return;
      }
      const coleccionRef = app.firestore().collection("archivos");
      const docu = await coleccionRef
        .doc(nombreArchivo)
        .set({ nombre: nombreArchivo, url: archivoUrl });
      setMessage("Archivo subido exitosamente");
      setPicture(archivoUrl);
    } catch (error) {
      console.log(error);
      alert("Hubo un error al subir el archivo");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen gap-4 p-5">
        <br />
        <div className="rounded-lg shadow-lg bg-gray-100 p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="file" onChange={archivoHandler} accept=".m4a,.mp3,.mp4,.pdf,.doc,.docx,.xls,.xlsx,image/*,.ppt,.pptx,.jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg"/>
            <input type="text" name="nombre" placeholder="Nombra tu archivo:" />
            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Subir</button>
          </form>
        </div>
        <br />
        {message}
        <br />
        {picture && <img width="320" src={picture} alt="Uploaded" />}
      </div>
    </>
  );
}

export default FileUpload;
