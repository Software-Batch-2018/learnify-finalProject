import { Alert, Center, HStack, Text, VStack, Box } from 'native-base';

export function InfoBox({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <Alert mt={5} maxW="400" status="info" colorScheme="info">
      <Center>
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
      </Center>
      <Box>{children}</Box>
    </Alert>
  );
}
