import axios from "axios";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://car-rental-app-backend-1-gb8e.onrender.com";

const CAR_IMAGE_BASE_URL =`${BASE_URL}/car-images`;

const API_URL = `${BASE_URL}/home/cars`;
const LOGIN = `${BASE_URL}/home/login`;
// const FORGOT_PASSWORD = "http://localhost:8080/home/forgot-password";

const CART_API_URL = `${BASE_URL}/user/getCarts`;
const DELETE_CART_BY_ID = `${BASE_URL}/user/deleteCarts`;
const GET_USER_BY_EMAIL = `${BASE_URL}/user/getUserByEmail`;
const UPDATE_USER = `${BASE_URL}/user/updateProfile`;
const ALL_USERS_FETCH_API_URL = `${BASE_URL}/user/getAllUsers`;
const USER_ALL_DOCUMENTS = `${BASE_URL}/user/listOfDocuments`;
const DELETE_Document_BY_ID = `${BASE_URL}/user/deleteUserDocument`;
const TripDetailsForHistoryApi = `${BASE_URL}/user/TripDetailsForHistory`;



const UPDATE_CAR_API_URL = `${BASE_URL}/auth/admin/updateCar`;
const DELETE_CAR_BY_ID = `${BASE_URL}/auth/admin/deleteCarById`;
const DELETE_USER_BY_ID = `${BASE_URL}/auth/admin/deleteUserById`;
const UPDATE_USER_STATUS = `${BASE_URL}/auth/admin/updateUserStatus`;
const UPDATE_USER_ROLE = `${BASE_URL}/auth/admin/updateUserRole`;
const DELETE_BOOKING_BY_ID = `${BASE_URL}/auth/admin/deleteBookingById`;
// ========================
// AUTH HEADER
// ========================

// const getAuthHeader = () => {
//   const email = localStorage.getItem("email");
//   const password = localStorage.getItem("password");

//   if (!email || !password) {
//     return {};
//   }

//   return {
//     Authorization: `Basic ${btoa(`${email}:${password}`)}`
//   };
// };

const getAuthHeader = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!email || !password) {
    console.warn("⚠️ Missing credentials for auth header");
    return {};
  }

  try {
    const encoded = btoa(`${email}:${password}`);
    return {
      Authorization: `Basic ${encoded}`
    };
  } catch (error) {
    console.error("❌ Error encoding auth credentials:", error);
    return {};
  }
};




export const getAllCars = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Get all Cars : ",response.data);
    return response.data.map((car) => ({
      id: car.id,

      // Keep exact backend car ID
      carId: car.id,

      name: car.name,
      brand: car.brand,
      price: car.price,
      fuelType: car.fuelType,
      transmition: car.transmition,
      seating: car.seating,

      // Keep both names because different components may use either one
      mainImage: car.mainImage,
      image: car.mainImage,

      status: car.status,
      available: car.status,

      img1: car.img1,
      img2: car.img2,
      img3: car.img3,

      rating: car.rating,
      reviews: car.reviews,

      features: [
        car.features?.feature1,
        car.features?.feature2,
        car.features?.feature3,
        car.features?.feature4,
        car.features?.feature5,
      ].filter(Boolean),

      description: car.description,
    }));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

// export const forgotPassword = async (email) => {
//   const response = await fetch(FORGOT_PASSWORD, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//     }),
//   });

//   let data = {};

//   try {
//     data = await response.json();
//   } catch (error) {
//     data = {};
//   }

//   if (!response.ok) {
//     throw new Error(
//       data.message || "Unable to process forgot password request"
//     );
//   }

//   return data;
// };

export const getCarById = async (id) => {
  try {

    console.log("Car Id :", id);

    const response = await axios.get(
      `${API_URL}/${id}`,
      {
        headers: getAuthHeader()
      }
    );

    return response.data;

  } catch (error) {
    console.error("Error fetching car by id:", error);
    return null;
  }
};

// ========================
// LOGIN
// ========================

// export const login = async (email, password) => {
//   const response = await fetch(LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       email,
//       password
//     })
//   });

//   const data = await response.json();
//   console.log("Login Response:", data);

//   if (!response.ok) {
//     throw new Error(data.message || "Login failed");
//   }

//   localStorage.setItem("email", email);
//   localStorage.setItem("password", password);

//   if (data.user) {
//     localStorage.setItem("user", JSON.stringify(data.user));
//   }

//   return data;
// };

// export const login = async (email, password) => {

//   const response = await fetch(LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       email,
//       password
//     })
//   });

//   const data = await response.json();

//   console.log("Login Response:", data);

//   if (!response.ok) {
//     throw new Error(data.message || "Login failed");
//   }

//   localStorage.setItem("email", email);
//   localStorage.setItem("password", password);

//   if (data.user) {
//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("id", data.user.id);
//     localStorage.setItem("userId", data.user.id);
//     localStorage.setItem("avatar", data.user.avatar);
//     localStorage.setItem("email", data.user.email);
//     localStorage.setItem("firstName", data.user.firstName);
//     localStorage.setItem("lastName", data.user.lastName);
//     localStorage.setItem("phone", data.user.phone);
//     localStorage.setItem("role", data.user.role);
//   }

