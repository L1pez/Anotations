import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

export default function App() {
  
  const [estado,setarEstado] = useState('leitura');
  const [anotacao,setarAnotacao] = useState('');

  useEffect(() =>{
    //Quando Iniciar o APP queremos que leia a key anotacao
    (async () =>{
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao')
        setarAnotacao(anotacaoLeitura)
      }catch(error){}
    })();
  },[])

  setData = async() =>{
    try{
      await AsyncStorage.setItem('anotacao',anotacao);
    }catch (error){

    }

    alert('Sua Anotação foi Salva');
  }


  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }

  if(estado == 'leitura'){
  return (

    <View style={{flex: 1}}>

      <StatusBar hidden />

      <View style={styles.header}><Text style={{textAlign: 'center',color: 'white', fontSize: 18}} >Aplicativo Anotação</Text></View>

      {
      (anotacao != '')?
      <View style={{padding: 20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
      :
      <View style={{padding: 20}}><Text style={{opacity: 0.4}}>Não Foi encontrada Nenhuma Anotação :(</Text></View>
      }

      <TouchableOpacity onPress={() => setarEstado('atualizando')} style={styles.buttons}>

        {
        (anotacao == '')?
        <Text style={styles.btn01}>+</Text>
        :
        <Text style={{fontSize: 12, color: 'white', textAlign: 'center', marginTop: 15}}>Editar</Text>
        }

        </TouchableOpacity>

    </View>
  );
}else if(estado == 'atualizando'){
  return (
    
    <View style={{flex: 1}}>

      <StatusBar hidden />

      <View style={styles.header}><Text style={{textAlign: 'center',color: 'white', fontSize: 18}} >Aplicativo Anotação</Text></View>

      <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding: 20, height: 300, textAlignVertical: 'top'}} multiline={true} numberOfLines={5} value={anotacao}></TextInput>

      <TouchableOpacity onPress={() => atualizarTexto()}  style={styles.salvar}><Text style={{textAlign:'center', color: 'white'}}>Salvar</Text></TouchableOpacity>

      <TouchableOpacity onPress={() => setarEstado('leitura')} style={styles.voltar}><Text style={{textAlign: 'center', color: 'white'}}>Voltar</Text></TouchableOpacity>

    </View>
  );

}

}

const styles = StyleSheet.create({
    header:{
      width: '100%',
      padding: 20,
      backgroundColor: '#069'
    },
    anotacao:{
      fontSize: 13
    },
    buttons: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 50,
      height: 50,
      backgroundColor: '#069',
      borderRadius: 25
    },
    btn01: {
      color: 'white',
      position: 'relative',
      textAlign: 'center',
      top: 3,
      fontSize: 30,
    },
    salvar:{
      position: 'absolute',
      right: 20,
      bottom: 20,
      paddingTop: 10,
      paddingBottom: 10,
      width: 100,
      backgroundColor: '#069',
    },
    voltar:{
      position: 'absolute',
      left: 20,
      bottom: 20,
      paddingTop: 10,
      paddingBottom: 10,
      width: 100,
      backgroundColor: '#069',
    }
})




