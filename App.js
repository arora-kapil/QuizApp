import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const API_BASE_URL = 'http://192.168.2.209:5000';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [difficulties] = useState(['easy', 'medium', 'hard']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [userName, setUserName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const fetchQuiz = () => {
    axios.get(`${API_BASE_URL}/quiz`, {
      params: {
        category: selectedCategory,
        difficulty: selectedDifficulty,
      }
    })
    .then(response => {
      const shuffledQuizData = response.data.map(question => ({
        ...question,
        all_answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
      }));
      setQuizData(shuffledQuizData);
      setShowQuiz(true);
      setScore(0);
    })
    .catch(error => console.error('Error fetching quiz:', error));
  };

  const fetchLeaderboard = () => {
    axios.get(`${API_BASE_URL}/leaderboard`, {
      params: {
        category: selectedCategory,
        difficulty: selectedDifficulty,
      }
    })
    .then(response => {
      setLeaderboard(response.data);
      setShowLeaderboard(true);
    })
    .catch(error => console.error('Error fetching leaderboard:', error));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <ImageBackground 
      source={require('./assets/quizimage.jpg')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {!showQuiz && !showLeaderboard ? (
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Trivia Quiz</Text>
            <TextInput 
              placeholder="Enter your name"
              value={userName}
              onChangeText={setUserName}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            
            <Text style={styles.label}>Category:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a category" value="" />
                {categories.map((category) => (
                  <Picker.Item key={category.id} label={category.name} value={category.id} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Difficulty:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedDifficulty}
                onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a difficulty" value="" />
                {difficulties.map((difficulty, index) => (
                  <Picker.Item key={index} label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} value={difficulty} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity 
              style={[styles.button, (!selectedCategory || !selectedDifficulty || !userName) && styles.disabledButton]} 
              onPress={fetchQuiz} 
              disabled={!selectedCategory || !selectedDifficulty || !userName}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, (!selectedCategory || !selectedDifficulty) && styles.disabledButton]} 
              onPress={fetchLeaderboard} 
              disabled={!selectedCategory || !selectedDifficulty}
            >
              <Text style={styles.buttonText}>View Leaderboard</Text>
            </TouchableOpacity>
          </View>
        ) : showLeaderboard ? (
          <LeaderboardView 
            leaderboard={leaderboard} 
            setShowLeaderboard={setShowLeaderboard} 
          />
        ) : (
          <QuizView 
            quizData={quizData} 
            setShowQuiz={setShowQuiz} 
            score={score} 
            setScore={setScore} 
            userName={userName}
            category={selectedCategory}
            difficulty={selectedDifficulty}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

function QuizView({ quizData, setShowQuiz, score, setScore, userName, category, difficulty }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    if (isCorrect) setScore(prev => prev + 1);
    const nextQuestionIndex = currentQuestionIndex + 1;
    
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      handleEndQuiz();
    }
  };

  const handleEndQuiz = async () => {
    try {
      await axios.post(`${API_BASE_URL}/save-score`, {
        username: userName,
        score,
        category,
        difficulty,
      });
      Alert.alert('Quiz Completed', `Your score: ${score}/${quizData.length}`, [
        { text: 'OK', onPress: () => setShowQuiz(false) }
      ]);
    } catch (error) {
      console.error('Error submitting score:', error);
      Alert.alert('Error', 'Failed to submit score. Please try again.');
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.scoreText}>Score: {score}/{quizData.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.all_answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={styles.answerButton}
          onPress={() => handleAnswer(answer)}
        >
          <Text style={styles.answerButtonText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function LeaderboardView({ leaderboard, setShowLeaderboard }) {
  return (
    <View style={styles.leaderboardContainer}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <Text style={styles.leaderboardText}>{index + 1}. {item.username}: {item.score}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => setShowLeaderboard(false)}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  menuContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  answerButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  leaderboardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  leaderboardItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leaderboardText: {
    fontSize: 16,
    color: '#333',
  },
});