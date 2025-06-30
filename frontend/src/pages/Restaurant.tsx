import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddEditRestaurantDialog from '../components/AddEditRestaurantDialog';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import { addRestaurant, deleteRestaurant, fetchRestaurants, updateRestaurant } from '../api/restaurantApi';

interface RestaurantData {
  id?: string;
  name: string;
  address: string;
  contact: string;
  email: string;
}

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editData, setEditData] = useState<RestaurantData | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);

  const getRestaurants = async (): Promise<void> => {
    try {
      setLoading(true); 
      const data: RestaurantData[] = await fetchRestaurants();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch restaurants:", err); 
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

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

  const handleFormSubmit = async (formData: Omit<RestaurantData, 'id'> & { id?: string }) => {
    try {
      if (editData?.id) {
        await updateRestaurant({ ...formData, id: editData.id } as RestaurantData);
      } else {
        await addRestaurant(formData);
      }
      getRestaurants();
    } catch (err) {
      console.error("Failed to save restaurant:", err);
      setError('Failed to save restaurant');
    } finally {
      setOpenForm(false); 
      setEditData(null); 
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
      setError('Failed to delete restaurant');
    } finally {
      setOpenDeleteDialog(false); 
      setSelectedRestaurant(null);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Restaurant List</h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <div className="text-blue-600 font-medium"><LoadingSpinner /></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex justify-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Restaurant Cards Grid */}
      {!loading && !error && restaurants.length === 0 && (
        <div className="text-center text-gray-500 text-lg">No restaurants found. Add one!</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.05] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex items-center gap-4">
              <div className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                >
                  <path
                    fill="currentColor"
                    d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4"
                  ></path>
                </svg>
              </div>
              <h2 className="text-white text-xl font-semibold">{restaurant.name}</h2>
            </div>

            {/* Card Content */}
            <div className="p-5 text-gray-700 text-sm space-y-2 flex-1">
              <div>
                <span className="font-semibold text-gray-900">📍 Address:</span>{' '}
                {restaurant.address}
              </div>
              <div>
                <span className="font-semibold text-gray-900">📞 Contact:</span>{' '}
                {restaurant.contact}
              </div>
              <div>
                <span className="font-semibold text-gray-900">📧 Email:</span>{' '}
                {restaurant.email}
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex justify-end gap-2 px-4 pb-4">
              <Fab
                onClick={() => handleEditClick(restaurant)}
                size="small" color="primary" aria-label="edit">
                <EditIcon />
              </Fab>
              <Fab
                onClick={() => handleDeleteClick(restaurant)}
                size="small" color="error" aria-label="delete">
                <DeleteIcon />
              </Fab>
            </div>
          </div>
        ))}
      </div>

      {/* Add Restaurant Button */}
      <Fab
        onClick={handleAddClick}
        size="medium"
        color="secondary"
        aria-label="add"
        className='transform hover:scale-[1.05] transition-all duration-300'
        style={{ position: 'fixed', bottom: '60px', right: '60px', zIndex: 50 }} 
      >
        <AddIcon />
      </Fab>

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
        restaurantName={selectedRestaurant?.name || ''}
      />
    </div>
  );
};

export default Restaurant;