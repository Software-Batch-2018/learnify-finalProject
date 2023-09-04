import {
  Box,
  Divider,
  HStack,
  Heading,
  Spacer,
  Spinner,
  Text,
  VStack,
  Pressable,
  View,
  Button,
  ScrollView,
  Modal,
  FormControl,
  Input,
  TextArea,
  Center,
  Icon
} from 'native-base';
import { GetAllForumQuestion, askQuestion } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React, { useContext, useRef, useState } from 'react';
import { hasToken } from '../utils/auth.check';
import { AuthContext } from '../components/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Animated, ImageBackground, TouchableHighlight } from 'react-native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { AntDesign } from '@expo/vector-icons';
import ReadMoreText from '@amuizz/read-more-text';
interface AskQuestionModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
  refetch: any;
}

const AskQuestionModal = ({
  modalVisible,
  setModalVisible,
  initialRef,
  finalRef,
  refetch,
}: AskQuestionModalProps) => {
  const { handleSubmit, control, reset } = useForm();

  const [error, setError] = React.useState({
    status: false,
    message: '',
  });
  const { mutate, isLoading: submitting } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await askQuestion(payload);
      if (data.error) {
        setError({
          status: true,
          message: data.message,
        });
      } else {
        setError({
          status: false,
          message: '',
        });
        refetch();
      }
      return data;
    },
  });
  const onSubmit = (formData: any) => {
    console.log(formData);
    mutate(formData);
    reset();
    setModalVisible(false);
  };
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      size={'full'}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Ask Question</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Question</FormControl.Label>
            <Controller
              defaultValue={''}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  ref={initialRef}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  type="text"
                  placeholder="Write a question...."
                />
              )}
              name="question"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <Controller
              defaultValue={''}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  ref={finalRef}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  type="text"
                  placeholder="Write a description...."
                  autoCompleteType={undefined}
                />
              )}
              name="description"
              rules={{ required: true }}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button isLoading={submitting} onPress={handleSubmit(onSubmit)}>
              Post
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default function ForumScreen({ navigation }: any) {
  const { isLoading, data, refetch } = GetAllForumQuestion();
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isAuth } = useContext(AuthContext);

  const handleAskQuestion = () => {
    console.log(isAuth, 'is user authenticated?');
    if (isAuth) {
      setModalVisible(true);
    } else {
      navigation.jumpTo('Account');
    }
  };

  const animation = useRef(new Animated.Value(0)).current;
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const toggleButton = () => {
    let toValue = 0;
    toValue = isButtonClicked ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsButtonClicked(!isButtonClicked);
  };
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg']
        })
      }
    ]
  }
  const style1 = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -65]
        })
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20]
        })
      }
    ]
  }
  const style2 = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10]
        })
      },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70]
        })
      }
    ]
  }

  return (
    <>
      <Center backgroundColor={'#5d6065'}>
        <Heading mt={7} pb={4} color={'white'} fontSize={'2xl'}>
          Forum
        </Heading>
      </Center>
      <ScrollView bg={'white'} h={'100%'}>
        <Box mb={20}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Box>
              {data.items.map((q: any) => (
                <Box
                  key={q.id}
                  ml={1}
                  mr={1}
                  p={3}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'gray.100',
                  }}
                  borderColor="gray.100"
                  bg={'white'}
                  mb={1}
                  shadow={1}
                >
                  <VStack>
                    <HStack justifyContent={'space-between'} mb={3}>
                      <VStack>
                        <Text bold fontSize={'lg'}>{q.asked_by.name}</Text>
                        <Box bg={'#2bd11c'} h={6} w={60} borderRadius={30} ><Text textAlign={'center'} bold color={'white'}>open</Text></Box>
                      </VStack>
                      <Text>{getTimeAgo(q.created_at)}</Text>
                    </HStack>
                    <Text bold fontSize={'xl'} mb={2}>{q.question}</Text>
                    <ReadMoreText numberOfLines={15} readMoreText={"read more"} readLessText={"read less"} readMoreStyle={{ color: "#CACACA" }} readLessStyle={{ color: "#CACACA" }} >
                      {q.description}
                    </ReadMoreText>
                    <HStack justifyContent={'space-between'} mt={5} mb={5}>
                      <TouchableOpacity>
                        <HStack>
                          <Text ml={3} mr={1} fontSize={'lg'}>15</Text>
                          <Icon
                            color={'black'}
                            size={30}
                            as={<AntDesign name="hearto" />}
                          />
                        </HStack>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ForumReply', {
                            forum_id: q.id,
                          })
                        }
                      >
                        <HStack>
                          <Icon
                            color={'black'}
                            size={30}
                            as={<AntDesign name="message1" />}
                          />
                          <Text ml={1} mr={3} fontSize={'lg'}>15</Text>
                        </HStack>
                      </TouchableOpacity>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </Box>
          )}
          <AskQuestionModal
            refetch={refetch}
            finalRef={finalRef}
            initialRef={initialRef}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Box>
      </ScrollView>
      <View style={{ flex: 1 }} >
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}>
          <Animated.View style={[{ backfaceVisibility: 'hidden' }, style2]}>
            <Button position={'absolute'} justifyContent={'center'} alignItems={'center'} alignSelf={'center'} bg={'#947df0'} h={55} w={55} borderRadius={50} onPress={handleAskQuestion}>
              <MaterialCommunityIcons size={30} color={'white'} name='layers-search-outline' />
            </Button>
          </Animated.View>
          <Animated.View style={[{ backfaceVisibility: 'hidden' }, style1]}>
            <Button position={'absolute'} justifyContent={'center'} alignItems={'center'} alignSelf={'center'} bg={'#947df0'} h={55} w={55} borderRadius={50} onPress={handleAskQuestion}>
              <MaterialCommunityIcons size={30} color={'white'} name='message-question-outline' />
            </Button>
          </Animated.View>
          <Animated.View style={[{ backfaceVisibility: 'hidden' }, rotation]}>
            <Button bg={'#5d6065'} h={65} w={65} borderRadius={50} onPress={toggleButton}>
              <MaterialCommunityIcons size={35} color={'white'} name='plus' />
            </Button>
          </Animated.View>
        </View>
      </View>
    </>
  );
}
