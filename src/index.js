import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './common/store/configureStore';
import Root from './common/components/Root';
import './styles/app.scss'
const store = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./common/components/Root', () => {
        const NewRoot = require('./common/components/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
