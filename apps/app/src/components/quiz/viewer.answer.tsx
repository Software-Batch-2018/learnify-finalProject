import React from 'react';
import { IAnswerStatus } from './viewer.question';
import { Box, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
type Props = {
  answerStatus: IAnswerStatus;
  groupName: string;
  label: string;
  index: number;
  onClick?: () => void;
};

export function ViewerAnswer({
  answerStatus,
  groupName,
  label,
  index,
  onClick,
}: Props): React.ReactElement {
  const [bgIndex, setBgIndex] = React.useState<number | undefined>(undefined);
  const handleClick = (index: number) => {
    setBgIndex(index);
    if (onClick) {
      onClick();
    }
  };
  const variants: Record<IAnswerStatus, React.ReactElement> = {
    unanswered: (
      <TouchableOpacity onPress={() => handleClick(index)}>
        <Box
          m={1}
          borderColor={'gray.200'}
          borderRadius={2}
          rounded={'lg'}
          w={'80'}
          borderWidth={1}
          backgroundColor={bgIndex === index ? 'gray.300' : undefined}
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
        bg={'green.300'}
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
        bg={'red.300'}
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
        bg={'green.400'}
      >
        <Text textAlign={'center'} fontSize={'lg'}>
          {label}
        </Text>
      </Box>
    ),
    answered: (
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
  };

  return variants[answerStatus];
}
