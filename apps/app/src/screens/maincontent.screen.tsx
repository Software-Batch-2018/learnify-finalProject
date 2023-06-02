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
} from 'native-base';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { GetContentAndQuiz } from '../query/quiz';
import { Actionsheet } from 'native-base';
import { ViewerPage } from '../components/quiz/viewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  const { width } = useWindowDimensions();

  const { isLoading, data } = GetContentAndQuiz(params.course_id);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [token, setToken] = React.useState<string | undefined>(undefined);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getData().then();
  }, []);

  const handleOpenQuiz = () => {
    if (!token) {
      navigation.navigate('Login');
    } else {
      onOpen();
    }
  };
  return (
    <Box p={3}>
      <Heading>{params.title}</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <ScrollView>
          <AspectRatio mt={3} w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: params.image,
              }}
              alt="image"
            />
          </AspectRatio>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Button mt={3}>Other Materials</Button>

            <Button
              disabled={data.quiz === null}
              onPress={handleOpenQuiz}
              mt={3}
            >
              Play Quiz
            </Button>
          </HStack>
          <Box mt={3}>
            <RenderHtml contentWidth={width} source={{ html: data.content }} />
          </Box>
          {data.quiz !== null && (
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <ScrollView w={'100%'}>
                  <ViewerPage data={data.quiz} />
                </ScrollView>
              </Actionsheet.Content>
            </Actionsheet>
          )}
        </ScrollView>
      )}
    </Box>
  );
}
