import { useNavigate } from "react-router-dom";

const Logout = ({ className }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const response = await fetch("http://localhost:8080/invalidate-token", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                } else {
                    console.error("Failed to logout");
                }
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }
    };

    return (
        <button onClick={handleLogout} className={className}>
            Logout
        </button>
    );
};

export default Logout;
