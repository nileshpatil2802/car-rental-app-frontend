// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import DocumentStamp from "../components/DocumentStamp";

// import {
//   FiUser,
//   FiBookmark,
//   FiCalendar,
//   FiFileText,
//   FiEdit,
//   FiX,
//   FiCheck,
//   FiEye,
//   FiEyeOff,
//   FiCheckCircle,
//   FiTrash2,
//   FiAlertCircle,
//   FiMapPin,
//   FiCreditCard,
// } from "react-icons/fi";

// import { useAuth } from "../context/AuthContext";
// import { useBooking } from "../context/BookingContext";

// import {
//   getAllCarts,
//   getUserByEmail,
//   updateUser,
//   uploadDocuments,
//   deleteUserDocument,
//   getBookingList,
//   getUserDocuments,
//   updateUserDocument,
//   TripDetailsForHistory,
// } from "../services/carService";

// import { formatCurrency } from "../utils/helpers";

// // Indian Driving Licence:
// // 2 letters + 2 digits + 4-digit year + 7 digits
// // Example: MH1220201234567
// const DRIVING_LICENSE_PATTERN =
//   /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;

// // 12-digit Aadhaar, cannot start with 0 or 1
// const AADHAAR_PATTERN = /^[2-9][0-9]{11}$/;

// const Dashboard = () => {
//   const { user } = useAuth();
//   const { cancelBooking } = useBooking();

//   const role = localStorage.getItem("role");
//   const isAdmin = role === "ADMIN";

//   const [activeTab, setActiveTab] = useState(
//     isAdmin ? "adminCars" : "bookings"
//   );

//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [profileData, setProfileData] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   const [editData, setEditData] = useState({
//     firstName: user?.firstName || "",
//     lastName: user?.lastName || "",
//     email: user?.email || "",
//     phone: user?.phone || "",
//     password: "",
//   });

//   // ---------- Trip Details popup ----------
// const [showTripDetailsPopup, setShowTripDetailsPopup] =
//   useState(false);

// const [tripDetails, setTripDetails] = useState(null);
// const [loadingTripDetails, setLoadingTripDetails] =
//   useState(false);

// const [tripDetailsError, setTripDetailsError] =
//   useState("");

//   const [bookingList, setBookingList] = useState([]);

//   const [selectedTripBooking, setSelectedTripBooking] =
//   useState(null);

//   const closeTripDetailsPopup = () => {
//   if (loadingTripDetails) return;

//   setShowTripDetailsPopup(false);
//   setTripDetails(null);
//   setTripDetailsError("");
//   setSelectedTripBooking(null);
// };



//   // Cancel booking popup
//   const [showCancelPopup, setShowCancelPopup] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [deletingBooking, setDeletingBooking] = useState(false);
//   const [cancelError, setCancelError] = useState("");

//   // ---------- Document state ----------
//   const [licenseFile, setLicenseFile] = useState(null);
//   const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
//   const [licenseExpiry, setLicenseExpiry] = useState("");
//   const [licenseErrors, setLicenseErrors] = useState({});
//   const [uploadingLicense, setUploadingLicense] = useState(false);

//   // ---------- Aadhaar state ----------
//   const [aadhharFile, setAadhharFile] = useState(null);
//   const [aadhaarNumber, setAadhaarNumber] = useState("");
//   const [aadhaarErrors, setAadhaarErrors] = useState({});
//   const [uploadingAadhaar, setUploadingAadhaar] = useState(false);

//   const [documentsData, setDocumentsData] = useState(null);
//   const [documentsLoading, setDocumentsLoading] = useState(false);

//   // ---------- Delete document popup ----------
//   const [deleteDocTarget, setDeleteDocTarget] = useState(null);
//   const [showDeleteDocPopup, setShowDeleteDocPopup] = useState(false);
//   const [deletingDocument, setDeletingDocument] = useState(false);
//   const [deleteDocError, setDeleteDocError] = useState("");

//   const [savedCarsData, setSavedCarsData] = useState([]);
//   const [loadingSavedCars, setLoadingSavedCars] = useState(true);

//   // =========================================================
//   // CANCEL BOOKING
//   // =========================================================

//   const openCancelBookingPopup = (booking) => {
//     setSelectedBooking(booking);
//     setCancelError("");
//     setShowCancelPopup(true);
//   };

//   const closeCancelBookingPopup = () => {
//     if (deletingBooking) return;

//     setShowCancelPopup(false);
//     setSelectedBooking(null);
//     setCancelError("");
//   };

  

//   const handleDeleteBooking = async () => {
//     if (!selectedBooking?.bookingId) {
//       setCancelError("Booking ID not found.");
//       return;
//     }

//     try {
//       setDeletingBooking(true);
//       setCancelError("");

//       const bookingId = selectedBooking.bookingId;

//       await cancelBooking(bookingId);

//       setBookingList((previousBookings) =>
//         previousBookings.filter(
//           (booking) => booking.bookingId !== bookingId
//         )
//       );

//       setShowCancelPopup(false);
//       setSelectedBooking(null);
//     } catch (error) {
//       console.error(
//         "Cancel booking failed:",
//         error.response?.data || error.message
//       );

//       setCancelError(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to cancel booking. Please try again."
//       );
//     } finally {
//       setDeletingBooking(false);
//     }
//   };

//   const formatTripDate = (dateValue) => {
//   if (!dateValue) return "Not available";

//   const parts = String(dateValue).split("T")[0].split("-");

//   if (parts.length !== 3) return dateValue;

//   const [year, month, day] = parts;
//   return `${day}-${month}-${year}`;
// };

// {tripDetails && (
//   <div className="space-y-4">
//     <div className="flex items-center justify-between gap-3 rounded-xl bg-blue-50 p-4">
//       <div>
//         <p className="text-sm text-gray-500">Booking Status</p>
//         <p className="mt-1 font-bold text-gray-900">
//           {tripDetails.bookingStatus}
//         </p>
//       </div>

//       <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-blue-700">
//         {tripDetails.tripDriverType === "SELF_DRIVE"
//           ? "Self Drive"
//           : tripDetails.tripDriverType === "HIRED_DRIVER"
//           ? "Hired Driver"
//           : tripDetails.tripDriverType}
//       </span>
//     </div>

//     <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//       <div className="rounded-xl border border-gray-200 p-4">
//         <p className="text-sm text-gray-500">Pickup Location</p>
//         <p className="mt-1 font-semibold text-gray-900">
//           {tripDetails.pickupLocation || "Not available"}
//         </p>
//         <p className="mt-2 text-sm text-gray-600">
//           {formatTripDate(tripDetails.pickupDate)}
//         </p>
//       </div>

//       <div className="rounded-xl border border-gray-200 p-4">
//         <p className="text-sm text-gray-500">Drop-off Location</p>
//         <p className="mt-1 font-semibold text-gray-900">
//           {tripDetails.dropoffLocation || "Not available"}
//         </p>
//         <p className="mt-2 text-sm text-gray-600">
//           {formatTripDate(tripDetails.dropoffDate)}
//         </p>
//       </div>

//       <div className="rounded-xl border border-gray-200 p-4">
//         <p className="text-sm text-gray-500">Trip Duration</p>
//         <p className="mt-1 font-semibold text-gray-900">
//           {tripDetails.days} {tripDetails.days === 1 ? "Day" : "Days"}
//         </p>
//       </div>

//       <div className="rounded-xl border border-gray-200 p-4">
//         <p className="text-sm text-gray-500">Price Per Day</p>
//         <p className="mt-1 font-semibold text-gray-900">
//           ₹{Number(tripDetails.price ?? 0).toLocaleString("en-IN")}
//         </p>
//       </div>
//     </div>

//     <div className="rounded-xl bg-gray-900 p-5 text-white">
//       <p className="text-sm text-gray-300">Total Trip Amount</p>
//       <p className="mt-1 text-2xl font-bold">
//         ₹{Number(tripDetails.total ?? 0).toLocaleString("en-IN")}
//       </p>
//     </div>
//   </div>
// )}
//   {/* =====================================================
//     TRIP DETAILS POPUP
// ===================================================== */}

// {/* Trip Details Popup */}
// {showTripDetailsPopup && (
//   <div
//     className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-gray-950/70 p-3 backdrop-blur-sm sm:p-5"
//     onClick={closeTripDetailsPopup}
//   >
//     <div
//       className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-5 py-6 text-white sm:px-8">
//         <div className="flex items-start justify-between gap-4">
//           <div>
//             <div className="mb-2 flex items-center gap-2 text-sm text-blue-100">
//               <FiMapPin />
//               Your booking information
//             </div>
//             <h2 className="text-2xl font-extrabold sm:text-3xl">
//               Trip Details
//             </h2>
//             <p className="mt-1 text-sm text-blue-100">
//               Review your pickup, drop-off and trip amount.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={closeTripDetailsPopup}
//             disabled={loadingTripDetails}
//             aria-label="Close trip details"
//             className="rounded-full bg-white/15 p-2.5 transition hover:bg-white/25 disabled:opacity-50"
//           >
//             <FiX className="text-xl" />
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-8">
//         {loadingTripDetails ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
//             <p className="mt-4 font-medium text-gray-600">
//               Loading trip details...
//             </p>
//           </div>
//         ) : tripDetailsError ? (
//           <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
//             <FiAlertCircle className="mx-auto text-3xl text-red-500" />
//             <p className="mt-3 font-semibold text-red-700">
//               Unable to load trip details
//             </p>
//             <p className="mt-2 break-words text-sm text-red-600">
//               {tripDetailsError}
//             </p>

//             <button
//               type="button"
//               onClick={() => {
//                 if (selectedTripBooking) {
//                   handleViewTripDetails(selectedTripBooking);
//                 }
//               }}
//               className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : tripDetails ? (
//           <div className="space-y-6">
//             {/* Status */}
//             <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
//               <div>
//                 <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
//                   Booking Status
//                 </p>
//                 <p className="mt-1 text-lg font-extrabold text-gray-900">
//                   {tripDetails.bookingStatus || "Not available"}
//                 </p>
//               </div>

//               <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
//                 {tripDetails.tripDriverType === "SELF_DRIVE"
//                   ? "🚗 Self Drive"
//                   : tripDetails.tripDriverType === "HIRED_DRIVER"
//                   ? "🧑‍✈️ Hired Driver"
//                   : tripDetails.tripDriverType || "Not available"}
//               </span>
//             </div>

//             {/* Pickup and Drop-off */}
//             <div>
//               <h3 className="mb-4 text-base font-bold text-gray-900">
//                 Journey Information
//               </h3>

//               <div className="relative space-y-4">
//                 <div className="absolute bottom-10 left-[19px] top-10 border-l-2 border-dashed border-blue-200" />

//                 <div className="relative flex gap-4 rounded-2xl border border-gray-100 p-4">
//                   <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
//                     <FiMapPin />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Pickup
//                     </p>
//                     <p className="mt-1 break-words font-bold text-gray-900">
//                       {tripDetails.pickupLocation || "Not available"}
//                     </p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {formatTripDate(tripDetails.pickupDate)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="relative flex gap-4 rounded-2xl border border-gray-100 p-4">
//                   <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
//                     <FiMapPin />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
//                       Drop-off
//                     </p>
//                     <p className="mt-1 break-words font-bold text-gray-900">
//                       {tripDetails.dropoffLocation || "Not available"}
//                     </p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {formatTripDate(tripDetails.dropoffDate)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Duration and Price */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div className="rounded-2xl border border-gray-200 p-5">
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <FiCalendar />
//                   <span className="text-sm font-medium">Trip Duration</span>
//                 </div>
//                 <p className="mt-3 text-2xl font-extrabold text-gray-900">
//                   {tripDetails.days ?? 0}{" "}
//                   <span className="text-base font-semibold text-gray-500">
//                     {(tripDetails.days ?? 0) === 1 ? "Day" : "Days"}
//                   </span>
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-gray-200 p-5">
//                 <div className="flex items-center gap-2 text-gray-500">
//                   <FiCreditCard />
//                   <span className="text-sm font-medium">Price Per Day</span>
//                 </div>
//                 <p className="mt-3 text-2xl font-extrabold text-gray-900">
//                   ₹{Number(tripDetails.price ?? 0).toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>

//             {/* Total */}
//             <div className="rounded-2xl bg-gray-900 p-5 text-white sm:p-6">
//               <div className="flex items-center justify-between gap-4">
//                 <div>
//                   <p className="text-sm text-gray-300">Total Trip Amount</p>
//                   <p className="mt-1 text-xs text-gray-400">
//                     For {tripDetails.days ?? 0}{" "}
//                     {(tripDetails.days ?? 0) === 1 ? "day" : "days"}
//                   </p>
//                 </div>
//                 <p className="text-2xl font-extrabold sm:text-3xl">
//                   ₹{Number(tripDetails.total ?? 0).toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="py-10 text-center text-gray-500">
//             No trip details available.
//           </p>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-8">
//         <button
//           type="button"
//           onClick={closeTripDetailsPopup}
//           disabled={loadingTripDetails}
//           className="w-full rounded-xl bg-gray-900 px-5 py-3 font-bold text-white transition hover:bg-gray-800 disabled:opacity-50"
//         >
//           Close Details
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//   // =========================================================
//   // DOCUMENT STATUS
//   // =========================================================

//   const normalizedDocumentStatus = (() => {
//     const rawStatus =
//       documentsData?.status ??
//       documentsData?.documentStatus ??
//       documentsData?.verificationStatus ??
//       "PENDING";

//     const status = String(rawStatus).trim().toUpperCase();

//     if (
//       status === "ACCEPT" ||
//       status === "ACCEPTED" ||
//       status === "APPROVED"
//     ) {
//       return "ACCEPT";
//     }

//     if (status === "REJECT" || status === "REJECTED") {
//       return "REJECT";
//     }

//     return "PENDING";
//   })();

