import {
  useDisclose,
  Stagger,
  IconButton,
  Icon,
  HStack,
  View,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const StaggerComponent = ({
  setAiPress,
  setAskPress,
}: {
  setAiPress: any;
  setAskPress: () => void;
}) => {
  const { isOpen, onToggle } = useDisclose();
  return (
    <View>
      <Stagger
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        exit={{
          translateY: 34,
          scale: 0.5,
          opacity: 0,
          transition: {
            duration: 100,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        <IconButton
          mb="4"
          variant="solid"
          bg="indigo.500"
          colorScheme="indigo"
          borderRadius="full"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="robot"
              _dark={{
                color: 'warmGray.50',
              }}
              color="warmGray.50"
            />
          }
        />
        <IconButton
          onPress={setAskPress}
          mb="4"
          variant="solid"
          bg="green.400"
          colorScheme="green"
          borderRadius="full"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              _dark={{
                color: 'warmGray.50',
              }}
              size="6"
              name="account-group"
              color="warmGray.50"
            />
          }
        />
      </Stagger>
      <HStack alignItems="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="#301E67"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="pencil-box-outline"
              color="warmGray.50"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
    </View>
  );
};
