import { useState } from "react"

export default function Signup(){
    const [formData , setFormData]=  useState({
        name:"",
        email:"",
        password:"",
    })

    const [message , setMessage]= useState("");

    const handleChange = (e)=>{
        setFormData({
            ...formData , 
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            if(!formData.email || !formData.password || !formData.name) return

            const response= await fetch('/api/auth/signup', {
                method:"POST",
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(formData)
            })
            const data= await response.json();
            console.log('Response from backend: ',data);
            setMessage(data.message);
        }catch(err){
            console.log("Error " ,err);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Sign up here</h3>
                <input type="text"
                    placeholder="Enter you name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                 />
                
                <input type="text" 
                    placeholder="Enter you email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input type="password" 
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
                {message}
            </form>
        </>
    )
}