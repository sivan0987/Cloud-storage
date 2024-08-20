import axios from "axios";
import DataContext from './context/DataContex.jsx';
import { useContext } from "react";

const uploadfile = () => {
  //TO-DO: i want here to cange that the upload file will be to the pac, the files is update good i need to giv ethe new url?
  const  {setFiles ,files} =useContext(DataContext);
 
  console.log("files",files);
  function sendFileToServer(e) {

    e.preventDefault();
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("file", e.target.files[0]);
    axios.post("http://localhost:3001/files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }) .then(response => {
      console.log('file uploaded successfully:', response.data);
      setFiles(prev => [...prev, response.data])
    
  })
  .catch(error => {
      console.error('file uploading package:', error);
  });
    
  }
  return (
    <>
      <form  style={{ display: "none" }}>
        <label>
          {/* <h5 className="enterfileName">upload file:</h5>Enter fileName: */}
          <input
            type="file"
            id="uploadFileButton"
            name="file"
            onChange={sendFileToServer}
          />
        </label>
        {/* <button>submit </button> */}
      </form>
    </>
  );
};

export default uploadfile;
