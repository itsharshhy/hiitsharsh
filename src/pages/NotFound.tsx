import { Link } from 'react-router-dom';
import Page from '../components/Page';

export default function NotFound() {
  return (
    <Page title="Lost page" className="lost">
      <p className="lost__num">404</p>
      <p className="scribble">this page fell behind the desk.</p>
      <Link to="/" className="btn btn--cream">back to the archive</Link>
    </Page>
  );
}
