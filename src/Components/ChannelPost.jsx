import React from 'react';
import { useParams } from 'react-router';

const ChannelPost = () => {
    const {channelName} = useParams();
  return (
    <div>
        You are in {channelName} room
    </div>
  )
}

export default ChannelPost