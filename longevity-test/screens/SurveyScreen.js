import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import { COLORS } from '../res/validColors';

var index = 0;

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';

const survey = [
  {
    questionType: 'Info',
    questionText:
      'Hello user, welcome to the Longevity Survey Demo app!\n\nTap next to continue',
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Overeating?',
    questionId: 'eatHabit',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'White-meat, fish, and vegetables?',
    questionId: 'eatHealthy',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Sometimes',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Daily physical excercise?',
    questionId: 'excerciseRoutine',
    options: [
      {
        optionText: 'Over 30 min',
        value: '100',
      },
      {
        optionText: 'Less than 30 min',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Daily Walk?',
    questionId: 'walkingDaily',
    options: [
      {
        optionText: 'Over 10k steps',
        value: '100',
      },
      {
        optionText: 'From 5k to 10k steps',
        value: '50',
      },
      {
        optionText: 'Less than 5k steps',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Social Network and kindness?',
    questionId: 'socialKindness',
    options: [
      {
        optionText: 'Very',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Good sleeping pattern?',
    questionId: 'sleepingPattern',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Good financial planning?',
    questionId: 'financialPlan',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Bad habits - smoking, excess-of-drinking, drugging?',
    questionId: 'badHabit',
    options: [
      {
        optionText: 'No',
        value: '100',
      },
      {
        optionText: 'Had it before',
        value: '50',
      },
      {
        optionText: 'Yes',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Healthy weight range?',
    questionId: 'weightRange',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'SelectionGroup',
    questionText: 'Healthy blood pressure range?',
    questionId: 'bloodPressure',
    options: [
      {
        optionText: 'Yes',
        value: '100',
      },
      {
        optionText: 'Somewhat',
        value: '50',
      },
      {
        optionText: 'No',
        value: '0',
      },
    ],
  },
  {
    questionType: 'Info',
    questionText: 'That is all for the demo, tap finish to see your results!',
  },
];

export default class SurveyScreen extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: GREEN,
        height: 40,
        elevation: 5,
      },
      headerTintColor: '#fff',
      headerTitle: 'Longevity Survey',
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = { backgroundColor: PURPLE, answersSoFar: '' };
  }

  onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     */

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};

    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    this.props.navigation.navigate('SurveyCompleted', {
      surveyAnswers: answersAsObj,
    });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({
      previousScore: answer.value.value,
    });
  }

  onAnswerEdit() {
    index -= 1;
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{
          flexGrow: 1,
          maxWidth: 100,
          marginTop: 10,
          marginBottom: 10,
          marginRight: 10,
        }}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Previous'}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Next'}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}>
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? GREEN : PURPLE}
          style={isSelected ? { fontWeight: 'bold' } : {}}
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={text => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={text => {
          onChange(text);
        }}
        underlineColorAndroid={'white'}
        placeholderTextColor={'rgba(184,184,184,1)'}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={'numeric'}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.background,
          { backgroundColor: this.state.backgroundColor },
        ]}>
        <View style={styles.container}>
          <SimpleSurvey
            ref={s => {
              this.surveyRef = s;
            }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={styles.surveyContainer}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={answers => this.onSurveyFinished(answers)}
            onAnswerSubmitted={answer => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText}
          />
        </View>

        <ScrollView style={styles.answersContainer}>
          <Text style={{ textAlign: 'center' }}>
            {' '}
            Score for previous question
          </Text>
          <Text style={{ textAlign: 'center' }}>
            {this.state.previousScore || '0'}
          </Text>
          <Text style={{ textAlign: 'center' }}> Current Score</Text>
          <Text style={{ textAlign: 'center' }}>
            {this.state.currentScore || '0'}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: '80%',
    maxWidth: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    elevation: 20,
    borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    padding: 5,

    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignContent: 'flex-end',
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
  },
});
