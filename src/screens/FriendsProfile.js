import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import firebase from 'firebase';
import moment from 'moment';
export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            user: [],
            person: {
                uid: props.navigation.getParam('uid'),
            },
        }
    }
    
    componentDidMount(){
        firebase.database().ref('users')
        .on('child_added',(value)=>{
            let data = value.val()
            data.uid = value.key;
            if(data.uid == this.state.person.uid) {
                this.setState({ user: data })
            }
        })
    }
    
    render() {
        const { name, email, image, mobile, gender, birth } = this.state.user
        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <StatusBar backgroundColor="#03a9f4" barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{flex:1,backgroundColor:'#03a9f4',justifyContent:'center',alignItems:'center',borderBottomLeftRadius:25,borderBottomRightRadius:25}}>
                        <View style={{flex:3,alignItems:'center'}}>
                            <Image style={{width:130,height:130,borderRadius:65,marginBottom:15,backgroundColor:'#fff'}} source={{ uri: image }}/>     
                            <Text style={{color:'#fff',fontSize:25,fontWeight:'bold',marginBottom:15}}>{name}</Text>
                        </View>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <View style={styles.card}>
                            <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Contact</Text>
                            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 }}>
                                <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Email</Text></View>
                                <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {email}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Mobile</Text></View>
                                <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {mobile}</Text></View>
                            </View>
                        </View>
                        <View style={[styles.card, { marginBottom: 20 }]}>
                            <Text style={{alignSelf:'center',marginBottom:10,color:'#777',fontSize:20}}>Biodata</Text>
                            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1 }}>
                                <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Name</Text></View>
                                <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {name}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Gender</Text></View>
                                <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {gender ? (gender == "l" ? "Male" : "Female") : null}</Text></View>
                            </View>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1 }}><Text style={{color:'#777',padding:10}}>Birth Date</Text></View>
                                <View style={{ flex: 2 }}><Text style={{color:'#777',padding:10}}>: {birth !== '' ? moment(birth).format("DD MMMM YYYY"):''}</Text></View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: width*0.9,
        backgroundColor: '#f9f9f9',
        marginTop: 20,
        borderRadius: 9,
        elevation: 3,
        padding: 15, 
    }
}); 