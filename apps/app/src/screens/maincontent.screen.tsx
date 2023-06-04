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
import React from 'react';
import { useMutation } from 'react-query';
import { updateQuizRecord } from '../query/user';
import { AuthContext } from '../components/AuthProvider';

export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  const { width } = useWindowDimensions();

  const { isLoading, data } = GetContentAndQuiz(params.course_id);

  const { isOpen, onOpen, onClose } = useDisclose();

  const { isAuth } = React.useContext(AuthContext);

  const handleOpenQuiz = () => {
    if (isAuth) {
      onOpen();
    } else {
      navigation.jumpTo('Account');
    }
  };

  const { mutate } = useMutation({
    mutationFn: async (submitData: {
      payload: { correct: number; incorrect: number };
      quiz_id: string;
    }) => {
      const data = await updateQuizRecord(
        submitData.payload,
        submitData.quiz_id
      );

      return data;
    },
  });
  return (
    <ScrollView p={3}>
      <Heading>{params.title}</Heading>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
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
                  <ViewerPage mutate={mutate} data={data.quiz} />
                </ScrollView>
              </Actionsheet.Content>
            </Actionsheet>
          )}
        </Box>
      )}
    </ScrollView>
  );
}
