import type { RestaurantData } from "../pages/Restaurant";

interface RestaurantFormFieldProp{
    formData:RestaurantData;
    formErrors:Partial<Record<keyof RestaurantData, string>>;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) =>void;
}
const RestaurantFormField = ({formData,formErrors,onChange}:RestaurantFormFieldProp) => {
  return (
    <>    {/* Form */}
        <div className="space-y-2">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={onChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.contact && (
                <p className="text-red-500 text-sm">{formErrors.contact}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {formErrors.street && (
                  <p className="text-red-500 text-sm">{formErrors.street}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Area / Locality
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {formErrors.city && (
                  <p className="text-red-500 text-sm">{formErrors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default RestaurantFormField
