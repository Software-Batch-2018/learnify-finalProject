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
} from 'native-base';
import { GetAllForumQuestion } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React, { useContext } from 'react';
import { hasToken } from '../utils/auth.check';
import { AuthContext } from '../components/AuthProvider';

interface AskQuestionModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
}

const AskQuestionModal = ({
  modalVisible,
  setModalVisible,
  initialRef,
  finalRef,
}: AskQuestionModalProps) => {
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
            <Input ref={initialRef} />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <TextArea autoCompleteType={undefined} />
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
            <Button
              onPress={() => {
                console.log('hello');
              }}
            >
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default function ForumScreen({ navigation }: any) {
  const { isLoading, data } = GetAllForumQuestion();
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
  return (
    <ScrollView>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <View
            mt={2}
            pr={2}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <View style={{ flex: 1 }} />
            <View style={{ marginRight: 10 }}>
              <Button size={'xs'} onPress={handleAskQuestion}>
                Ask Question
              </Button>
            </View>
          </View>
          {data.items.map((q: any) => (
            <Pressable
              key={q.id}
              onPress={() =>
                navigation.navigate('ForumReply', {
                  forum_id: q.id,
                })
              }
              m={4}
            >
              <VStack space={4} bg={'blue.100'} rounded={'md'} p={5}>
                <VStack space={2}>
                  <Heading>{q.question}</Heading>
                  <HStack>
                    <Text>By {q.asked_by.name}</Text>
                    <Spacer />
                    <Text>{getTimeAgo(q.created_at)}</Text>
                  </HStack>
                </VStack>
                <Divider />
                <Text>{q.description}</Text>

                <Text color={'gray.400'}>Read More</Text>
              </VStack>
            </Pressable>
          ))}
        </Box>
      )}
      <AskQuestionModal
        finalRef={finalRef}
        initialRef={initialRef}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
}
