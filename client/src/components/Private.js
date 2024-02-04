import { Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import ExamsForm from './../routes/private/ExamsForm/ExamsForm';
import ResultsForm from './../routes/private/ResultsForm/ResultsForm';
import PaymentForm from './../routes/private/PaymentForm/PaymentForm';

const Private = () => (
  <>
    <Header mode="private" />
    <Switch>
      <Route path="/private/exams">
        <ExamsForm />
      </Route>

      <Route path="/private/results">
        <ResultsForm />
      </Route>

      <Route path="/private/payments">
        <PaymentForm />
      </Route>
    </Switch>
  </>
);

export default Private;
