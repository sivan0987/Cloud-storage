import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataContext from './context/DataContex.jsx';
import { useContext } from "react";

const  Openfolder= ({setSelected}) => {
    const  {setPackages} =useContext(DataContext);
    function onsubmitpackage(e) {
        e.preventDefault();
        
        const packagename = e.target.packagename.value;
        console.log("Package name entered:", packagename);
  
        axios.post("http://localhost:3001/files/uploadPackage", { packagename })
            .then(response => {
                console.log('Package uploaded successfully:', response.data);
                setPackages (prev => [...prev, response.data] )
                setSelected(false)
            })
            .catch(error => {
                console.error('Error uploading package:', error);
                // document.getElementById('result').innerText = `Error uploading package: ${error.message}`;
            });
    }
    function hendeleCancel (){
        setSelected(false)
        
    }
    return ( <>
        <form  onSubmit={onsubmitpackage} >
             <label> 
                 <h5 >enter package name :</h5>
                <input type='string ' id="packageName" name="packagename"/>
             </label>
             <button>submit </button>
             <button onClick={hendeleCancel}> no </button>
        </form></> );
}
 
export default Openfolder;