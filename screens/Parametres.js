import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../store/actions/games";

function Parametres(props) {
  // Variables
  const minimum = useSelector((state) => state.minimum); // useSelector => va chercher notre state dans le reducer
  const maximum = useSelector((state) => state.maximum); // useSelector => va chercher notre state dans le reducer
  const dispatch = useDispatch(); // pour pouvoir lancer les actions

  // States
  const [minimumInput, setMinimumInput] = useState(minimum);
  const [maximumInput, setMaximumInput] = useState(maximum);

  // Fonction
  const onSubmitPressedHandler = () => {
    if (minimumInput < maximumInput && minimumInput >= 0 && maximumInput >= 0) {
      dispatch(gameActions.updateVariables(minimumInput, maximumInput));
      Alert.alert(
        "Sauvegarde effectué",
        "Vos modifications ont été sauvegardées avec succès"
      );
      Keyboard.dismiss(); // pour fermer le clavier
    } else {
      Alert.alert(
        "Une erreur est survenue",
        "Veuillez vérifier vos informations"
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Paramètres</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Prix minimum</Text>
          <TextInput
            value={minimumInput.toString()}
            onChangeText={setMinimumInput}
            style={styles.input}
            placeholder="0"
            //keyboardType="numeric" // type de clavier demandé
          />

          <Text style={{ ...styles.label, marginTop: 25 }}>Prix maximum</Text>
          <TextInput
            value={maximumInput.toString()}
            onChangeText={setMaximumInput}
            style={styles.input}
            placeholder="1000"
            //keyboardType="numeric" // type de clavier demandé
          />
        </View>
        <TouchableOpacity
          style={styles.submit}
          activeOpacity={0.8}
          onPress={onSubmitPressedHandler}
        >
          <Text style={styles.submitText}>Sauvgarder</Text>
        </TouchableOpacity>
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

  form: {
    backgroundColor: Colors.tertiary,
    padding: 30,
    borderRadius: 5,
    marginTop: 30,
    minWidth: Dimensions.get("window").width * 0.8, // en fction du type d'écran il prend 80% de largeur de l'écran
  },
  label: {
    color: "white",
  },
  input: {
    backgroundColor: Colors.quaternary,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  submit: {
    backgroundColor: Colors.primary,
    padding: 15,
    marginTop: 25,
    borderRadius: 5,
  },
  submitText: {
    color: "white",
  },
});

export default Parametres;
