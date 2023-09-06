import * as React from 'react';
import { Dimensions, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Text, Box, Heading, ScrollView } from 'native-base';
import { GetAllCourseMaterial } from '../query/content';
import MaterialPlayer from './youtube.player';

const FirstRoute = ({
  qa,
}: {
  qa: {
    qa_id: string;
    questions: { question_id: number; questionTitle: string; answer: string }[];
  };
}) => (
  <ScrollView>
    <Box my="4" height={'full'} zIndex={'100'}>
      {qa.questions.map((question) => (
        <Box
          bg={'blue.100'}
          borderRadius={5}
          m={1}
          key={question.question_id}
          p={2}
        >
          <Text my={2} fontWeight={'bold'} fontSize={'md'}>
            {question.questionTitle}
          </Text>
          <Text fontSize={'md'}>{question.answer}</Text>
        </Box>
      ))}
    </Box>
  </ScrollView>
);

const SecondRoute = ({ course_id }: { course_id: string }) => {
  const { isLoading, data } = GetAllCourseMaterial(course_id);
  return (
    <Box>
      {isLoading ? (
        <Box>
          <Heading>Loading...</Heading>
        </Box>
      ) : (
        <ScrollView mt={3}>
          <Text fontWeight={'semibold'} fontSize={'xl'} mb={12}>
            Here are list of youtube materials
          </Text>
          {data &&
            data.map((material: { material_link: string; index: string }) => (
              <Box my={-3} key={material.material_link}>
                <MaterialPlayer
                  key={material.index}
                  youtube_url={material.material_link}
                />
              </Box>
            ))}
        </ScrollView>
      )}
    </Box>
  );
};

interface TabViewProps {
  question_answer: any;
  course_id: string;
}

function Tab(props: TabViewProps) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'qa',
      title: 'Question Answers',
    },
    {
      key: 'material',
      title: 'Materials',
    },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <Box width={'full'} flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const color = index === i ? '#000' : '#1f2937';
          const borderColor = index === i ? 'cyan.500' : 'coolGray.200';
          return (
            <Box
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              alignItems="center"
              width={'50%'}
              p="3"
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontWeight: 'bold',
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const initialLayout = {
    width: Dimensions.get('window').width,
  };
  const renderScene = SceneMap({
    qa: () => <FirstRoute qa={props.question_answer} />,
    material: () => <SecondRoute course_id={props.course_id} />,
  });
  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

export default (props: TabViewProps) => {
  return (
    <Box>
      <Tab
        course_id={props.course_id}
        question_answer={props.question_answer}
      />
    </Box>
  );
};
