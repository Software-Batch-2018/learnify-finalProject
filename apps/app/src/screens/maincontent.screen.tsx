// import {
//   AspectRatio,
//   Box,
//   Button,
//   HStack,
//   Heading,
//   Image,
//   ScrollView,
//   Spinner,
//   useDisclose,
//   useToast,
// } from 'native-base';
// import { useWindowDimensions } from 'react-native';
// import RenderHtml from 'react-native-render-html';
// import { GetContentAndQuiz } from '../query/quiz';
// import { Actionsheet } from 'native-base';
// import { ViewerPage } from '../components/quiz/viewer';
// import React from 'react';
// import { useMutation } from 'react-query';
// import { updateQuizRecord } from '../query/user';
// import { AuthContext } from '../components/AuthProvider';
// import TabView from '../components/tabView';
// export function MainContentScreen({
//   route,
//   navigation,
// }: {
//   route: any;
//   navigation: any;
// }) {
//   const { params } = route;
//   const { width } = useWindowDimensions();

//   const { isLoading, data } = GetContentAndQuiz(params.course_id);

//   const { isOpen, onOpen, onClose } = useDisclose();

//   const {
//     isOpen: materialIsOpen,
//     onOpen: materialOnOpen,
//     onClose: materialOnClose,
//   } = useDisclose();

//   const { isAuth } = React.useContext(AuthContext);

//   React.useEffect(() => {
//     if (data) {
//       navigation.setOptions({
//         headerTitle: (props: any) => (
//           <Heading color={'white'}>{data.content_title}</Heading>
//         ),
//         headerStyle: {
//           backgroundColor: '#301E67',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       });
//     }
//   }, [data]);

//   const handleOpenQuiz = () => {
//     if (data.quiz === null) {
//       toast.show({ description: 'No Quiz Available for this course' });
//       return null;
//     }
//     if (isAuth) {
//       onOpen();
//     } else {
//       navigation.jumpTo('Account');
//     }
//   };

//   const { mutate } = useMutation({
//     mutationFn: async (submitData: {
//       payload: { correct: number; incorrect: number };
//       quiz_id: string;
//     }) => {
//       const data = await updateQuizRecord(
//         submitData.payload,
//         submitData.quiz_id
//       );

//       return data;
//     },
//   });
//   const toast = useToast();
//   return (
//     <ScrollView p={3}>
//       {isLoading ? (
//         <Spinner />
//       ) : (
//         <Box>
//           <AspectRatio mt={3} w="100%" ratio={16 / 9}>
//             <Image
//               source={{
//                 uri: params.image,
//               }}
//               alt="image"
//             />
//           </AspectRatio>
//           <HStack alignItems={'center'} justifyContent={'space-between'}>
//             <Button onPress={() => materialOnOpen()} mt={3}>
//               Other Materials
//             </Button>

//             <Button
//               // disabled={data.quiz === null}
//               onPress={handleOpenQuiz}
//               mt={3}
//             >
//               Play Quiz
//             </Button>
//           </HStack>
//           <Box mt={3}>
//             <RenderHtml contentWidth={width} source={{ html: data.content }} />
//           </Box>
//           {data.quiz !== null && (
//             <Actionsheet
//               _backdrop={{ useRNModalOnAndroid: false, useRNModalOnIOS: false }}
//               isOpen={isOpen}
//               onClose={onClose}
//             >
//               <Actionsheet.Content>
//                 <ScrollView w={'100%'}>
//                   <ViewerPage mutate={mutate} data={data.quiz} />
//                 </ScrollView>
//               </Actionsheet.Content>
//             </Actionsheet>
//           )}
//           {data.qa != null && (
//             <Actionsheet
//               h={'100%'}
//               _backdrop={{ useRNModalOnAndroid: true, useRNModalOnIOS: false }}
//               isOpen={materialIsOpen}
//               onClose={materialOnClose}
//             >
//               <Actionsheet.Content>
//                 <TabView
//                   course_id={data.content_id}
//                   question_answer={data.qa}
//                 />
//               </Actionsheet.Content>
//             </Actionsheet>
//           )}
//         </Box>
//       )}
//     </ScrollView>
//   );
// }

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
  useToast,
  Spacer,
} from 'native-base';
import { useWindowDimensions, Modal, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { GetContentAndQuiz } from '../query/quiz';
import { Actionsheet } from 'native-base';
import React, { useState } from 'react';
import { AuthContext } from '../components/AuthProvider';
import { NewViewerPage } from '../components/quiz/quizViewer';
import TabView from '../components/tabView';
export function MainContentScreen({ route, navigation }: any) {
  const { params } = route;
  const { width } = useWindowDimensions();
  const toast = useToast();

  const { isLoading, data } = GetContentAndQuiz(params.course_id);

  const { isOpen, onOpen, onClose } = useDisclose();

  const { isAuth } = React.useContext(AuthContext);

  const handleOpenQuiz = () => {
    if (data.quiz === null) {
      toast.show({ description: 'No Quiz Available for this course' });
      return null;
    }
    if (isAuth) {
      onOpen();
    } else {
      navigation.jumpTo('Account');
    }
  };

  const {
    isOpen: materialIsOpen,
    onOpen: materialOnOpen,
    onClose: materialOnClose,
  } = useDisclose();

  return (
    <ScrollView p={3} bg={'white'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <HStack>
            <AspectRatio mt={3} ml={2} w="45%" ratio={9 / 16}>
              <Image
                borderRadius={15}
                source={{
                  uri: params.image,
                }}
                alt="image"
              />
            </AspectRatio>
            <VStack w={'50%'}>
              <Heading mt={5} ml={3} fontSize={'2xl'} color={'black'}>
                {params.title}
              </Heading>
              <Spacer />
              <Box>
                <Button
                  ml={3}
                  mt={8}
                  bg={'#5d6065'}
                  onPress={() => {
                    if (data.qa === null) {
                      toast.show({
                        description:
                          'Sorry, No Material Available for this course',
                      });
                      return null;
                    }
                    materialOnOpen();
                  }}
                >
                  Other Materials
                </Button>

                <Button bg={'#5d6065'} ml={3} onPress={handleOpenQuiz} mt={3}>
                  Play Quiz
                </Button>
              </Box>
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
                <ScrollView height={'100%'}>
                  <View w={'100%'}>
                    <NewViewerPage data={data.quiz} />
                  </View>
                </ScrollView>
              </Actionsheet.Content>
            </Actionsheet>
          )}
          {data.qa != null && (
            <Actionsheet
              h={'100%'}
              _backdrop={{ useRNModalOnAndroid: true, useRNModalOnIOS: false }}
              isOpen={materialIsOpen}
              onClose={materialOnClose}
            >
              <Actionsheet.Content>
                <TabView
                  course_id={data.content_id}
                  question_answer={data.qa}
                />
              </Actionsheet.Content>
            </Actionsheet>
          )}
        </Box>
      )}
    </ScrollView>
  );
}
