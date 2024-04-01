import React, { useEffect, useState } from "react";
import { app } from "../../../config/utils/firebaseConnection";
import { doc } from "firebase/firestore";


export default function ArchivosPage() {
  const [docus, setDocus] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docusList = await app.firestore().collection("archivos").get();
        setDocus(docusList.docs.map((doc) => doc.data()));
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

  
  return (
    <>
      <div className="flex justify-center p-5">
        <div className="grid grid-cols-4 gap-4">
          {docus.map((doc, index) => (
            <div key={index} className="p-4 gap-4 ">
              <div className="rounded-lg shadow-lg bg-gray-100 p-4 w-full h-full ">
                <div className="font-bold text-xl mb-4 text-center">
                  {doc.nombre}
                </div>
                <img
                  src={doc.url}
                  alt={`Imagen ${index}`}
                  height="200px"
                  width="200px"
                  className="rounded-lg"
                />
                <div className="font-bold text-lg mb-3 text-center mt-4">
                  <button
                    onClick={() => {
                      downloadAtUrl(doc.url);
                    }}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-1 mt-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
