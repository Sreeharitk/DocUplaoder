import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container } from "react-bootstrap";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";

function EditDocs({ database }) {
  let params = useParams();
  // console.log(params);

  const [docsDesc, setDocsDesc] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  const collectionRef = collection(database, "docsData");

  useEffect(() => {
    const updateDocsData = setTimeout(() => {
      const document = doc(collectionRef, params?.id);
      updateDoc(document, {
        docsDesc: docsDesc,
      })
        .then(() => {})
        .catch(() => {});
    }, 500);
    return () => clearTimeout(updateDocsData);
  }, [docsDesc, collectionRef, params]);

  const getData = () => {
    const document = doc(collectionRef, params?.id);
    onSnapshot(document, (docs) => {
      setDocumentTitle(docs.data()?.title)
      setDocsDesc(docs.data()?.docsDesc);
    });
  };

  const isMounted = useRef();

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  });

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-center my-4">{documentTitle}</h1>
      <Container>
        <ReactQuill value={docsDesc} onChange={getQuillData}/>
      </Container>
    </div>
  );
}

export default EditDocs;
