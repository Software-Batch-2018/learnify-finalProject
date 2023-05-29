import { Alert, Center, HStack, Text, VStack, Box } from 'native-base';

export function InfoBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Center mt={5}>
      <Alert maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                {title}
              </Text>
            </HStack>
          </HStack>
          <Box
            pl="6"
            _text={{
              color: 'coolGray.600',
            }}
          >
            {description}
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}
