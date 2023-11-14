
import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  spacer: {
    flex: 1
  },
  formContainer:{
    margin:20,
    flexDirection: 'row'
  },
  buttonsContainer: {
      flexDirection: 'row',
      margin: 20
    
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical:50,
    paddingHorizontal:20

  },
  mediaPreview: {
    aspectRatio: 3 / 4,
    backgroundColor: 'black',
    width: '100%',
   


  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    marginLeft: 25
  },
  cancelButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
  PostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b100cd',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
    marginLeft: 25
  },
  PostButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },

 
  
});

export default styles