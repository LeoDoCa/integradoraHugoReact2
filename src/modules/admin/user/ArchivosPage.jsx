import React, { useEffect, useState } from "react";
import { app, firebaseStorage } from "../../../config/utils/firebaseConnection";
import { doc, deleteDoc } from "firebase/firestore";
import Imagen from "../../../assets/img/archivos.png";
import { MdOutlineDelete } from "react-icons/md";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Modal, Button } from "flowbite-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { autoCloseAlert, autoCloseAlert2 } from "../../../config/alerts/alert";
import { IoMdShare } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

export default function ArchivosPage() {
  const [docus, setDocus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sharedUrl, setSharedUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docusList = await app.firestore().collection("archivos").get();
        setDocus(docusList.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadAtUrl = (url) => {
    console.log(url);
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  const deleteArchivo = async (id, url) => {
    try {
      await deleteDoc(doc(app.firestore(), "archivos", id));
      const storageRef = ref(getStorage(app), url);
      await deleteObject(storageRef);
      setDocus(docus.filter((doc) => doc.id !== id));
      console.log("Archivo eliminado con éxito");
      autoCloseAlert2();
    } catch (error) {
      console.error("Error al eliminar el archivo:", error);
    }
  };

  const handleShareClick = (url) => { 
    setSharedUrl(url);
    setOpenModal(true);
  };

  return (
    <>
      <div className="flex justify-center p-5">
        <div className="grid grid-cols-4 gap-4">
          {docus.map((doc, index) => (
            <div key={index} className="p-4 gap-4 ">
              <div className="rounded-lg shadow-lg bg-gray-100 p-4 w-full h-full">
                <div className="font-bold text-xl mb-4 text-center">
                  {doc.nombre}
                </div>
                <div className="flex justify-center">
                  <img
                    src={doc.url}
                    alt={`Imagen ${index}`}
                    height="200px"
                    width="200px"
                    className="rounded-lg"
                    onError={(e) => {
                      e.target.src = Imagen;
                    }}
                  />
                </div>

                <div className="font-bold text-lg mb-3 text-center mt-4 ml-1">
                  <div className="flex-col gap-x-4">
                    <button
                      onClick={() => {
                        downloadAtUrl(doc.url);
                      }}
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-1 mt-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      <FiDownload className="w-full h-full"/>
                    </button>
                    <button
                      onClick={() => handleShareClick(doc.url)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      <IoMdShare className="w-full h-full"/>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      deleteArchivo(doc.id, doc.url);
                    }}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xl px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
                  >
                    <MdOutlineDelete className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Enlace de descarga</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              El enlace de descarga es: <a className="text-blue-500 underline" href={sharedUrl}>{sharedUrl}</a>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-center">
          <CopyToClipboard text={sharedUrl}>
            <Button onClick={()=>{autoCloseAlert()}} color="blue">Copiar enlace</Button>
          </CopyToClipboard>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
