import { useTheme } from "../context/ThemeContext";

function Card() {
    const { isDark } = useTheme();

    return (
        <div
            className={`max-w-sm rounded-lg shadow transition-colors duration-300 ${isDark ? "dark" : ""}`}
        >
            <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800">
                <a href="#">
                    <img
                        className="w-full h-48 object-cover"
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                        alt="Product"
                    />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Premium Wireless Headphones
                        </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Experience crystal-clear sound with our premium wireless
                        headphones. Perfect for music lovers and professionals
                        alike.
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            $299.99
                        </span>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
