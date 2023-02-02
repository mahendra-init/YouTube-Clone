import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CardMedia } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchAPI } from '../utils/fetchAPI';


const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data.items[0]));

    fetchAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  }, [id]);

  // console.log(channelDetail.brandingSettings.image.bannerExternalUrl)
  return (
    <Box minHeight="95vh">
      <Box>
        <CardMedia 
          image={channelDetail.brandingSettings.image.bannerExternalUrl}
          alt='bannerImage'
          sx={{ width: '100%', height: '373px', objectFit: 'contain' }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail