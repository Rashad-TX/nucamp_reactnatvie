import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: campsiteId => (postFavorite(campsiteId))
}

function RenderCampsite(props) {

    const {campsite} = props;

    if (campsite) {
        return (
            <Card 
                featuredTitle={campsite.name}
                image={{uri: baseUrl + campsite.image}}>
                <Text style={{margin:10}}>
                    {campsite.description}
                </Text>
                <Icon 
                    name= { props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?  console.log('Already set as a favorite') :
                    props.markFavorite()}
                />
                <Icon style={style.CardItem}
                        name='pencil'
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
            </Card>
        );
    }
    return <View />;
}

function RenderComments({comments}) {

    const renderCommentItem = ({item}) => {
        return (
            <View style={{ margin:10 }}>
                <Text style = {{ fontSize: 14 }}>{item.text}</Text>
                <Text style = {{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style = {{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class CampsiteInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            rating: 5,
            author: '',
            text: ''
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(campsiteId){
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author:'',
            text: '',
            showModal: false
        });
    }


    markFavorite(campsiteId) {
        this.props.postFavorite(campsiteId);
    }

    static navigationOptions = {
        title: 'Campsite Information'
    }

    render() {
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId);
        return (
            <ScrollView>
                <RenderCampsite campsite={campsite} 
                    favorite={this.props.favorites.includes(campsiteId)}
                    markFavorite={() => this.markFavorite(campsiteId)}    
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={style.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating)=>this.setState({rating: rating})} 
                            style={{ paddingVertical: 10 }}
                            />
                        <Input
                            placeholder ='Author'
                            leftIcon = {{type: 'font-awesome', name: 'user-o'}}
                            leftIconContainerStyle  = {{paddingRight: 10}}
                            onChangeText = {author => this.setState({author: author})}
                            value = {this.state.author}
                        /> 
                        <Input
                            placeholder='Comment'
                            leftIcon = {{type: 'font-awesome', name: 'comment-o'}}
                            leftIconContainerStyle  ={{paddingRight: 10}}
                            onChangeText= {text => this.setState({text: text})}
                            value = {this.state.text}
                        /> 
                        <View style={{margin: 10}}> 
                            <Button 
                                onPress={() => {
                                    this.handleComment(campsiteId)
                                    this.resetForm()}}
                                color = "#5637DD"
                                title = 'Submit'
                            />
                            <View style={{marginTop: 10}}> 
                                <Button
                                    onPress={() => {
                                        this.toggleModal();
                                        this.resetForm();
                                    }}
                                    color='#808080'
                                    title='Cancel'
                                />
                            </View>
                        </View>
                    </View>
                </Modal>








            </ScrollView>
        )
    }

}

const style = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        flexDirection: 'row',
        margin: 20
    },
    CardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }

});

export default connect (mapStateToProps, mapDispatchToProps)(CampsiteInfo);