import { useState } from "react";
import  "../Form.css";

const Form=(props)=>{
    const {setMax,setMin,setCounter}=props;
    var numbers = /^[-+]?[0-9]+$/;

    const[formCounter,setFormCounter]=useState("");
    const [formMax,setFormMax]=useState("");
    const [formMin,setFormMin]=useState("");

    
    const onSubmitHandler=(e)=>{
        e.preventDefault();
       
        if(formMax!=="") 
        setMax(parseInt(formMax)) 
        else {
            alert("Default Maximum value is 1000")
            setMax(1000)
        }

        if(formMin!=="") setMin(parseInt(formMin))
        else {
            alert("Default Minimum value is -1000")
            setMin(-1000)  
        }

        if(formCounter!=="") {
            if(parseInt(formCounter)>parseInt(formMax)){
                alert("Counter is greater than upper limit");
                setFormCounter("");
                return;
            }
            if(parseInt(formCounter)<parseInt(formMin)){
                alert("Counter is smaller than lower limit");
                setFormCounter("");
                return;
            }
            if(formCounter.match(numbers)) setCounter(parseInt(formCounter));
            else 
            {
                alert("Invalid Input");
            }
        }else{
            alert("Default counter value is 1");
            setCounter(1);
        }

        setFormCounter("");
        setFormMax("");
        setFormMin("");
    }

    return(
        <div className="FormCont">
            <form className="FormInput" onSubmit={onSubmitHandler}>
                <label className="Input">
                    Set Counter Value:
                    <input value={formCounter}  onChange={e=>setFormCounter(e.target.value)}/>
                </label>
                <label className="Input" >
                    Set Max Value:
                     <input value={formMax} onChange={e=>setFormMax(e.target.value)}/>
                </label>
                <label className="Input" >
                     Set Min Value:
                     <input value={formMin}  onChange={e=>setFormMin(e.target.value)}/>
                </label>
                <button className="button">Submit</button>
            </form>
        </div>
    )
}

export default Form;