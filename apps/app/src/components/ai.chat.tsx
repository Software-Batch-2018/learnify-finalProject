import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { askAiQuestion, askQuestion } from '../query/forum';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  TextArea,
} from 'native-base';

interface AskQuestionModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  initialRef: React.MutableRefObject<null>;
  finalRef: React.MutableRefObject<null>;
}

export const AskAiQuestionModal = ({
  modalVisible,
  setModalVisible,
  initialRef,
  finalRef,
}: AskQuestionModalProps) => {
  const { handleSubmit, control } = useForm();

  const [error, setError] = React.useState({
    status: false,
    message: '',
  });

  const [response, setResponse] = React.useState('');
  const {
    mutate,
    isLoading: submitting,
    data,
  } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await askAiQuestion(payload);
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
      }
      return data;
    },
  });
  const onSubmit = (formData: any) => {
    mutate(formData);
    // reset();
  };

  React.useEffect(() => {
    if (data) {
      setResponse(data);
    }
  }, [data]);
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
        <Modal.Header>Ask Ai Question</Modal.Header>
        <Modal.Body>
          {response !== '' && (
            <Box p={3} bg={'blue.100'}>
              <Text>{response}</Text>
            </Box>
          )}

          <FormControl mt={3}>
            <HStack
              justifyContent={'space-between'}
              style={{ gap: 10 }}
              w={'full'}
              _dark={{
                borderColor: '#5d6065',
              }}
              borderColor="#5d6065"
              bg={'white'}
              shadow={3}
              p={1}
              borderRadius={5}
            >
              <Controller
                defaultValue={''}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    ref={finalRef}
                    onBlur={onBlur}
                    w={'65%'}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    type="text"
                    placeholder="Write a question...."
                  />
                )}
                name="question"
                rules={{ required: true }}
              />
              <Button
                w={'29%'}
                isLoading={submitting}
                onPress={handleSubmit(onSubmit)}
              >
                Ask
              </Button>
            </HStack>
          </FormControl>
        </Modal.Body>
        {/* <Modal.Footer>
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
              Ask
            </Button>
          </Button.Group>
        </Modal.Footer> */}
      </Modal.Content>
    </Modal>
  );
};
