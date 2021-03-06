import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat: 1.3,
    chicken: 0.7,
};

const initialState = {
    ingredients: {
        salad: 0,
        chicken: 0,
        meat: 0,
        cheese: 0
    },
    ingredientsPizza: {
        salad: 0,
        chicken: 0,
        meat: 0,
        cheese: 0
    },
    ingredientsSandwich: {
        salad: 0,
        salami: 0,
        meat: 0,
        cheese: 0
    },
    price: 4,
    building:false
};

const resetIngredients = (state, action) => {
    return updateObject( state, {
        ingredients: {
            salad: 0,
            chicken: 0,
            cheese: 0,
            meat: 0
        },
        price: 4,
        error: false,
        building:false
    } );
};

const addIngredient = ( state, action ) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject( state, updatedState );
};

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngs = updateObject( state.ingredients, updatedIng );
    const updatedSt = {
        ingredients: updatedIngs,
        price: state.price - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject( state, updatedSt );
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.RESET_INGREDIENTS: return resetIngredients(state, action);
        default: return state;
    }
    //return state;
}

export default reducer;