import React from 'react';
import { IAnswerStatus } from './viewer.question';
import { Feather } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
type Props = {
  answerStatus: IAnswerStatus;
  groupName: string;
  label: string;

  onClick?: () => void;
};

const styles = StyleSheet.create({
  baseContainer: {
    height: 20,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  baseIcon: {
    width: 10,
    marginRight: 10,
  },
});

export function ViewerAnswer({
  answerStatus,
  groupName,
  label,
  onClick,
}: Props): React.ReactElement {
  const variants: Record<IAnswerStatus, React.ReactElement> = {
    unanswered: (
      <TouchableOpacity onPress={onClick}>
        <Box
          m={1}
          borderColor={'gray.200'}
          borderRadius={2}
          rounded={'lg'}
          borderWidth={1}
        >
          <Text textAlign={'center'} fontSize={'lg'}>
            {label}
          </Text>
        </Box>
      </TouchableOpacity>
    ),
    correct: (
      <Box
        m={1}
        borderColor={'gray.200'}
        borderRadius={2}
        rounded={'lg'}
        borderWidth={1}
      >
        <Text textAlign={'center'} fontSize={'lg'}>
          {label}
        </Text>
      </Box>
    ),
    incorrect: (
      <Box
        m={1}
        borderColor={'gray.200'}
        borderRadius={2}
        rounded={'lg'}
        borderWidth={1}
      >
        <Text textAlign={'center'} fontSize={'lg'}>
          {label}
        </Text>
      </Box>
    ),
    actual: (
      <Box
        m={1}
        borderColor={'gray.200'}
        borderRadius={2}
        rounded={'lg'}
        borderWidth={1}
      >
        <Text textAlign={'center'} fontSize={'lg'}>
          {label}
        </Text>
      </Box>
    ),
    answered: <Text color={'blue.400'}>{label}</Text>,
  };

  return variants[answerStatus];
}
