import React from "react";
import { uploadFile } from "../../../config/utils/firebaseConnection";
import { useState } from "react";

function FileUpload() {
  const [uploadValue, setUploadValue] = useState(0);
  const [message, setMessage] = useState("");
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState(null);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Por favor, selecciona un archivo");
      return;
    }

    try {
      const url = await uploadFile(file); // Espera a que la carga del archivo se complete
      setMessage("Archivo subido exitosamente");
      setPicture(url); // Actualiza la imagen con la URL devuelta por uploadFile
    } catch (error) {
      console.log(error);
      alert("Hubo un error al subir el archivo");
    }
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit} >
        <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
        <button type="submit">Subir</button>
      </form>
      <br />
      {message}
      <br />
      {picture && <img width="320" src={picture} alt="Uploaded" />}
    </div>
  );
}

export default FileUpload;