//   return data;
// };
export const login = async (email, password) => {

  const response = await fetch(LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  console.log("Login Response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  if (data.user) {

    // Clear previous user's data
    localStorage.clear();

    // Store current logged-in user's data
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("id", data.user.id);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("avatar", data.user.avatar);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("password", password);
    localStorage.setItem("firstName", data.user.firstName);
    localStorage.setItem("lastName", data.user.lastName);
    localStorage.setItem("phone", data.user.phone);
    localStorage.setItem("role", data.user.role);
     console.log("--------------------------------------------------");
    console.log("Email    : ", localStorage.getItem("email"));
    console.log("Password : ", localStorage.getItem("password") ) ;
    console.log("UserId     : ", localStorage.getItem("userId"));
    console.log("--------------------------------------------------");
  }

  return data;
};

export const TripDetailsForHistory = async (car_id) => {
    try {
        const user_id = localStorage.getItem('userId'); 

        if (!user_id) {
            throw new Error("User ID is missing.");
        }

        const response = await axios.get(`${TripDetailsForHistoryApi}/${car_id}/${user_id}`);
        console.log("TripDetailsForHistory Response :",response);
        return response.data;

    } catch (error) {
        console.error("Error fetching trip details:", error);
        throw error;
    }
};

// ========================
// CARTS
// ========================

// export const getAllCarts = async () => {

//   try {

//     const userId = localStorage.getItem("userId");
//     console.log("I am in get all carts : ", userId);

//     if (!userId) {
//       console.error("User ID is missing");
//       return [];
//     }

//     console.log("Getting carts for user:", userId);

//     const response = await axios.get(`${CART_API_URL}/${userId}`, {
//       headers: getAuthHeader()
//     });

//     console.log("Cart API response:", response.data);

//     return response.data.map((car) => ({

//       id: car.id,
//       name: car.name,
//       brand: car.brand,
//       price: car.price,
//       fuelType: car.fuelType,
//       transmition: car.transmition,
//       seating: car.seating,
//       image: car.mainImage,
//       available: car.status,
//       img1: car.img1,
//       img2: car.img2,
//       img3: car.img3,
//       rating: car.rating,
//       reviews: car.reviews,
//       features: [
//         car.features?.feature1,
//         car.features?.feature2,
//         car.features?.feature3,
//         car.features?.feature4,
//         car.features?.feature5
//       ].filter(Boolean),
//       description: car.description
//     }));
//   } catch (error) {
//     console.error("Error fetching carts:", error);
//     return [];
//   }
// };

export const getAllCarts = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID is missing");
      return [];
    }

    const response = await axios.get(
      `${CART_API_URL}/${userId}`,
      {
        headers: getAuthHeader(),
        withCredentials: true,
      }
    );

    console.log("RAW CART API RESPONSE:", response.data);

    if (!Array.isArray(response.data)) {
      console.error(
        "Cart API response is not an array:",
        response.data
      );
      return [];
    }

    return response.data.map((cart) => {
      /*
       * New backend DTO uses cartId.
       * Fallback to id supports an older backend response.
       */
      const resolvedCartId =
        cart.cartId ?? cart.id;

      console.log("Mapping cart:", {
        backendCartId: cart.cartId,
        backendId: cart.carId,
        resolvedCartId,
        carId: cart.carId,
      });

      return {
        cartId: resolvedCartId,

        // Temporary support for old frontend code
        id: resolvedCartId,

        // Actual admin_cars_data ID
        carId: cart.carId,

        userId: cart.userId,

        name: cart.name,
        brand: cart.brand,
        price: cart.price,
        fuelType: cart.fuelType,
        transmition: cart.transmition,
        seating: cart.seating,

        mainImage: cart.mainImage,
        image: cart.mainImage,

        createdAt: cart.createdAt,
      };
    });
  } catch (error) {
    console.error(
      "Error fetching carts:",
      error.response?.data || error.message
    );

    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const userId = localStorage.getItem("userId");
    console.log("I am in getAllUsers:", userId);

    const response = await axios.get(`${ALL_USERS_FETCH_API_URL}`, {
      headers: getAuthHeader()
    });

    console.log("Uses Response : ", response.data);

    return response.data.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email,
      phone: user.phone,
      password: user.password,
      avatar: user.avatar,
      role: user.role,
      status: user.status,

    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// export const getAllUserDocuments = async () => {
//   try {
//     const response = await axios.get(USER_ALL_DOCUMENTS, {
//       headers: getAuthHeader(),
//     });

//     console.log("Documents Response:", response.data);

//     return response.data.map((document) => {
//       // Supports both flattened DTO and nested user object
//       const user = document.user || {};

//       return {
//         id: document.id,

//         userId: document.userId ?? user.id,
//         firstName: document.firstName ?? user.firstName,
//         lastName: document.lastName ?? user.lastName,

//         fullName:
//           document.fullName ||
//           `${document.firstName ?? user.firstName ?? ""} ${
//             document.lastName ?? user.lastName ?? ""
//           }`.trim(),

//         email: document.email ?? user.email,
//         phone: document.phone ?? user.phone,

//         drivingLicense: document.drivingLicense,
//         aadhharCard: document.aadhharCard,

//         status: document.status || "PENDING",
//         reason: document.reason || "",
//       };
//     });
//   } catch (error) {
//     console.error(
//       "Error fetching user documents:",
//       error.response?.data || error.message
//     );

//     return [];
//   }
// };
export const getAllUserDocuments = async () => {
  try {
    const response = await axios.get(USER_ALL_DOCUMENTS, {
      headers: getAuthHeader(),
    });

    console.log("Documents Response:", response.data);

    return response.data.map((document) => {
      const user = document.user || {};

      return {
        id: document.id,

        userId: document.userId ?? user.id,

        firstName:
          document.firstName ??
          user.firstName ??
          "",

        lastName:
          document.lastName ??
          user.lastName ??
          "",

        fullName:
          document.fullName ||
          `${document.firstName ?? user.firstName ?? ""} ${
            document.lastName ?? user.lastName ?? ""
          }`.trim(),

        email:
          document.email ??
          user.email ??
          "",

        phone:
          document.phone ??
          user.phone ??
          "",

        // Files
        drivingLicense: document.drivingLicense,
        aadhharCard: document.aadhharCard,
        

        // Add these two document number fields
        drivingLicenseNo:
          document.drivingLicenseNo ??
          document.drivingLicenseNumber ??
          "",
        licenseExpiry : document.licenseExpiry,

        aadharNo:
          document.aadharNo ??
          document.aadhaarNumber ??
          document.aadhaarCardNumber ??
          "",

        status: String(
          document.status || "PENDING",
        ).toUpperCase(),

        reason: document.reason || "",
      };
    });
  } catch (error) {
    console.error(
      "Error fetching user documents:",
      error.response?.data || error.message,
    );

    return [];
  }
};

  // export const updateUserDocument = async (
  //   userId,
  //   documentType,
  //   formData
  // ) => {



  //   // 1. Get the auth header
  //   const authHeader = getAuthHeader();
  
  //   // 2. Safety check: If no auth header, don't even send the request
  //   if (!authHeader.Authorization) {
  //     throw new Error("Authentication credentials missing. Please log in again.");
  //   }

  //   const response = await axios.put(
  //     `http://localhost:8080/user/update-document/${userId}/${documentType}`,
  //     formData,
  //     {
  //       headers: {
  //         ...getAuthHeader(),
  //       },
  //     }
  //   );

  //   return response.data;
  // };

  export const updateUserDocument = async (userId, documentType, formData) => {
  // 1. Get the auth header
  const authHeader = getAuthHeader();
  
  // 2. Safety check: If no auth header, don't even send the request
  if (!authHeader.Authorization) {
    throw new Error("Authentication credentials missing. Please log in again.");
  }

  const response = await axios.put(
    `${BASE_URL}/user/update-document/${userId}/${documentType}`,
    formData,
    {
      headers: {
        ...authHeader,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export const getCartById = async (id) => {
  try {

    const userId = localStorage.getItem("userId");
    console.log("I am in get cart by id : ", userId);

    const response = await axios.get(`${CART_API_URL}/${id}/${userId}`, {
      headers: getAuthHeader()
    });
    console.log("response.data :",response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching cart by id:", error);
    return null;
  }
};

// export const saveCarToCart = async (car) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     const cartData = {
//       userId: parseInt(userId),
//       carId: car.carId,
//       mainImage: car.mainImage,
//       img1: car.img1,
//       img2: car.img2,
//       img3: car.img3,
//       status: car.status,
//       fuelType: car.fuelType,
//       name: car.name,
//       seating: car.seating,
//       transmition: car.transmition,
//       price: car.price,
//       description: car.description,
//       brand: car.brand,
//       rating: car.rating,
//       reviews: car.reviews,

//       features: {
//         feature1: car.features?.feature1,
//         feature2: car.features?.feature2,
//         feature3: car.features?.feature3,
//         feature4: car.features?.feature4,
//         feature5: car.features?.feature5
//       }
//     };

//     console.log("Cart data : ", cartData);

//     const response = await axios.post(
//       "http://localhost:8080/user/cart",
//       cartData,
//       {
//         headers: getAuthHeader()
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error saving cart:", error);
//     throw error;
//   }
// };

export const saveCarToCart = async (car) => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User is not logged in");
    }

    // Get the actual AdminCarsData ID
    const actualCarId = car.carId ?? car.id;

    if (!actualCarId) {
      throw new Error("Car ID is missing");
    }

    const cartData = {
      userId: Number(userId),
      carId: Number(actualCarId),
    };

    console.log("Car Object:", car);
    console.log("Cart Request:", cartData);

    const response = await axios.post(
      `${BASE_URL}/user/cart`,
      cartData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error saving cart:",
      error.response?.data || error.message
    );

    throw error;
  }
};

// export const carBooking = async (booking) => {
//   try {

//     const userId = localStorage.getItem("userId");

//     const bookingData = {
//       userId: parseInt(userId),

//       carName: booking.carName,
//       brand: booking.brand,
//       mainImage: booking.mainImage,

//       price: booking.price,

//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,

//       pickupLocation: booking.pickupLocation,
//       dropoffLocation: booking.dropoffLocation,

//       tripType: booking.tripType,

//       days: booking.days,
//       total: booking.total,

//       bookingStatus: "CONFIRMED"
//     };

//     console.log("Booking Data :", bookingData);

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: getAuthHeader()
//       }
//     );

//     return response.data;

//   } catch (error) {

//     console.error("Booking Error :", error);
//     throw error;

//   }
// };

// export const carBooking = async (booking) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       throw new Error("User is not logged in");
//     }

//     if (!booking.carId) {
//       throw new Error("Car ID is missing");
//     }

//     console.log("Car id is : ",booking.carId);

//     const bookingData = {
//       userId: Number(userId),

//       carId: Number(booking.carId),
      

//       carName: booking.carName,
//       brand: booking.brand,
//       mainImage: booking.mainImage,

//       price: Number(booking.price),

//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,

//       pickupLocation: booking.pickupLocation,
//       dropoffLocation: booking.dropoffLocation,

//       tripType: booking.tripType,

//       days: Number(booking.days),
//       total: Number(booking.total),

//       bookingStatus: "PENDING",
//     };

//     console.log("Booking Request:", bookingData);

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: getAuthHeader(),
//       }
//     );

//     return response.data;

//   } catch (error) {
//     console.error(
//       "Booking Error:",
//       error.response?.data || error.message
//     );

//     throw error;
//   }
// };

// export const carBooking = async (booking) => {
//   try {
//     const userId =
//       localStorage.getItem("userId");

//     if (!userId) {
//       throw new Error(
//         "User is not logged in"
//       );
//     }

//     if (!booking?.carId) {
//       throw new Error(
//         "Car ID is missing"
//       );
//     }

//     const bookingData = {
//       userId: Number(userId),

//       carId: Number(booking.carId),

//       // carName:
//       //   booking.carName ?? booking.name,

//       // brand: booking.brand,

//       // mainImage:
//       //   booking.mainImage ??
//       //   booking.image,

//        price: Number(booking.price),

//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,

//       pickupLocation:
//         booking.pickupLocation,

//       dropoffLocation:
//         booking.dropoffLocation,

//       tripDriverType: booking.tripDriverType,
//       days: Number(booking.days),
//       total: Number(booking.total),

//       bookingStatus: "PENDING",
//     };

//     console.log(
//       "Booking Request:",
//       bookingData
//     );

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: {
//           ...getAuthHeader(),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Booking Error:",
//       error.response?.data ||
//         error.message
//     );

//     throw error;
//   }
// };

// export const carBooking = async (booking) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       throw new Error("User is not logged in");
//     }

//     if (!booking?.carId) {
//       throw new Error("Car ID is missing");
//     }

//     const bookingData = {
//       userId: Number(userId),
//       carId: Number(booking.carId),

//       price: Number(booking.price),

//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,

//       pickupLocation: booking.pickupLocation,
//       dropoffLocation: booking.dropoffLocation,

//       tripDriverType: booking.tripDriverType,

//       days: Number(booking.days),
//       total: Number(booking.total),

//       bookingStatus: "PENDING",
//     };

//     console.log("Booking Request:", bookingData);

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: {
//           ...getAuthHeader(),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Full booking error:", error);
//     console.error("Backend response:", error.response?.data);

//     const backendMessage =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       error.message ||
//       "Unable to book this car";

//     throw new Error(backendMessage);
//   }
// };
// export const carBooking = async (booking) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       throw new Error("User is not logged in");
//     }

//     if (!booking?.carId) {
//       throw new Error("Car ID is missing");
//     }

//     const bookingData = {
//       userId: Number(userId),

//       carId: Number(booking.carId),

//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,

//       pickupLocation: booking.pickupLocation,
//       dropoffLocation: booking.dropoffLocation,

//       tripDriverType: booking.tripDriverType,

//       days: Number(booking.days),
//       price: Number(booking.price),
//       total: Number(booking.total),

//       bookingStatus: "PENDING",
//     };

//     console.log("=================================");
//     console.log("BOOKING API REQUEST");
//     console.log("=================================");
//     console.log("Booking Data:", bookingData);

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: {
//           ...getAuthHeader(),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Booking API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Booking Error:",
//       error.response?.data || error.message
//     );

//     const backendMessage =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       error.message ||
//       "Unable to book this car";

//     throw new Error(backendMessage);
//   }
// };
// export const carBooking = async (booking) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       throw new Error("User is not logged in");
//     }

//     if (!booking?.carId) {
//       throw new Error("Car ID is missing");
//     }

//     // Build the booking data with all required fields
//     const bookingData = {
//       userId: Number(userId),
//       carId: Number(booking.carId),
//       pickupDate: booking.pickupDate,
//       dropoffDate: booking.dropoffDate,
//       pickupLocation: booking.pickupLocation || "",
//       dropoffLocation: booking.dropoffLocation || "",
//       tripDriverType: booking.tripDriverType || booking.tripType || "SELF_DRIVE",
//       days: Number(booking.days),
//       price: Number(booking.price),
//       total: Number(booking.total),
//       bookingStatus: booking.bookingStatus || "PENDING",
//     };

//     // Add driver details if provided (for self-drive bookings)
//     if (booking.driverDetails) {
//       bookingData.driverDetails = booking.driverDetails;
//     }

//     console.log("=================================");
//     console.log("📤 BOOKING API REQUEST");
//     console.log("=================================");
//     console.log("Booking Data:", JSON.stringify(bookingData, null, 2));

//     const response = await axios.post(
//       "http://localhost:8080/user/booking",
//       bookingData,
//       {
//         headers: {
//           ...getAuthHeader(),
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ Booking API Response:", response.data);
//     return response.data;

//   } catch (error) {
//     console.error("❌ Booking Error:", error.response?.data || error.message);
    
//     // Extract meaningful error message
//     const backendMessage = 
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       error.message ||
//       "Unable to book this car";

//     throw new Error(backendMessage);
//   }
// };
export const carBooking = async (booking) => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      throw new Error("User is not logged in");
    }

    if (!booking?.carId) {
      throw new Error("Car ID is missing");
    }

    // Build the booking data with all required fields
    const bookingData = {
      userId: Number(userId),
      carId: Number(booking.carId),
      pickupDate: booking.pickupDate,
      dropoffDate: booking.dropoffDate,
      pickupLocation: booking.pickupLocation || "",
      dropoffLocation: booking.dropoffLocation || "",
      tripDriverType: booking.tripDriverType || booking.tripType || "SELF_DRIVE",
      days: Number(booking.days),
      price: Number(booking.price),
      total: Number(booking.total),
      bookingStatus: booking.bookingStatus || "PENDING",
      source: "WHATSAPP", // Add source to differentiate
    };

    // Add driver details if provided (for self-drive bookings)
    if (booking.driverDetails) {
      bookingData.driverDetails = booking.driverDetails;
    }

    console.log("=================================");
    console.log("📤 BOOKING API REQUEST (WHATSAPP)");
    console.log("=================================");
    console.log("Booking Data:", JSON.stringify(bookingData, null, 2));

    const response = await axios.post(
      `${BASE_URL}/user/booking`,
      bookingData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Booking API Response:", response.data);
    return response.data;

  } catch (error) {
    console.error("❌ Booking Error:", error.response?.data || error.message);
    
    // Check if it's a duplicate/car already booked error
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
    
    // If status is 409 (Conflict) or 400 (Bad Request) with duplicate message
    if (statusCode === 409 || 
        statusCode === 400 || 
        errorMessage?.toLowerCase().includes("already booked") ||
        errorMessage?.toLowerCase().includes("duplicate") ||
        errorMessage?.toLowerCase().includes("conflict")) {
      throw new Error("This car is already booked for the selected dates. Please choose different dates.");
    }
    
    // Extract meaningful error message
    const backendMessage = 
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unable to book this car";

    throw new Error(backendMessage);
  }
};

export const createWhatsAppBooking = async (booking) => {

  try {

    const userId =
      localStorage.getItem("userId");

    const bookingData = {
      userId: Number(userId),

      carId: Number(booking.carId),

      pickupDate: booking.pickupDate,

      dropoffDate: booking.dropoffDate,

      pickupLocation:
        booking.pickupLocation,

      dropoffLocation:
        booking.dropoffLocation,

      tripDriverType:
        booking.tripDriverType,

      days: Number(booking.days),

      price: Number(booking.price),

      total: Number(booking.total)
    };

    const response = await axios.post(
      `${BASE_URL}/api/whatsapp/whatsapp-booking`,
      bookingData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {

    console.error(
      "WhatsApp booking error:",
      error.response?.data ||
      error.message
    );

    throw new Error(
      error.response?.data?.message ||
      "Unable to create WhatsApp booking"
    );
  }
};

// ==========================================
// HANDLE BOOKING RESPONSE - Updated
// ==========================================
const handleBookingResponse = (response, bookingPayload) => {
  console.log("📥 Processing booking response:", response);
  
  let bookingData = null;
  let bookingId = null;
  let success = false;
  let message = "";
  
  // Check if response indicates an error
  if (response?.error || response?.success === false) {
    throw new Error(response.message || "Booking failed");
  }
  
  // Handle different response formats from backend
  if (Array.isArray(response)) {
    // Backend returns list of bookings
    const latestBooking = response[response.length - 1];
    if (latestBooking) {
      bookingData = latestBooking;
      bookingId = latestBooking.bookingId || latestBooking.id;
      success = true;
      message = "Booking request sent to admin successfully!";
      addBooking(latestBooking);
    }
  } else if (response?.data) {
    // Response wrapped in data field
    bookingData = response.data;
    bookingId = bookingData.bookingId || bookingData.id;
    success = true;
    message = response.message || "Booking request sent to admin successfully!";
    addBooking(bookingData);
  } else if (response?.bookingId || response?.id) {
    // Direct booking object
    bookingData = response;
    bookingId = response.bookingId || response.id;
    success = true;
    message = "Booking request sent to admin successfully!";
    addBooking(response);
  } else if (response?.message && response?.status) {
    // Simple status response
    success = response.status === "success";
    message = response.message;
    if (response.bookingId) {
      bookingId = response.bookingId;
    }
  } else {
    console.warn("⚠️ Unknown response format:", response);
    throw new Error("Unexpected response format from server");
  }
  
  return {
    success,
    message,
    bookingData,
    bookingId
  };
};

// ==========================================
// HANDLE CONFIRM BOOKING - Updated
// ==========================================
const handleConfirmBooking = async () => {
  // Step 1 validation
  if (!validateStep1()) {
    setStep(1);
    return;
  }

  // Self-drive validation
  if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
    setStep(2);
    return;
  }

  setIsLoading(true);

  try {
    const bookingPayload = createBookingPayload();
    console.log("🚀 Sending booking payload:", bookingPayload);
    
    const response = await carBooking(bookingPayload);
    
    // Process the response
    const result = handleBookingResponse(response, bookingPayload);
    
    if (result.success) {
      setToast({
        message: result.message,
        type: "success",
      });
      
      // Store booking ID for tracking
      if (result.bookingId) {
        localStorage.setItem("lastBookingId", result.bookingId);
      }
      
      // Navigate to dashboard to see booking status
      setTimeout(() => {
        navigate("/dashboard", {
          state: {
            activeTab: "bookings",
            newBookingId: result.bookingId
          }
        });
      }, 2000);
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("❌ Booking Error:", error);
    
    const errorMessage = error?.message || "Booking failed!";
    
    // Check for specific error types
    if (errorMessage.toLowerCase().includes("already booked")) {
      setToast({
        message: "This car is already booked for the selected dates. Please choose different dates.",
        type: "error",
      });
    } else if (errorMessage.toLowerCase().includes("blocked")) {
      setToast({
        message: "Your account is blocked. Please contact admin for assistance.",
        type: "error",
      });
    } else {
      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  } finally {
    setIsLoading(false);
  }
};

// ==========================================
// HANDLE BOOK VIA WHATSAPP - Updated
// ==========================================
const handleBookViaWhatsApp = async () => {
  // Step 1 validation
  if (!validateStep1()) {
    setStep(1);
    setToast({
      message: "Please complete all booking details first.",
      type: "error",
    });
    return;
  }

  // Self-drive validation
  if (formData.tripType === "SELF_DRIVE" && !validateStep2()) {
    setStep(2);
    setToast({
      message: "Please complete the driver details.",
      type: "error",
    });
    return;
  }

  setIsLoading(true);

  try {
    const bookingPayload = createBookingPayload();
    console.log("📦 WhatsApp Booking Payload:", bookingPayload);

    // Save booking to database
    console.log("💾 Saving booking to database...");
    const response = await carBooking(bookingPayload);
    
    // Process the response
    const result = handleBookingResponse(response, bookingPayload);
    
    if (!result.success || !result.bookingId) {
      throw new Error(result.message || "Booking was not saved properly.");
    }

    console.log("✅ Booking saved with ID:", result.bookingId);
    
    // Store booking ID
    localStorage.setItem("lastBookingId", result.bookingId);
    
    // Build WhatsApp message with booking details
    const message = buildWhatsAppMessage(bookingPayload, result.bookingData);
    
    // Business WhatsApp number
    const whatsappNumber = "918378891656";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    
    setToast({
      message: `Booking #${result.bookingId} saved successfully! Redirecting to WhatsApp...`,
      type: "success",
    });

    // Navigate to dashboard after delay
    setTimeout(() => {
      navigate("/dashboard", {
        state: {
          activeTab: "bookings",
          newBookingId: result.bookingId
        }
      });
    }, 3000);

  } catch (error) {
    console.error("❌ WhatsApp Booking Error:", error);
    
    const errorMessage = error?.message || "Unable to process booking.";
    
    if (errorMessage.toLowerCase().includes("already booked")) {
      setToast({
        message: "This car is already booked for the selected dates. Please choose different dates.",
        type: "error",
      });
    } else if (errorMessage.toLowerCase().includes("blocked")) {
      setToast({
        message: "Your account is blocked. Please contact admin.",
        type: "error",
      });
    } else {
      setToast({
        message: errorMessage,
        type: "error",
      });
    }
  } finally {
    setIsLoading(false);
  }
};

// ========================
// BOOKING HELPERS
// ========================

export const validateBookingData = (bookingData) => {
  const errors = [];

  if (!bookingData.carId) {
    errors.push("Car ID is required");
  }

  if (!bookingData.pickupDate) {
    errors.push("Pickup date is required");
  }

  if (!bookingData.dropoffDate) {
    errors.push("Dropoff date is required");
  }

  if (!bookingData.pickupLocation) {
    errors.push("Pickup location is required");
  }

  if (!bookingData.dropoffLocation) {
    errors.push("Dropoff location is required");
  }

  if (!bookingData.tripDriverType) {
    errors.push("Trip type is required");
  }

  if (!bookingData.days || bookingData.days <= 0) {
    errors.push("Valid number of days is required");
  }

  if (!bookingData.price || bookingData.price <= 0) {
    errors.push("Valid price is required");
  }

  if (!bookingData.total || bookingData.total <= 0) {
    errors.push("Valid total is required");
  }

  // For self-drive bookings, validate driver details
  if (bookingData.tripDriverType === "SELF_DRIVE" && bookingData.driverDetails) {
    const driver = bookingData.driverDetails;
    
    if (!driver.firstName) errors.push("Driver first name is required");
    if (!driver.lastName) errors.push("Driver last name is required");
    if (!driver.licenseNumber) errors.push("License number is required");
    if (!driver.licenseExpiry) errors.push("License expiry date is required");
    if (!driver.aadhaarNumber) errors.push("Aadhaar number is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const deleteCartById = async (id) => {
  try {
    const response = await axios.post(
      `${DELETE_CART_BY_ID}/${id}`,
      {},
      {
        headers: getAuthHeader()
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    return null;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${GET_USER_BY_EMAIL}/${email}`,
      {
        headers: getAuthHeader(),
        withCredentials: true,
      }
    );
    console.log("I am in getUserEmail Method : ", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const updateUser = async (email, userData) => {
  console.log("userData : " + userData.data);
  console.log("email : " + email);
  try {
    const response = await axios.post(
      `${UPDATE_USER}/${email}`,
      userData,
      {
        headers: getAuthHeader()
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const cancelBookingApi = async (bookingId, userId) => {
  console.log("cancelBookingApi : ", bookingId, userId);
  const response = await axios.post(
    `${BASE_URL}/user/cancelBooking/${bookingId}/${userId}`,
    {},
    {
      headers: getAuthHeader()
    }
  );

  return response.data;
};

export const getBookingList = async () => {
  const userId = localStorage.getItem("userId");

  const response = await axios.get(
    `${BASE_URL}/user/bookingList/${userId}`,
    {
      headers: getAuthHeader(),
      withCredentials: true,
    }
  );

  console.log("getBookingList :", response.data);

  return response.data;
};

export const getPendingBookingList = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/admin/getPendingBookingsData`,
      {
        headers: getAuthHeader(),
      }
    );

    console.log("Pending and Rejected Booking List:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Get Booking List Error:",
      error.response?.data || error
    );

    throw error;
  }
};

export const getBookingRecords = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/auth/admin/getBookingRecords`,
      {
        headers: getAuthHeader(),
      }
    );

    console.log("All Remaining Booking List:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Get Booking List Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const updateBookingStatusByAdmin = async (
  bookingId,
  bookingStatus
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/admin/updateBookingStatus/${bookingId}`,
      null,
      {
        params: {
          bookingStatus: bookingStatus,
        },
        headers: getAuthHeader(),
      }
    );

    console.log("Booking status updated:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Update booking status error:",
      error.response?.data || error
    );

    throw error;
  }
};

export const updateDocumentStatusByAdmin = async (id, status, reason) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/admin/updateDocumentStatus/${id}`,
      null,
      {
        params: {
          status: status,
          reason: reason,
        },
        headers: getAuthHeader(),
      }
    );
    console.log("Document status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Update Document status error:",
      error.response?.data || error
    );
    throw error;
  }
};

export const deleteBookingByAdmin = async (id) => {
  try {

    console.log("deleteBookingStatusByAdmin id : ", id);
    const response = await axios.post(
      `${DELETE_BOOKING_BY_ID}/${id}`,
      {},
      {
        headers: getAuthHeader()
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// export const uploadDocuments = async (formData) => {
//   const email = localStorage.getItem("email");
//   const password = localStorage.getItem("password");

//   const response = await fetch("http://localhost:8080/user/upload-documents", {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + btoa(email + ":" + password),
//     },
//     body: formData,
//   });

//   const result = await response.text();

//   console.log("Upload Status:", response.status);
//   console.log("Upload Response:", result);

//   if (!response.ok) {
//     throw new Error(result || "Document upload failed");
//   }


//   return result;
// };

// export const getDocuments = async () => {
//   const userId = localStorage.getItem("userId");

//   const response = await axios.get(
//     `http://localhost:8080/user/getDocuments/${userId}`,
//     {
//       headers: getAuthHeader()
//     }
//   );

//   console.log("getDocuments :", response.data);

//   return response.data;
// };

// export const uploadDocuments = async (formData) => {
//   const email = localStorage.getItem("email");
//   const password = localStorage.getItem("password");

//   if (!email || !password) {
//     throw new Error("Login credentials not found.");
//   }

//   console.log("Upload Email:", email);
//   console.log("Upload Password:", password);

//   console.log("uploadDocuments formData :",formData);

//   const response = await fetch("http://localhost:8080/user/upload-documents", {
//     method: "POST",
//     headers: {
//       Authorization: "Basic " + btoa(email + ":" + password),
//     },
//     body: formData,
//     credentials: "include",
//   });

//   const result = await response.text();

//   console.log("Upload Status:", response.status);
//   console.log("Upload Response:", result);

//   if (!response.ok) {
//     throw new Error(result || "Document upload failed");
//   }

//   return result;
// };
export const uploadDocuments = async (formData) => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!email || !password) {
    throw new Error("Login credentials not found.");
  }

  const response = await fetch(`${BASE_URL}/user/upload-documents`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(email + ":" + password),
    },
    body: formData,
    credentials: "include", 
  });

  const result = await response.text();

  if (!response.ok) {
    throw new Error(result || "Document upload failed");
  }

  return result;
};

// export const getAllDocuments = async () => {
//   const response = await axios.get(
//     "http://localhost:8080/user/documents",
//     {
//       headers: getAuthHeader()
//     }
//   );

//   console.log("All Documents:", response.data);
//   return response.data;
// };

  // export const getUserDocuments = async () => {
  //   const userId = localStorage.getItem("userId");

  //   const response = await axios.get(
  //     `http://localhost:8080/user/documents/${userId}`,
  //     {
  //       headers: getAuthHeader(),
  //       withCredentials: true,
  //     }
  //   );
  //   console.log("I am in getUserDocuments service method :",response.data);

  //   return response.data;
  // }; 
  export const getUserDocuments = async () => {
  try {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axios.get(
      `${BASE_URL}/user/documents/${userId}`,
      {
        headers: getAuthHeader(),
        withCredentials: true,
      }
    );
    
    console.log("I am in getUserDocuments service method:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user documents:", error);
    throw error;
  }
}; 

// add car
// export const addCar = async (car) => {
//   try {
//     const userId = localStorage.getItem("userId");

//     const carAddedData = {
//       userId: parseInt(userId),
//       mainImage: car.mainImage,
//       img1: car.img1,
//       img2: car.img2,
//       img3: car.img3,
//       status: car.status,
//       fuelType: car.fuelType,
//       name: car.name,
//       seating: Number(car.seating),
//       transmition: car.transmition,
//       price: Number(car.price),
//       description: car.description,
//       brand: car.brand,
      
//       features: {
//         feature1: car.feature1,
//         feature2: car.feature2,
//         feature3: car.feature3,
//         feature4: car.feature4,
//         feature5: car.feature5
//       }
//     };

//     console.log("Car Added data : ", carAddedData);

//     const response = await axios.post(
//       "http://localhost:8080/auth/admin/addCars",
//       carAddedData,
//       {
//         headers: getAuthHeader()
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error adding car:", error);
//     throw error;
//   }
// };



const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(
        new Error(`Failed to read image: ${file.name}`)
      );
    };

    reader.readAsDataURL(file);
  });
};



