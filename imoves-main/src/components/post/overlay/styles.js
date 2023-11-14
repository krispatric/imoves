import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    bottom: 0,
    paddingLeft: 20,
    paddingBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end'
   
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  description: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
  leftContainer:{
    alignItems:'center'
  },
  actionButton:{
    padding :5,
    marginTop:5
  },
  actionButtonText:{
    color: 'white',
    textAlign:'center',
    marginTop:4
  },
  categoryIcon: {
    marginLeft: 10,
    color: 'white'
  },
  modalOption:{
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color :'white'

  },
  modalContainer:{
    marginLeft: 15,
  },
  modalBackground:{
    marginLeft: 200,
    marginRight:60,
    alignItems: 'center',
    marginTop:550,
    justifyContent: 'center',
   

  }
  

})

export default styles
