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
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../store/actions/games";
import Ionicons from "react-native-vector-icons/Ionicons";

function Home(props) {
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

  // State
  const [steps, setSteps] = useState(1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
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
                Quel est le juste prix?
              </Text>
            </View>
            <View style={styles.proposition}>
              <TextInput style={styles.input} /* keyboardType='numeric' */ />
              <TouchableOpacity style={styles.send} activeOpacity={0.8}>
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
