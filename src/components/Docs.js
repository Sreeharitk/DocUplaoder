import React, { useEffect, useRef, useState } from "react";
import ModalComp from "./ModalComp";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';


function Docs({ database }) {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");

  const [docsData, setDocsData] = useState([]);

  const collectionRef = collection(database, "docsData");

  const addData = () => {
    if (title === "") {
      toast.error("give a title!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    addDoc(collectionRef, {
      title: title,
      docsDesc: "",
    })
      .then(() => {
        toast.success("Added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      })
      .catch(() => {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const getData = () => {
    onSnapshot(collectionRef, (data) => {
      setDocsData(
        data.docs.map((i) => {
          return { ...i.data(), id: i.id };
        })
      );
    });
  };

  const navigate = useNavigate();

  const getID = (id) => {
    navigate(`/edit/${id}`);
  };

  const isMounted = useRef();

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    getData();
  });

  const delID = (id)=>{
    const document = doc(database, "docsData", id)
    deleteDoc(document).then(()=>{
      toast.success("Doc deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(()=>{
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    getData()
  }

  return (
    <div>
      <h1 className="text-center my-4">Docs</h1>

      <ModalComp
        title={title}
        setTitle={setTitle}
        addData={addData}
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />

      <Container style={{ marginTop: "20px" }}>
        <Row>
          {docsData?.length > 0 &&
            docsData.map((i) => (
              <Col
                key={i.id}
                lg={4}
                md={2}
                className="my-3"
              >
                <div className="border shadow p-3 text-center">
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h4>{i.title}</h4>
                    <div style={{marginLeft:"20px"}}>
                      <EditIcon onClick={() => getID(i.id)} style={{cursor:"pointer"}}/>
                      <DeleteIcon onClick={()=> delID(i.id)} />
                    </div>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: i.docsDesc }} />
                </div>
              </Col>
            ))}
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Docs;
