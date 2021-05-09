import authHeader from "../services/auth-header";

export const getAllDishes = () => {
    let dishes = []
    fetch('http://localhost:8082/api/dish', {headers: authHeader()})
        .then(response => response.json())
        .then(data => data.map(x => dishes.push(x)));
    return dishes
}

export const getAllDishesCategories = () => {
    let categs = []
    fetch('http://localhost:8082/api/dish-category', {headers: authHeader()})
        .then(response => response.json())
        .then(data => data.map(x => categs.push(x)));
    return categs
}

