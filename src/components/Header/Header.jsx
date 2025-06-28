import { Container, Logo } from "../../components";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "LogOut", slug: "/logout", active: authStatus },
    { name: "All Post", slug: "/all-post", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavigation = async (item) => {
    if (item.slug === "/logout") {
      const userLogout = await authService.logout();
      if (userLogout) {
        dispatch(logout());
        navigate("/");
      }
    } else {
      navigate(item.slug);
    }
  };

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            
            <h1 className="text-2xl font-bold text-gray-800">DevConnect</h1>
          </div>

          {/* Navigation Buttons */}
          <ul className="flex items-center gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className="px-4 py-2 border border-gray-700 rounded-full text-sm font-medium text-gray-800 bg-white hover:bg-gray-800 hover:text-white transition duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