//   // =========================================================
//   // BOOKINGS
//   // =========================================================

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const upcomingBookings = bookingList.filter((booking) => {
//     const dropoff = new Date(booking.dropoffDate);
//     dropoff.setHours(0, 0, 0, 0);

//     return dropoff >= today;
//   });

//   // =========================================================
//   // FETCH DOCUMENTS
//   // =========================================================

//   const fetchUserDocuments = async () => {
//     try {
//       setDocumentsLoading(true);

//       const userId = localStorage.getItem("userId");

//       if (!userId) {
//         console.error("User ID not found in localStorage");
//         setDocumentsData(null);
//         return;
//       }

//       const response = await getUserDocuments();

//       let documentData = response;

//       if (response?.data) {
//         documentData = response.data;
//       }

//       if (Array.isArray(documentData)) {
//         documentData =
//           documentData.length > 0
//             ? documentData[documentData.length - 1]
//             : null;
//       }

//       if (!documentData) {
//         setDocumentsData(null);
//         return;
//       }

//       const receivedStatus =
//         documentData.status ??
//         documentData.documentStatus ??
//         documentData.verificationStatus ??
//         "PENDING";

//       const correctedDocumentData = {
//         ...documentData,
//         status: String(receivedStatus).trim().toUpperCase(),
//       };

//       setDocumentsData(correctedDocumentData);
//     } catch (error) {
//       console.error(
//         "Fetch documents error:",
//         error.response?.data || error.message
//       );

//       setDocumentsData(null);
//     } finally {
//       setDocumentsLoading(false);
//     }
//   };

//   // =========================================================
//   // FETCH BOOKINGS
//   // =========================================================

//   const fetchBookingList = async () => {
//     try {
//       const data = await getBookingList();
//       setBookingList(data);
//     } catch (error) {
//       console.error("Error Fetching Bookings:", error);
//     }
//   };

//   // =========================================================
//   // FETCH SAVED CARS
//   // =========================================================

//   const fetchSavedCars = async () => {
//     try {
//       const data = await getAllCarts();
//       setSavedCarsData(data);
//     } catch (error) {
//       console.error("Error fetching saved cars:", error);
//     } finally {
//       setLoadingSavedCars(false);
//     }
//   };

//   // =========================================================
//   // FETCH PROFILE
//   // =========================================================

//   const fetchUserProfile = async () => {
//     try {
//       const email = localStorage.getItem("email");

//       if (!email) return;

//       const data = await getUserByEmail(email);

//       setProfileData(data);

//       setEditData({
//         firstName: data?.firstName || "",
//         lastName: data?.lastName || "",
//         email: data?.email || "",
//         phone: data?.phone || "",
//         password: data?.password || "",
//       });
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   // =========================================================
//   // LICENSE VALIDATION
//   // =========================================================

//   const validateLicenseForm = () => {
//     const errors = {};

//     const normalizedLicenseNumber = drivingLicenseNumber
//       .trim()
//       .toUpperCase()
//       .replace(/\s+/g, "");

//     if (!normalizedLicenseNumber) {
//       errors.drivingLicenseNumber =
//         "Driving Licence number is required.";
//     } else if (
//       !DRIVING_LICENSE_PATTERN.test(normalizedLicenseNumber)
//     ) {
//       errors.drivingLicenseNumber =
//         "Enter a valid Driving Licence number, for example MH1220201234567.";
//     }

//     if (!licenseExpiry) {
//       errors.licenseExpiry =
//         "Driving Licence expiry date is required.";
//     } else {
//       const selectedExpiryDate = new Date(
//         `${licenseExpiry}T00:00:00`
//       );

//       const currentDate = new Date();
//       currentDate.setHours(0, 0, 0, 0);

//       if (
//         Number.isNaN(selectedExpiryDate.getTime()) ||
//         selectedExpiryDate <= currentDate
//       ) {
//         errors.licenseExpiry =
//           "Driving Licence expiry date must be after today.";
//       }
//     }

//     if (!licenseFile) {
//       errors.licenseFile =
//         "Driving Licence file is required.";
//     }

//     setLicenseErrors(errors);

//     return {
//       isValid: Object.keys(errors).length === 0,
//       normalizedLicenseNumber,
//     };
//   };

//   // =========================================================
//   // LICENSE SUBMIT
//   // =========================================================

//   const handleLicenseSubmit = async (event) => {
//     event.preventDefault();

//     const {
//       isValid,
//       normalizedLicenseNumber,
//     } = validateLicenseForm();

//     if (!isValid) return;

//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       setLicenseErrors({
//         submit:
//           "User ID was not found. Please log in again.",
//       });

//       return;
//     }

//     const formData = new FormData();

//     formData.append(
//       "drivingLicenseNumber",
//       normalizedLicenseNumber
//     );

//     formData.append("licenseExpiry", licenseExpiry);

//     if (licenseFile) {
//       formData.append(
//         "drivingLicense",
//         licenseFile
//       );
//     }

//     try {
//       setUploadingLicense(true);
//       setLicenseErrors({});

//       await updateUserDocument(
//         userId,
//         "LICENSE",
//         formData
//       );

//       setDrivingLicenseNumber("");
//       setLicenseExpiry("");
//       setLicenseFile(null);

//       const licenseInput =
//         document.getElementById("licenseInput");

//       if (licenseInput) {
//         licenseInput.value = "";
//       }

//       await fetchUserDocuments();
//     } catch (error) {
//       console.error(
//         "License update error:",
//         error.response?.data || error.message
//       );

//       setLicenseErrors({
//         submit:
//           error.response?.data?.message ||
//           error.message ||
//           "Driving Licence update failed. Please try again.",
//       });
//     } finally {
//       setUploadingLicense(false);
//     }
//   };

//   // =========================================================
//   // LICENSE UPDATE
//   // =========================================================

//   const handleLicenseUpdate = async () => {
//     await fetchUserDocuments();
//   };

//   // =========================================================
//   // AADHAAR UPDATE
//   // =========================================================

//   const handleAadhaarUpdate = async () => {
//     const userId = localStorage.getItem("userId");

//     const formData = new FormData();

//     formData.append(
//       "aadhaarNumber",
//       aadhaarNumber.replace(/\D/g, "")
//     );

//     if (aadhharFile) {
//       formData.append(
//         "aadhharCard",
//         aadhharFile
//       );
//     }

//     await updateUserDocument(
//       userId,
//       "AADHAAR",
//       formData
//     );

//     await fetchUserDocuments();
//   };

//   // =========================================================
//   // AADHAAR VALIDATION
//   // =========================================================

//   const validateAadhaarForm = () => {
//     const errors = {};

//     const normalizedAadhaarNumber =
//       aadhaarNumber.replace(/\D/g, "");

//     if (!normalizedAadhaarNumber) {
//       errors.aadhaarNumber =
//         "Aadhaar number is required.";
//     } else if (
//       !AADHAAR_PATTERN.test(normalizedAadhaarNumber)
//     ) {
//       errors.aadhaarNumber =
//         "Enter a valid 12-digit Aadhaar number. It cannot start with 0 or 1.";
//     }

//     if (!aadhharFile) {
//       errors.aadhharFile =
//         "Aadhaar Card file is required.";
//     }

//     setAadhaarErrors(errors);

//     return {
//       isValid: Object.keys(errors).length === 0,
//       normalizedAadhaarNumber,
//     };
//   };

//   // =========================================================
//   // AADHAAR SUBMIT
//   // =========================================================

//   const handleAadhaarSubmit = async (event) => {
//     event.preventDefault();

//     const {
//       isValid,
//       normalizedAadhaarNumber,
//     } = validateAadhaarForm();

//     if (!isValid) return;

//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       setAadhaarErrors({
//         submit:
//           "User ID was not found. Please log in again.",
//       });

//       return;
//     }

//     const formData = new FormData();

//     formData.append(
//       "aadhaarNumber",
//       normalizedAadhaarNumber
//     );

//     if (aadhharFile) {
//       formData.append(
//         "aadhharCard",
//         aadhharFile
//       );
//     }

//     try {
//       setUploadingAadhaar(true);
//       setAadhaarErrors({});

//       await updateUserDocument(
//         userId,
//         "AADHAAR",
//         formData
//       );

//       setAadhaarNumber("");
//       setAadhharFile(null);

//       const aadhaarInput =
//         document.getElementById("aadhaarInput");

//       if (aadhaarInput) {
//         aadhaarInput.value = "";
//       }

//       await fetchUserDocuments();
//     } catch (error) {
//       console.error(
//         "Aadhaar update error:",
//         error.response?.data || error.message
//       );

//       setAadhaarErrors({
//         submit:
//           error.response?.data?.message ||
//           error.message ||
//           "Aadhaar Card update failed. Please try again.",
//       });
//     } finally {
//       setUploadingAadhaar(false);
//     }
//   };

//   // =========================================================
//   // DELETE DOCUMENT
//   // =========================================================

//   const openDeleteDocPopup = (type) => {
//     setDeleteDocTarget(type);
//     setDeleteDocError("");
//     setShowDeleteDocPopup(true);
//   };

//   const closeDeleteDocPopup = () => {
//     if (deletingDocument) return;

//     setShowDeleteDocPopup(false);
//     setDeleteDocTarget(null);
//     setDeleteDocError("");
//   };

//   const handleDeleteDocument = async () => {
//     if (!deleteDocTarget) return;

//     try {
//       setDeletingDocument(true);
//       setDeleteDocError("");

//       await deleteUserDocument(deleteDocTarget);

//       await fetchUserDocuments();

//       setLicenseErrors({});
//       setAadhaarErrors({});

//       setShowDeleteDocPopup(false);
//       setDeleteDocTarget(null);
//     } catch (error) {
//       console.error(
//         "Delete document failed:",
//         error.response?.data || error.message
//       );

//       setDeleteDocError(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to delete document. Please try again."
//       );
//     } finally {
//       setDeletingDocument(false);
//     }
//   };

//  const handleViewTripDetails = async (booking) => {
//   setSelectedTripBooking(booking);
//   setShowTripDetailsPopup(true);
//   setLoadingTripDetails(true);
//   setTripDetails(null);
//   setTripDetailsError("");

//   const car_id =
//     booking?.carId ??
//     booking?.car_id ??
//     booking?.car?.id;

//   if (car_id == null) {
//     setTripDetailsError("Car ID not found for this booking.");
//     setLoadingTripDetails(false);
//     return;
//   }

//   try {
//     const response = await TripDetailsForHistory(car_id);

//     // Supports either { data: {...} } or a direct {...} response.
//     const details = response?.data ?? response;

//     if (!details || details.carId == null) {
//       throw new Error("Invalid trip details received from the API.");
//     }

//     setTripDetails(details);
//   } catch (error) {
//     console.error("Error fetching trip details:", error);

//     setTripDetailsError(
//       error.response?.data?.message ||
//       error.message ||
//       "Unable to load trip details."
//     );
//   } finally {
//     setLoadingTripDetails(false);
//   }
// };

//   // =========================================================
//   // INITIAL LOAD
//   // =========================================================

//   useEffect(() => {
//     fetchUserProfile();

//     if (!isAdmin) {
//       fetchSavedCars();
//       fetchBookingList();
//     } else {
//       setLoadingSavedCars(false);
//     }
//   }, []);

//   // =========================================================
//   // SAVE PROFILE
//   // =========================================================

//   const handleSaveProfile = async () => {
//     try {
//       const email = localStorage.getItem("email");

//       const response = await updateUser(
//         email,
//         editData
//       );

//       setProfileData(response);

//       setEditData({
//         firstName: response.firstName,
//         lastName: response.lastName,
//         email: response.email,
//         phone: response.phone,
//         password: response.password,
//       });

//       setIsEditingProfile(false);
//     } catch (error) {
//       console.error(
//         "Error updating profile:",
//         error
//       );
//     }
//   };

//   // =========================================================
//   // TABS
//   // =========================================================

//   const userTabs = [
//     {
//       id: "bookings",
//       label: "My Bookings",
//       icon: FiCalendar,
//     },
//     {
//       id: "saved",
//       label: "Saved Cars",
//       icon: FiBookmark,
//     },
//     {
//       id: "profile",
//       label: "Profile",
//       icon: FiUser,
//     },
//     {
//       id: "documents",
//       label: "Documents",
//       icon: FiFileText,
//     },
//   ];

//   const adminTabs = [
//     {
//       id: "adminCars",
//       label: "Car Management",
//       icon: FiFileText,
//     },
//     {
//       id: "adminUsers",
//       label: "Users",
//       icon: FiUser,
//     },
//     {
//       id: "adminBookings",
//       label: "Bookings",
//       icon: FiCalendar,
//     },
//     {
//       id: "adminDocuments",
//       label: "Documents",
//       icon: FiFileText,
//     },
//     {
//       id: "profile",
//       label: "Profile",
//       icon: FiUser,
//     },
//   ];

//   const tabs = isAdmin
//     ? adminTabs
//     : userTabs;

//   const hasLicenseDoc = Boolean(
//     documentsData?.drivingLicense
//   );

//   const hasAadhaarDoc = Boolean(
//     documentsData?.aadhharCard
//   );

  

//   const deleteDocLabel =
//     deleteDocTarget === "license"
//       ? "Driving Licence"
//       : "Aadhaar Card";

//   // =========================================================
//   // RENDER
//   // =========================================================

  

//   return (
//     <div className="min-h-screen bg-light py-8">
//       <div className="container-custom">

//         {/* ===================================================
//             DASHBOARD HEADER
//         =================================================== */}

//         <div className="mb-8 rounded-xl bg-white p-8 card-shadow">
//           <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

//             <div className="flex items-center gap-4">

//               <img
//                 src={profileData?.avatar}
//                 alt={
//                   profileData?.firstName ||
//                   "User"
//                 }
//                 className="h-20 w-20 rounded-full object-cover"
//               />

//               <div>
//                 <h1 className="text-3xl font-bold text-primary">
//                   {isAdmin
//                     ? "Admin Dashboard"
//                     : `Welcome, ${
//                         profileData?.firstName ||
//                         "User"
//                       }!`}
//                 </h1>

//                 <p className="text-gray-600">
//                   {isAdmin
//                     ? "Manage cars, users, bookings, documents and revenue"
//                     : profileData?.email}
//                 </p>
//               </div>
//             </div>

//             {isAdmin ? (
//               <div className="grid grid-cols-3 gap-4">

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     0
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Total Cars
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     0
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Total Users
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     0
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Total Bookings
//                   </p>
//                 </div>

//               </div>
//             ) : (
//               <div className="grid grid-cols-3 gap-4">

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     {bookingList.length}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Total Bookings
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     {upcomingBookings.length}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Upcoming
//                   </p>
//                 </div>

//                 <div className="text-center">
//                   <p className="text-3xl font-bold text-secondary">
//                     {savedCarsData.length}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Saved Cars
//                   </p>
//                 </div>

//               </div>
//             )}
//           </div>
//         </div>

//         {/* ===================================================
//             TABS
//         =================================================== */}

//         <div className="mb-8 flex gap-4 overflow-x-auto pb-2">

//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => {
//                 setActiveTab(tab.id);

//                 if (tab.id === "documents") {
//                   fetchUserDocuments();
//                 }
//               }}
//               className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 font-semibold transition-all ${
//                 activeTab === tab.id
//                   ? "bg-secondary text-white"
//                   : "bg-white text-primary hover:bg-gray-100"
//               }`}
//             >
//               <tab.icon />
//               {tab.label}
//             </button>
//           ))}

//         </div>

//         {/* ===================================================
//             CONTENT
//         =================================================== */}

//         <div>

//           {/* =================================================
//               ADMIN CARS
//           ================================================= */}

//           {activeTab === "adminCars" && (
//             <div className="rounded-xl bg-white p-8 card-shadow">

//               <div className="mb-6 flex items-center justify-between">

//                 <div>
//                   <h2 className="text-2xl font-bold">
//                     Car Management
//                   </h2>

//                   <p className="text-gray-600">
//                     Add, update, delete and view cars
//                   </p>
//                 </div>

//                 <button className="btn-primary">
//                   + Add Car
//                 </button>

//               </div>

//               <div className="grid grid-cols-5 rounded-lg bg-gray-100 p-4 font-bold">
//                 <p>Name</p>
//                 <p>Brand</p>
//                 <p>Price</p>
//                 <p>Status</p>
//                 <p>Action</p>
//               </div>

//             </div>
//           )}

//           {/* =================================================
//               ADMIN USERS
//           ================================================= */}

//           {activeTab === "adminUsers" && (
//             <div className="rounded-xl bg-white p-8 card-shadow">

//               <h2 className="mb-4 text-2xl font-bold">
//                 User Management
//               </h2>

//               <p className="text-gray-600">
//                 All registered users will show here.
//               </p>

//             </div>
//           )}

//           {/* =================================================
//               ADMIN BOOKINGS
//           ================================================= */}

//           {activeTab === "adminBookings" && (
//             <div className="rounded-xl bg-white p-8 card-shadow">

//               <h2 className="mb-4 text-2xl font-bold">
//                 All Bookings
//               </h2>

//               <p className="text-gray-600">
//                 All user bookings will show here.
//               </p>

//             </div>
//           )}

//           {/* =================================================
//               ADMIN DOCUMENTS
//           ================================================= */}

//           {activeTab === "adminDocuments" && (
//             <div className="rounded-xl bg-white p-8 card-shadow">

//               <h2 className="mb-4 text-2xl font-bold">
//                 User Documents
//               </h2>

//               <p className="text-gray-600">
//                 All uploaded user documents will show here.
//               </p>

//             </div>
//           )}

//           {/* =================================================
//               BOOKINGS
//           ================================================= */}

//           {activeTab === "bookings" && !isAdmin && (
//             <div className="space-y-6">

//               <div>
//                 <h2 className="mb-4 text-2xl font-bold">
//                   My Bookings
//                 </h2>

//                 {bookingList.length > 0 ? (
//                   <div className="grid gap-6">

//                     {bookingList.map((booking) => {

//                       const imageUrl = booking.mainImage
//                         ? booking.mainImage.startsWith(
//                             "http"
//                           )
//                           ? booking.mainImage
//                           : `http://localhost:8080/car-images/${encodeURIComponent(
//                               booking.mainImage
//                             )}`
//                         : "/placeholder-car.png";

//                       const normalizedStatus =
//                         String(
//                           booking.status ||
//                             "PENDING"
//                         ).toUpperCase();

//                       return (
//                         <motion.div
//                           key={booking.bookingId}
//                           whileHover={{
//                             y: -5,
//                           }}
//                           className="rounded-xl bg-white p-6 card-shadow"
//                         >

//                           <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

//                             <div>
//                               <img
//                                 src={imageUrl}
//                                 alt={
//                                   booking.name ||
//                                   "Booked car"
//                                 }
//                                 className="h-40 w-full rounded-lg object-cover"
//                                 onError={(event) => {
//                                   event.currentTarget.src =
//                                     "/placeholder-car.png";
//                                 }}
//                               />
//                             </div>

//                             <div className="md:col-span-2">

//                               <h3 className="mb-2 text-xl font-bold">
//                                 {booking.name}
//                               </h3>

//                               <div className="space-y-2 text-gray-600">

//                                 <p>
//                                   <span className="font-semibold">
//                                     Brand:
//                                   </span>{" "}
//                                   {booking.brand}
//                                 </p>

//                                 <p>
//                                   <span className="font-semibold">
//                                     Fuel:
//                                   </span>{" "}
//                                   {booking.fuelType}
//                                 </p>

//                                 <p>
//                                   <span className="font-semibold">
//                                     Transmission:
//                                   </span>{" "}
//                                   {booking.transmition}
//                                 </p>

//                                 <p>
//                                   <span className="font-semibold">
//                                     Seating:
//                                   </span>{" "}
//                                   {booking.seating}
//                                 </p>

//                                 <p>
//                                   <span className="font-semibold">
//                                     Booking Status:
//                                   </span>{" "}

//                                   <span
//                                     className={
//                                       normalizedStatus ===
//                                       "CONFIRMED"
//                                         ? "font-bold text-green-600"
//                                         : normalizedStatus ===
//                                           "PENDING"
//                                         ? "font-bold text-orange-500"
//                                         : normalizedStatus ===
//                                           "CANCELLED"
//                                         ? "font-bold text-red-600"
//                                         : "font-bold text-gray-600"
//                                     }
//                                   >
//                                     {normalizedStatus}
//                                   </span>
//                                 </p>

//                                 {booking.createdAt && (
//                                   <p>
//                                     <span className="font-semibold">
//                                       Booked On:
//                                     </span>{" "}
//                                     {new Date(
//                                       booking.createdAt
//                                     ).toLocaleString()}
//                                   </p>
//                                 )}

//                               </div>
//                             </div>

//                             <div className="flex flex-col justify-between">

//                               <div>
//                                 <p className="text-sm text-gray-600">
//                                   Price Per Day
//                                 </p>

//                                 <p className="text-3xl font-bold text-secondary">
//                                   {formatCurrency(
//                                     booking.price
//                                   )}
//                                 </p>
//                               </div>

//                               {/* {normalizedStatus !==
//                                 "CANCELLED" && (
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     openCancelBookingPopup(
//                                       booking
//                                     )
//                                   }
//                                   className="w-full rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:bg-red-700"
//                                 >
//                                   Cancel Booking
//                                 </button>
//                               )} */}
//                               <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
//                               <button type="button" onClick={() => handleViewTripDetails(booking)}
//                               className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition-all hover:border-blue-500 hover:bg-blue-100 active:scale-[0.98]">
//                               <FiEye className="text-lg" />Trip Detail </button>

//   {normalizedStatus !== "CANCELLED" && (
//     <button
//       type="button"
//       onClick={() => openCancelBookingPopup(booking)}
//       className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-red-600 active:scale-[0.98]"
//     >
//       <FiX className="text-lg" />
//       Cancel Booking
//     </button>
//   )}
// </div>

//                             </div>

//                           </div>

//                         </motion.div>
//                       );
//                     })}

//                   </div>
//                 ) : (
//                   <div className="rounded-xl bg-white p-12 text-center">

//                     <p className="mb-4 text-gray-600">
//                       No bookings found
//                     </p>

//                     <Link
//                       to="/cars"
//                       className="btn-primary"
//                     >
//                       Browse Cars
//                     </Link>

//                   </div>
//                 )}

//               </div>

//             </div>
//           )}

//           {/* =================================================
//               SAVED CARS
//           ================================================= */}

//           {activeTab === "saved" && !isAdmin && (
//             <div>

//               <h2 className="mb-6 text-2xl font-bold">
//                 Saved Cars
//               </h2>

//               {loadingSavedCars ? (
//                 <div className="rounded-xl bg-white p-12 text-center">
//                   <p>Loading...</p>
//                 </div>
//               ) : savedCarsData.length > 0 ? (
//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

//                   {savedCarsData.map((car) => {

//                     const imageName =
//                       car.mainImage ||
//                       car.image;

//                     const savedCarImageUrl =
//                       imageName
//                         ? imageName.startsWith(
//                             "http"
//                           )
//                           ? imageName
//                           : imageName.startsWith(
//                               "/car-images/"
//                             )
//                           ? `http://localhost:8080${imageName}`
//                           : `http://localhost:8080/car-images/${encodeURIComponent(
//                               imageName
//                             )}`
//                         : "/placeholder-car.png";

//                     return (
//                       <motion.div
//                         key={`saved-car-${car.cartId}`}
//                         whileHover={{
//                           y: -10,
//                         }}
//                         className="overflow-hidden rounded-xl bg-white card-shadow"
//                       >

//                         <div className="h-40 overflow-hidden bg-gray-100">

//                           <img
//                             src={
//                               savedCarImageUrl
//                             }
//                             alt={
//                               car.name ||
//                               "Saved car"
//                             }
//                             className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
//                             onError={(event) => {
//                               event.currentTarget.onerror =
//                                 null;

//                               event.currentTarget.src =
//                                 "/placeholder-car.png";
//                             }}
//                           />

//                         </div>

//                         <div className="p-4">

//                           <h3 className="mb-2 text-lg font-bold">
//                             {car.name ||
//                               "Car name not available"}
//                           </h3>

//                           <p className="mb-2 text-sm text-gray-600">
//                             {car.brand ||
//                               "Brand not available"}
//                           </p>

//                           <p className="mb-2 text-sm text-gray-600">
//                             Fuel :{" "}
//                             {car.fuelType ||
//                               "Not available"}
//                           </p>

//                           <p className="mb-4 text-sm text-gray-600">
//                             Seats :{" "}
//                             {car.seating ||
//                               "Not available"}
//                           </p>

//                           <div className="flex items-center justify-between gap-4">

//                             <p className="font-bold text-secondary">
//                               {formatCurrency(
//                                 car.price
//                               )}
//                               /day
//                             </p>

//                             <Link
//                               to={`/car/${car.carId}`}
//                               className="btn-primary px-4 py-2 text-sm"
//                             >
//                               View
//                             </Link>

//                           </div>

//                         </div>

//                       </motion.div>
//                     );
//                   })}

//                 </div>
//               ) : (
//                 <div className="rounded-xl bg-white p-12 text-center">

//                   <p className="mb-4 text-gray-600">
//                     No saved cars yet
//                   </p>

//                   <Link
//                     to="/cars"
//                     className="btn-primary"
//                   >
//                     Browse Cars
//                   </Link>

//                 </div>
//               )}

//             </div>
//           )}

//           {/* =================================================
//               PROFILE
//           ================================================= */}

//           {activeTab === "profile" && (
//             <div className="rounded-xl bg-white p-8 card-shadow">

//               <div className="max-w-2xl">

//                 <div className="mb-6 flex items-center justify-between">

//                   <h2 className="text-2xl font-bold">
//                     {isAdmin
//                       ? "Admin Profile"
//                       : "Profile Information"}
//                   </h2>

//                   <button
//                     onClick={() =>
//                       setIsEditingProfile(
//                         !isEditingProfile
//                       )
//                     }
//                     className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${
//                       isEditingProfile
//                         ? "bg-gray-200 text-primary"
//                         : "btn-primary"
//                     }`}
//                   >
//                     <FiEdit />

//                     {isEditingProfile
//                       ? "Cancel"
//                       : "Edit"}
//                   </button>

//                 </div>

//                 {isEditingProfile ? (
//                   <div className="space-y-6">

//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

//                       <div>
//                         <label className="mb-2 block text-sm font-semibold">
//                           First Name
//                         </label>

//                         <input
//                           type="text"
//                           value={
//                             editData.firstName
//                           }
//                           onChange={(event) =>
//                             setEditData({
//                               ...editData,
//                               firstName:
//                                 event.target
//                                   .value,
//                             })
//                           }
//                           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
//                         />
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-sm font-semibold">
//                           Last Name
//                         </label>

//                         <input
//                           type="text"
//                           value={
//                             editData.lastName
//                           }
//                           onChange={(event) =>
//                             setEditData({
//                               ...editData,
//                               lastName:
//                                 event.target
//                                   .value,
//                             })
//                           }
//                           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
//                         />
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-sm font-semibold">
//                           Email
//                         </label>

//                         <input
//                           type="email"
//                           value={
//                             editData.email
//                           }
//                           onChange={(event) =>
//                             setEditData({
//                               ...editData,
//                               email:
//                                 event.target
//                                   .value,
//                             })
//                           }
//                           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
//                         />
//                       </div>

//                       <div>
//                         <label className="mb-2 block text-sm font-semibold">
//                           Phone
//                         </label>

//                         <input
//                           type="tel"
//                           value={
//                             editData.phone
//                           }
//                           onChange={(event) =>
//                             setEditData({
//                               ...editData,
//                               phone:
//                                 event.target
//                                   .value,
//                             })
//                           }
//                           className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
//                         />
//                       </div>

//                     </div>

//                     <button
//                       onClick={
//                         handleSaveProfile
//                       }
//                       className="btn-primary flex items-center gap-2"
//                     >
//                       <FiCheck />
//                       Save Changes
//                     </button>

//                   </div>
//                 ) : (
//                   <div className="space-y-6">

//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

//                       <div>
//                         <p className="mb-1 text-sm text-gray-600">
//                           First Name
//                         </p>

//                         <p className="text-lg font-semibold">
//                           {
//                             profileData?.firstName
//                           }
//                         </p>
//                       </div>

//                       <div>
//                         <p className="mb-1 text-sm text-gray-600">
//                           Last Name
//                         </p>

//                         <p className="text-lg font-semibold">
//                           {
//                             profileData?.lastName
//                           }
//                         </p>
//                       </div>

//                       <div>
//                         <p className="mb-1 text-sm text-gray-600">
//                           Email
//                         </p>

//                         <p className="text-lg font-semibold">
//                           {
//                             profileData?.email
//                           }
//                         </p>
//                       </div>

//                       <div>
//                         <p className="mb-1 text-sm text-gray-600">
//                           Phone
//                         </p>

//                         <p className="text-lg font-semibold">
//                           {profileData?.phone ||
//                             "Not provided"}
//                         </p>
//                       </div>

//                     </div>

//                   </div>
//                 )}

//               </div>

//             </div>
//           )}

//           {/* =================================================
//               DOCUMENTS
//           ================================================= */}

//           {activeTab === "documents" &&
//             !isAdmin && (
//               <div className="space-y-6">

//                 {/* Documents Header */}
//                 <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">

//                   <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

//                     <div className="flex items-start gap-4">

//                       <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500">
//                         <FiFileText className="text-2xl" />
//                       </div>

//                       <div>

//                         <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
//                           My Documents
//                         </h2>

//                         <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
//                           Upload and manage your Driving Licence and Aadhaar Card.
//                           Your documents will be reviewed by our team.
//                         </p>

//                       </div>

//                     </div>

//                     {/* Overall Status */}
//                     <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

//                       <span
//                         className={`h-2.5 w-2.5 rounded-full ${
//                           normalizedDocumentStatus ===
//                           "ACCEPT"
//                             ? "bg-green-500"
//                             : normalizedDocumentStatus ===
//                               "REJECT"
//                             ? "bg-red-500"
//                             : "bg-yellow-500"
//                         }`}
//                       />

//                       <div>

//                         <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
//                           Verification
//                         </p>

//                         <p className="text-sm font-bold text-gray-800">
//                           {normalizedDocumentStatus ===
//                           "ACCEPT"
//                             ? "Verified"
//                             : normalizedDocumentStatus ===
//                               "REJECT"
//                             ? "Rejected"
//                             : "Under Review"}
//                         </p>

//                       </div>

//                     </div>

//                   </div>

//                 </div>

//                 {/* Loading */}
//                 {documentsLoading ? (
//                   <div className="flex min-h-[450px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">

//                     <div className="text-center">

//                       <span className="mx-auto mb-4 block h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />

//                       <p className="font-semibold text-gray-800">
//                         Loading documents...
//                       </p>

//                       <p className="mt-1 text-sm text-gray-500">
//                         Please wait while we fetch your documents.
//                       </p>

//                     </div>

//                   </div>
//                 ) : (
//                   <>
//                     {/* Documents Grid */}
//                     <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

//                       {/* =================================================
//                           DRIVING LICENCE
//                       ================================================= */}

//                       {hasLicenseDoc ? (
//                         <DocumentPreview
//                           title="Driving Licence"
//                           subtitle="Government issued driving licence"
//                           numberLabel="Driving Licence Number"
//                           documentNumber={
//                             documentsData?.drivingLicenseNo ??
//                             documentsData?.drivingLicenseNumber ??
//                             documentsData?.drivingLicenceNumber ??
//                             documentsData?.licenseNumber ??
//                             ""
//                           }
//                           licenseExpiry={
//                             documentsData?.licenseExpiry ??
//                             documentsData?.drivingLicenseExpiry ??
//                             documentsData?.drivingLicenceExpiry ??
//                             ""
//                           }
//                           fileUrl={
//                             documentsData?.drivingLicense
//                           }
//                           status={
//                             normalizedDocumentStatus
//                           }
//                           setPreviewImage={
//                             setPreviewImage
//                           }
//                           onDelete={() =>
//                             openDeleteDocPopup(
//                               "license"
//                             )
//                           }
//                         />
//                       ) : (
//                         <DocumentUploadCard
//                           title="Driving Licence"
//                           formId="license-form"
//                           onSubmit={
//                             handleLicenseSubmit
//                           }
//                           uploading={
//                             uploadingLicense
//                           }
//                           submitError={
//                             licenseErrors.submit
//                           }
//                         >

//                           <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

//                             <div>

//                               <label
//                                 htmlFor="drivingLicenseNumber"
//                                 className="mb-2 block text-sm font-semibold text-gray-800"
//                               >
//                                 Driving Licence Number
//                                 <span className="ml-1 text-red-500">
//                                   *
//                                 </span>
//                               </label>

//                               <input
//                                 id="drivingLicenseNumber"
//                                 type="text"
//                                 value={
//                                   drivingLicenseNumber
//                                 }
//                                 maxLength={15}
//                                 autoComplete="off"
//                                 placeholder="Example: MH1220201234567"
//                                 onChange={(
//                                   event
//                                 ) => {

//                                   const value =
//                                     event.target.value
//                                       .toUpperCase()
//                                       .replace(
//                                         /[^A-Z0-9]/g,
//                                         ""
//                                       )
//                                       .slice(
//                                         0,
//                                         15
//                                       );

//                                   setDrivingLicenseNumber(
//                                     value
//                                   );

//                                   setLicenseErrors(
//                                     (
//                                       previous
//                                     ) => ({
//                                       ...previous,
//                                       drivingLicenseNumber:
//                                         "",
//                                       submit:
//                                         "",
//                                     })
//                                   );
//                                 }}
//                                 className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
//                                   licenseErrors.drivingLicenseNumber
//                                     ? "border-red-500"
//                                     : "border-gray-300 focus:border-red-500"
//                                 }`}
//                               />

//                               <div className="mt-2 min-h-[20px]">

//                                 {licenseErrors.drivingLicenseNumber && (
//                                   <p className="text-sm text-red-600">
//                                     {
//                                       licenseErrors.drivingLicenseNumber
//                                     }
//                                   </p>
//                                 )}

//                               </div>

//                             </div>

//                             <div>

//                               <label
//                                 htmlFor="licenseExpiry"
//                                 className="mb-2 block text-sm font-semibold text-gray-800"
//                               >
//                                 Expiry Date
//                                 <span className="ml-1 text-red-500">
//                                   *
//                                 </span>
//                               </label>

//                               <input
//                                 id="licenseExpiry"
//                                 type="date"
//                                 value={
//                                   licenseExpiry
//                                 }
//                                 min={new Date(
//                                   Date.now() +
//                                     86400000
//                                 )
//                                   .toISOString()
//                                   .split(
//                                     "T"
//                                   )[0]}
//                                 onChange={(
//                                   event
//                                 ) => {

//                                   setLicenseExpiry(
//                                     event.target
//                                       .value
//                                   );

//                                   setLicenseErrors(
//                                     (
//                                       previous
//                                     ) => ({
//                                       ...previous,
//                                       licenseExpiry:
//                                         "",
//                                       submit:
//                                         "",
//                                     })
//                                   );
//                                 }}
//                                 className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
//                                   licenseErrors.licenseExpiry
//                                     ? "border-red-500"
//                                     : "border-gray-300 focus:border-red-500"
//                                 }`}
//                               />

//                               <div className="mt-2 min-h-[20px]">

//                                 {licenseErrors.licenseExpiry ? (
//                                   <p className="text-sm text-red-600">
//                                     {
//                                       licenseErrors.licenseExpiry
//                                     }
//                                   </p>
//                                 ) : (
//                                   <p className="text-xs text-gray-500">
//                                     Enter the expiry date printed on your licence.
//                                   </p>
//                                 )}

//                               </div>

//                             </div>

//                           </div>

//                           <DocumentFileSelector
//                             title="Driving Licence"
//                             file={
//                               licenseFile
//                             }
//                             inputId="licenseInput"
//                             error={
//                               licenseErrors.licenseFile
//                             }
//                             onChange={(
//                               event
//                             ) => {

//                               setLicenseFile(
//                                 event.target
//                                   .files?.[0] ||
//                                   null
//                               );

//                               setLicenseErrors(
//                                 (
//                                   previous
//                                 ) => ({
//                                   ...previous,
//                                   licenseFile:
//                                     "",
//                                   submit:
//                                     "",
//                                 })
//                               );
//                             }}
//                           />

//                         </DocumentUploadCard>
//                       )}

//                       {/* =================================================
//                           AADHAAR
//                       ================================================= */}

//                       {hasAadhaarDoc ? (
//                         <DocumentPreview
//                           title="Aadhaar Card"
//                           subtitle="Government issued identity document"
//                           numberLabel="Aadhaar Card Number"
//                           documentNumber={
//                             documentsData?.aadharNo ??
//                             documentsData?.aadhaarNumber ??
//                             documentsData?.aadhaarCardNumber ??
//                             documentsData?.aadhharNumber ??
//                             ""
//                           }
//                           fileUrl={
//                             documentsData?.aadhharCard
//                           }
//                           status={
//                             normalizedDocumentStatus
//                           }
//                           setPreviewImage={
//                             setPreviewImage
//                           }
//                           onDelete={() =>
//                             openDeleteDocPopup(
//                               "aadhaar"
//                             )
//                           }
//                         />
//                       ) : (
//                         <DocumentUploadCard
//                           title="Aadhaar Card"
//                           formId="aadhaar-form"
//                           onSubmit={
//                             handleAadhaarSubmit
//                           }
//                           uploading={
//                             uploadingAadhaar
//                           }
//                           submitError={
//                             aadhaarErrors.submit
//                           }
//                         >

//                           <div className="mb-5">

//                             <label
//                               htmlFor="aadhaarNumber"
//                               className="mb-2 block text-sm font-semibold text-gray-800"
//                             >
//                               Aadhaar Card Number
//                               <span className="ml-1 text-red-500">
//                                 *
//                               </span>
//                             </label>

//                             <input
//                               id="aadhaarNumber"
//                               type="text"
//                               inputMode="numeric"
//                               autoComplete="off"
//                               value={
//                                 aadhaarNumber
//                               }
//                               maxLength={14}
//                               placeholder="Example: 2345 6789 1234"
//                               onChange={(event) => {

//                                 const digits =
//                                   event.target.value
//                                     .replace(
//                                       /\D/g,
//                                       ""
//                                     )
//                                     .slice(
//                                       0,
//                                       12
//                                     );

//                                 const formattedValue =
//                                   digits.replace(
//                                     /(\d{4})(?=\d)/g,
//                                     "$1 "
//                                   );

//                                 setAadhaarNumber(
//                                   formattedValue
//                                 );

//                                 setAadhaarErrors(
//                                   (
//                                     previous
//                                   ) => ({
//                                     ...previous,
//                                     aadhaarNumber:
//                                       "",
//                                     submit:
//                                       "",
//                                   })
//                                 );
//                               }}
//                               className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
//                                 aadhaarErrors.aadhaarNumber
//                                   ? "border-red-500"
//                                   : "border-gray-300 focus:border-red-500"
//                               }`}
//                             />

//                             <div className="mt-2 min-h-[25px]">

//                               {aadhaarErrors.aadhaarNumber ? (
//                                 <p className="text-sm text-red-600">
//                                   {
//                                     aadhaarErrors.aadhaarNumber
//                                   }
//                                 </p>
//                               ) : (
//                                 <p className="text-xs text-gray-500">
//                                   Enter your 12-digit Aadhaar number.
//                                 </p>
//                               )}

//                             </div>

//                           </div>

//                           <DocumentFileSelector
//                             title="Aadhaar Card"
//                             file={
//                               aadhharFile
//                             }
//                             inputId="aadhaarInput"
//                             error={
//                               aadhaarErrors.aadhharFile
//                             }
//                             onChange={(
//                               event
//                             ) => {

//                               setAadhharFile(
//                                 event.target
//                                   .files?.[0] ||
//                                   null
//                               );

//                               setAadhaarErrors(
//                                 (
//                                   previous
//                                 ) => ({
//                                   ...previous,
//                                   aadhharFile:
//                                     "",
//                                   submit:
//                                     "",
//                                 })
//                               );
//                             }}
//                           />

//                         </DocumentUploadCard>
//                       )}

//                     </div>

//                     {/* Information */}
//                     {!hasLicenseDoc ||
//                     !hasAadhaarDoc ? (
//                       <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">

//                         <div className="flex gap-3">

//                           <FiFileText className="mt-0.5 flex-none text-blue-500" />

//                           <div>

//                             <p className="text-sm font-semibold text-blue-900">
//                               Document verification
//                             </p>

//                             <p className="mt-1 text-sm leading-6 text-blue-700">
//                               Please upload both your Driving Licence and Aadhaar Card before making a booking that requires document verification.
//                             </p>

//                           </div>

//                         </div>

//                       </div>
//                     ) : null}

//                   </>
//                 )}

//               </div>
//             )}

//         </div>
//       </div>

//       {/* =====================================================
//           FULL IMAGE PREVIEW MODAL
//       ===================================================== */}

//       {previewImage && (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
//           onClick={() =>
//             setPreviewImage(null)
//           }
//         >

//           <button
//             type="button"
//             onClick={() =>
//               setPreviewImage(null)
//             }
//             className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500"
//             aria-label="Close preview"
//           >
//             <FiX className="text-2xl" />
//           </button>

//           <div
//             className="relative flex max-h-[92vh] max-w-[95vw] items-center justify-center"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             <img
//               src={previewImage}
//               alt="Document full preview"
//               className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
//             />

//           </div>

//         </div>
//       )}

//       {/* =====================================================
//           CANCEL BOOKING POPUP
//       ===================================================== */}

//       {showCancelPopup &&
//         selectedBooking && (
//           <div
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//             onClick={
//               closeCancelBookingPopup
//             }
//           >

//             <motion.div
//               initial={{
//                 opacity: 0,
//                 scale: 0.9,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.2,
//               }}
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//               className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
//             >

//               <div className="border-b border-gray-200 px-5 py-4 sm:px-6">

//                 <div className="flex items-center justify-between gap-4">

//                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                     Cancel Booking
//                   </h3>

//                   <button
//                     type="button"
//                     onClick={
//                       closeCancelBookingPopup
//                     }
//                     disabled={
//                       deletingBooking
//                     }
//                     className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
//                   >
//                     <FiX className="text-xl" />
//                   </button>

//                 </div>

//               </div>

//               <div className="px-5 py-6 text-center sm:px-6">

//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
//                   <FiX className="text-3xl text-red-600" />
//                 </div>

//                 <h4 className="mb-2 text-xl font-bold text-gray-900">
//                   Delete this booking?
//                 </h4>

//                 <p className="text-sm leading-6 text-gray-600 sm:text-base">
//                   Are you sure you want to delete your booking for{" "}
//                   <span className="font-bold text-gray-900">
//                     {selectedBooking.name ||
//                       "this car"}
//                   </span>
//                   ?
//                 </p>

//                 <div className="mt-4 rounded-lg bg-gray-50 p-3 text-left">

//                   <p className="text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">
//                       Brand:
//                     </span>{" "}
//                     {selectedBooking.brand ||
//                       "Not available"}
//                   </p>

//                   <p className="mt-1 text-sm text-gray-600">
//                     <span className="font-semibold text-gray-800">
//                       Booking ID:
//                     </span>{" "}
//                     {
//                       selectedBooking.bookingId
//                     }
//                   </p>

//                 </div>

//                 {cancelError && (
//                   <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                     {cancelError}
//                   </div>
//                 )}

//               </div>

//               <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

//                 <button
//                   type="button"
//                   onClick={
//                     closeCancelBookingPopup
//                   }
//                   disabled={
//                     deletingBooking
//                   }
//                   className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={
//                     handleDeleteBooking
//                   }
//                   disabled={
//                     deletingBooking
//                   }
//                   className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:bg-red-400 sm:w-auto"
//                 >

//                   {deletingBooking ? (
//                     <>
//                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Cancel Booking"
//                   )}

//                 </button>

//               </div>

//             </motion.div>

//           </div>
//         )}

//       {/* =====================================================
//           DELETE DOCUMENT POPUP
//       ===================================================== */}

//       {showDeleteDocPopup &&
//         deleteDocTarget && (
//           <div
//             className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
//             onClick={
//               closeDeleteDocPopup
//             }
//           >

//             <motion.div
//               initial={{
//                 opacity: 0,
//                 scale: 0.9,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.2,
//               }}
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//               className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
//             >

//               <div className="border-b border-gray-200 px-5 py-4 sm:px-6">

//                 <div className="flex items-center justify-between gap-4">

//                   <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
//                     Delete Document
//                   </h3>

//                   <button
//                     type="button"
//                     onClick={
//                       closeDeleteDocPopup
//                     }
//                     disabled={
//                       deletingDocument
//                     }
//                     className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
//                   >
//                     <FiX className="text-xl" />
//                   </button>

//                 </div>

//               </div>

//               <div className="px-5 py-6 text-center sm:px-6">

//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
//                   <FiTrash2 className="text-3xl text-red-600" />
//                 </div>

//                 <h4 className="mb-2 text-xl font-bold text-gray-900">
//                   Delete {deleteDocLabel}?
//                 </h4>

//                 <p className="text-sm leading-6 text-gray-600 sm:text-base">
//                   This will remove your uploaded{" "}
//                   <span className="font-bold text-gray-900">
//                     {deleteDocLabel}
//                   </span>{" "}
//                   file and its details. You can upload a new one right after.
//                 </p>

//                 {deleteDocError && (
//                   <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                     {deleteDocError}
//                   </div>
//                 )}

//               </div>

//               <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

//                 <button
//                   type="button"
//                   onClick={
//                     closeDeleteDocPopup
//                   }
//                   disabled={
//                     deletingDocument
//                   }
//                   className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={
//                     handleDeleteDocument
//                   }
//                   disabled={
//                     deletingDocument
//                   }
//                   className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:bg-red-400 sm:w-auto"
//                 >

//                   {deletingDocument ? (
//                     <>
//                       <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                       Deleting...
//                     </>
//                   ) : (
//                     "Delete Document"
//                   )}

//                 </button>

//               </div>

//             </motion.div>

//           </div>
//         )}

//     </div>
//   );
// };

// // =========================================================
// // DOCUMENT FILE SELECTOR
// // =========================================================

// const DocumentFileSelector = ({
//   title,
//   file,
//   inputId,
//   error,
//   onChange,
// }) => {
//   return (
//     <div>

//       <div
//         className={`relative flex min-h-[210px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
//           error
//             ? "border-red-400 bg-red-50"
//             : file
//             ? "border-green-400 bg-green-50"
//             : "border-gray-300 bg-white hover:border-red-400 hover:bg-red-50/30"
//         }`}
//       >

//         {file ? (
//           <>
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
//               <FiCheckCircle className="text-2xl" />
//             </div>

//             <p className="font-bold text-gray-900">
//               File Selected
//             </p>

//             <p className="mt-1 max-w-full break-all px-4 text-sm text-gray-500">
//               {file.name}
//             </p>
//           </>
//         ) : (
//           <>
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
//               <FiFileText className="text-2xl" />
//             </div>

//             <p className="font-bold text-gray-800">
//               Upload {title}
//             </p>

//             <p className="mt-1 text-sm text-gray-500">
//               JPG, JPEG, PNG or PDF
//             </p>
//           </>
//         )}

//         <label
//           htmlFor={inputId}
//           className="mt-5 cursor-pointer rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:border-red-400 hover:bg-red-50 hover:text-red-600"
//         >
//           {file
//             ? "Change File"
//             : "Select File"}
//         </label>

//         <input
//           id={inputId}
//           type="file"
//           hidden
//           accept=".jpg,.jpeg,.png,.pdf"
//           onChange={onChange}
//         />

//       </div>

//       <div className="mt-2 min-h-[20px]">

//         {error && (
//           <p className="text-sm text-red-600">
//             {error}
//           </p>
//         )}

//       </div>

//     </div>
//   );
// };

// // =========================================================
// // DOCUMENT UPLOAD CARD
// // =========================================================

// const DocumentUploadCard = ({
//   title,
//   formId,
//   onSubmit,
//   uploading,
//   submitError,
//   children,
// }) => (
//   <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">

//     {/* Header */}
//     <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-5 sm:px-6">

//       <div className="flex items-center gap-3">

//         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100">
//           <FiFileText className="text-xl" />
//         </div>

//         <div>
//           <h3 className="text-lg font-bold text-gray-900">
//             {title}
//           </h3>

//           <p className="text-xs text-gray-500">
//             Document not uploaded
//           </p>
//         </div>

//       </div>

//     </div>

//     {/* Form */}
//     <form
//       id={formId}
//       onSubmit={onSubmit}
//       noValidate
//       className="flex flex-1 flex-col p-5 sm:p-6"
//     >

//       {children}

//       {submitError && (
//         <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {submitError}
//         </div>
//       )}

//       <div className="mt-auto flex justify-end pt-5">

//         <button
//           type="submit"
//           disabled={uploading}
//           className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-red-300 sm:w-auto"
//         >

//           {uploading ? (
//             <>
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               Uploading...
//             </>
//           ) : (
//             <>
//               <FiCheck />
//               Submit {title}
//             </>
//           )}

//         </button>

//       </div>

//     </form>

//   </div>
// );

// // =========================================================
// // DOCUMENT PREVIEW
// // =========================================================

// // const DocumentPreview = ({
// //   title,
// //   subtitle,
// //   numberLabel,
// //   documentNumber,
// //   licenseExpiry,
// //   fileUrl,
// //   status,
// //   setPreviewImage,
// //   onDelete,
// // }) => {
// //   const [showNumber, setShowNumber] =
// //     useState(false);

// //   // ---------------------------------------------------------
// //   // FILE TYPE
// //   // ---------------------------------------------------------

// //   const getFileType = (url) => {
// //     if (!url) return "unknown";

// //     try {
// //       const cleanUrl = url
// //         .split("?")[0]
// //         .split("#")[0];

// //       const extension = cleanUrl
// //         .split(".")
// //         .pop()
// //         ?.toLowerCase();

// //       if (
// //         [
// //           "jpg",
// //           "jpeg",
// //           "png",
// //           "webp",
// //           "gif",
// //         ].includes(extension)
// //       ) {
// //         return "image";
// //       }

// //       if (extension === "pdf") {
// //         return "pdf";
// //       }

// //       return "file";
// //     } catch {
// //       return "file";
// //     }
// //   };

// //   const fileType = getFileType(fileUrl);

// //   // ---------------------------------------------------------
// //   // DOCUMENT NUMBER
// //   // ---------------------------------------------------------

// //   const formattedNumber = documentNumber
// //     ? String(documentNumber).trim()
// //     : "Not available";

// //   const maskedNumber = (() => {
// //     if (
// //       !formattedNumber ||
// //       formattedNumber === "Not available"
// //     ) {
// //       return formattedNumber;
// //     }

// //     if (title === "Aadhaar Card") {
// //       const digits =
// //         formattedNumber.replace(
// //           /\D/g,
// //           ""
// //         );

// //       if (digits.length === 12) {
// //         return `XXXX XXXX ${digits.slice(
// //           -4
// //         )}`;
// //       }
// //     }

// //     if (formattedNumber.length > 6) {
// //       return `${formattedNumber.slice(
// //         0,
// //         4
// //       )}${"*".repeat(
// //         Math.max(
// //           formattedNumber.length - 8,
// //           3
// //         )
// //       )}${formattedNumber.slice(-4)}`;
// //     }

// //     return formattedNumber;
// //   })();

// //   // ---------------------------------------------------------
// //   // LICENSE EXPIRY
// //   // ---------------------------------------------------------

// //   const formattedLicenseExpiry =
// //     (() => {
// //       if (!licenseExpiry) {
// //         return "Not available";
// //       }

// //       const rawValue = String(
// //         licenseExpiry
// //       ).trim();

// //       const dateOnlyValue =
// //         rawValue.includes("T")
// //           ? rawValue.split("T")[0]
// //           : rawValue;

// //       const parts =
// //         dateOnlyValue.split("-");

// //       if (parts.length === 3) {
// //         const [year, month, day] =
// //           parts;

// //         return `${day}-${month}-${year}`;
// //       }

// //       return rawValue;
// //     })();

// //   // ---------------------------------------------------------
// //   // STATUS
// //   // ---------------------------------------------------------

// //   const statusConfig = {
// //     ACCEPT: {
// //       label: "ACCEPTED",
// //       bg: "bg-green-50",
// //       text: "text-green-700",
// //       border: "border-green-200",
// //       dot: "bg-green-500",
// //     },

// //     REJECT: {
// //       label: "REJECTED",
// //       bg: "bg-red-50",
// //       text: "text-red-700",
// //       border: "border-red-200",
// //       dot: "bg-red-500",
// //     },

// //     PENDING: {
// //       label: "PENDING",
// //       bg: "bg-yellow-50",
// //       text: "text-yellow-700",
// //       border: "border-yellow-200",
// //       dot: "bg-yellow-500",
// //     },
// //   };

// //   const currentStatus =
// //     statusConfig[status] ||
// //     statusConfig.PENDING;

// //   // ---------------------------------------------------------
// //   // RETURN
// //   // ---------------------------------------------------------

// //   return (
// //     <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

// //       {/* =====================================================
// //           HEADER
// //       ===================================================== */}

// //       <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-5 sm:px-6">

// //         <div className="flex items-start justify-between gap-4">

// //           <div className="flex min-w-0 items-center gap-3">

// //             <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100">
// //               <FiFileText className="text-xl" />
// //             </div>

// //             <div className="min-w-0">

// //               <h3 className="truncate text-lg font-bold text-gray-900">
// //                 {title}
// //               </h3>

// //               <p className="mt-0.5 truncate text-xs text-gray-500">
// //                 {subtitle ||
// //                   "Uploaded document"}
// //               </p>

// //             </div>

// //           </div>

// //           {/* Delete */}
// //           <button
// //             type="button"
// //             onClick={onDelete}
// //             title={`Remove ${title}`}
// //             aria-label={`Remove ${title}`}
// //             className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
// //           >
// //             <FiTrash2 className="text-base" />
// //           </button>

// //         </div>

// //         {/* Status */}
// //         {/* <div className="mt-4">

// //           <span
// //             className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
// //           >

// //             <span
// //               className={`h-2 w-2 rounded-full ${currentStatus.dot}`}
// //             />

// //             {currentStatus.label}

// //           </span>

// //         </div> */}

// //       </div>

// //       {/* =====================================================
// //           DOCUMENT INFO
// //       ===================================================== */}

// //       <div className="grid grid-cols-1 gap-4 border-b border-gray-200 bg-white p-5 sm:grid-cols-2 sm:p-6">

// //         {/* Number */}
// //         <div>

// //           <div className="mb-2 flex items-center justify-between gap-2">

// //             <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
// //               {numberLabel}
// //             </p>

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 setShowNumber(
// //                   (previous) =>
// //                     !previous
// //                 )
// //               }
// //               className="flex items-center gap-1 text-xs font-semibold text-red-500 transition hover:text-red-700"
// //             >

// //               {showNumber ? (
// //                 <>
// //                   <FiEyeOff />
// //                   Hide
// //                 </>
// //               ) : (
// //                 <>
// //                   <FiEye />
// //                   Show
// //                 </>
// //               )}

// //             </button>

// //           </div>

// //           <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">

// //             <span className="break-all">
// //               {showNumber
// //                 ? formattedNumber
// //                 : maskedNumber}
// //             </span>

// //           </div>

// //         </div>

// //         {/* Expiry */}
// //         {licenseExpiry !==
// //           undefined && (
// //           <div>

// //             <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
// //               Licence Expiry
// //             </p>

// //             <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">
// //               {
// //                 formattedLicenseExpiry
// //               }
// //             </div>

// //           </div>
// //         )}

// //       </div>

// //       {/* =====================================================
// //           FILE PREVIEW
// //       ===================================================== */}

// //       <div className="flex flex-1 flex-col p-4 sm:p-5">

// //         <div className="mb-3 flex items-center justify-between">

// //           <div>

// //             <p className="text-sm font-bold text-gray-800">
// //               Uploaded Document
// //             </p>

// //             <p className="text-xs text-gray-500">
// //               Preview
// //             </p>

// //           </div>

// //           {fileType ===
// //             "image" && (
// //             <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
// //               Image
// //             </span>
// //           )}

// //           {fileType ===
// //             "pdf" && (
// //             <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-500">
// //               PDF
// //             </span>
// //           )}

// //         </div>

// //         {/* =================================================
// //             IMPORTANT:
// //             Fixed compact height so uploaded image looks
// //             like the upload card instead of becoming huge.
// //         ================================================= */}

// //         <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 sm:h-[230px]">

// //           {!fileUrl ? (
// //             <div className="text-center">

// //               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
// //                 <FiFileText className="text-3xl" />
// //               </div>

// //               <p className="font-semibold text-gray-700">
// //                 Document unavailable
// //               </p>

// //               <p className="mt-1 text-sm text-gray-500">
// //                 The uploaded file could not be found.
// //               </p>

// //             </div>
// //           ) : fileType ===
// //             "image" ? (

// //             /*
// //              * COMPACT IMAGE PREVIEW
// //              *
// //              * h-full + w-full
// //              * object-contain
// //              *
// //              * The image will stay inside the card,
// //              * and the complete document remains visible.
// //              */

// //             <div className="group/image relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">

// //               <img
// //                 src={fileUrl}
// //                 alt={title}
// //                 className="h-full w-full rounded-xl object-contain p-2 transition-transform duration-300 group-hover/image:scale-[1.02]"
// //                 onError={(
// //                   event
// //                 ) => {
// //                   event.currentTarget.style.display =
// //                     "none";
// //                 }}
// //               />

// //               {/* Hover overlay */}
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   setPreviewImage(
// //                     fileUrl
// //                   )
// //                 }
// //                 className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/image:opacity-100 focus:opacity-100"
// //               >

// //                 <span className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-xl">

// //                   <FiEye className="text-lg" />

// //                   View Full Image

// //                 </span>

// //               </button>

// //               {/* Stamp */}
// //               <div className="pointer-events-none absolute bottom-3 right-3">
// //                 <DocumentStamp
// //                   status={status}
// //                 />
// //               </div>

// //             </div>
// //           ) : fileType ===
// //             "pdf" ? (

// //             <div className="relative flex h-full w-full flex-col items-center justify-center">

// //               <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
// //                 <FiFileText className="text-4xl" />
// //               </div>

// //               <p className="font-bold text-gray-900">
// //                 PDF Document
// //               </p>

// //               <p className="mt-1 text-sm text-gray-500">
// //                 Your document is available as a PDF file.
// //               </p>

// //               <a
// //                 href={fileUrl}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
// //               >
// //                 <FiEye />
// //                 Open PDF
// //               </a>

// //               <div className="pointer-events-none absolute bottom-3 right-3">
// //                 <DocumentStamp
// //                   status={status}
// //                 />
// //               </div>

// //             </div>
// //           ) : (

// //             <div className="relative flex h-full w-full flex-col items-center justify-center">

// //               <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
// //                 <FiFileText className="text-4xl" />
// //               </div>

// //               <p className="font-bold text-gray-900">
// //                 Document File
// //               </p>

// //               <a
// //                 href={fileUrl}
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 className="mt-5 font-semibold text-red-500 underline underline-offset-4 hover:text-red-700"
// //               >
// //                 View Document
// //               </a>

// //               <div className="pointer-events-none absolute bottom-3 right-3">
// //                 <DocumentStamp
// //                   status={status}
// //                 />
// //               </div>

// //             </div>
// //           )}

// //         </div>

// //         {/* Footer */}
// //         <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">

// //           <div className="flex items-center gap-2 text-xs text-gray-500">

// //             <FiCheckCircle className="text-green-500" />

// //             <span>
// //               Document uploaded successfully
// //             </span>

// //           </div>

// //           <span className="hidden text-xs font-medium text-gray-400 sm:block">
// //             Secure document
// //           </span>

// //         </div>

// //       </div>

// //     </div>
// //   );
// // };
// // =========================================================
// // DOCUMENT PREVIEW
// // =========================================================

// const DocumentPreview = ({
//   title,
//   subtitle,
//   numberLabel,
//   documentNumber,
//   licenseExpiry,
//   fileUrl,
//   status,
//   setPreviewImage,
//   onDelete,
// }) => {
//   const [showNumber, setShowNumber] = useState(false);

//   // ---------------------------------------------------------
//   // FILE TYPE
//   // ---------------------------------------------------------

//   const getFileType = (url) => {
//     if (!url) return "unknown";

//     try {
//       const cleanUrl = url
//         .split("?")[0]
//         .split("#")[0];

//       const extension = cleanUrl
//         .split(".")
//         .pop()
//         ?.toLowerCase();

//       if (
//         [
//           "jpg",
//           "jpeg",
//           "png",
//           "webp",
//           "gif",
//         ].includes(extension)
//       ) {
//         return "image";
//       }

//       if (extension === "pdf") {
//         return "pdf";
//       }

//       return "file";
//     } catch {
//       return "file";
//     }
//   };

//   const fileType = getFileType(fileUrl);

//   // ---------------------------------------------------------
//   // DOCUMENT NUMBER
//   // ---------------------------------------------------------

//   const formattedNumber = documentNumber
//     ? String(documentNumber).trim()
//     : "Not available";

//   const maskedNumber = (() => {
//     if (
//       !formattedNumber ||
//       formattedNumber === "Not available"
//     ) {
//       return formattedNumber;
//     }

//     // Aadhaar masking
//     if (title === "Aadhaar Card") {
//       const digits = formattedNumber.replace(
//         /\D/g,
//         ""
//       );

//       if (digits.length === 12) {
//         return `XXXX XXXX ${digits.slice(-4)}`;
//       }
//     }

//     // Driving Licence masking
//     if (formattedNumber.length > 6) {
//       return `${formattedNumber.slice(
//         0,
//         4
//       )}${"*".repeat(
//         Math.max(
//           formattedNumber.length - 8,
//           3
//         )
//       )}${formattedNumber.slice(-4)}`;
//     }

//     return formattedNumber;
//   })();

//   // ---------------------------------------------------------
//   // LICENSE EXPIRY
//   // ---------------------------------------------------------

//   const formattedLicenseExpiry = (() => {
//     if (!licenseExpiry) {
//       return "Not available";
//     }

//     const rawValue = String(
//       licenseExpiry
//     ).trim();

//     const dateOnlyValue = rawValue.includes("T")
//       ? rawValue.split("T")[0]
//       : rawValue;

//     const parts = dateOnlyValue.split("-");

//     if (parts.length === 3) {
//       const [year, month, day] = parts;

//       return `${day}-${month}-${year}`;
//     }

//     return rawValue;
//   })();

//   // ---------------------------------------------------------
//   // STATUS
//   // ---------------------------------------------------------

//   const statusConfig = {
//     ACCEPT: {
//       label: "ACCEPTED",
//       bg: "bg-green-50",
//       text: "text-green-700",
//       border: "border-green-200",
//       dot: "bg-green-500",
//     },

//     REJECT: {
//       label: "REJECTED",
//       bg: "bg-red-50",
//       text: "text-red-700",
//       border: "border-red-200",
//       dot: "bg-red-500",
//     },

//     PENDING: {
//       label: "PENDING",
//       bg: "bg-yellow-50",
//       text: "text-yellow-700",
//       border: "border-yellow-200",
//       dot: "bg-yellow-500",
//     },
//   };

//   const currentStatus =
//     statusConfig[status] ||
//     statusConfig.PENDING;

//   // ---------------------------------------------------------
//   // RETURN
//   // ---------------------------------------------------------

//   return (
//     <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-4 sm:px-6 sm:py-5">

//         <div className="flex items-center justify-between gap-3">

//           {/* =================================================
//               LEFT - DOCUMENT ICON + TITLE
//           ================================================= */}

//           <div className="flex min-w-0 flex-1 items-center gap-3">

//             {/* Document Icon */}
//             <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 sm:h-11 sm:w-11">

//               <FiFileText className="text-lg sm:text-xl" />

//             </div>

//             {/* Title */}
//             <div className="min-w-0">

//               <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">
//                 {title}
//               </h3>

//               <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">
//                 {subtitle || "Uploaded document"}
//               </p>

//             </div>

//           </div>

//           {/* =================================================
//               RIGHT - STATUS + DELETE
//           ================================================= */}

//           <div className="flex flex-none items-center gap-2 sm:gap-3">

//             {/* Status */}
//             <span
//               className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold sm:gap-2 sm:px-3 sm:text-xs ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
//             >

//               <span
//                 className={`h-2 w-2 flex-none rounded-full ${currentStatus.dot}`}
//               />

//               {currentStatus.label}

//             </span>

//             {/* Delete */}
//             <button
//               type="button"
//               onClick={onDelete}
//               title={`Remove ${title}`}
//               aria-label={`Remove ${title}`}
//               className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
//             >

//               <FiTrash2 className="text-base" />

//             </button>

//           </div>

//         </div>

//       </div>

//       {/* =====================================================
//           DOCUMENT INFO
//       ===================================================== */}

//       <div className="grid grid-cols-1 gap-4 border-b border-gray-200 bg-white p-5 sm:grid-cols-2 sm:p-6">

//         {/* =================================================
//             DOCUMENT NUMBER
//         ================================================= */}

//         <div>

//           <div className="mb-2 flex items-center justify-between gap-2">

//             <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
//               {numberLabel}
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowNumber(
//                   (previous) => !previous
//                 )
//               }
//               className="flex items-center gap-1 text-xs font-semibold text-red-500 transition hover:text-red-700"
//             >

//               {showNumber ? (
//                 <>
//                   <FiEyeOff />
//                   Hide
//                 </>
//               ) : (
//                 <>
//                   <FiEye />
//                   Show
//                 </>
//               )}

//             </button>

//           </div>

//           <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">

//             <span className="break-all">
//               {showNumber
//                 ? formattedNumber
//                 : maskedNumber}
//             </span>

//           </div>

//         </div>

//         {/* =================================================
//             LICENSE EXPIRY
//         ================================================= */}

//         {licenseExpiry !== undefined && (
//           <div>

//             <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
//               Licence Expiry
//             </p>

//             <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">
//               {formattedLicenseExpiry}
//             </div>

//           </div>
//         )}

//       </div>

//       {/* =====================================================
//           FILE PREVIEW
//       ===================================================== */}

//       <div className="flex flex-1 flex-col p-4 sm:p-5">

//         {/* Preview Header */}
//         <div className="mb-3 flex items-center justify-between">

//           <div>

//             <p className="text-sm font-bold text-gray-800">
//               Uploaded Document
//             </p>

//             <p className="text-xs text-gray-500">
//               Preview
//             </p>

//           </div>

//           {/* File Type */}
//           {fileType === "image" && (
//             <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
//               Image
//             </span>
//           )}

//           {fileType === "pdf" && (
//             <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-500">
//               PDF
//             </span>
//           )}

//         </div>

//         {/* =================================================
//             DOCUMENT PREVIEW CONTAINER
//         ================================================= */}

//         <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 sm:h-[230px]">

//           {/* =================================================
//               NO FILE
//           ================================================= */}

//           {!fileUrl ? (

//             <div className="text-center">

//               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">

//                 <FiFileText className="text-3xl" />

//               </div>

//               <p className="font-semibold text-gray-700">
//                 Document unavailable
//               </p>

//               <p className="mt-1 text-sm text-gray-500">
//                 The uploaded file could not be found.
//               </p>

//             </div>

//           ) : fileType === "image" ? (

//             /* =================================================
//                 IMAGE PREVIEW
//             ================================================= */

//             <div className="group/image relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">

//               <img
//                 src={fileUrl}
//                 alt={title}
//                 className="h-full w-full rounded-xl object-contain p-2 transition-transform duration-300 group-hover/image:scale-[1.02]"
//                 onError={(event) => {
//                   event.currentTarget.style.display =
//                     "none";
//                 }}
//               />

//               {/* Hover Overlay */}
//               <button
//                 type="button"
//                 onClick={() =>
//                   setPreviewImage(fileUrl)
//                 }
//                 className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/image:opacity-100 focus:opacity-100"
//               >

//                 <span className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-xl">

//                   <FiEye className="text-lg" />

//                   View Full Image

//                 </span>

//               </button>

//               {/* Document Stamp */}
//               <div className="pointer-events-none absolute bottom-3 right-3">

//                 <DocumentStamp
//                   status={status}
//                 />

//               </div>

//             </div>

//           ) : fileType === "pdf" ? (

//             /* =================================================
//                 PDF PREVIEW
//             ================================================= */

//             <div className="relative flex h-full w-full flex-col items-center justify-center">

//               <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">

//                 <FiFileText className="text-4xl" />

//               </div>

//               <p className="font-bold text-gray-900">
//                 PDF Document
//               </p>

//               <p className="mt-1 text-sm text-gray-500">
//                 Your document is available as a PDF file.
//               </p>

//               <a
//                 href={fileUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
//               >

//                 <FiEye />

//                 Open PDF

//               </a>

//               {/* Document Stamp */}
//               <div className="pointer-events-none absolute bottom-3 right-3">

//                 <DocumentStamp
//                   status={status}
//                 />

//               </div>

//             </div>

//           ) : (

//             /* =================================================
//                 OTHER FILE
//             ================================================= */

//             <div className="relative flex h-full w-full flex-col items-center justify-center">

//               <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">

//                 <FiFileText className="text-4xl" />

//               </div>

//               <p className="font-bold text-gray-900">
//                 Document File
//               </p>

//               <a
//                 href={fileUrl}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="mt-5 font-semibold text-red-500 underline underline-offset-4 hover:text-red-700"
//               >
//                 View Document
//               </a>

//               {/* Document Stamp */}
//               <div className="pointer-events-none absolute bottom-3 right-3">

//                 <DocumentStamp
//                   status={status}
//                 />

//               </div>

//             </div>

//           )}

//         </div>

//         {/* =================================================
//             FOOTER
//         ================================================= */}

//         <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">

//           <div className="flex items-center gap-2 text-xs text-gray-500">

//             <FiCheckCircle className="flex-none text-green-500" />

//             <span>
//               Document uploaded successfully
//             </span>

//           </div>

//           <span className="hidden text-xs font-medium text-gray-400 sm:block">
//             Secure document
//           </span>

//         </div>

//       </div>

//     </div>
//   );
// };
// export default Dashboard;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DocumentStamp from "../components/DocumentStamp";

import {
  FiUser,
  FiBookmark,
  FiCalendar,
  FiFileText,
  FiEdit,
  FiX,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiTrash2,
  FiAlertCircle,
  FiMapPin,
  FiCreditCard,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";

import {
  getAllCarts,
  getUserByEmail,
  updateUser,
  uploadDocuments,
  deleteUserDocument,
  getBookingList,
  getUserDocuments,
  updateUserDocument,
  TripDetailsForHistory,
} from "../services/carService";

import { formatCurrency } from "../utils/helpers";

const DRIVING_LICENSE_PATTERN = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
const AADHAAR_PATTERN = /^[2-9][0-9]{11}$/;

const Dashboard = () => {
  const { user } = useAuth();
  const { cancelBooking } = useBooking();

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [activeTab, setActiveTab] = useState(isAdmin ? "adminCars" : "bookings");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [editData, setEditData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
  });

  // ---------- Trip Details popup ----------
  const [showTripDetailsPopup, setShowTripDetailsPopup] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);
  const [loadingTripDetails, setLoadingTripDetails] = useState(false);
  const [tripDetailsError, setTripDetailsError] = useState("");
  const [bookingList, setBookingList] = useState([]);
  const [selectedTripBooking, setSelectedTripBooking] = useState(null);

  const closeTripDetailsPopup = () => {
    if (loadingTripDetails) return;
    setShowTripDetailsPopup(false);
    setTripDetails(null);
    setTripDetailsError("");
    setSelectedTripBooking(null);
  };

  // Cancel booking popup
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deletingBooking, setDeletingBooking] = useState(false);
  const [cancelError, setCancelError] = useState("");

  // ---------- Document state ----------
  const [licenseFile, setLicenseFile] = useState(null);
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [licenseErrors, setLicenseErrors] = useState({});
  const [uploadingLicense, setUploadingLicense] = useState(false);

  const [aadhharFile, setAadhharFile] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarErrors, setAadhaarErrors] = useState({});
  const [uploadingAadhaar, setUploadingAadhaar] = useState(false);

  const [documentsData, setDocumentsData] = useState(null);
  const [documentsLoading, setDocumentsLoading] = useState(false);

  const [deleteDocTarget, setDeleteDocTarget] = useState(null);
  const [showDeleteDocPopup, setShowDeleteDocPopup] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState(false);
  const [deleteDocError, setDeleteDocError] = useState("");

  const [savedCarsData, setSavedCarsData] = useState([]);
  const [loadingSavedCars, setLoadingSavedCars] = useState(true);

  // =========================================================
  // PREVENT BACKGROUND SCROLL WHEN MODAL IS OPEN
  // =========================================================
  useEffect(() => {
    if (showTripDetailsPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showTripDetailsPopup]);

  // =========================================================
  // CANCEL BOOKING
  // =========================================================
  const openCancelBookingPopup = (booking) => {
    setSelectedBooking(booking);
    setCancelError("");
    setShowCancelPopup(true);
  };

  const closeCancelBookingPopup = () => {
    if (deletingBooking) return;
    setShowCancelPopup(false);
    setSelectedBooking(null);
    setCancelError("");
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking?.bookingId) {
      setCancelError("Booking ID not found.");
      return;
    }

    try {
      setDeletingBooking(true);
      setCancelError("");
      const bookingId = selectedBooking.bookingId;
      await cancelBooking(bookingId);
      setBookingList((previousBookings) =>
        previousBookings.filter((booking) => booking.bookingId !== bookingId)
      );
      setShowCancelPopup(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Cancel booking failed:", error.response?.data || error.message);
      setCancelError(
        error.response?.data?.message ||
          error.message ||
          "Unable to cancel booking. Please try again."
      );
    } finally {
      setDeletingBooking(false);
    }
  };

  const formatTripDate = (dateValue) => {
    if (!dateValue) return "Not available";
    const parts = String(dateValue).split("T")[0].split("-");
    if (parts.length !== 3) return dateValue;
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  };

  // =========================================================
  // DOCUMENT STATUS
  // =========================================================
  const normalizedDocumentStatus = (() => {
    const rawStatus =
      documentsData?.status ??
      documentsData?.documentStatus ??
      documentsData?.verificationStatus ??
      "PENDING";

    const status = String(rawStatus).trim().toUpperCase();

    if (status === "ACCEPT" || status === "ACCEPTED" || status === "APPROVED") {
      return "ACCEPT";
    }
    if (status === "REJECT" || status === "REJECTED") {
      return "REJECT";
    }
    return "PENDING";
  })();

  // =========================================================
  // BOOKINGS
  // =========================================================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingBookings = bookingList.filter((booking) => {
    const dropoff = new Date(booking.dropoffDate);
    dropoff.setHours(0, 0, 0, 0);
    return dropoff >= today;
  });

  // =========================================================
  // FETCH DOCUMENTS
  // =========================================================
  const fetchUserDocuments = async () => {
    try {
      setDocumentsLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        setDocumentsData(null);
        return;
      }

      const response = await getUserDocuments();
      let documentData = response;
      if (response?.data) {
        documentData = response.data;
      }
      if (Array.isArray(documentData)) {
        documentData = documentData.length > 0 ? documentData[documentData.length - 1] : null;
      }
      if (!documentData) {
        setDocumentsData(null);
        return;
      }

      const receivedStatus =
        documentData.status ??
        documentData.documentStatus ??
        documentData.verificationStatus ??
        "PENDING";

      setDocumentsData({
        ...documentData,
        status: String(receivedStatus).trim().toUpperCase(),
      });
    } catch (error) {
      console.error("Fetch documents error:", error.response?.data || error.message);
      setDocumentsData(null);
    } finally {
      setDocumentsLoading(false);
    }
  };

  // =========================================================
  // FETCH BOOKINGS
  // =========================================================
  const fetchBookingList = async () => {
    try {
      const data = await getBookingList();
      setBookingList(data);
    } catch (error) {
      console.error("Error Fetching Bookings:", error);
    }
  };

  // =========================================================
  // FETCH SAVED CARS
  // =========================================================
  const fetchSavedCars = async () => {
    try {
      const data = await getAllCarts();
      setSavedCarsData(data);
    } catch (error) {
      console.error("Error fetching saved cars:", error);
    } finally {
      setLoadingSavedCars(false);
    }
  };

  // =========================================================
  // FETCH PROFILE
  // =========================================================
  const fetchUserProfile = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) return;
      const data = await getUserByEmail(email);
      setProfileData(data);
      setEditData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        phone: data?.phone || "",
        password: data?.password || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // =========================================================
  // LICENSE VALIDATION
  // =========================================================
  const validateLicenseForm = () => {
    const errors = {};
    const normalizedLicenseNumber = drivingLicenseNumber
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");

    if (!normalizedLicenseNumber) {
      errors.drivingLicenseNumber = "Driving Licence number is required.";
    } else if (!DRIVING_LICENSE_PATTERN.test(normalizedLicenseNumber)) {
      errors.drivingLicenseNumber =
        "Enter a valid Driving Licence number, for example MH1220201234567.";
    }

    if (!licenseExpiry) {
      errors.licenseExpiry = "Driving Licence expiry date is required.";
    } else {
      const selectedExpiryDate = new Date(`${licenseExpiry}T00:00:00`);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (Number.isNaN(selectedExpiryDate.getTime()) || selectedExpiryDate <= currentDate) {
        errors.licenseExpiry = "Driving Licence expiry date must be after today.";
      }
    }

    if (!licenseFile) {
      errors.licenseFile = "Driving Licence file is required.";
    }

    setLicenseErrors(errors);
    return { isValid: Object.keys(errors).length === 0, normalizedLicenseNumber };
  };

  // =========================================================
  // LICENSE SUBMIT
  // =========================================================
  const handleLicenseSubmit = async (event) => {
    event.preventDefault();
    const { isValid, normalizedLicenseNumber } = validateLicenseForm();
    if (!isValid) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLicenseErrors({ submit: "User ID was not found. Please log in again." });
      return;
    }

    const formData = new FormData();
    formData.append("drivingLicenseNumber", normalizedLicenseNumber);
    formData.append("licenseExpiry", licenseExpiry);
    if (licenseFile) formData.append("drivingLicense", licenseFile);

    try {
      setUploadingLicense(true);
      setLicenseErrors({});
      await updateUserDocument(userId, "LICENSE", formData);
      setDrivingLicenseNumber("");
      setLicenseExpiry("");
      setLicenseFile(null);
      const licenseInput = document.getElementById("licenseInput");
      if (licenseInput) licenseInput.value = "";
      await fetchUserDocuments();
    } catch (error) {
      console.error("License update error:", error.response?.data || error.message);
      setLicenseErrors({
        submit:
          error.response?.data?.message ||
          error.message ||
          "Driving Licence update failed. Please try again.",
      });
    } finally {
      setUploadingLicense(false);
    }
  };

  // =========================================================
  // AADHAAR VALIDATION
  // =========================================================
  const validateAadhaarForm = () => {
    const errors = {};
    const normalizedAadhaarNumber = aadhaarNumber.replace(/\D/g, "");

    if (!normalizedAadhaarNumber) {
      errors.aadhaarNumber = "Aadhaar number is required.";
    } else if (!AADHAAR_PATTERN.test(normalizedAadhaarNumber)) {
      errors.aadhaarNumber =
        "Enter a valid 12-digit Aadhaar number. It cannot start with 0 or 1.";
    }

    if (!aadhharFile) {
      errors.aadhharFile = "Aadhaar Card file is required.";
    }

    setAadhaarErrors(errors);
    return { isValid: Object.keys(errors).length === 0, normalizedAadhaarNumber };
  };

  // =========================================================
  // AADHAAR SUBMIT
  // =========================================================
  const handleAadhaarSubmit = async (event) => {
    event.preventDefault();
    const { isValid, normalizedAadhaarNumber } = validateAadhaarForm();
    if (!isValid) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setAadhaarErrors({ submit: "User ID was not found. Please log in again." });
      return;
    }

    const formData = new FormData();
    formData.append("aadhaarNumber", normalizedAadhaarNumber);
    if (aadhharFile) formData.append("aadhharCard", aadhharFile);

    try {
      setUploadingAadhaar(true);
      setAadhaarErrors({});
      await updateUserDocument(userId, "AADHAAR", formData);
      setAadhaarNumber("");
      setAadhharFile(null);
      const aadhaarInput = document.getElementById("aadhaarInput");
      if (aadhaarInput) aadhaarInput.value = "";
      await fetchUserDocuments();
    } catch (error) {
      console.error("Aadhaar update error:", error.response?.data || error.message);
      setAadhaarErrors({
        submit:
          error.response?.data?.message ||
          error.message ||
          "Aadhaar Card update failed. Please try again.",
      });
    } finally {
      setUploadingAadhaar(false);
    }
  };

  // =========================================================
  // DELETE DOCUMENT
  // =========================================================
  const openDeleteDocPopup = (type) => {
    setDeleteDocTarget(type);
    setDeleteDocError("");
    setShowDeleteDocPopup(true);
  };

  const closeDeleteDocPopup = () => {
    if (deletingDocument) return;
    setShowDeleteDocPopup(false);
    setDeleteDocTarget(null);
    setDeleteDocError("");
  };

  const handleDeleteDocument = async () => {
    if (!deleteDocTarget) return;
    try {
      setDeletingDocument(true);
      setDeleteDocError("");
      await deleteUserDocument(deleteDocTarget);
      await fetchUserDocuments();
      setLicenseErrors({});
      setAadhaarErrors({});
      setShowDeleteDocPopup(false);
      setDeleteDocTarget(null);
    } catch (error) {
      console.error("Delete document failed:", error.response?.data || error.message);
      setDeleteDocError(
        error.response?.data?.message ||
          error.message ||
          "Unable to delete document. Please try again."
      );
    } finally {
      setDeletingDocument(false);
    }
  };

  // =========================================================
  // VIEW TRIP DETAILS
  // =========================================================
  const handleViewTripDetails = async (booking) => {
    setSelectedTripBooking(booking);
    setShowTripDetailsPopup(true);
    setLoadingTripDetails(true);
    setTripDetails(null);
    setTripDetailsError("");

    const car_id = booking?.carId ?? booking?.car_id ?? booking?.car?.id;

    if (car_id == null) {
      setTripDetailsError("Car ID not found for this booking.");
      setLoadingTripDetails(false);
      return;
    }

    try {
      const response = await TripDetailsForHistory(car_id);
      const details = response?.data ?? response;

      if (!details || details.carId == null) {
        throw new Error("Invalid trip details received from the API.");
      }

      setTripDetails(details);
    } catch (error) {
      console.error("Error fetching trip details:", error);
      setTripDetailsError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load trip details."
      );
    } finally {
      setLoadingTripDetails(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    fetchUserProfile();
    if (!isAdmin) {
      fetchSavedCars();
      fetchBookingList();
    } else {
      setLoadingSavedCars(false);
    }
  }, []);

  // =========================================================
  // SAVE PROFILE
  // =========================================================
  const handleSaveProfile = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await updateUser(email, editData);
      setProfileData(response);
      setEditData({
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        phone: response.phone,
        password: response.password,
      });
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // =========================================================
  // TABS
  // =========================================================
  const userTabs = [
    { id: "bookings", label: "My Bookings", icon: FiCalendar },
    { id: "saved", label: "Saved Cars", icon: FiBookmark },
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "documents", label: "Documents", icon: FiFileText },
  ];

  const adminTabs = [
    { id: "adminCars", label: "Car Management", icon: FiFileText },
    { id: "adminUsers", label: "Users", icon: FiUser },
    { id: "adminBookings", label: "Bookings", icon: FiCalendar },
    { id: "adminDocuments", label: "Documents", icon: FiFileText },
    { id: "profile", label: "Profile", icon: FiUser },
  ];

  const tabs = isAdmin ? adminTabs : userTabs;

  const hasLicenseDoc = Boolean(documentsData?.drivingLicense);
  const hasAadhaarDoc = Boolean(documentsData?.aadhharCard);

  const deleteDocLabel = deleteDocTarget === "license" ? "Driving Licence" : "Aadhaar Card";

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="min-h-screen bg-light py-8">
      <div className="container-custom">
        {/* DASHBOARD HEADER */}
        <div className="mb-8 rounded-xl bg-white p-8 card-shadow">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <img
                src={profileData?.avatar}
                alt={profileData?.firstName || "User"}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {isAdmin ? "Admin Dashboard" : `Welcome, ${profileData?.firstName || "User"}!`}
                </h1>
                <p className="text-gray-600">
                  {isAdmin
                    ? "Manage cars, users, bookings, documents and revenue"
                    : profileData?.email}
                </p>
              </div>
            </div>

            {isAdmin ? (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">0</p>
                  <p className="text-sm text-gray-600">Total Cars</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">0</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">0</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{bookingList.length}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{upcomingBookings.length}</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary">{savedCarsData.length}</p>
                  <p className="text-sm text-gray-600">Saved Cars</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TABS */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "documents") {
                  fetchUserDocuments();
                }
              }}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-secondary text-white"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div>
          {/* ADMIN CARS */}
          {activeTab === "adminCars" && (
            <div className="rounded-xl bg-white p-8 card-shadow">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Car Management</h2>
                  <p className="text-gray-600">Add, update, delete and view cars</p>
                </div>
                <button className="btn-primary">+ Add Car</button>
              </div>
              <div className="grid grid-cols-5 rounded-lg bg-gray-100 p-4 font-bold">
                <p>Name</p>
                <p>Brand</p>
                <p>Price</p>
                <p>Status</p>
                <p>Action</p>
              </div>
            </div>
          )}

          {/* ADMIN USERS */}
          {activeTab === "adminUsers" && (
            <div className="rounded-xl bg-white p-8 card-shadow">
              <h2 className="mb-4 text-2xl font-bold">User Management</h2>
              <p className="text-gray-600">All registered users will show here.</p>
            </div>
          )}

          {/* ADMIN BOOKINGS */}
          {activeTab === "adminBookings" && (
            <div className="rounded-xl bg-white p-8 card-shadow">
              <h2 className="mb-4 text-2xl font-bold">All Bookings</h2>
              <p className="text-gray-600">All user bookings will show here.</p>
            </div>
          )}

          {/* ADMIN DOCUMENTS */}
          {activeTab === "adminDocuments" && (
            <div className="rounded-xl bg-white p-8 card-shadow">
              <h2 className="mb-4 text-2xl font-bold">User Documents</h2>
              <p className="text-gray-600">All uploaded user documents will show here.</p>
            </div>
          )}

          {/* BOOKINGS */}
          {activeTab === "bookings" && !isAdmin && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold">My Bookings</h2>
                {bookingList.length > 0 ? (
                  <div className="grid gap-6">
                    {bookingList.map((booking) => {
                      const imageUrl = booking.mainImage
                        ? booking.mainImage.startsWith("http")
                          ? booking.mainImage
                          : `http://localhost:8080/car-images/${encodeURIComponent(booking.mainImage)}`
                        : "/placeholder-car.png";

                      const normalizedStatus = String(booking.status || "PENDING").toUpperCase();

                      return (
                        <motion.div
                          key={booking.bookingId}
                          whileHover={{ y: -5 }}
                          className="rounded-xl bg-white p-6 card-shadow"
                        >
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div>
                              <img
                                src={imageUrl}
                                alt={booking.name || "Booked car"}
                                className="h-40 w-full rounded-lg object-cover"
                                onError={(event) => {
                                  event.currentTarget.src = "/placeholder-car.png";
                                }}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <h3 className="mb-2 text-xl font-bold">{booking.name}</h3>
                              <div className="space-y-2 text-gray-600">
                                <p>
                                  <span className="font-semibold">Brand:</span> {booking.brand}
                                </p>
                                <p>
                                  <span className="font-semibold">Fuel:</span> {booking.fuelType}
                                </p>
                                <p>
                                  <span className="font-semibold">Transmission:</span>{" "}
                                  {booking.transmition}
                                </p>
                                <p>
                                  <span className="font-semibold">Seating:</span> {booking.seating}
                                </p>
                                <p>
                                  <span className="font-semibold">Booking Status:</span>{" "}
                                  <span
                                    className={
                                      normalizedStatus === "CONFIRMED"
                                        ? "font-bold text-green-600"
                                        : normalizedStatus === "PENDING"
                                        ? "font-bold text-orange-500"
                                        : normalizedStatus === "CANCELLED"
                                        ? "font-bold text-red-600"
                                        : "font-bold text-gray-600"
                                    }
                                  >
                                    {normalizedStatus}
                                  </span>
                                </p>
                                {booking.createdAt && (
                                  <p>
                                    <span className="font-semibold">Booked On:</span>{" "}
                                    {new Date(booking.createdAt).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-gray-600">Price Per Day</p>
                                <p className="text-3xl font-bold text-secondary">
                                  {formatCurrency(booking.price)}
                                </p>
                              </div>

                              {/* Adjusted Button Layout (Vertical Stack) */}
                              <div className="mt-6 flex flex-col gap-3">
                                <button
                                  type="button"
                                  onClick={() => handleViewTripDetails(booking)}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold whitespace-nowrap text-blue-700 transition-all hover:border-blue-500 hover:bg-blue-100 active:scale-[0.98]"
                                >
                                  <FiEye className="text-lg shrink-0" />
                                  Trip Detail
                                </button>

                                {normalizedStatus !== "CANCELLED" && (
                                  <button
                                    type="button"
                                    onClick={() => openCancelBookingPopup(booking)}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white transition-all hover:bg-red-600 active:scale-[0.98]"
                                  >
                                    <FiX className="text-lg shrink-0" />
                                    Cancel Booking
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-xl bg-white p-12 text-center">
                    <p className="mb-4 text-gray-600">No bookings found</p>
                    <Link to="/cars" className="btn-primary">
                      Browse Cars
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SAVED CARS */}
          {activeTab === "saved" && !isAdmin && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Saved Cars</h2>
              {loadingSavedCars ? (
                <div className="rounded-xl bg-white p-12 text-center">
                  <p>Loading...</p>
                </div>
              ) : savedCarsData.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedCarsData.map((car) => {
                    const imageName = car.mainImage || car.image;
                    const savedCarImageUrl = imageName
                      ? imageName.startsWith("http")
                        ? imageName
                        : imageName.startsWith("/car-images/")
                        ? `http://localhost:8080${imageName}`
                        : `http://localhost:8080/car-images/${encodeURIComponent(imageName)}`
                      : "/placeholder-car.png";

                    return (
                      <motion.div
                        key={`saved-car-${car.cartId}`}
                        whileHover={{ y: -10 }}
                        className="overflow-hidden rounded-xl bg-white card-shadow"
                      >
                        <div className="h-40 overflow-hidden bg-gray-100">
                          <img
                            src={savedCarImageUrl}
                            alt={car.name || "Saved car"}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = "/placeholder-car.png";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="mb-2 text-lg font-bold">
                            {car.name || "Car name not available"}
                          </h3>
                          <p className="mb-2 text-sm text-gray-600">
                            {car.brand || "Brand not available"}
                          </p>
                          <p className="mb-2 text-sm text-gray-600">
                            Fuel : {car.fuelType || "Not available"}
                          </p>
                          <p className="mb-4 text-sm text-gray-600">
                            Seats : {car.seating || "Not available"}
                          </p>
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-bold text-secondary">
                              {formatCurrency(car.price)}/day
                            </p>
                            <Link to={`/car/${car.carId}`} className="btn-primary px-4 py-2 text-sm">
                              View
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl bg-white p-12 text-center">
                  <p className="mb-4 text-gray-600">No saved cars yet</p>
                  <Link to="/cars" className="btn-primary">
                    Browse Cars
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="rounded-xl bg-white p-8 card-shadow">
              <div className="max-w-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {isAdmin ? "Admin Profile" : "Profile Information"}
                  </h2>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${
                      isEditingProfile ? "bg-gray-200 text-primary" : "btn-primary"
                    }`}
                  >
                    <FiEdit />
                    {isEditingProfile ? "Cancel" : "Edit"}
                  </button>
                </div>

                {isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-sm font-semibold">First Name</label>
                        <input
                          type="text"
                          value={editData.firstName}
                          onChange={(event) =>
                            setEditData({ ...editData, firstName: event.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Last Name</label>
                        <input
                          type="text"
                          value={editData.lastName}
                          onChange={(event) =>
                            setEditData({ ...editData, lastName: event.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Email</label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(event) => setEditData({ ...editData, email: event.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">Phone</label>
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(event) => setEditData({ ...editData, phone: event.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2">
                      <FiCheck />
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div>
                        <p className="mb-1 text-sm text-gray-600">First Name</p>
                        <p className="text-lg font-semibold">{profileData?.firstName}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Last Name</p>
                        <p className="text-lg font-semibold">{profileData?.lastName}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Email</p>
                        <p className="text-lg font-semibold">{profileData?.email}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-gray-600">Phone</p>
                        <p className="text-lg font-semibold">
                          {profileData?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === "documents" && !isAdmin && (
            <div className="space-y-6">
              {/* Documents Header */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <FiFileText className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">My Documents</h2>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        Upload and manage your Driving Licence and Aadhaar Card. Your documents
                        will be reviewed by our team.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        normalizedDocumentStatus === "ACCEPT"
                          ? "bg-green-500"
                          : normalizedDocumentStatus === "REJECT"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Verification
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {normalizedDocumentStatus === "ACCEPT"
                          ? "Verified"
                          : normalizedDocumentStatus === "REJECT"
                          ? "Rejected"
                          : "Under Review"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {documentsLoading ? (
                <div className="flex min-h-[450px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="text-center">
                    <span className="mx-auto mb-4 block h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
                    <p className="font-semibold text-gray-800">Loading documents...</p>
                    <p className="mt-1 text-sm text-gray-500">
                      Please wait while we fetch your documents.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {/* DRIVING LICENCE */}
                    {hasLicenseDoc ? (
                      <DocumentPreview
                        title="Driving Licence"
                        subtitle="Government issued driving licence"
                        numberLabel="Driving Licence Number"
                        documentNumber={
                          documentsData?.drivingLicenseNo ??
                          documentsData?.drivingLicenseNumber ??
                          documentsData?.drivingLicenceNumber ??
                          documentsData?.licenseNumber ??
                          ""
                        }
                        licenseExpiry={
                          documentsData?.licenseExpiry ??
                          documentsData?.drivingLicenseExpiry ??
                          documentsData?.drivingLicenceExpiry ??
                          ""
                        }
                        fileUrl={documentsData?.drivingLicense}
                        status={normalizedDocumentStatus}
                        setPreviewImage={setPreviewImage}
                        onDelete={() => openDeleteDocPopup("license")}
                      />
                    ) : (
                      <DocumentUploadCard
                        title="Driving Licence"
                        formId="license-form"
                        onSubmit={handleLicenseSubmit}
                        uploading={uploadingLicense}
                        submitError={licenseErrors.submit}
                      >
                        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor="drivingLicenseNumber"
                              className="mb-2 block text-sm font-semibold text-gray-800"
                            >
                              Driving Licence Number
                              <span className="ml-1 text-red-500">*</span>
                            </label>
                            <input
                              id="drivingLicenseNumber"
                              type="text"
                              value={drivingLicenseNumber}
                              maxLength={15}
                              autoComplete="off"
                              placeholder="Example: MH1220201234567"
                              onChange={(event) => {
                                const value = event.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9]/g, "")
                                  .slice(0, 15);
                                setDrivingLicenseNumber(value);
                                setLicenseErrors((previous) => ({
                                  ...previous,
                                  drivingLicenseNumber: "",
                                  submit: "",
                                }));
                              }}
                              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
                                licenseErrors.drivingLicenseNumber
                                  ? "border-red-500"
                                  : "border-gray-300 focus:border-red-500"
                              }`}
                            />
                            <div className="mt-2 min-h-[20px]">
                              {licenseErrors.drivingLicenseNumber && (
                                <p className="text-sm text-red-600">
                                  {licenseErrors.drivingLicenseNumber}
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="licenseExpiry"
                              className="mb-2 block text-sm font-semibold text-gray-800"
                            >
                              Expiry Date
                              <span className="ml-1 text-red-500">*</span>
                            </label>
                            <input
                              id="licenseExpiry"
                              type="date"
                              value={licenseExpiry}
                              min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                              onChange={(event) => {
                                setLicenseExpiry(event.target.value);
                                setLicenseErrors((previous) => ({
                                  ...previous,
                                  licenseExpiry: "",
                                  submit: "",
                                }));
                              }}
                              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
                                licenseErrors.licenseExpiry
                                  ? "border-red-500"
                                  : "border-gray-300 focus:border-red-500"
                              }`}
                            />
                            <div className="mt-2 min-h-[20px]">
                              {licenseErrors.licenseExpiry ? (
                                <p className="text-sm text-red-600">{licenseErrors.licenseExpiry}</p>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  Enter the expiry date printed on your licence.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <DocumentFileSelector
                          title="Driving Licence"
                          file={licenseFile}
                          inputId="licenseInput"
                          error={licenseErrors.licenseFile}
                          onChange={(event) => {
                            setLicenseFile(event.target.files?.[0] || null);
                            setLicenseErrors((previous) => ({
                              ...previous,
                              licenseFile: "",
                              submit: "",
                            }));
                          }}
                        />
                      </DocumentUploadCard>
                    )}

                    {/* AADHAAR */}
                    {hasAadhaarDoc ? (
                      <DocumentPreview
                        title="Aadhaar Card"
                        subtitle="Government issued identity document"
                        numberLabel="Aadhaar Card Number"
                        documentNumber={
                          documentsData?.aadharNo ??
                          documentsData?.aadhaarNumber ??
                          documentsData?.aadhaarCardNumber ??
                          documentsData?.aadhharNumber ??
                          ""
                        }
                        fileUrl={documentsData?.aadhharCard}
                        status={normalizedDocumentStatus}
                        setPreviewImage={setPreviewImage}
                        onDelete={() => openDeleteDocPopup("aadhaar")}
                      />
                    ) : (
                      <DocumentUploadCard
                        title="Aadhaar Card"
                        formId="aadhaar-form"
                        onSubmit={handleAadhaarSubmit}
                        uploading={uploadingAadhaar}
                        submitError={aadhaarErrors.submit}
                      >
                        <div className="mb-5">
                          <label
                            htmlFor="aadhaarNumber"
                            className="mb-2 block text-sm font-semibold text-gray-800"
                          >
                            Aadhaar Card Number
                            <span className="ml-1 text-red-500">*</span>
                          </label>
                          <input
                            id="aadhaarNumber"
                            type="text"
                            inputMode="numeric"
                            autoComplete="off"
                            value={aadhaarNumber}
                            maxLength={14}
                            placeholder="Example: 2345 6789 1234"
                            onChange={(event) => {
                              const digits = event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 12);
                              const formattedValue = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
                              setAadhaarNumber(formattedValue);
                              setAadhaarErrors((previous) => ({
                                ...previous,
                                aadhaarNumber: "",
                                submit: "",
                              }));
                            }}
                            className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 focus:ring-red-100 ${
                              aadhaarErrors.aadhaarNumber
                                ? "border-red-500"
                                : "border-gray-300 focus:border-red-500"
                            }`}
                          />
                          <div className="mt-2 min-h-[25px]">
                            {aadhaarErrors.aadhaarNumber ? (
                              <p className="text-sm text-red-600">{aadhaarErrors.aadhaarNumber}</p>
                            ) : (
                              <p className="text-xs text-gray-500">
                                Enter your 12-digit Aadhaar number.
                              </p>
                            )}
                          </div>
                        </div>

                        <DocumentFileSelector
                          title="Aadhaar Card"
                          file={aadhharFile}
                          inputId="aadhaarInput"
                          error={aadhaarErrors.aadhharFile}
                          onChange={(event) => {
                            setAadhharFile(event.target.files?.[0] || null);
                            setAadhaarErrors((previous) => ({
                              ...previous,
                              aadhharFile: "",
                              submit: "",
                            }));
                          }}
                        />
                      </DocumentUploadCard>
                    )}
                  </div>

                  {(!hasLicenseDoc || !hasAadhaarDoc) && (
                    <div className="rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
                      <div className="flex gap-3">
                        <FiFileText className="mt-0.5 flex-none text-blue-500" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Document verification</p>
                          <p className="mt-1 text-sm leading-6 text-blue-700">
                            Please upload both your Driving Licence and Aadhaar Card before making
                            a booking that requires document verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          TRIP DETAILS POPUP
      ===================================================== */}
      {showTripDetailsPopup && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-gray-950/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={closeTripDetailsPopup}
        >
          <div
            className="relative my-auto flex max-h-[90vh] w-full max-w-[340px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-sm sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header (Fixed) */}
            <div className="flex-none bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-4 py-3 text-white sm:px-5 sm:py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-1 text-[10px] text-blue-100 sm:text-xs">
                    <FiMapPin />
                    Your booking information
                  </div>
                  <h2 className="text-lg font-extrabold sm:text-xl">Trip Details</h2>
                </div>
                <button
                  type="button"
                  onClick={closeTripDetailsPopup}
                  disabled={loadingTripDetails}
                  aria-label="Close trip details"
                  className="rounded-full bg-white/15 p-1.5 transition hover:bg-white/25 disabled:opacity-50"
                >
                  <FiX className="text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {loadingTripDetails ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                  <p className="mt-2 text-xs font-medium text-gray-600">Loading details...</p>
                </div>
              ) : tripDetailsError ? (
                <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center">
                  <FiAlertCircle className="mx-auto text-xl text-red-500" />
                  <p className="mt-2 text-sm font-semibold text-red-700">Unable to load</p>
                  <p className="mt-1 break-words text-xs text-red-600">{tripDetailsError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedTripBooking) {
                        handleViewTripDetails(selectedTripBooking);
                      }
                    }}
                    className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : tripDetails ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-blue-100 bg-blue-50 p-2.5">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                        Booking Status
                      </p>
                      <p className="mt-0.5 text-xs font-extrabold text-gray-900 sm:text-sm">
                        {tripDetails.bookingStatus || "Not available"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-blue-700 shadow-sm sm:text-xs">
                      {tripDetails.tripDriverType === "SELF_DRIVE"
                        ? "🚗 Self Drive"
                        : tripDetails.tripDriverType === "HIRED_DRIVER"
                        ? "🧑‍✈️ Hired"
                        : tripDetails.tripDriverType || "N/A"}
                    </span>
                  </div>

                  {/* Pickup and Drop-off */}
                  <div>
                    <h3 className="mb-2 text-xs font-bold text-gray-900 sm:text-sm">Journey</h3>
                    <div className="relative space-y-2">
                      <div className="absolute bottom-4 left-[11px] top-4 border-l border-dashed border-blue-200" />
                      <div className="relative flex gap-2.5 rounded-lg border border-gray-100 p-2.5">
                        <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <FiMapPin className="text-xs" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-semibold uppercase text-gray-500">
                            Pickup
                          </p>
                          <p className="mt-0.5 break-words text-xs font-bold text-gray-900">
                            {tripDetails.pickupLocation || "Not available"}
                          </p>
                          <p className="mt-0.5 text-[10px] text-gray-500">
                            {formatTripDate(tripDetails.pickupDate)}
                          </p>
                        </div>
                      </div>
                      <div className="relative flex gap-2.5 rounded-lg border border-gray-100 p-2.5">
                        <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                          <FiMapPin className="text-xs" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-semibold uppercase text-gray-500">
                            Drop-off
                          </p>
                          <p className="mt-0.5 break-words text-xs font-bold text-gray-900">
                            {tripDetails.dropoffLocation || "Not available"}
                          </p>
                          <p className="mt-0.5 text-[10px] text-gray-500">
                            {formatTripDate(tripDetails.dropoffDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Duration and Price */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-gray-200 p-2.5">
                      <div className="flex items-center gap-1 text-gray-500">
                        <FiCalendar className="text-xs" />
                        <span className="text-[10px] font-medium">Duration</span>
                      </div>
                      <p className="mt-1 text-sm font-extrabold text-gray-900">
                        {tripDetails.days ?? 0}{" "}
                        <span className="text-[10px] font-semibold text-gray-500">
                          {(tripDetails.days ?? 0) === 1 ? "Day" : "Days"}
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-2.5">
                      <div className="flex items-center gap-1 text-gray-500">
                        <FiCreditCard className="text-xs" />
                        <span className="text-[10px] font-medium">Price / Day</span>
                      </div>
                      <p className="mt-1 text-sm font-extrabold text-gray-900">
                        ₹{Number(tripDetails.price ?? 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="rounded-lg bg-gray-900 p-3 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] text-gray-300">Total Amount</p>
                        <p className="mt-0.5 text-[9px] text-gray-400">
                          For {tripDetails.days ?? 0}{" "}
                          {(tripDetails.days ?? 0) === 1 ? "day" : "days"}
                        </p>
                      </div>
                      <p className="text-base font-extrabold sm:text-lg">
                        ₹{Number(tripDetails.total ?? 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="py-6 text-center text-xs text-gray-500">No details available.</p>
              )}
            </div>

            {/* Footer (Fixed) */}
            <div className="flex-none border-t border-gray-100 bg-gray-50 px-4 py-3">
              <button
                type="button"
                onClick={closeTripDetailsPopup}
                disabled={loadingTripDetails}
                className="w-full rounded-lg bg-gray-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-gray-800 disabled:opacity-50 sm:text-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-red-500"
            aria-label="Close preview"
          >
            <FiX className="text-2xl" />
          </button>
          <div
            className="relative flex max-h-[92vh] max-w-[95vw] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Document full preview"
              className="max-h-[90vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* CANCEL BOOKING POPUP */}
      {showCancelPopup && selectedBooking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeCancelBookingPopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Cancel Booking</h3>
                <button
                  type="button"
                  onClick={closeCancelBookingPopup}
                  disabled={deletingBooking}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            <div className="px-5 py-6 text-center sm:px-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FiX className="text-3xl text-red-600" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-gray-900">Delete this booking?</h4>
              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                Are you sure you want to delete your booking for{" "}
                <span className="font-bold text-gray-900">
                  {selectedBooking.name || "this car"}
                </span>
                ?
              </p>
              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-left">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Brand:</span>{" "}
                  {selectedBooking.brand || "Not available"}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Booking ID:</span>{" "}
                  {selectedBooking.bookingId}
                </p>
              </div>
              {cancelError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {cancelError}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={closeCancelBookingPopup}
                disabled={deletingBooking}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBooking}
                disabled={deletingBooking}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:bg-red-400 sm:w-auto"
              >
                {deletingBooking ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  "Cancel Booking"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* DELETE DOCUMENT POPUP */}
      {showDeleteDocPopup && deleteDocTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeDeleteDocPopup}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">Delete Document</h3>
                <button
                  type="button"
                  onClick={closeDeleteDocPopup}
                  disabled={deletingDocument}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            <div className="px-5 py-6 text-center sm:px-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FiTrash2 className="text-3xl text-red-600" />
              </div>
              <h4 className="mb-2 text-xl font-bold text-gray-900">Delete {deleteDocLabel}?</h4>
              <p className="text-sm leading-6 text-gray-600 sm:text-base">
                This will remove your uploaded{" "}
                <span className="font-bold text-gray-900">{deleteDocLabel}</span> file and its
                details. You can upload a new one right after.
              </p>
              {deleteDocError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {deleteDocError}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={closeDeleteDocPopup}
                disabled={deletingDocument}
                className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteDocument}
                disabled={deletingDocument}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:bg-red-400 sm:w-auto"
              >
                {deletingDocument ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Deleting...
                  </>
                ) : (
                  "Delete Document"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// =========================================================
// DOCUMENT FILE SELECTOR
// =========================================================
const DocumentFileSelector = ({ title, file, inputId, error, onChange }) => {
  return (
    <div>
      <div
        className={`relative flex min-h-[210px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
          error
            ? "border-red-400 bg-red-50"
            : file
            ? "border-green-400 bg-green-50"
            : "border-gray-300 bg-white hover:border-red-400 hover:bg-red-50/30"
        }`}
      >
        {file ? (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <FiCheckCircle className="text-2xl" />
            </div>
            <p className="font-bold text-gray-900">File Selected</p>
            <p className="mt-1 max-w-full break-all px-4 text-sm text-gray-500">{file.name}</p>
          </>
        ) : (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <FiFileText className="text-2xl" />
            </div>
            <p className="font-bold text-gray-800">Upload {title}</p>
            <p className="mt-1 text-sm text-gray-500">JPG, JPEG, PNG or PDF</p>
          </>
        )}

        <label
          htmlFor={inputId}
          className="mt-5 cursor-pointer rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:border-red-400 hover:bg-red-50 hover:text-red-600"
        >
          {file ? "Change File" : "Select File"}
        </label>

        <input id={inputId} type="file" hidden accept=".jpg,.jpeg,.png,.pdf" onChange={onChange} />
      </div>

      <div className="mt-2 min-h-[20px]">
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

// =========================================================
// DOCUMENT UPLOAD CARD
// =========================================================
const DocumentUploadCard = ({ title, formId, onSubmit, uploading, submitError, children }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100">
          <FiFileText className="text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">Document not uploaded</p>
        </div>
      </div>
    </div>

    <form id={formId} onSubmit={onSubmit} noValidate className="flex flex-1 flex-col p-5 sm:p-6">
      {children}

      {submitError && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="mt-auto flex justify-end pt-5">
        <button
          type="submit"
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md disabled:cursor-not-allowed disabled:bg-red-300 sm:w-auto"
        >
          {uploading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>
              <FiCheck />
              Submit {title}
            </>
          )}
        </button>
      </div>
    </form>
  </div>
);

// =========================================================
// DOCUMENT PREVIEW
// =========================================================
const DocumentPreview = ({
  title,
  subtitle,
  numberLabel,
  documentNumber,
  licenseExpiry,
  fileUrl,
  status,
  setPreviewImage,
  onDelete,
}) => {
  const [showNumber, setShowNumber] = useState(false);

  const getFileType = (url) => {
    if (!url) return "unknown";
    try {
      const cleanUrl = url.split("?")[0].split("#")[0];
      const extension = cleanUrl.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "webp", "gif"].includes(extension)) return "image";
      if (extension === "pdf") return "pdf";
      return "file";
    } catch {
      return "file";
    }
  };

  const fileType = getFileType(fileUrl);

  const formattedNumber = documentNumber ? String(documentNumber).trim() : "Not available";

  const maskedNumber = (() => {
    if (!formattedNumber || formattedNumber === "Not available") return formattedNumber;
    if (title === "Aadhaar Card") {
      const digits = formattedNumber.replace(/\D/g, "");
      if (digits.length === 12) return `XXXX XXXX ${digits.slice(-4)}`;
    }
    if (formattedNumber.length > 6) {
      return `${formattedNumber.slice(0, 4)}${"*".repeat(
        Math.max(formattedNumber.length - 8, 3)
      )}${formattedNumber.slice(-4)}`;
    }
    return formattedNumber;
  })();

  const formattedLicenseExpiry = (() => {
    if (!licenseExpiry) return "Not available";
    const rawValue = String(licenseExpiry).trim();
    const dateOnlyValue = rawValue.includes("T") ? rawValue.split("T")[0] : rawValue;
    const parts = dateOnlyValue.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
    return rawValue;
  })();

  const statusConfig = {
    ACCEPT: {
      label: "ACCEPTED",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    REJECT: {
      label: "REJECTED",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    },
    PENDING: {
      label: "PENDING",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      dot: "bg-yellow-500",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.PENDING;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 sm:h-11 sm:w-11">
              <FiFileText className="text-lg sm:text-xl" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
              <p className="mt-0.5 truncate text-[11px] text-gray-500 sm:text-xs">
                {subtitle || "Uploaded document"}
              </p>
            </div>
          </div>

          <div className="flex flex-none items-center gap-2 sm:gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-bold sm:gap-2 sm:px-3 sm:text-xs ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
            >
              <span className={`h-2 w-2 flex-none rounded-full ${currentStatus.dot}`} />
              {currentStatus.label}
            </span>

            <button
              type="button"
              onClick={onDelete}
              title={`Remove ${title}`}
              aria-label={`Remove ${title}`}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FiTrash2 className="text-base" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-b border-gray-200 bg-white p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{numberLabel}</p>
            <button
              type="button"
              onClick={() => setShowNumber((previous) => !previous)}
              className="flex items-center gap-1 text-xs font-semibold text-red-500 transition hover:text-red-700"
            >
              {showNumber ? (
                <>
                  <FiEyeOff />
                  Hide
                </>
              ) : (
                <>
                  <FiEye />
                  Show
                </>
              )}
            </button>
          </div>
          <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">
            <span className="break-all">{showNumber ? formattedNumber : maskedNumber}</span>
          </div>
        </div>

        {licenseExpiry !== undefined && (
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              Licence Expiry
            </p>
            <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-sm font-semibold tracking-wide text-gray-800">
              {formattedLicenseExpiry}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-800">Uploaded Document</p>
            <p className="text-xs text-gray-500">Preview</p>
          </div>
          {fileType === "image" && (
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">
              Image
            </span>
          )}
          {fileType === "pdf" && (
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-500">
              PDF
            </span>
          )}
        </div>

        <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3 sm:h-[230px]">
          {!fileUrl ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <FiFileText className="text-3xl" />
              </div>
              <p className="font-semibold text-gray-700">Document unavailable</p>
              <p className="mt-1 text-sm text-gray-500">The uploaded file could not be found.</p>
            </div>
          ) : fileType === "image" ? (
            <div className="group/image relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
              <img
                src={fileUrl}
                alt={title}
                className="h-full w-full rounded-xl object-contain p-2 transition-transform duration-300 group-hover/image:scale-[1.02]"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setPreviewImage(fileUrl)}
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover/image:opacity-100 focus:opacity-100"
              >
                <span className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-gray-900 shadow-xl">
                  <FiEye className="text-lg" />
                  View Full Image
                </span>
              </button>
              <div className="pointer-events-none absolute bottom-3 right-3">
                <DocumentStamp status={status} />
              </div>
            </div>
          ) : fileType === "pdf" ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <FiFileText className="text-4xl" />
              </div>
              <p className="font-bold text-gray-900">PDF Document</p>
              <p className="mt-1 text-sm text-gray-500">
                Your document is available as a PDF file.
              </p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-600 hover:shadow-md"
              >
                <FiEye />
                Open PDF
              </a>
              <div className="pointer-events-none absolute bottom-3 right-3">
                <DocumentStamp status={status} />
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                <FiFileText className="text-4xl" />
              </div>
              <p className="font-bold text-gray-900">Document File</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 font-semibold text-red-500 underline underline-offset-4 hover:text-red-700"
              >
                View Document
              </a>
              <div className="pointer-events-none absolute bottom-3 right-3">
                <DocumentStamp status={status} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiCheckCircle className="flex-none text-green-500" />
            <span>Document uploaded successfully</span>
          </div>
          <span className="hidden text-xs font-medium text-gray-400 sm:block">
            Secure document
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;