import './App.css';

//router
import { Route, Switch, HashRouter } from 'react-router-dom';

//components
import Layout from './hoc/Layout';

//containers
import ListBuilder from './containers/ListBuilder/ListBuilder';
import DetailBuilder from './containers/DetailBuilder/DetailBuilder';
import MyListBuilder from './containers/MyListBuilder/MyListBuilder';

const App = () => {
  return (
    <Layout>
        <Switch>
          <Route path="/" exact component={ListBuilder} />
          <Route path="/pokemon-detail" exact component={DetailBuilder} />
          <Route path="/my-pokemon-list" exact component={MyListBuilder} />
          <Route path="/catch-random-pokemon" exact component={DetailBuilder} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
    </Layout>
  );
}

export default App;