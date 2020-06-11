import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Favorites from './FavoritesComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders,
    postFeedback, fetchFavorites, deleteFavorite, postFavorite,
    loginUser, logoutUser
} from '../redux/ActionCreator'
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchFavorites: () => dispatch(fetchFavorites()),
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postFeedback: (newFeedback) => dispatch(postFeedback(newFeedback)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser())
});

class MainComponent extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchFavorites();
        this.props.fetchLeaders();
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMsg={this.props.dishes.errMsg}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMsg={this.props.promotions.errMsg}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMsg={this.props.leaders.errMsg}
                />
            );
        };

        const DishWithID = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMsg={this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment) => comment.dish === match.params.dishId)}
                    commentsErrMsg={this.props.comments.errMsg}
                    postComment={this.props.postComment}
                    postFavorite={this.props.postFavorite}
                    favorite={this.props.favorites.favorites ?
                        this.props.favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId) : false}
                />
            );
        };

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.auth.isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        return (
            <div>
                <Header loginUser={this.props.loginUser} auth={this.props.auth} logoutUser={this.props.logoutUser} />
                <Switch location={this.props.location}>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu">
                        <Menu dishes={this.props.dishes} />
                    </Route>
                    <Route exact path="/aboutus" component={() =>
                        <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading}
                            errMsg={this.props.leaders.errMsg} />} />
                    <Route path="/menu/:dishId" component={DishWithID} />
                    <PrivateRoute exact path="/favorites" component={() =>
                        <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                    <Route exact path="/contactus" component={() =>
                        <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
