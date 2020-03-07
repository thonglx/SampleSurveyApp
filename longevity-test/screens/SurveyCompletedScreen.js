import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';
const defaultAnswers = { healthyWeight: '50', blookdPressure: '50' };

export default class SurveyCompletedScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Survey Results',
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  getFinalScore() {
    var finalScore = 0;
    const answers = this.props.navigation.getParam('surveyAnswers');
    Object.keys(answers).forEach(function(key) {
      finalScore += parseInt(answers[key].value);
    });
    return finalScore / 10;
  }

  getRecommendation(finalScore) {
    var recommendation = '';
    if (finalScore == 100) {
      recommendation = '100 pts – possible longevity over 100';
    } else if (finalScore >= 80 && finalScore <= 99) {
      recommendation = '80-99 pts – possible longevity over 90';
    } else if (finalScore >= 60 && finalScore <= 79) {
      recommendation = '60-79 pts - possible longevity over 80';
    } else {
      recommendation =
        'Below 60 pts – You have to work hard towards longevity of 80';
    }
    return recommendation;
  }

  render() {
    const answers = this.props.navigation.getParam(
      'surveyAnswers',
      defaultAnswers
    );

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.questionText}>The results are in!</Text>
            <Text>Overeating?</Text>
            <Text>
              Your answer: {answers.eatHabit.optionText}. Your score:{' '}
              {answers.eatHabit.value}
            </Text>
            <Text>White-meat, fish, and vegetables?</Text>
            <Text>
              Your answer: {answers.eatHealthy.optionText}. Your score:{' '}
              {answers.eatHealthy.value}
            </Text>
            <Text>Daily physical exercise?</Text>
            <Text>
              Your answer: {answers.excerciseRoutine.optionText}. Your score:{' '}
              {answers.excerciseRoutine.value}
            </Text>
            <Text>Daily Walk?</Text>
            <Text>
              Your answer: {answers.walkingDaily.optionText}. Your score:{' '}
              {answers.walkingDaily.value}
            </Text>
            <Text>Social network and kindness?</Text>
            <Text>
              Your answer: {answers.socialKindness.optionText}. Your score:{' '}
              {answers.socialKindness.value}
            </Text>
            <Text>Good sleeping pattern?</Text>
            <Text>
              Your answer: {answers.sleepingPattern.optionText}. Your score:{' '}
              {answers.sleepingPattern.value}
            </Text>
            <Text>Good financial planning?</Text>
            <Text>
              Your answer: {answers.financialPlan.optionText}. Your score:{' '}
              {answers.financialPlan.value}
            </Text>
            <Text>Bad habits - smoking, excess-of-drinking, drugging?</Text>
            <Text>
              Your answer: {answers.badHabit.optionText}. Your score:{' '}
              {answers.badHabit.value}
            </Text>
            <Text>Healthy weight range?</Text>
            <Text>
              Your answer: {answers.weightRange.optionText}. Your score:{' '}
              {answers.weightRange.value}
            </Text>
            <Text>Healthy blood pressure range?</Text>
            <Text>
              Your answer: {answers.bloodPressure.optionText}. Your score:{' '}
              {answers.bloodPressure.value}
            </Text>
            <Text style={styles.questionText}> Final Score </Text>
            <Text style={styles.questionText}> {this.getFinalScore()} </Text>
            <Text style={styles.questionText}>
              {' '}
              {this.getRecommendation(this.getFinalScore())}{' '}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PURPLE,
  },
  container: {
    minWidth: '90%',
    maxWidth: '90%',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 25,
    borderRadius: 10,
    minHeight: '80%',
  },
  questionText: {
    marginBottom: 10,
    fontSize: 20,
  },
});
