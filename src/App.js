import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "./routes/routing";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          {routes.map(elem =>
              <Route path={elem.path}
                     element={<elem.component/>}
                     key={elem.path}/>
          )}
          <Route path="*"
                 element={<Navigate to="/" replace />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
