import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import ChatRoom from "./ChatRoom";
import CloseIcon from "@mui/icons-material/Close";

const ChatRoomContainer = () => {
  const [{ chatRoom }, dispatch] = useStateValue();

  const showChatRoom = () => {
    dispatch({
      type: actionType.SET_CHAT_ROOM_SHOW,
      chatRoom: !chatRoom,
    });
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
      >
        <div className="w-full flex items-center justify-between p-4 cursor-pointer">
          <div className="flex-grow text-center">
            <p className="text-textColor text-2xl font-semibold">Chat Room</p>
          </div>
          <div onClick={showChatRoom} className="hover:bg-gray-300 rounded-full p-1">
            <CloseIcon className="flex items-end justify-end" />
          </div>
        </div>

        <ChatRoom />
      </motion.div>
    </div>
  );
};

export default ChatRoomContainer;
