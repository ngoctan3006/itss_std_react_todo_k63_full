import Upload from './Upload';

const Navbar = ({ user, handleImageChanged, logout }) => {
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <Upload userImage={user.image || user.photoURL} onSletctedImage={handleImageChanged} />
        {user.name}
      </div>
      <div className="navbar-item">
        <button className="button is-danger is-light is-small" onClick={logout}>
          {' '}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
