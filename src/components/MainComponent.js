import React, { Component } from 'react';
// import logo from './logo.svg';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

// We obtain the Redux state as a parameter and will be become available as props (this.props) to the Main Component (thanks to the export default at the end).
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }    
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

    render() {
        
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]} 
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                    addComment={this.props.addComment} />
            )
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail 
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}  
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} 
                    // isModalOpen={false}
                    addComment={this.props.addComment}
                     />
            );
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                    <Route exact path="/contactus" component={() => <Contact />} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />} />
                    <Redirect to="/home" />
                </Switch>
                <div></div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
