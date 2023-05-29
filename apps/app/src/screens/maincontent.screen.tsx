import { AspectRatio, Box, Heading, Text, Image } from 'native-base';

export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  console.log(params);
  return (
    <Box p={3}>
      <Heading>{params.title}</Heading>
      <AspectRatio mt={3} w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: params.image,
          }}
          alt="image"
        />
      </AspectRatio>
      <Box mt={3}>
        <Text>{params.content}</Text>
      </Box>
    </Box>
  );
}
