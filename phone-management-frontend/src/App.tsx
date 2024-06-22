import { Provider } from "react-redux";
import { store } from "store/store";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
