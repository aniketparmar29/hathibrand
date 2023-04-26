import React,{useEffect, useState} from 'react'
import Aos from "aos"
 import "aos/dist/aos.css"
const Address = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [village, setVillage] = useState('');
    const [Address, setAddress] = useState('');
    const [taluka, setTaluka] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [del, setdel] = useState(false);
    
    let user = window.localStorage.getItem("user");
    if (user) {
      try {
        user = JSON.parse(user);
      } catch (error) {
        console.error("Error parsing user from local storage", error);
        user = { role: "hello" };
      }
    } else {
      user = { role: "hello" };
    }
    let addressop = window.localStorage.getItem("addressop");
    if (addressop) {
      try {
        addressop = JSON.parse(addressop);
      } catch (error) {
        console.error("Error parsing user from local storage", error);
        addressop = { name:"op"};
      }
    } else {
      addressop = {name:"op"};
    }

    const addresss = {
        name,
        phone,
        village,
        Address,
        taluka,
        district,
        pincode,
        state,
      };      
  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem("addressop",JSON.stringify(addresss));
    setAddress("");
    setDistrict("");
    setName("");
    setPhone("");
    setPincode("");
    setState("");
    setTaluka("");
    setVillage("");
  }
      const removeadc = () =>{
        setdel(!del)
        window.localStorage.removeItem("addressop");
        setdel(!del)
      }
      useEffect(() => {
        Aos.init({ duration: 1000});
      }, [addressop,del]);
  return (
    <div data-aos="fade-up">
        {addressop.name==="op" && 
        <form className="p-3 " onSubmit={handleSubmit}>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="name">Name:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="phone">Phone:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" pattern="[0-9]{10}" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="phone">2ndPhone:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" pattern="[0-9]{10}" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="village">Village:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="village" value={village} onChange={(e) => setVillage(e.target.value)} placeholder="Enter your village" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="address">Address:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="taluka">Taluka:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="taluka" value={taluka} onChange={(e) => setTaluka(e.target.value)} placeholder="Enter your taluka" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="district">District:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Enter your district" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="pincode">Pincode:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter your pincode" required/>
</div>
<div>

      <label className="block text-gray-700 text-md font-bold mb-2">
        State:
      </label>
        <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state" required />
</div>
<button className="bg-[#440430] p-2 mt-5 text-white rounded-lg" type="submit">Add Address</button>

</form>
}
{
  addressop.name!=="op" && 
  <div data-aos="fade-up" className="shadow-lg shadow-amber-600 hover:shadow-amber-800 p-4 my-4 flex-col justify-center items-center">
  <h1 className='font-bold text-center'>Address</h1>
  <h1 className="text-lg mb-2">Name: {addressop.name}</h1>
  <h1 className="mr-2">Mobile: {addressop.phone}</h1> 
  <h1 className="mb-2">Village: {addressop.village}</h1>
  <h1 className="mb-2">Taluka: {addressop.taluka}</h1>
  <h1 className="mb-2">Address: {addressop.Address}</h1>
  <h1 className="mb-2">District: {addressop.district}</h1>
  <h1 className="mb-2">Pincode: {addressop.pincode}</h1>
  <h1>State: {addressop.state}</h1>
  <button className="bg-red-500 hover:bg-red-700 absolute top-2 left-[15rem] text-white font-bold py-1 px-2 ml-2 rounded" onClick={()=>removeadc()}>Delete</button>
</div>

}
    </div>
  )
}

export default Address