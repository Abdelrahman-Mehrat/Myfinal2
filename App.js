import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button,Platform,StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  USBPrinter
} from "react-native-thermal-receipt-printer";
export default function App() {
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();
  useEffect(()=>{
    if(Platform.OS == 'android'){
      USBPrinter.init().then(()=> {
        //list printers
        USBPrinter.getDeviceList().then(setPrinters);
      })
    }
  },[])
  const _connectPrinter = (printer) => USBPrinter.connectPrinter(printer.vendorID, printer.productId).then(() => setCurrentPrinter(printer))

  const print1 = () => {
    currentPrinter && USBPrinter.printText("<C>sample text</C>\n");
  }

  const print2 = () => {
    currentPrinter && USBPrinter.printBill("<C>sample bill</C>");
  }

  return (
    <View style={styles.container}>
      <Text>{currentPrinter}</Text>
       {
        printers?.map(printer => (
          <TouchableOpacity key={printer.device_id} onPress={() => _connectPrinter(printer)}>
            {`device_name: ${printer.device_name}, device_id: ${printer.device_id}, vendor_id: ${printer.vendor_id}, product_id: ${printer.product_id}`}
          </TouchableOpacity>
          ))
      }
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='text print' onPress={()=>{print1()}}/>
      <Button title='bill print' onPress={()=>{print2()}}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
