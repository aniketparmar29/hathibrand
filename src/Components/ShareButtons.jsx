import React from "react";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaShare } from "react-icons/fa";

const ShareButtons = ({ url, title }) => {
  return (
    <>
    <div className="flex flex-row justify-center gap-2 items-center ">
    <h1 className="text-center text-3xl font-extrabold text-red-600">Share Now</h1>
    <FaShare size={30}/>
    </div>
    <div className="flex justify-evenly my-2 border-b-2 pb-10 border-black">
      <FacebookShareButton url={url}>
        <FaFacebook size={30} className="cursor-pointer text-xl text-blue-600 hover:text-blue-500" />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <FaTwitter size={30} className="cursor-pointer text-xl text-blue-600 hover:text-blue-500" />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <FaLinkedin size={30} className="cursor-pointer text-xl text-blue-600 hover:text-blue-500" />
      </LinkedinShareButton>
      <WhatsappShareButton url={url}>
        <FaWhatsapp size={30} className="cursor-pointer text-xl text-green-600 hover:text-blue-500" />
      </WhatsappShareButton>
    </div>
    </>
  );
};

export default ShareButtons;
