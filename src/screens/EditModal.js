import React, { Component } from 'react';
import { 
    View, 
    Text,
    Modal,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    TextInput,
    Picker
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
const { width, height } = Dimensions.get('window');

export default class EditModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            email: null,
            mobile: null,
            gender: null,
            birth: null,
            modalVisible: false,
            isDateTimePickerVisible: false
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleDatePicked = date => {
        this.setState({ birth: moment(date).format("YYYY-MM-DD") })
        console.warn("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    onChangeTextName = name => this.setState({ name });
	onChangeTextEmail = email => this.setState({ email });
	onChangeTextMobile = mobile => this.setState({ mobile });
	// onChangeTextNewPass = newPass => this.setState({ newPass });
	// onChangeTextPassword = password => this.setState({ password });
    
    render() {
        const { name,email,mobile,gender,birth } = this.state
        console.warn(name,email,mobile,gender,birth)
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={() => { this.setModalVisible(true)}}>
                    <Image style={{width:30,height:30,marginBottom:10,alignSelf:'center'}} source={require('../assets/edit.png')}/> 
                    <Text style={{color:'#fff'}}>Edit Profile</Text>
                </TouchableOpacity>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <View style={{justifyContent:'center',alignItems:'center',width,height}}>
                        <View style={{backgroundColor:'#fff',width:width*0.92,paddingBottom:15,zIndex:3,borderRadius:8,elevation:5}}>
                            <View style={{height:80,justifyContent:'center',alignItems:'center',borderBottomWidth:2,borderBottomColor:'#eee',marginBottom:5}}>
                                <Text style={{fontSize:25,fontWeight:'bold',color:'#03a9f4'}}>Edit Profile</Text>   
                            </View>
                            <Text style={styles.text}>Your Name</Text>
                            <TextInput style={styles.input} placeholder={"Name"} 
                                onChangeText={this.onChangeTextName}
                                value={this.state.name}/>
                            <Text style={styles.text}>Your Email</Text>
                            <TextInput style={styles.input} placeholder={"Email"}
                                onChangeText={this.onChangeTextEmail}
                                value={this.state.email}/>
                            <Text style={styles.text}>Your Phone Number</Text>
                            <TextInput style={[styles.input,{marginBottom:5}]} placeholder={"Phone Number"}
                                onChangeText={this.onChangeTextMobile}
                                value={this.state.phone}/>
                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                <Text style={{marginHorizontal:25}}>Gender :</Text>
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{height: 50, width: 150}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({gender: itemValue})
                                    }>
                                    <Picker.Item label="Choose" value="" />
                                    <Picker.Item label="Male" value="l" />
                                    <Picker.Item label="Female" value="p" />
                                </Picker>
                            </View>
                            <Text style={styles.text}>Birth Date</Text>
                            <TouchableOpacity onPress={this.showDateTimePicker} style={[styles.input,{height:55,flexDirection:'row',alignItems:'center'}]}>
                            <Image style={{width:20,height:20,marginRight:15}} source={require('../assets/calendar.png')}/> 
                                <Text>{this.state.date}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this.handleDatePicked}
                                onCancel={this.hideDateTimePicker}
                            />
                            <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:25}}>
                                <TouchableOpacity style={{backgroundColor:'#f44336',borderRadius:5}}
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                                    <Text style={{fontSize:17,color:'#fff',marginVertical:10,marginHorizontal:15}}>Batal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#03a9f4',borderRadius:5}}
                                    onPress={() => {this.setModalVisible(!this.state.modalVisible)}}>
                                    <Text style={{fontSize:17,color:'#fff',marginVertical:10,marginHorizontal:15}}>Update Profile</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        <View style={{height,width,backgroundColor:'#000',opacity:0.2,position:'absolute',zIndex:1}}>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        marginBottom:5,
        marginLeft:25
    },
    input: {
        width:width*0.8,
        borderWidth:2,
        borderColor:'#ddd',
        alignSelf:'center',
        marginBottom:15,
        borderRadius:12,
        paddingHorizontal:20
    },
    btnLogin: {
        marginTop:20,
        backgroundColor:'#03a9f4',
        width:width*0.8,
        borderRadius:12,
        alignSelf:'center',
        height:45,
        justifyContent:'center',
        alignItems:'center'
    }
})