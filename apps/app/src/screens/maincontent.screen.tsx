import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Heading,
  Image,
  ScrollView,
  Spinner,
  useDisclose,
  Center,
  VStack,
  Text,
  View,
} from 'native-base';
import { useWindowDimensions, Modal, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { GetContentAndQuiz } from '../query/quiz';
import { Actionsheet } from 'native-base';
import React, { useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { NewViewerPage } from '../components/quiz/NewQuizViewer';
export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  const { width } = useWindowDimensions();

  const { isLoading, data } = GetContentAndQuiz(params.course_id);

  const [showOtherModal, setShowOtherModal] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const { isAuth } = React.useContext(AuthContext);


  const handleOpenQuiz = () => {
    if (isAuth) {
      onOpen();
    } else {
      navigation.jumpTo('Account');
    }
  };


  const handleOtherModal = async () => {
    setShowOtherModal(true);
  }

  const returntoContent = () => {
    setShowOtherModal(false);
  }


  return (
      <ScrollView p={3} bg={'white'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            <HStack>
              <AspectRatio mt={3} ml={2} w="45%" ratio={9 / 16}>
                <Image borderRadius={15}
                  source={{
                    uri: params.image,
                  }}
                  alt="image"
                />
              </AspectRatio>
              <VStack w={'50%'}>
                <Heading mt={5} ml={3} fontSize={'xl'} color={'#5d6065'}>
                  {params.title}
                </Heading>
                <Heading mt={3} ml={3} fontSize={'sm'} color={'#8d9096'}>
                  {params.description ? params.description : 'No description'}
                </Heading>
                <Button ml={3} mt={8} bg={'#5d6065'}
                  onPress={handleOtherModal}
                >
                  Other Materials
                </Button>

                <Button bg={'#5d6065'} ml={3}
                  disabled={data.quiz === null}
                  onPress={handleOpenQuiz}
                  mt={3}
                >
                  Play Quiz
                </Button>
                {data.quiz === null ? (<Heading mt={7} ml={3} fontSize={'sm'} color={'#8d9096'}>
                  No quiz available yet
                </Heading>) : null
                }
                <Heading mt={7} ml={3} fontSize={'sm'} color={'#8d9096'}>
                  Continue Reading
                </Heading>
              </VStack>
            </HStack>
            <Box mt={3}>
              <RenderHtml contentWidth={width} source={{ html: data.content }} />
            </Box>
            {data.quiz !== null && (
              <Actionsheet
                _backdrop={{ useRNModalOnAndroid: false, useRNModalOnIOS: false }}
                isOpen={isOpen}
                onClose={onClose}
              >
                <Actionsheet.Content>
                  <Text fontSize={'2xl'} mb={1}>Quiz on {params.title}</Text>
                  <View w={'100%'} h={'100%'} >
                    <NewViewerPage data={data.quiz} />
                  </View>
                </Actionsheet.Content>
              </Actionsheet>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showOtherModal}
            >
              <View style={{
                flex: 1,
                backgroundColor: '#00000073',
              }}>

                <View style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  height: '100%',
                  borderRadius: 20,
                  padding: 10,
                }}>
                  <View flexDirection={'row'} justifyContent={'space-between'} pb={3} borderBottomWidth={1}>
                    <Text bold fontSize={'md'}>Other Questions</Text>
                    <TouchableOpacity onPress={returntoContent} style={{
                      width: 30,
                    }}>
                      <Text>X</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {data.qa!= null ? data.qa.questions.map((item: any, index: any) => {
                      return (
                        <View key={index} style={{ width: '100%' }}>
                          <Text fontSize={'xl'} bold mt={3} mb={0}>{index + 1}. {item.questionTitle}</Text>
                          <Text fontSize={'xl'} mb={0}>Answer: {item.answer}</Text>
                        </View>
                      )
                    }):
                      <Text>No other questions available right now</Text>
                      }
                    <View mt={5} margin={'auto'} left={0} right={0} width={'50%'}>
                      <TouchableOpacity
                        onPress={returntoContent}
                        style={{
                          position: 'relative',
                          backgroundColor: '#187e2e',
                          padding: 10,
                          width: '100%',
                          borderRadius: 10,
                          alignItems: 'center',
                          marginBottom: 30,
                        }}>
                        <Text color={'white'} fontSize={'2xl'} >Return</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </Box>
        )}
      </ScrollView>
  );
}
