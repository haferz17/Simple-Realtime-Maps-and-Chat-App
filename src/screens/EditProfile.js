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
import firebase from 'firebase';
import user from '../config/User';
import { Toast } from 'native-base';

const { width, height } = Dimensions.get('window');

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: user.name,
            // email: user.email,
            mobile: user.mobile,
            gender: user.gender,
            birth: user.birth,
            isDateTimePickerVisible: false,
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
	// onChangeTextEmail = email => this.setState({ email });
	onChangeTextMobile = mobile => this.setState({ mobile });
	// onChangeTextNewPass = newPass => this.setState({ newPass });
    // onChangeTextPassword = password => this.setState({ password });
    
    updateProfile = (data) => {
        firebase.database().ref('users/'+user.uid).update(data)
        Toast.show({
            text: 'Your profile has been updated successfully',
            position: 'top',
            type: 'success'
        })
        this.props.navigation.navigate('Profile')
    }

    validateForm = () => {
        const { name, mobile, gender, birth } = this.state

        let upName = name
        let upMobile = mobile
        let upGender = gender
        let upBirth = birth

        let data = {
            name: upName,
            mobile: upMobile,
            gender: upGender,
            birth: upBirth
        }

        if (name.length < 6) {
            upName = user.name
            Toast.show({
                text: 'At least 6 char in Name',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else if (mobile.length < 10) {
            upMobile = user.mobile
            Toast.show({
                text: 'At least 10 char in Phone Number',
                buttonText: 'Okay',
                position: 'top',
                type: 'danger'
            })
        }
        else {
            this.updateProfile(data)
        }
    }
    
    render() {
        const { name, mobile, gender, birth } = this.state
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                <View style={{flex: 1, paddingHorizontal: 40, paddingTop: 50}}>
                    <Text style={styles.text}>Your Name</Text>
                    <TextInput style={styles.input} placeholder={"Name"} 
                        onChangeText={this.onChangeTextName}
                        value={name}/>
                    {/* <Text style={styles.text}>Your Email</Text>
                    <TextInput style={styles.input} placeholder={"Email"}
                        onChangeText={this.onChangeTextEmail}
                        value={email}/> */}
                    <Text style={styles.text}>Your Phone Number</Text>
                    <TextInput style={[styles.input,{marginBottom:5}]} placeholder={"Phone Number"}
                        onChangeText={this.onChangeTextMobile}
                        value={mobile}/>
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                        <Text style={{}}>Gender :</Text>
                        <Picker
                            selectedValue={gender}
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
                        <Text>{birth}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                    <View style={{flexDirection:'row', justifyContent:'center', marginTop: 20}}>
                        {/* <TouchableOpacity style={{backgroundColor:'#f44336',borderRadius:5}}
                            >
                            <Text style={{fontSize:17,color:'#fff',marginVertical:10,marginHorizontal:15}}>Batal</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{backgroundColor:'#03a9f4',borderRadius:5}} onPress={()=> this.validateForm()}>
                            <Text style={{fontSize:17,color:'#fff',marginVertical:10,marginHorizontal:15}}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        marginBottom:10,
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