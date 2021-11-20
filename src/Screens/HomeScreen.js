import {useState,useEffect} from 'react';
import Loader from '../Components/Loader';
import  Form from "../Components/Form";

const HomeScreen=()=>{
    
    const [loading,setisLoading]=useState(true);
    const [counter,setCounter]=useState(1);
    const [max,setMax]=useState(1000);
    const [min,setMin]=useState(-1000);
  
    async function fetchData(){     
      let data;
      const response=await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json');
      if(response.ok){
       data=await response.json();
      }else{
        console.log("some error in getting response");
      }
  
      if(data==null){
        setCounter(1);
      }else{
        setCounter(data);
      }
      setisLoading(false);
      }
  
    async function putData(counterData){
        
       await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', {
        method: 'PUT',
        body:JSON.stringify(counterData)
      });
  
    }
  
    useEffect(()=>{
        fetchData();   
    },[])
  
    const handleDecrement=()=>{
       const num=counter-1;
       if(num<min){
        alert("Minimmum limit is only upto "+min.toString());
        return;
      }
       const counterData={nirupamaRanjan:num};
       putData(counterData);
       setCounter(num);
       
  
    }
    
    const handleIncrement=()=>{
       const num=counter+1;
       if(num>max){
         alert("Minimmum limit is only upto "+max.toString());
         return;
       }
       const counterData={nirupamaRanjan:num};
       putData(counterData);
       setCounter(num);
      
    }
    const handleChange=(e)=>{
      if(e.target.value!=="")
           setCounter(parseInt(e.target.value));
       else setCounter(null);
    }
    
    return (
      
           <div className="App">
             <div>
             <Form setMax={setMax} setMin={setMin} setCounter={setCounter} max={max} min={min}/>
             </div>
             <div className="container">
                <div className={loading?"loader":"no-loader"}>
                  <div className="loader-icon" ><Loader/></div> 
                  <div>Saving counter value</div>
               </div> 
               <div className="buttonContainer">
               <button  className="buttonL" title="+" onClick={handleDecrement}>
                    -
               </button>
               {/* <div className="counter">{counter}</div> */}
               <div  className="counter"> 
               <input type="number"  className="input" value={counter} onChange={handleChange}/>
               </div>
               <button title="+" className="buttonR" onClick={handleIncrement}>
                       +
               </button>
               </div>
               <div className="value" >Counter Value:{counter}</div>
             </div>
           </div>
     
    );
}

export default HomeScreen