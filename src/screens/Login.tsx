import { useState } from "react";
import { ImageBackground, View, Image, ScrollView } from "react-native";
import { RouteConfigComponent } from "@react-navigation/native";
import { Flex, Box, Spacer, Text, TextInput, Button } from "@react-native-material/core";

const logoImage = require('../assets/icons/plus.png');
const backgroundImg = require('../assets/images/bg-blue.png');

type TypeFormData = {
  phone: string,
  password: string,
}

const initialData = {
  phone: "",
  password: "",
}

const LoginScreen = ({ navigation }: any) => {

  const [form, setForm] = useState<TypeFormData>(initialData)
  const handleChange = (key: keyof TypeFormData) => (text: string) => {
    setForm({
      ...form,
      [key]: text
    })
  }

  return (
    <ImageBackground source={backgroundImg}>
      <View style={{ height: "100%", display: 'flex', justifyContent: 'center' }}>
        <Flex m={30} mt={50} radius={30} p={30} bg={'white'} >
          <ScrollView>
            <Flex items="center">
              <Image source={logoImage} style={{ height: 50, width: 50 }} tintColor={'red'} />
              <Flex direction="row">
                <Text variant="h4" color="cyan">
                  Gojo
                </Text>
                <Text variant="h4" color="red">
                  RX
                </Text>
              </Flex>
            </Flex>
            <Box mt={10}>
              <TextInput variant={'filled'} onChangeText={handleChange("phone")} value={form.phone} label="Phone" color="primary"></TextInput>
            </Box>
            <Box mt={10}>
              <TextInput variant={'filled'} onChangeText={handleChange("password")} value={form.password} label="Password" color="primary"></TextInput>
            </Box>
            <Box mt={20}>
              <Button title={"Login"} variant={'contained'} color="orange"></Button>
            </Box>
            <Box mt={20}>
              <Button title={"Sign Up"} onPress={() => navigation.navigate('Register')} variant={'contained'} color="darkblue"></Button>
            </Box>
          </ScrollView>
        </Flex>
      </View>
    </ImageBackground>
  )
};

export default LoginScreen;
