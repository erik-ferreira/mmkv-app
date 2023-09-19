import { useState } from "react"
import { MMKV } from "react-native-mmkv"
import { Button, Text, TextInput, View } from "react-native"

import { styles } from "./styles"

interface User {
  name: string
  email: string
}

const storage = new MMKV({ id: "mmkv-app" })

export default function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [user, setUser] = useState<User | null>(null)

  function handleSave() {
    storage.set("user", JSON.stringify({ name, email }))

    fetchUser()
  }

  function fetchUser() {
    const data = storage.getString("user")
    setUser(data ? JSON.parse(data) : null)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome..."
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="E-mail..."
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Button title="Salvar" onPress={handleSave} />

      <Text style={styles.text}>
        {user?.name} - {user?.email}
      </Text>
    </View>
  )
}
