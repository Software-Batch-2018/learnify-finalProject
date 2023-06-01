import {
  AspectRatio,
  Box,
  Heading,
  Text,
  Image,
  ScrollView,
} from 'native-base';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  const { width } = useWindowDimensions();
  return (
    <Box p={3}>
      <Heading>{params.title}</Heading>
      <ScrollView>
        <AspectRatio mt={3} w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: params.image,
            }}
            alt="image"
          />
        </AspectRatio>
        <Box mt={3}>
          <RenderHtml contentWidth={width} source={{ html: params.content }} />
        </Box>
      </ScrollView>
    </Box>
  );
}
