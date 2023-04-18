import React,{useState} from 'react'

const Address = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [village, setVillage] = useState('');
    const [Address, setAddress] = useState('');
    const [taluka, setTaluka] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    
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
        addressop = { };
      }
    } else {
      addressop = {};
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
  return (
    <div>
        {

        }
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
    </div>
  )
}

export default Address