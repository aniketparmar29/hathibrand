import React,{useState} from 'react'
import { useDispatch } from "react-redux";
import { Button } from '@chakra-ui/react';
import { createSlider } from '../Redux/AdminReducer/actions';
function CreateSliders({rerenderop,setrerenderop}) {
  const [btnop, setbtnop] = useState(false)
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const createProductSubmitHandler = () => {
    const product={
      url:image,
    }
    dispatch(createSlider(product));
    setrerenderop(!rerenderop)
  };
  async function handelimage(e){
    let api_key= "8b1f01edede5586a463d22be7a935729";
    setbtnop(true);
    try{
      const files = Array.from(e.target.files);
      let form = new FormData();
      files.forEach(file => form.append('image', file));   
      let res = await fetch(`https://api.imgbb.com/1/upload?key=${api_key}`,{
        method:'POST',
        body: form,
      });
      let data = await res.json();
      setImage(data.data.url);
      setbtnop(false);
    } catch(e){
      console.log(e);
    }
  }
  return (
    <div>
       <div id="createProductFormFile" className="flex-col justify-center items-center lg:w-[30%] w-[90%] md:w-[50%] m-auto space-x-2 shadow-lg shadow-amber-500 p-5 mt-10">
        <h1 className='text-center text-lg font-bold '>ADD SLiders</h1>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handelimage}
              className="border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 my-2  focus:border-blue-500"
            />
            
          <Button
            id="createProductBtn"
            onClick={createProductSubmitHandler}
            isDisabled={btnop ? true : false}
            className="p-4 rounded-md text-center self-center my-2 w-auto"
          >
            Create
          </Button>
          </div>
    </div>
  )
}
export default CreateSliders