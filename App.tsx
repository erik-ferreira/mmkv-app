import { useEffect, useState } from "react"
import { MMKV, useMMKVObject, useMMKV } from "react-native-mmkv"
import { Button, Text, TextInput, View } from "react-native"

import { styles } from "./styles"

interface User {
  name: string
  email: string
}

// const storage = new MMKV({ id: "mmkv-app" })

export default function App() {
  const storage = useMMKV({ id: "mmkv-app" })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const [user, setUser] = useMMKVObject<User>("user")

  function handleSave() {
    setUser({ name, email })
  }

  function fetchUser() {
    const data = storage.getString("user")
    setUser(data ? JSON.parse(data) : null)
  }

  useEffect(() => {
    const listener = storage.addOnValueChangedListener((changedKey) => {
      const newValue = storage.getString(changedKey)

      console.log("CHAVE => ", changedKey)
      console.log("NOVO VALOR => ", newValue)
    })

    return () => {
      listener.remove()
    }
  }, [])

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
// 20:29
