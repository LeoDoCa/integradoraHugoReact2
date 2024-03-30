import React, { useEffect, useState } from "react";
import { app } from "../../../config/utils/firebaseConnection";

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

  return (
    <>
  <div className="flex justify-center p-5">
    <div className="grid grid-cols-4 gap-4">
      {docus.map((doc, index) => (
        <div key={index} className="p-4">
          <div className="rounded-lg shadow-lg bg-gray-100 p-4">
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
          </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
}