export const getCarImageUrl = (imageName) => {
  if (!imageName) {
    return "/placeholder-car.jpg";
  }

  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://") ||
    imageName.startsWith("data:") ||
    imageName.startsWith("blob:")
  ) {
    return imageName;
  }

  return `${CAR_IMAGE_BASE_URL}/${encodeURIComponent(
    imageName
  )}`;
};

export const addCar = async (car) => {
  try {
    const userId = localStorage.getItem("userId");

    const [
      mainImageBase64,
      img1Base64,
      img2Base64,
      img3Base64,
    ] = await Promise.all([
      convertFileToBase64(car.mainImageFile),
      convertFileToBase64(car.img1File),
      convertFileToBase64(car.img2File),
      convertFileToBase64(car.img3File),
    ]);

    const carAddedData = {
      userId: Number(userId),

      // Actual Base64 image content
      mainImage: mainImageBase64,
      img1: img1Base64,
      img2: img2Base64,
      img3: img3Base64,

      // Original filenames
      mainImageName:
        car.mainImageFile?.name || car.mainImage,

      img1Name:
        car.img1File?.name || car.img1,

      img2Name:
        car.img2File?.name || car.img2,

      img3Name:
        car.img3File?.name || car.img3,

      status: Boolean(car.status),
      fuelType: car.fuelType,
      name: car.name,
      seating: Number(car.seating),
      transmition: car.transmition,
      price: Number(car.price),
      description: car.description,
      brand: car.brand,

      features: {
        feature1: car.feature1,
        feature2: car.feature2,
        feature3: car.feature3,
        feature4: car.feature4,
        feature5: car.feature5,
      },
    };

    console.log("Car Added Data:", {
      ...carAddedData,
      mainImage: mainImageBase64
        ? "MAIN IMAGE PRESENT"
        : null,
      img1: img1Base64 ? "IMAGE 1 PRESENT" : null,
      img2: img2Base64 ? "IMAGE 2 PRESENT" : null,
      img3: img3Base64 ? "IMAGE 3 PRESENT" : null,
    });

    const response = await axios.post(
      `${BASE_URL}/auth/admin/addCars`,
      carAddedData,
      {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding car:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const updateCar = async (car) => {
  try {
    const userId = localStorage.getItem("userId");

    const updateCarData = {
      userId: Number(userId),

      mainImage: car.mainImage,
      img1: car.img1,
      img2: car.img2,
      img3: car.img3,

      status: car.carStatus === "Available",

      fuelType: car.fuelType,
      name: car.name,
      seating: Number(car.seating),
      transmition: car.transmition,
      price: Number(car.price),
      description: car.description,
      brand: car.brand,
      rating: Number(car.rating),
      reviews: Number(car.reviews),

      features: {
        feature1: car.feature1,
        feature2: car.feature2,
        feature3: car.feature3,
        feature4: car.feature4,
        feature5: car.feature5,
      },
    };

    console.log("Car ID:", car.id);
    console.log("Update Request:", updateCarData);

    const response = await axios.post(
      `${UPDATE_CAR_API_URL}/${car.id}`,
      updateCarData,
      {
        headers: getAuthHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update Car Error:", error.response?.data || error.message);
    throw error;
  }
};

// delete car
export const deleteCarById = async (id) => {
  try {
    const response = await axios.post(
      `${DELETE_CAR_BY_ID}/${id}`,
      {},
      {
        headers: getAuthHeader()
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    return null;
  }
};

// export const deleteUserById = async (id) => {
//   try {
//     const response = await axios.post(
//       `${DELETE_USER_BY_ID}/${id}`,
//       {},
//       {
//         headers: getAuthHeader()
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error deleting cart:", error);
//     return null;
//   }
// };

export const deleteUserById = async (id) => {
  try {

    console.log("deleteUserById : ", id);
    const response = await axios.post(
      `${DELETE_USER_BY_ID}/${id}`,
      {},
      {
        headers: getAuthHeader()
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const deleteUserDocument = async (documentType) => {
  const userId = localStorage.getItem("userId");

  console.log("deleteUserDocument send request → userId:", userId, "type:", documentType);

  const response = await axios.delete(
    `${DELETE_Document_BY_ID}/${userId}/${documentType}`,
    { 
      headers: getAuthHeader(),
      withCredentials: true,
     }
  );

  return response.data;
};

export const updateUserStatus = async (id) => {
  try {
    console.log("updateUserStatus : ", id);
    const response = await axios.post(
      `${UPDATE_USER_STATUS}/${id}`,
      {},
      {
        headers: getAuthHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

export const updateUserRole = async (id, role) => {
  try {
    console.log("updateUserRole : ", id);
    const response = await axios.post(
      `${UPDATE_USER_ROLE}/${id}`,
      { role },
      {
        headers: getAuthHeader(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

// reset password 
const FORGOT_PASSWORD =
  `${BASE_URL}/home/forgot-password`;

const VALIDATE_RESET_TOKEN =
  `${BASE_URL}/home/validate-reset-token`;

const RESET_PASSWORD =
  `${BASE_URL}/home/reset-password`;

const parseResponse = async (response) => {
  const contentType =
    response.headers.get("content-type");

  if (
    contentType &&
    contentType.includes("application/json")
  ) {
    return response.json();
  }

  const text = await response.text();

  return {
    message:
      text || "Unexpected server response",
  };
};

export const forgotPassword = async (email) => {
  const response = await fetch(
    FORGOT_PASSWORD,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
      }),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to send password reset email"
    );
  }

  return data;
};

export const validateResetToken = async (
  token
) => {
  const response = await fetch(
    `${VALIDATE_RESET_TOKEN}?token=${encodeURIComponent(
      token
    )}`,
    {
      method: "GET",
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to validate reset token"
    );
  }

  return data;
};

export const resetPassword = async ({
  token,
  newPassword,
  confirmPassword,
}) => {
  const response = await fetch(
    RESET_PASSWORD,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        newPassword,
        confirmPassword,
      }),
    }
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to reset password"
    );
  }

  return data;
};