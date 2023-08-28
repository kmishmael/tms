import React from 'react';

const styles = {
  i: {
    marginRight: '5px',
  },
  td: {
    maxWidth: '250px',
  },
  navbar: {
    padding: '15px 10px',
    background: '#fff',
    marginBottom: '40px',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
  },
  navLink: {
    outline: 'none',
  },
  wrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'stretch',
  },
  sidebar: {
    boxShadow: '1px 0 3px rgba(0, 0, 0, .1)',
  },
  navLinkSidebar: {
    color: '#aaa',
    transition: '0.3s all',
  },
  activeNavLink: {
    color: '#000',
  },
  hoverNavLink: {
    color: '#000',
  },
  content: {
    width: '100%',
    padding: '20px',
    minHeight: '100vh',
  },
  lowPriority: {
    color: 'green',
  },
  medPriority: {
    color: 'darkgoldenrod',
  },
  highPriority: {
    color: 'red',
  },
};

const App: React.FC = () => {
  return (
    <div>
      <nav style={styles.navbar}>
        {/* Navbar content */}
      </nav>
      <div style={styles.wrapper}>
        <div style={styles.sidebar}>
          {/* Sidebar content */}
        </div>
        <div id="content" style={styles.content}>
          {/* Content */}
        </div>
      </div>
    </div>
  );
};

export default App;
