import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import {Card, ListItem } from 'react-native-elements';
import { Text} from 'react-native';
import {PARTNERS} from '../shared/partners';
import { FlatList } from "react-native";


class About extends Component {
constructor(props){
    super(props);
    this.state = {
        partners: PARTNERS
    }
}
    static navigationOptions = {
        title: 'About us'
    }

render(){
    const renderPartner = ({item}) => {
return(
    <ListItem
    title= {item.name}
    Subtitle={item.description}
    leftAvatar={{source: required('./images/bootstrap-logo.png')}} />
)
    }


    
    return <ScrollView>
<Mission/>
<Card
title="Community Partners">
    <FlatList
    data={this.state.partners}
    keyExtractor = {item => item.id.toString()}
    renderItem={renderPartner}
    />
</Card>
    </ScrollView>
}

}

function Mission () {
    return(
        <Card title="Our Mission"> 
        <Text style={{margin: 10}}> We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other. </Text>
        </Card>
    )
}



export default About;