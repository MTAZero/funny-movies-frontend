import { RouterProvider } from 'react-router-dom';
import { routes } from './routers';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ReactNotifications } from 'react-notifications-component';

import 'react-notifications-component/dist/theme.css';

function App() {
    return (
        <div className="app-container">
            <ReactNotifications />
            <Provider store={store}>
                <RouterProvider router={routes}></RouterProvider>
            </Provider>
        </div>
    );
}

export default App;
