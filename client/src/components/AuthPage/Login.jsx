import { useState } from "react"

export default function Login(){
    const [formData , setFormData]= useState({
        email:"",
        password:""
    })

    const [message  , setMessage]= useState("");

    const handleChange= (e)=>{
        setFormData({
            ...formData , 
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const response= await fetch('/api/auth/login' , {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            });
            const data= await response.json();
            console.log("response from backend ",data);
            setMessage(data.message);
        }catch(err){
            console.log("Error",err);
        }
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <h3>Welcome Back</h3>

                <input type="text" 
                    placeholder="Enter Your email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange} 
                />
                <input type="password" 
                    placeholder="Enter your password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}/>
                <button type="submit">Submit</button>
                {message}
            </form>
        </>
    )
}