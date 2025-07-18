import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import AddEditRestaurantDialog from "../components/AddEditRestaurantDialog";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import {
  addRestaurant,
  deleteRestaurant,
  fetchRestaurants,
  searchRestaurant,
  updateRestaurant,
} from "../api/restaurantApi";
import Navbar from "../components/Navbar";
import ErrorMessages from "../components/ErrorMessages";
import RestaurantCard from "../components/RestaurantCard";
import Pagination from "../components/Pagination";
import { ToastContainer } from "react-toastify";




export interface RestaurantData {
  id?: string;
  name: string;
  contact: string;
  email: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  images: string[];
}




const Restaurant = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editData, setEditData] = useState<RestaurantData | null>(null);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);



  const getRestaurants = async (): Promise<void> => {
    try {
      setLoading(true);
      const result = await fetchRestaurants(page);
        if (result && result.data) {
      setRestaurants(result.data);
      setTotalPages(result.totalPage);
        }else{
          setRestaurants([]);
      setTotalPages(1);
        }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err);
      setError("Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [page]);

  const handleAddClick = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleEditClick = (restaurant: RestaurantData) => {
    setEditData(restaurant);
    setOpenForm(true);
  };

  const handleDeleteClick = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);
    setOpenDeleteDialog(true);
  };

  const handleFormSubmit = async (
    formData: Omit<RestaurantData, "id"> & { id?: string }
  ) => {
    try {
      if (editData?.id) {
        await updateRestaurant({
          ...formData,
          id: editData.id,
        } as RestaurantData);
      } else {
        await addRestaurant(formData);
      }
      getRestaurants();
    } catch (err) {
      console.error("Failed to save restaurant:", err);
      setError("Failed to save restaurant");
    } finally {
      setOpenForm(false);
      setEditData(null);
    }
  };

  const handleSearch = async(searchQuary:string):Promise<void>=>{
    if(searchQuary === ''){
      setPage(1)
      await getRestaurants();
      return;
    }
    try {
      setLoading(true)
      const restaurants = await searchRestaurant(searchQuary);
      setRestaurants(restaurants);      
      setTotalPages(1);
    } catch (error) {
      setError(`Failed to search restaurants: ${error}`);
    } finally{
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedRestaurant?.id) {
        await deleteRestaurant(selectedRestaurant.id);
        getRestaurants();
      }
    } catch (err) {
      console.error("Failed to delete restaurant:", err);
      setError("Failed to delete restaurant");
    } finally {
      setOpenDeleteDialog(false);
      setSelectedRestaurant(null);
    }
  };

  return (
    <div className="relative max-w-7xl  mx-auto px-4 py-6">
      <Navbar onAddClick={handleAddClick} onSearch={handleSearch} />
      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <div className="text-blue-600 font-medium">
            <LoadingSpinner />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <ErrorMessages errorMsg={error} />}

      {/* Restaurant Cards Grid */}
      {!loading && !error && restaurants.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No restaurants found. Add one!
        </div>
      )}
      <ToastContainer/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-20">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <AddEditRestaurantDialog
        open={openForm}
        handleClose={() => setOpenForm(false)}
        handleSubmit={handleFormSubmit}
        initialData={editData || undefined}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        handleConfirm={handleConfirmDelete}
        restaurantName={selectedRestaurant?.name || ""}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage}/>
    </div>
  );
};

export default Restaurant;
