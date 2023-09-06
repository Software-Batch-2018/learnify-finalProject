import { Box } from 'native-base';
import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

function extractYouTubeVideoId(url: string) {
  const regex = /(?:youtube\.com\/.*?[?&]v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

export default function MaterialPlayer({
  youtube_url,
}: {
  youtube_url: string;
}) {
  const id = extractYouTubeVideoId(youtube_url);

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Material has finished playing!');
    }
  }, []);

  return (
    <Box my={-2}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={id as string}
        onChangeState={onStateChange}
      />
    </Box>
  );
}
