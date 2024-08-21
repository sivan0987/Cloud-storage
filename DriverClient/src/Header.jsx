import "./Header.css";
import { CiFileOn } from "react-icons/ci";
import { CiFolderOn } from "react-icons/ci";
import Uploadfile from "./Uploadfile";

import { IoChevronBackSharp } from "react-icons/io5";

const Header = ({setSelected ,setCurrentUrL ,currentUrL}) => {
  function handleBack() {
    const segments = currentUrL.split('/');
    if (segments.length > 2) {
      const newURL = segments.slice(0, segments.length - 1).join('/');
      setCurrentUrL(newURL);
    }
  }
  

  const links = [
    { title: "New package", icon: <CiFolderOn />, onClick: ""},
  ];

  return (
    <div className="header">
      <div className="leftbuttons">
      {links.map((link) => (
        <button className="link" key={link.icon} onClick={()=>setSelected(true)}>
          
          <h3>{link.title}</h3>
          {link.icon}
        </button>
      ))}

      <label className="uploadfile" htmlFor="uploadFileButton">
        <h3>Upload file</h3>
        <Uploadfile />
        <CiFileOn size="13px" />
      </label>
      </div>
      <button className="backbutton" onClick={handleBack}>

       <div className="backicon"><IoChevronBackSharp /></div>
        <h3>BACK</h3>
        </button>
        
    </div>
  );
};

export default Header;
