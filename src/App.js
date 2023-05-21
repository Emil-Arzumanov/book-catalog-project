import {useDispatch, useSelector} from "react-redux";
import {updateBook} from "./store/reducers/bookList-reducer";

function App() {
    const shipsList = useSelector((state) => state.books);
    const dispatch = useDispatch();

  return (
    <div>
      <input value={shipsList.book}
             type="text"
             onChange={(e) => {
                 dispatch(updateBook(e.target.value))
             }}/>
    </div>
  );
}

export default App;
