import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import {Card, ListItem } from 'react-native-elements';
import { Text} from 'react-native';
import { connect } from 'react-redux';
import { FlatList } from "react-native";
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};


class About extends Component {



    static navigationOptions = {
        title: 'About us'
    }

render(){
    const renderPartner = ({item}) => {
return(
    <ListItem
    title= {item.name}
    Subtitle={item.description}
    leftAvatar={{source: {uri: baseUrl + item.image}}} />
)
    }


    
    return <ScrollView>
<Mission/>
<Card
title="Community Partners">
    <FlatList
    data={this.props.partners.partners}
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



export default connect(mapStateToProps)(About);