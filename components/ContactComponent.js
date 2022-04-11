import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { Text} from 'react-native';

class Contact extends Component{

    static navigationOptions = {
        title: 'Contact Us'
    }
    
render(){
    return <ScrollView>
<Card title='Contact Information'
    wrapperStyle={{margin: 20}}
>
<Text>1 Nucamp Way</Text>
<Text>Seattle, WA 98001</Text>
<Text style={{marginBottom:10}}>U.S.A</Text>
<Text>Phone: 1-206-55-1234</Text>
<Text>Email: campsites@nucamp.com</Text>
</Card>
    </ScrollView>
}

}

export default Contact;