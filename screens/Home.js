import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../store/actions/games";
import Ionicons from "react-native-vector-icons/Ionicons";

function Home(props) {
  // State
  const [steps, setSteps] = useState(1);
  const [proposition, setProposition] = useState();
  const [instruction, setIntruction] = useState();

  // Variables
  const minimum = useSelector((state) => state.minimum);
  const maximum = useSelector((state) => state.maximum);
  const gameStarted = useSelector((state) => state.gameStarted);
  const dispatch = useDispatch(); // pour pouvoir lancer les actions
  const solution = useSelector((state) => state.solution);
  console.log(solution);

  // Fonctions
  const onStartPressedHandler = () => {
    dispatch(gameActions.startGame());
  };
  const onPropositionPressedHandler = () => {
    if (isNaN(proposition)) {
      // isNaN renvoie true, pour verifier si c bien un nombre
      Alert.alert("Attention", "La triche n'est pas autorisée.");
    } else {
      if (proposition == solution) {
        // partie gagnée
        Alert.alert(
          "Juste Prix trouvé",
          `Vous avez réussi en ${steps} essais.`
        );
        // Arrêter la partie
        dispatch(gameActions.endGame(steps));
        // Vider l'input
        setProposition();
        // Vider les instructions
        setIntruction();
        // Initialiser les étapes à 1
        setSteps(1);
      } else if (proposition < solution) {
        // C'est plus
        setIntruction("C'est plus !");
        setSteps((prevSteps) => prevSteps + 1); // pour ajouter +1 au nombre de tour
      } else if (proposition > solution) {
        // C'est moins
        setIntruction("C'est moins !");
        setSteps((prevSteps) => prevSteps + 1); // pour ajouter +1 au nombre de tour
      }
    }
  };

  if (!gameStarted && steps != 1) {
    setIntruction();
    setSteps(1);
    setProposition();
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.littleContainer}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.slogan}>
              Retrouvez le juste prix entre
              <Text style={styles.highlight}> {minimum}</Text>
              <Text style={styles.slogan}> et</Text>
              <Text style={styles.highlight}> {maximum}</Text>
            </Text>
            {gameStarted ? (
              <>
                <View style={styles.instruction}>
                  <Text style={styles.instructionSteps}>#{steps}</Text>
                  <Text style={styles.instructionText}>
                    {instruction ? instruction : " Quel est le juste prix?"}
                  </Text>
                </View>
                <View style={styles.proposition}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={proposition}
                    onChangeText={setProposition}
                    onFocus={() => setProposition()}
                  />
                  <TouchableOpacity
                    style={styles.send}
                    activeOpacity={0.8}
                    onPress={onPropositionPressedHandler}
                  >
                    <Ionicons
                      name="arrow-forward"
                      size={30}
                      color={Colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={styles.start}
                activeOpacity={0.8}
                onPress={onStartPressedHandler}
              >
                <Text style={styles.startText}>Commencer</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  littleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 150,
  },
  slogan: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
  highlight: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
  start: {
    backgroundColor: Colors.primary,
    padding: 15,
    marginTop: 50,
    borderRadius: 5,
  },
  startText: {
    color: "white",
    fontSize: 17,
  },
  instruction: {
    backgroundColor: Colors.tertiary,
    padding: 15,
    minWidth: Dimensions.get("window").width * 0.5,
    borderRadius: 5,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  instructionSteps: {
    color: "white",
    fontWeight: "bold",
    marginRight: 15,
  },
  instructionText: {
    color: "white",
  },
  proposition: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: Colors.quaternary,
    borderRadius: 5,
    borderColor: Colors.primary,
    borderBottomWidth: 3,
    width: 150,
  },
  input: {
    padding: 10,
    width: 105,
  },
  send: {},
});

export default Home;
