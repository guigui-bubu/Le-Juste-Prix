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
  KeyboardAvoidingView, // gére virtuellment la position du clavier (ios)
  Platform,
  TouchableWithoutFeedback, // fermr le clavier au clic dans le vide
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as gameActions from "../store/actions/games";

// Etape 1 React hokk form
import { useForm, Controller } from "react-hook-form";

function Parametres(props) {
  // Variables
  const minimum = useSelector((state) => state.minimum); // useSelector => va chercher notre state dans le reducer
  const maximum = useSelector((state) => state.maximum); // useSelector => va chercher notre state dans le reducer
  const dispatch = useDispatch(); // pour pouvoir lancer les actions

  // Etape 2 React hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // States
  //const [minimumInput, setMinimumInput] = useState(minimum);
  //const [maximumInput, setMaximumInput] = useState(maximum);

  // Fonction
  const onSubmitPressedHandler = (toto) => {
    console.log(toto);
    if (Number(toto.minimumInput) < Number(toto.maximumInput)) {
      dispatch(
        gameActions.updateVariables(
          Number(toto.minimumInput),
          Number(toto.maximumInput)
        )
      );
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

  const onError = (data) => {
    console.log(data);
  };

  let errorStyle;
  if (errors.minimumInput) {
    errorStyle = {
      borderColor: Colors.primary,
      borderWidth: 3,
    };
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/*  pour fermer le clavier dans le vide*/}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Paramètres</Text>
            <View style={styles.form}>
              <Text style={styles.label}>Prix minimum</Text>

              {/*<TextInput
            value={minimumInput.toString()}
            onChangeText={setMinimumInput}
            style={styles.input}
            placeholder="0"
            //keyboardType="numeric" // type de clavier demandé
          />*/}

              {/* ETAPE 4 REACT HOOK FORM */}

              <Controller
                name="minimumInput"
                control={control}
                defaultValue={minimum.toString()} // valeur par défault
                rules={{ min: 0, required: true }} // régle pour les conditions du formulaire
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    style={{ ...styles.input, ...errorStyle }}
                    placeholder="0"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={(value) => onChange(value)}
                  />
                )}
              />
              {errors.minimumInput && (
                <Text style={styles.error}>
                  Veuillez rentrer une valeur correcte.
                </Text>
              )}

              <Text style={{ ...styles.label, marginTop: 25 }}>
                Prix maximum
              </Text>
              {/*<TextInput
            value={maximumInput.toString()}
            onChangeText={setMaximumInput}
            style={styles.input}
            placeholder="1000"
            //keyboardType="numeric" // type de clavier demandé
          />*/}
              <Controller
                name="maximumInput"
                control={control}
                defaultValue={maximum.toString()} // valeur par défault
                rules={{ min: 0, required: true }} // régle pour les conditions du formulaire
                render={(props) => (
                  <TextInput
                    style={styles.input}
                    placeholder="1000"
                    keyboardType="numeric"
                    value={props.value}
                    onChangeText={(value) => props.field.onChange(value)}
                  />
                )}
              />
              {errors.maximumInput && (
                <Text style={styles.error}>
                  Veuillez rentrer une valeur correcte.
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.submit}
              activeOpacity={0.8}
              onPress={handleSubmit(onSubmitPressedHandler, onError)}
            >
              <Text style={styles.submitText}>Sauvgarder</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  error: {
    color: Colors.primary,
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: Platform.OS === "android" ? 50 : 15,
  },
});

export default Parametres;
