import Main from "../pages/MainPage/Main";
import BookList from "../pages/BookListPage/BookList";

const RouteNames = {
    MAINPAGE: '/',
    BOOKLIST: '/library',
}

export const routes = [
    {
        path: RouteNames.MAINPAGE,
        component: Main
    },
    {
        path: RouteNames.BOOKLIST,
        component: BookList
    }
]