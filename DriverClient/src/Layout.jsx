import "./Layout.css";
import axios from "axios";
import Header from "./Header.jsx";

import { Route, Routes } from "react-router-dom";
import Openfolder from "./Openfolder.jsx";
import { useEffect, useState } from "react";
import DataContext from "./context/DataContex.jsx";
import { FcPackage } from "react-icons/fc";
import { FaFile } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

const Layout = () => {
  const [packages, setPackages] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentUrL, setCurrentUrL] = useState("root/public");
  const [selected, setSelected] = useState(false);
  const [deletepackage, setDeletepackage] = useState("");
  const [renamepackage, setRenamepackage] = useState("");
  console.log("files" ,files);

  function fetchContents(currentUrL) {
    axios
      .post("http://localhost:3001/files/showdetails", { currentUrL })
      .then((response) => {
        console.log(response.data);
        setFiles([]);
        setPackages([]);
        response.data.map((f) => {
          if (f["isDirectory"]) {
            setPackages((prev) => [...prev, f.name]);
          } else {
            setFiles((prev) => [...prev, f.name]);
          }
        });
      })
      .catch((error) => {
        console.error("open package :", error);
      });
  }
  useEffect(() => {
    fetchContents(currentUrL);
  }, [currentUrL]);

  useEffect(() => {
    fetchContents(currentUrL);
  }, [deletepackage]);

  function showpackage(pac) {
    const segments = currentUrL.split("/");
    const last = segments[segments.length - 1];
    if (last != pac) {
      setCurrentUrL((prev) => `${prev}/${pac}`);
    }
  }
  function handleRightClick(e, pac) {
    
    e.preventDefault();
    setDeletepackage(pac);
    setRenamepackage(pac)
  }

  function handleReaname(e,pac) {
    e.preventDefault()
    // console.log(pac);
    const packagename = e.target.inputField.value;

    const oldPath = `${currentUrL}/${pac}`;
    const newPath =  `${currentUrL}/${packagename}`;
  console.log("oldPath",oldPath);
  console.log("newPath",newPath);
    axios.post("http://localhost:3001/files/rename",{ oldPath, newPath })
      .then((response) => {
        console.log(response.data);
        setDeletepackage(""); 
        setRenamepackage(" ")
      })
      .catch((error) => {
        console.error("rename package :", error);
      });
  }
  function handleDelete(pac) {
    // console.log(pac);
    const url = `${currentUrL}/${pac}`;
    console.log("check", url);
    axios.delete("http://localhost:3001/files/delete", {
      data: { url }
    })
      .then((response) => {
        console.log(response.data);
        setDeletepackage(""); 
      })
      .catch((error) => {
        console.error("delete package :", error);
      });
  }
  function handeleCancele(){
    setRenamepackage("")
    setDeletepackage("")
  }
  return (
    <div>
      <DataContext.Provider value={{
          packages,
          setPackages,
          files,
          setFiles,
          currentUrL,
          setCurrentUrL,
        }}
      >
        <Header
          setSelected={setSelected}
          setCurrentUrL={setCurrentUrL}
          currentUrL={currentUrL}
        />
        {selected && <Openfolder setSelected={setSelected} />}
        <>
          <h4>packages: </h4>

          {packages.map((pac) =>
            deletepackage === pac || renamepackage === pac? (
              <div className="selected">
                <button
                  className="package"
                  onClick={() => showpackage(pac)}
                  onContextMenu={(e) => handleRightClick(e, pac)}
                >
                  <FcPackage />
                  {pac}
                 
                </button>
                <button className="deletebutton" onClick={() => handleDelete(pac)}>
                <div className="deleteicon"><RiDeleteBinLine /></div> 
                 </button>
                
                
                <form className="rename" onSubmit={ (e)=>handleReaname(e,pac) }>
                  <label for="inputField">rename:</label>
                  <input type="text" id="inputField" name="name"/ >
                  <button type="submit">OK</button>
                  <button onClick={handeleCancele}>CANCEL </button>
                </form>
              </div>
            ) : (
              <button
                className="package"
                onClick={() => showpackage(pac)}
                onContextMenu={(e) => handleRightClick(e, pac)}
              >
                <FcPackage />
                {pac}
              </button>
            )
          )}

          <h4>files: </h4>
          {files.map((file) => (
            <div className="file">
              <FaFile />
              {file}
            </div>
          ))}
        </>
      </DataContext.Provider>
    </div>
  );
};

export default Layout;
