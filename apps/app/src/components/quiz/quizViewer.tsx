import { Box, Text, View } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';
import { updateQuizRecord } from '../../query/user';

export function NewViewerPage({ data }: { data: any }) {
  const allQuestions = data.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = (selectedOption: any) => {
    const correct_option = allQuestions[currentQuestionIndex]?.answerIndex;
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionDisabled(true);
    if (selectedOption === correct_option) {
      // Set Score
      setScore(score + 1);
    }
    //Show Next Button
    setShowNextButton(true);
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          position: 'relative',
        }}
      >
        {/*Questions Counter*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Text style={{ fontSize: 20, opacity: 0.6, marginRight: 2 }}>
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{ fontSize: 18, opacity: 0.6 }}>
            / {allQuestions.length}
          </Text>
        </View>

        {/*Questions */}
        <Text my={3} style={{ fontSize: 20, fontWeight: 'bold' }}>
          {allQuestions[currentQuestionIndex]?.questionTitle}
        </Text>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View>
        {allQuestions[currentQuestionIndex]?.answerOptions.map(
          (option: any, index: any) => (
            <TouchableOpacity
              onPress={() => validateAnswer(index)}
              disabled={isOptionDisabled}
              key={option.answer_id}
              style={{
                borderWidth: 3,
                backgroundColor:
                  index == correctOption
                    ? '#6dd61858'
                    : index == currentOptionSelected
                    ? '#b63b3b75'
                    : isOptionDisabled
                    ? '#5e5d5d50'
                    : '#99969647',
                borderColor:
                  index == correctOption
                    ? 'green'
                    : index == currentOptionSelected
                    ? 'red'
                    : isOptionDisabled
                    ? '#4b3d3d50'
                    : '#99969647',
                borderRadius: 20,
                minHeight: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
              }}
            >
              <Text fontSize={'lg'}>{option.label}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    );
  };

  const handleNext = async () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      //Last Question
      //Show Score Board
      setShowScoreModal(true);
      //Update Quiz Record
      const payload = {
        correct: score,
        incorrect: allQuestions.length - score,
      };

      const quizId = data.quiz_id;
      try {
        await updateQuizRecord(payload, quizId);
      } catch (error) {
        console.error(error);
      }
    } else {
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionDisabled(false);
      setShowNextButton(false);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: '#187e2e',
            padding: 20,
            borderRadius: 10,
            marginLeft: 40,
            marginRight: 40,
            marginTop: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
      );
    } else return null;
  };

  const returnHome = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionDisabled(false);
    setShowNextButton(false);
  };

  return (
    <Box>
      {/*Questions */}
      {renderQuestion()}

      {/*Options*/}
      {renderOptions()}

      {/*Next Button*/}
      {renderNextButton()}

      {/*Score Modal*/}
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000073',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: '90%',
              borderRadius: 20,
              padding: 40,
              paddingTop: 10,
              alignItems: 'center',
            }}
          >
            <Text bold style={{ fontSize: 30 }} pt={5}>
              {score > allQuestions.length / 2 ? 'Congratulations' : 'Oops!'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginVertical: 20,
              }}
            >
              <Text
                bold
                pt={5}
                style={{
                  fontSize: 30,
                  color: score > allQuestions.length / 2 ? 'green' : 'red',
                }}
              >
                {score}
              </Text>
              <Text
                bold
                pt={5}
                style={{
                  fontSize: 30,
                  color: 'black',
                }}
              >
                {' '}
                / {allQuestions.length}
              </Text>
            </View>
            <TouchableOpacity
              onPress={returnHome}
              style={{
                backgroundColor: '#187e2e',
                padding: 10,
                width: '60%',
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text color={'white'} fontSize={'2xl'}>
                Return
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Box>
  );
}
