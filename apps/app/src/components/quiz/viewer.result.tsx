import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ResultsFromQuiz } from './resultsfromquiz';
import { StyleSheet, View, Text } from 'react-native';
type Props = ResultsFromQuiz;

export function QuizResults({ correct, incorrect, percentage }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Results</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.resultText}>
          <Feather name="check" size={14} />
          <Text>{correct} correct</Text>
        </View>

        <View style={styles.resultText}>
          <Feather name="x" size={14} />
          <Text>{incorrect} incorrect</Text>
        </View>

        <View style={[styles.progressBar, { width: percentage }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 40,
    borderRadius: 4,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#FFCDD2',
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  resultText: {
    fontSize: 14,
    marginLeft: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 30,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
});
