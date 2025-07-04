import type { RestaurantData } from "../pages/Restaurant";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface RestaurantCardProp {
  restaurant: RestaurantData;
  onDelete: (r: RestaurantData) => void;
  onEdit: (r: RestaurantData) => void;
}

// Helper to construct full address
const formatAddress = (r: RestaurantData) => {
  return `${r.street}, ${r.landmark}, ${r.area}, ${r.city}, ${r.state} - ${r.pincode}, ${r.country}`;
};

const RestaurantCard = ({
  restaurant,
  onDelete,
  onEdit,
}: RestaurantCardProp) => {
  return (
    <div
      key={restaurant.id}
      className="bg-white rounded-md shadow-md transition hover:shadow-lg hover:scale-[1.01] duration-200 w-full max-w-xs mx-auto flex flex-col"
    >
      {/* Card Header */}
      <div className="h-40 w-full overflow-hidden rounded-t-md">
        <img
          className="w-full h-full object-cover"
          src="https://i.pinimg.com/736x/63/c1/f3/63c1f38307b961d147e211e7ebacfdd0.jpg"
          alt={restaurant.name}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 text-gray-800 text-sm">
        <h2 className="text-lg font-semibold mb-1">{restaurant.name}</h2>
        <div>
          <span className="text-xs font-medium">Address:</span>{" "}
          {formatAddress(restaurant)}
        </div>
        <div>
          <span className="text-xs font-medium">Contact:</span>{" "}
          {restaurant.contact}
        </div>
        <div>
          <span className="text-xs font-medium">Email:</span>{" "}
          {restaurant.email}
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex justify-end gap-2 px-4 pb-4">
        <button
          onClick={() => onEdit(restaurant)}
          className="text-blue-500 hover:text-blue-700"
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(restaurant)}
          className="text-red-500 hover:text-red-700"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
