
const Home = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();
  const isAuthenticated = !!user;

  const featuredPlants = [
    {
      id: 1,
      name: 'Monstera Deliciosa',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
      description: 'Beautiful Swiss cheese plant with distinctive leaf holes'
    },
    {
      id: 2,
      name: 'Fiddle Leaf Fig',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
      description: 'Popular indoor tree with large, glossy leaves'
    },
    {
      id: 3,
      name: 'Snake Plant',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400',
      description: 'Low-maintenance plant perfect for beginners'
    }
  ];

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Plant Paradise</h1>
          <p>Discover beautiful plants for your home</p>
          <div className="hero-buttons">
            <Link to="/plants" className="btn btn-primary hero-btn">
              Shop Plants
            </Link>
            {!isAuthenticated && (
              <button 
                onClick={openAuthModal} 
                className="btn btn-secondary hero-btn"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="featured-plants">
        <div className="container">
          <h2>Featured Plants</h2>
          <div className="plants-grid">
            {featuredPlants.map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.image} alt={plant.name} className="plant-image" />
                <div className="plant-info">
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <div className="plant-price">NPR {plant.price.toLocaleString()}</div>
                  <Link to={`/plants/${plant.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/plants" className="btn btn-secondary">
              View All Plants
            </Link>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        initialMode="login"
      />
    </div>
  );
};

export default Home;